package com.endlesstransit.procgen

import com.endlesstransit.model.*
import com.endlesstransit.ui.StandardTerminalAdapter
import com.endlesstransit.ui.Terminal
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*

/**
 * HK-022 step-0 pins: the NameGenerator behaviors no test asserted before the generator stopped
 * being a bag of statics. Every call goes through an instance, so these rows cross the change
 * unedited (Groovy resolves a static through an instance).
 *
 * Literals come from a run on the pre-change tree. Building seeds are branched loci — a raw small
 * LocusSeed never rolls under the landmark or uncommon thresholds.
 */
class NameGeneratorContractTest {

    static final long SNAPSHOT_SEED = 0x1234L

    NameGenerator names

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
        names = new NameGenerator()
    }

    private static LocusSeed buildingLocus(int index) {
        return new LocusSeed(SNAPSHOT_SEED).branch(index)
    }

    @Test
    void sectorAndSolarSystemNames_pinnedForSeed0x1234() {
        Universe universe = new ProceduralFactory(new StandardTerminalAdapter()).createUniverse(new LocusSeed(SNAPSHOT_SEED))
        def sector = universe.getFilaments()[0].getChildren()[0]
        def system = sector.getChildren()[0]

        assertTrue(sector instanceof GalacticSector, "precondition: the first sector is a GalacticSector (generateSectorName)")
        assertEquals("Void Quadrant 80", sector.name)
        assertEquals("Tau Minor", system.name)
    }

    @Test
    void buildingName_landmarkBranch_pinned() {
        Map<String, Object> result = names.generateBuildingName("monolith", 12, buildingLocus(3), 8, false, false)
        assertEquals("Memory of the First Pulse", result.name)
        assertEquals(true, result.isLandmark)
    }

    @Test
    void buildingName_uncommonUnitTemplate_pinned() {
        Map<String, Object> result = names.generateBuildingName("monolith", 12, buildingLocus(6), 8, false, false)
        assertEquals("Unit 0xB00 Block", result.name)
        assertEquals(false, result.isLandmark)
    }

    @Test
    void buildingName_uncommonNounOfConceptTemplate_pinned() {
        Map<String, Object> result = names.generateBuildingName("monolith", 12, buildingLocus(34), 8, false, false)
        assertEquals("The Unit of Time", result.name)
        assertEquals(false, result.isLandmark)
    }

    @Test
    void roomName_withoutADealtAdjective_drawsOneFromTheLexicon() {
        Map<String, Object> result = names.generateRoomName("monolith", "Industrial", new LocusSeed(7L))
        assertEquals("Featureless Maintenance Bay", result.name)
        assertEquals(RoomCategory.MAINTENANCE_BAY, result.category)
    }

    @Test
    void unknownCulture_fallsBackToMonolithsLexicon() {
        assertEquals(names.adjectivesFor("monolith"), names.adjectivesFor("no-such-culture"))
        assertFalse(names.adjectivesFor("monolith").isEmpty(), "monolith lexicon loaded")
    }

    @Test
    void twoGenerators_sameLocus_sameNames_noHiddenState() {
        NameGenerator other = new NameGenerator()
        LocusSeed locus = new LocusSeed(SNAPSHOT_SEED).branch("HK-022")
        // Drain one generator first: a draw must not move the next one.
        20.times { names.generateCityName(locus.branch(it)) }

        assertEquals(other.generateSolarSystemName(locus), names.generateSolarSystemName(locus))
        assertEquals(other.generatePlanetName(locus), names.generatePlanetName(locus))
        assertEquals(other.generateCountryName(locus), names.generateCountryName(locus))
        assertEquals(other.generateCityName(locus), names.generateCityName(locus))
        assertEquals(other.generateStreetName(locus), names.generateStreetName(locus))
        assertEquals(other.generateFilamentName(locus), names.generateFilamentName(locus))
        assertEquals(other.generateSectorName(locus), names.generateSectorName(locus))
        assertEquals(other.generateRoomName("rust", "Research", locus), names.generateRoomName("rust", "Research", locus))
        assertEquals(other.generateBuildingName("rust", 25, locus, 9, true, true), names.generateBuildingName("rust", 25, locus, 9, true, true))
        assertEquals(other.adjectivesFor("rust"), names.adjectivesFor("rust"))
    }
}
