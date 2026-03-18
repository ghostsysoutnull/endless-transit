package com.endlesstransit.model

import com.endlesstransit.core.Game
import com.endlesstransit.procgen.LocusSeed
import com.endlesstransit.ui.Terminal
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*

/**
 * Phase 3a pre-check safety net: pins the door trace assignment contract in
 * ProceduralFactory.populateCorridor().
 *
 * The current implementation resolves traces via AnomalousTrace.matches(String roomType).
 * Phase 3a will replace this with a RoomCategory enum — the bidirectional mapping
 * (RoomCategory → AnomalousTrace) must produce identical results for every door.
 *
 * These tests verify the invariant on the OUTPUT side (every door has a valid, non-null
 * trace) so that a broken mapping in the refactor is caught immediately.
 */
class RoomCategoryTest {

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
    }

    /**
     * Builds a properly configured Building and navigates to floor 0's Corridor.
     * Building fields must be set manually when constructing outside the full procgen chain,
     * because Building.populateChildren() → populateBuilding() reads these fields directly.
     */
    private Corridor buildCorridor(String culture, long seed, int numApartments = 4) {
        Building bldg = new Building(new LocusSeed(seed))
        bldg.culture = culture
        bldg.timeline = "ancient"
        bldg.maxFloors = 1
        bldg.apartmentsPerFloor = numApartments
        Floor floor = bldg.getFloor(0)
        assertNotNull(floor, "getFloor(0) must return a floor — check maxFloors is set to >= 1")
        return floor.getCorridor()
    }

    /**
     * A2 — Core invariant: every door in a populated corridor has a non-null AnomalousTrace.
     * A null trace means the room type string had no match in AnomalousTrace, which is a
     * silent failure. The fallback ?: AnomalousTrace.SILENCE in populateCorridor() means
     * this should always be non-null — but this test will catch if that fallback is removed.
     */
    @Test
    void allDoors_haveNonNullValidTrace_afterCorridorPopulation() {
        Corridor corridor = buildCorridor("monolith", 0x1234L)

        assertFalse(corridor.doors.isEmpty(),
            "Corridor must have at least one door to be a meaningful test")

        corridor.doors.each { Door door ->
            assertNotNull(door.trace,
                "Every door must have a non-null trace — " +
                "null means the room type string matched nothing in AnomalousTrace")
            assertTrue(AnomalousTrace.values().contains(door.trace),
                "door.trace '${door.trace}' must be a known AnomalousTrace enum value")
        }
    }

    /**
     * A2 (culture coverage): the trace assignment invariant holds across all 6 cultures.
     * Each culture has its own room type vocabulary — catches any culture whose room types
     * fall entirely outside all AnomalousTrace keyword sets.
     */
    @Test
    void doorTrace_isNeverNull_acrossAllCultures() {
        ["rust", "neon", "baroque", "monolith", "void", "organic"].each { String culture ->
            Corridor corridor = buildCorridor(culture, 12345L)

            corridor.doors.eachWithIndex { Door door, int i ->
                assertNotNull(door.trace,
                    "Culture '${culture}', door[${i}]: trace must not be null (unmatched room type)")
            }
        }
    }

    /**
     * A2 (full hierarchy): verifies that a corridor built via the complete procgen chain
     * (Game → Street → Building → Floor → Corridor) has varied, non-SILENCE traces.
     *
     * This test distinguishes "correctly assigned SILENCE" from "SILENCE because Country
     * ancestor was missing". A standalone Building has no Country ancestor, so its trait
     * defaults to "Standard" — producing mostly SILENCE. A full-hierarchy corridor always
     * has a Country with a functional trait, so its doors should reflect varied sensory cues.
     *
     * This is the canary test for hierarchy integrity: if parent wiring breaks during
     * Phase 4, 5, or 6 refactoring, this test will catch it via the TOPOLOGY_WARN path.
     */
    @Test
    void fullHierarchyCorridor_containsNonSilenceTraces() {
        Game game = new Game(0x1234L)
        Street street = (Street) game.currentLocation
        street.ensureChildrenPopulated()

        Building building = (Building) street.children.find { it instanceof Building }
        assertNotNull(building, "Street must contain at least one Building")

        Floor floor = building.getFloor(0)
        assertNotNull(floor, "Building must have at least one Floor")

        Corridor corridor = floor.getCorridor()
        assertFalse(corridor.doors.isEmpty(), "Corridor must have at least one door")

        Set<AnomalousTrace> traces = corridor.doors.collect { it.trace }.toSet()

        // With a real Country ancestor the trait is drawn from the procgen chain.
        // At least one door should reflect a specific sensory trace, not just Stillness.
        // All-SILENCE here means Country ancestor is missing — hierarchy is broken.
        assertTrue(traces.any { it != AnomalousTrace.SILENCE },
            "Full-hierarchy corridor must have at least one non-SILENCE trace. " +
            "All-SILENCE means Country ancestor was not found — check parent wiring.")
    }

    /**
     * A2 (keyword coverage): room type strings known to be in the types map
     * each match a specific expected AnomalousTrace. Tests the keyword matching
     * directly without relying on procgen hierarchy.
     *
     * These are the canonical mappings the RoomCategory enum must preserve.
     */
    @Test
    void knownRoomTypes_matchExpectedTraces() {
        // Military trait → HUMMING or CLICKING
        assertTrue(AnomalousTrace.HUMMING.matches("Barracks"),      "Barracks → HUMMING")
        assertTrue(AnomalousTrace.HUMMING.matches("Tactical Hub"),  "Tactical Hub → HUMMING (contains HUB)")
        assertTrue(AnomalousTrace.CLICKING.matches("Armory"),       "Armory → CLICKING")
        assertTrue(AnomalousTrace.CLICKING.matches("Security Station"), "Security Station → CLICKING (contains STATION)")

        // Research trait → OZONE
        assertTrue(AnomalousTrace.OZONE.matches("Laboratory"),          "Laboratory → OZONE")
        assertTrue(AnomalousTrace.OZONE.matches("Neural Link Array"),   "Neural Link Array → OZONE (contains ARRAY)")
        assertTrue(AnomalousTrace.OZONE.matches("Bio-Server"),          "Bio-Server → OZONE (contains SERVER)")

        // Industrial trait → OZONE or CLICKING
        assertTrue(AnomalousTrace.OZONE.matches("Power Plant"),         "Power Plant → OZONE (contains PLANT)")
        assertTrue(AnomalousTrace.OZONE.matches("Processing Core"),     "Processing Core → OZONE (contains CORE)")
        assertTrue(AnomalousTrace.CLICKING.matches("Maintenance Bay"),  "Maintenance Bay → CLICKING (contains MAINTENANCE)")
        assertTrue(AnomalousTrace.HUMMING.matches("Fuel Depot"),        "Fuel Depot → HUMMING (contains DEPOT)")

        // Ceremonial trait → SILENCE or FROST
        assertTrue(AnomalousTrace.SILENCE.matches("Ritual Chamber"),    "Ritual Chamber → SILENCE (contains CHAMBER)")
        assertTrue(AnomalousTrace.FROST.matches("Memory Well"),         "Memory Well → FROST (contains WELL)")

        // Commercial trait → CLICKING
        assertTrue(AnomalousTrace.CLICKING.matches("Supply Node"),      "Supply Node → CLICKING (contains NODE)")
        assertTrue(AnomalousTrace.HUMMING.matches("Credit Hub"),        "Credit Hub → HUMMING (contains HUB)")
    }
}
