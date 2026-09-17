package com.endlesstransit.procgen

import com.endlesstransit.model.*
import com.endlesstransit.ui.StandardTerminalAdapter
import com.endlesstransit.ui.Terminal
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*

/**
 * HK-016 step 2 pins, one method per sub-step, each landing in that sub-step's commit and shown RED
 * against the previous commit. They walk the same sample the variety audit measured (Appendix A):
 * the start street of six seeds, first two buildings, first two floors — several hundred rooms.
 */
class ProcgenVarietyContractTest {

    static final List<Long> SEEDS = [0L, 12345L, 0x1234L, 500L, 9999L, 42L]

    ProceduralFactory factory

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
        factory = new ProceduralFactory(new StandardTerminalAdapter())
    }

    /** Every apartment on the sample, with its rooms populated. */
    private List<Apartment> sampleApartments() {
        List<Apartment> out = []
        SEEDS.each { long seed ->
            Street street = (Street) WorldGenesis.createInitialWorld(factory, new LocusSeed(seed)).startLocation
            street.buildings.take(2).each { Building b ->
                (0..<Math.min(2, b.maxFloors)).each { int f ->
                    b.getFloor(f).getCorridor().apartments.each { Apartment a -> a.rooms; out << a }
                }
            }
        }
        assertTrue(out.size() > 100, "sample too small: ${out.size()} apartments")
        return out
    }

    // --- 2a/2b: shuffled-deck dealing --------------------------------------------------------------

    @Test
    void noObjectRepeatsInsideAnApartment_andEveryObjectIsADeckEntry() {
        int apartmentsWithObjects = 0
        sampleApartments().each { Apartment a ->
            List<String> objects = a.rooms.collectMany { Room r -> r.objects }
            if (objects.isEmpty()) return
            apartmentsWithObjects++
            assertEquals(objects.size(), (objects as Set).size(),
                "apartment ${a.getLIP()} (${a.culture}/${a.timeline}) deals an object twice: ${objects.countBy { it }.findAll { it.value > 1 }.keySet()}")
            List<String> deck = factory.themeService.objectDeck(a.culture, a.timeline)
            objects.each { String o -> assertTrue(deck.contains(o), "'${o}' is not in the ${a.culture}/${a.timeline} deck") }
        }
        assertTrue(apartmentsWithObjects > 100, "sample had only ${apartmentsWithObjects} apartments with objects")
    }

    @Test
    void objectDeck_hasEveryFormOnceAndNothingElse() {
        List<String> c = factory.themeService.getCultureAssets("monolith")
        List<String> t = factory.themeService.getTimelineAssets("analog")
        List<String> deck = factory.themeService.objectDeck("monolith", "analog")
        assertEquals(c.size() * t.size() * 4 + c.size() + t.size(), deck.size(), "deck size = pairs x 4 forms + singles")
        assertEquals(deck.size(), (deck as Set).size(), "deck entries are distinct")
        assertTrue(deck.contains("${t[0]} with ${c[0]}".toString()))
        assertTrue(deck.contains("${c[0]} infused with ${t[0]}".toString()))
        assertTrue(deck.contains("${c[0]} fused to ${t[0]}".toString()))
        assertTrue(deck.contains("${t[0]} grafted onto ${c[0]}".toString()))
        assertTrue(deck.contains(c[0]) && deck.contains(t[0]), "single-item forms present")
        assertSame(deck, factory.themeService.objectDeck("monolith", "analog"), "deck is built once and shared")
        assertEquals(["Strange Object"], factory.themeService.objectDeck("nonesuch", "analog"), "empty list -> the old fallback")
    }
}
