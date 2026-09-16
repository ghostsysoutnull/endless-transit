package com.endlesstransit.procgen

import com.endlesstransit.model.*
import com.endlesstransit.ui.Terminal
import org.junit.jupiter.api.BeforeEach
import com.endlesstransit.ui.StandardTerminalAdapter
import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*

/**
 * Phase 9-0 safety net: pins the ProceduralFactory behaviors that no other test asserts,
 * for seed 0x1234, before the factory is split into one class per location type.
 *
 * ProcgenSnapshotTest pins names down to the buildings; the golden frames pin seed 12345's
 * rendered chain. Neither reads building scale, planet colour, country trait / mutated vibe,
 * door inscriptions, apartment vibe match and object pool, room attributes, the NullSector
 * roll, or countSubLocations. This test does, one method per factory-to-be, so that a
 * transcription error in a body move fails in the method named after the factory that moved.
 *
 * Literals were captured from master @ e18384d by a scratchpad script walking children[0]
 * from Universe to Room. Never regenerate them silently: a diff here is a finding.
 */
class ProcgenDeepSnapshotTest {
    private static final ProceduralFactory FACTORY = new ProceduralFactory(new StandardTerminalAdapter())


    static final long SNAPSHOT_SEED = 0x1234L  // same seed as ProcgenSnapshotTest

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
    }

    // --- walk helpers (children[0] at every level) ---

    private static CosmicFilament filament() {
        Universe u = FACTORY.createUniverse(new LocusSeed(SNAPSHOT_SEED))
        return u.getFilaments()[0]
    }

    private static Planet planet() {
        Container sector = (Container) filament().getChildren()[0]
        SolarSystem sys = (SolarSystem) sector.getChildren()[0]
        return sys.getPlanets()[0]
    }

    private static Country country() { planet().getCountries()[0] }
    private static City city() { country().getCities()[0] }
    private static Street street() { city().getStreets()[0] }
    private static Building building() { street().getBuildings()[0] }
    private static Floor floor0() { building().getFloor(0) }
    private static Corridor corridor() { floor0().getCorridor() }
    private static Apartment apartment() { corridor().getApartments()[0] }
    private static Room room() { apartment().getRooms()[0] }

    // --- FilamentFactory / NullSectorFactory: populateFilament + createNullSector ---

    @Test
    void filament_nullSectorRollAndName_pinnedForSeed0x1234() {
        CosmicFilament f = filament()
        List<Location> kids = f.getChildren()
        assertEquals(7, kids.size(), "filament child count")
        // HK-007: each child rolls on childLocus.branch("NULL_ROLL"); FilamentNullRollTest guards the rate/mixing
        List<String> expectedTypes = ["GalacticSector", "GalacticSector", "NullSector", "NullSector", "NullSector", "GalacticSector", "GalacticSector"]
        assertEquals(expectedTypes, kids.collect { it.class.simpleName }, "per-child NullSector roll at this seed")
        assertEquals("Null Reach 886", kids[2].name, "createNullSector name format")
    }

    // --- PlanetFactory: createPlanet colour map ---

    @Test
    void planet_atmosphericColor_pinnedForSeed0x1234() {
        VibeCapsule vibe = planet().localVibe
        assertEquals("monolith", vibe.primaryCulture, "precondition: primary culture (ProcgenSnapshotTest pins it too)")
        assertEquals(Terminal.CYAN, vibe.atmosphericColor, "monolith maps to CYAN in createPlanet")
        assertEquals(0.85d, vibe.stabilityFactor, 1e-9d, "planet vibe keeps the default stability")
        assertEquals("Capsule(analog, monolith/shogun, Standard)", vibe.toString())
    }

    // --- CountryFactory: createCountry trait pick + populateCountry vibe mutation ---

    @Test
    void country_traitAndMutatedVibe_pinnedForSeed0x1234() {
        Country c = country()
        assertEquals("Free Dust Kingdom", c.name, "precondition: country name")
        assertEquals("Industrial", c.functionalTrait, "createCountry functionalTrait pick")
        assertNull(c.localVibe, "localVibe is null until populateCountry runs")

        assertEquals(4, c.getCities().size(), "populateCountry city count")

        VibeCapsule mutated = c.localVibe
        assertNotNull(mutated, "populateCountry must derive a local vibe")
        assertEquals("Capsule(analog, monolith/shogun, Industrial)", mutated.toString(), "mutated vibe carries the trait")
        assertEquals(0.9d, mutated.stabilityFactor, 1e-9d, "stability shift applied by mutate()")
        assertEquals(Terminal.CYAN, mutated.atmosphericColor, "mutation preserves the planet colour")
    }

    // --- CityFactory / StreetFactory: populateCity + populateStreet counts ---

    @Test
    void city_andStreet_childCounts_pinnedForSeed0x1234() {
        City c = city()
        assertEquals("Starford", c.name, "precondition: city name")
        assertEquals(5, c.getStreets().size(), "populateCity street count")
        assertFalse(c.isRebelDistrict, "city is not a rebel district at this seed")

        Street s = street()
        assertEquals("Busy Terrace", s.name, "precondition: street name")
        assertEquals(14, s.getBuildings().size(), "populateStreet building count (numPairs * 2)")
    }

    // --- BuildingFactory: createBuilding scale roll ---

    @Test
    void building_scale_pinnedForSeed0x1234() {
        Building b = building()
        assertEquals("Impenetrable Unit", b.name, "precondition: building name")
        assertEquals(3, b.maxFloors, "createBuilding maxFloors (small category)")
        assertEquals(5, b.apartmentsPerFloor, "createBuilding apartmentsPerFloor (small category)")
        assertFalse(b.isLandmark, "createBuilding landmark flag")
        assertEquals("monolith", b.culture)
        assertEquals("analog", b.timeline)
    }

    // --- CorridorFactory: populateCorridor doors, traces, contextual inscriptions ---

    @Test
    void corridor_doorsAndInscriptions_pinnedForSeed0x1234() {
        Corridor c = corridor()
        List<Door> doors = c.getDoors()
        assertEquals(5, doors.size(), "one door per apartment")
        assertEquals(5, c.getApartments().size(), "one apartment per door")

        assertEquals(AnomalousTrace.HUMMING, doors[0].trace)
        assertNull(doors[0].inscription, "door[0] failed the 20% inscription roll")
        assertEquals("Heavy Bulkhead [COLD]", doors[0].getMinimalDescription())

        assertEquals(AnomalousTrace.CLICKING, doors[1].trace)
        assertNotNull(doors[1].inscription, "door[1] passed the 20% inscription roll")
        assertEquals("VOID_SINK", doors[1].inscription.text, "default pool word from generateContextualInscription")
        assertEquals(InscriptionStyle.SCRAWLED, doors[1].inscription.style)
        assertEquals("_void_sink_ Heavy Bulkhead [RUSTED]", doors[1].getMinimalDescription())

        assertEquals(AnomalousTrace.CLICKING, doors[2].trace)
        assertNull(doors[2].inscription)
        assertEquals("Industrial Barrier [PITTED]", doors[2].getMinimalDescription())
    }

    // --- ApartmentFactory: createApartment vibe match + ApartmentFactory.populate object pool ---

    @Test
    void apartment_vibeMatchAndObjectPool_pinnedForSeed0x1234() {
        Apartment a = apartment()
        assertEquals("monolith", a.culture, "99% path: culture picked from the vibe")
        assertEquals("analog", a.timeline, "99% path: timeline copied from the vibe")
        assertFalse(a.isAnomaly, "not on the 1% anomaly path at this seed")

        List<Room> rooms = a.getRooms()
        assertEquals(1, rooms.size(), "ApartmentFactory.populate room count")
        int pool = a.locus.nextInt(5, 19)  // pure: the same draw ApartmentFactory.populate makes
        assertEquals(15, pool, "object pool size drawn for this seed")
        int distributed = rooms.sum { Room r -> r.objects.size() } as int
        assertEquals(pool, distributed, "every pooled object lands in some room")
    }

    // --- RoomFactory: createRoom attributes, atmosphere, furniture, objects ---

    @Test
    void room_attributes_pinnedForSeed0x1234() {
        Room r = room()
        assertEquals("Grey Unit [0x55]", r.roomName)
        assertEquals("Fuel Depot", r.roomType, "RoomCategory.displayName")
        assertEquals("green", r.color)
        assertFalse(r.isAnomaly, "copied from the apartment")
        assertEquals("monolith", r.culture)
        assertEquals("analog", r.timeline)

        assertEquals("seamless dark alloy", r.walls)
        assertEquals("the warm cathode glow of a CRT monitor", r.lightingDesc)
        assertEquals("a spatial cell", r.structureDesc)

        assertEquals("15%", r.atmoTraits["OXYGEN"])
        assertEquals("17°C", r.atmoTraits["TEMP"])
        assertEquals("[CLEAR]", r.atmoTraits["SIGNAL"])
        assertEquals(3, r.atmoTraits.size())

        assertEquals(["floppy disk with hexagonal pillar"], r.furniture, "furniture from the FURNITURE branch Random")

        List<String> expectedObjects = [
            "cassette tape with neural interface",
            "floppy disk with geometric slab",
            "green power conduit infused with rotary phone",
            "green power conduit infused with beige keyboard",
            "geometric slab infused with magnetic strip",
            "floppy disk with black glass panel",
            "black glass panel infused with floppy disk",
            "hexagonal pillar infused with cassette tape",
            "cassette tape with geometric slab",
            "geometric slab infused with crt monitor",
            "beige keyboard with data probe",
            "dot matrix printer with black glass panel",
            "black glass panel infused with floppy disk",
            "magnetic strip with neural interface",
            "dot matrix printer with green power conduit",
        ]
        assertEquals(expectedObjects, r.objects, "object pool order from the OBJECT_POOL branch Random")
    }

    // --- FloorFactory: countSubLocations shadow count agrees with actual population ---

    @Test
    void floor_countSubLocations_agreesWithPopulation_pinnedForSeed0x1234() {
        Floor f = floor0()
        int shadow = FACTORY.countSubLocations(f)
        assertEquals(32, shadow, "countSubLocations literal for floor 0")

        Corridor c = f.getCorridor()
        List<Apartment> apts = c.getApartments()
        int actual = 1 + apts.size() + (apts.sum { Apartment a -> a.getRooms().size() } as int)
        assertEquals(actual, shadow, "shadow count must equal corridor + apartments + rooms after population")
    }
}
