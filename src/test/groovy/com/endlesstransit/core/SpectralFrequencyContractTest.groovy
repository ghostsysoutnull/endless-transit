package com.endlesstransit.core

import com.endlesstransit.model.*
import com.endlesstransit.procgen.Gematria
import com.endlesstransit.procgen.LocusSeed
import com.endlesstransit.ui.Terminal
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*

/**
 * Phase 3b pre-check safety net: pins the semantic contracts that SpectralFrequency
 * will encapsulate. Tests run against current production code (Player, Gematria,
 * InventoryItem) and must continue passing after Phase 3b introduces SpectralFrequency.
 *
 * Contracts pinned:
 *   B1/B2 — Resonance detection: freq % 11 == 0 → resonantTracesCount++
 *   B3/B4 — Master number semantics: {11, 22, 33} only — Gematria doubles sum
 *   B5    — Hybrid frequency = sum of parent frequencies
 *   B6    — Keystone: frequency = 0, treated as resonant by current logic (0 % 11 == 0)
 *   B7    — InventoryItem stores and returns frequency values without truncation
 */
class SpectralFrequencyContractTest {

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
    }

    // -------------------------------------------------------------------------
    // B1 — Resonance detection: multiples of 11 increment resonantTracesCount
    // -------------------------------------------------------------------------

    @Test
    void merge_atResonantFrequency_incrementsResonantTracesCount() {
        def player = new Player()
        // 33 + 88 = 121 = 11 * 11 → resonant
        player.inventory.add(new InventoryItem("A", 33))
        player.inventory.add(new InventoryItem("B", 88))
        int beforeCount = player.resonantTracesCount

        player.mergeItems(0, 1)

        def hybrid = player.inventory[0]
        assertEquals(121, hybrid.frequency,
            "Hybrid frequency must equal the sum of parent frequencies (33 + 88 = 121)")
        assertEquals(beforeCount + 1, player.resonantTracesCount,
            "resonantTracesCount must increment when merged frequency is divisible by 11")
    }

    @Test
    void merge_atMultiplesOf11_eachIncrementResonantTracesCount() {
        [11, 22, 44, 55, 121].each { int resonantFreq ->
            def player = new Player()
            // Build a pair whose sum equals the resonant frequency
            player.inventory.add(new InventoryItem("X", resonantFreq - 1))
            player.inventory.add(new InventoryItem("Y", 1))
            int before = player.resonantTracesCount

            player.mergeItems(0, 1)

            assertEquals(before + 1, player.resonantTracesCount,
                "Frequency ${resonantFreq} (11 × ${resonantFreq / 11}) must be resonant")
        }
    }

    // -------------------------------------------------------------------------
    // B2 — Non-resonant frequencies must NOT increment resonantTracesCount
    // -------------------------------------------------------------------------

    @Test
    void merge_atNonResonantFrequency_doesNotIncrementResonantTracesCount() {
        def player = new Player()
        // 10 + 20 = 30 — not divisible by 11
        player.inventory.add(new InventoryItem("A", 10))
        player.inventory.add(new InventoryItem("B", 20))
        int beforeCount = player.resonantTracesCount

        player.mergeItems(0, 1)

        assertEquals(beforeCount, player.resonantTracesCount,
            "resonantTracesCount must NOT increment when frequency is not divisible by 11")
    }

    @Test
    void merge_atBoundaryValues_nonResonant() {
        [10, 12, 23, 100, 1234].each { int nonResonantFreq ->
            def player = new Player()
            player.inventory.add(new InventoryItem("X", nonResonantFreq - 1))
            player.inventory.add(new InventoryItem("Y", 1))
            int before = player.resonantTracesCount

            player.mergeItems(0, 1)

            assertEquals(before, player.resonantTracesCount,
                "Frequency ${nonResonantFreq} is not divisible by 11 — must not be resonant")
        }
    }

    // -------------------------------------------------------------------------
    // B3 — Master number semantics: Gematria doubles sum for {11, 22, 33}
    // -------------------------------------------------------------------------

    @Test
    void gematria_doublesSum_forMasterNumber11() {
        // "K" → ordinal 11 (consonant) → sum = 11 → master number → doubled → 22 → × depth 1 = 22
        int freq = Gematria.calculateFrequency("K", 1)
        assertEquals(22, freq,
            "'K' has consonant ordinal 11 (master number) — sum must be doubled before × depth")
    }

    @Test
    void gematria_doublesSum_forMasterNumber22() {
        // "V" → ordinal 22 (consonant) → sum = 22 → master number → doubled → 44 → × depth 1 = 44
        int freq = Gematria.calculateFrequency("V", 1)
        assertEquals(44, freq,
            "'V' has consonant ordinal 22 (master number) — sum must be doubled before × depth")
    }

    @Test
    void gematria_doublesSum_forMasterNumber33() {
        // "ZG" → Z=26 + G=7 = 33 → master number → doubled → 66 → × depth 1 = 66
        int freq = Gematria.calculateFrequency("ZG", 1)
        assertEquals(66, freq,
            "'ZG' consonant sum is 33 (master number) — sum must be doubled before × depth")
    }

    // -------------------------------------------------------------------------
    // B4 — Master number definition is NARROW: {11, 22, 33} only, not 44, 55, etc.
    // -------------------------------------------------------------------------

    @Test
    void gematria_doesNotDouble_for44() {
        // "VV" → V=22, V=22 → sum = 44 — NOT a master number (narrow definition)
        // Expected: freq = 44 * 1 = 44 (no doubling)
        int freq = Gematria.calculateFrequency("VV", 1)
        assertEquals(44, freq,
            "44 is NOT a master number in this implementation — sum must not be doubled")
    }

    @Test
    void gematria_doesNotDouble_for55() {
        // Need consonants summing to 55. "VK" → V=22 + K=11 = 33 → master. Need non-master 55.
        // "YN" → Y=25 + N=14 = 39. "ZP" → Z=26 + P=16 = 42. "ZS" → Z=26 + S=19 = 45.
        // "ZV" → Z=26 + V=22 = 48. "KKK" → 11+11+11=33 → master.
        // "ZY" → Z=26 + Y=25 = 51. "ZZ" → Z=26+26=52. "ZZD" → 52+4=56. "ZZC" → 52+3=55.
        int freq = Gematria.calculateFrequency("ZZC", 1)
        assertEquals(55, freq,
            "55 is NOT a master number — sum (ZZC=55) must not be doubled")
    }

    @Test
    void gematria_standardName_noMasterNumber() {
        // Confirmed by GematriaTest: "Key" (K=11, y=25, consonants only) → sum=36, depth=10 → 360
        int freq = Gematria.calculateFrequency("Key", 10)
        assertEquals(360, freq, "'Key' at depth 10 must equal 360 (no master number)")
    }

    // -------------------------------------------------------------------------
    // B5 — Hybrid frequency = sum of parent frequencies
    // -------------------------------------------------------------------------

    @Test
    void merge_hybridFrequency_isSumOfParents() {
        def player = new Player()
        player.inventory.add(new InventoryItem("Alpha", 100))
        player.inventory.add(new InventoryItem("Beta", 200))

        player.mergeItems(0, 1)

        def hybrid = player.inventory[0]
        assertEquals(300, hybrid.frequency,
            "Hybrid frequency must equal the sum of both parent frequencies (100 + 200 = 300)")
    }

    @Test
    void merge_hybridFrequency_withZeroFrequencyItem() {
        def player = new Player()
        player.inventory.add(new InventoryItem("Alpha", 0))
        player.inventory.add(new InventoryItem("Beta", 500))

        player.mergeItems(0, 1)

        def hybrid = player.inventory[0]
        assertEquals(500, hybrid.frequency,
            "Merging 0Hz item with 500Hz item must produce 500Hz hybrid")
    }

    // -------------------------------------------------------------------------
    // B6 — Keystone: frequency = 0, treated as resonant (0 % 11 == 0)
    // -------------------------------------------------------------------------

    @Test
    void keystone_hasZeroFrequency_andIsResonant() {
        def bldg = new Building(new LocusSeed(0L))
        bldg.name = "TestTower"
        bldg.maxFloors = 1
        bldg.infusionCount = 7
        bldg.notifySampled(0)

        def player = new Player()
        player.inventory.add(new InventoryItem("X", 100))
        player.inventory.add(new InventoryItem("Y", 200))

        def floor = bldg.getFloor(0)
        int beforeCount = player.resonantTracesCount

        player.mergeItems(0, 1, floor)

        def keystone = player.inventory.find { it.isKeystone }
        assertNotNull(keystone, "Keystone must be created when building is primed")
        assertEquals(0, keystone.frequency, "Keystone must have 0Hz frequency")
        assertTrue(keystone.isKeystone, "Keystone item must be marked isKeystone = true")

        // Current behavior: 0 % 11 == 0 → treated as resonant
        // SpectralFrequency.isResonant() must preserve this: new SpectralFrequency(0).isResonant() == true
        assertEquals(beforeCount + 1, player.resonantTracesCount,
            "Keystone (0Hz) is divisible by 11 — current logic increments resonantTracesCount")
    }

    // -------------------------------------------------------------------------
    // B7 — InventoryItem stores and returns frequency values accurately
    // -------------------------------------------------------------------------

    @Test
    void inventoryItem_frequency_isStoredWithoutTruncation() {
        assertEquals(1234, new InventoryItem("Fragment", 1234).frequency,
            "Standard frequency must be stored and returned accurately")
        assertEquals(0, new InventoryItem("Empty", 0).frequency,
            "Zero frequency must be stored and returned as 0")
        assertEquals(99999, new InventoryItem("Heavy", 99999).frequency,
            "Large frequency values must not be truncated")
        assertEquals(11, new InventoryItem("Resonant", 11).frequency,
            "Resonant boundary frequency (11) must be stored accurately")
    }
}
