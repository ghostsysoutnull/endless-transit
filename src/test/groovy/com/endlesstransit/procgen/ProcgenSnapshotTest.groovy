package com.endlesstransit.procgen

import com.endlesstransit.model.*
import com.endlesstransit.ui.Terminal
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.ValueSource
import static org.junit.jupiter.api.Assertions.*

/**
 * Phase 0.5h safety net: pins exact generated values for seed 0x1234 before Phases 2b and 9.
 *
 * DeterministicUniverseTest only proves two live runs match each other — both would be
 * equally wrong if generation order shifts. This test pins actual expected values so
 * that any change to procgen logic (name lexicons, seed branching, culture selection)
 * produces a hard failure rather than silent divergence.
 *
 * Run after any change to: NameGenerator, ThemeService, ProceduralFactory, or LocusSeed branching.
 * See: docs/analysis/OOA_REFACTOR_PLAN.md Phase 0.5h
 */
class ProcgenSnapshotTest {

    static final long SNAPSHOT_SEED = 0x1234L  // 4660

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
    }

    @Test
    void snapshot_planetNameAndCulture_pinnedForSeed0x1234() {
        LocusSeed locus = new LocusSeed(SNAPSHOT_SEED)
        Universe universe = ProceduralFactory.instance.createUniverse(locus)

        def filament = universe.getFilaments()[0]
        def sector = filament.getChildren()[0]
        def solarSystem = sector.getChildren()[0]
        Planet planet = solarSystem.getPlanets()[0]
        VibeCapsule vibe = (VibeCapsule) planet.getVibe()

        assertEquals("Mu-993-Sync", filament.name,
            "Filament name must match pinned value for seed 0x1234")
        assertEquals("Hydraia", planet.name,
            "Planet name must match pinned value for seed 0x1234")
        assertEquals("analog", vibe.timeline,
            "Planet vibe timeline must match pinned value for seed 0x1234")
        assertEquals("monolith", vibe.primaryCulture,
            "Planet primary culture must match pinned value for seed 0x1234")
        assertEquals("shogun", vibe.secondaryCulture,
            "Planet secondary culture must match pinned value for seed 0x1234")
    }

    @Test
    void snapshot_buildingNames_pinnedForSeed0x1234() {
        LocusSeed locus = new LocusSeed(SNAPSHOT_SEED)
        Universe universe = ProceduralFactory.instance.createUniverse(locus)

        def filament = universe.getFilaments()[0]
        Planet planet = filament.getChildren()[0].getChildren()[0].getPlanets()[0]
        planet.ensureChildrenPopulated()
        def city = planet.getChildren()[0]
        city.ensureChildrenPopulated()
        def country = city.getChildren()[0]
        country.ensureChildrenPopulated()
        Street street = (Street) country.getChildren().find { it instanceof Street }
                     ?: (Street) country.getChildren()[0]
        street.ensureChildrenPopulated()

        assertEquals("Free Dust Kingdom", city.name,
            "City name must match pinned value for seed 0x1234")
        assertEquals("Starford", country.name,
            "Country name must match pinned value for seed 0x1234")
        assertEquals("Busy Terrace", street.name,
            "Street name must match pinned value for seed 0x1234")

        List<Building> buildings = street.children.findAll { it instanceof Building } as List<Building>
        assertTrue(buildings.size() >= 3,
            "Street must have at least 3 buildings for snapshot assertion, found: ${buildings.size()}")

        assertEquals("Impenetrable Unit", buildings[0].name,
            "Building[0] name must match pinned value for seed 0x1234")
        assertEquals("ObeliskWell", buildings[1].name,
            "Building[1] name must match pinned value for seed 0x1234")
        assertEquals("ObeliskWell", buildings[2].name,
            "Building[2] name must match pinned value for seed 0x1234")
    }

    /**
     * Phase 3a contract: generateRoomName() must return a 'category' key typed as RoomCategory,
     * never the old 'type' String key. Guards against Phase 9 factory code silently falling back
     * to the removed key and receiving null at runtime.
     *
     * Each trait runs as a separate parameterized test so failures name the exact trait that broke.
     * All 6 cultures are covered within each invocation.
     */
    @ParameterizedTest(name = "trait={0}")
    @ValueSource(strings = ["Military", "Research", "Industrial", "Ceremonial", "Commercial", "Agricultural", "Standard"])
    void generateRoomName_returnsCategoryKey_notTypeKey(String trait) {
        LocusSeed locus = new LocusSeed(SNAPSHOT_SEED)
        ["rust", "neon", "baroque", "monolith", "void", "organic"].each { String culture ->
            Map<String, Object> result = NameGenerator.generateRoomName(culture, trait, locus.branch("${trait}_${culture}"))

            assertNull(result["type"],
                "generateRoomName must not return 'type' key — it was removed in Phase 3a (culture=${culture})")
            assertNotNull(result["category"],
                "generateRoomName must return 'category' key (culture=${culture})")
            assertTrue(result["category"] instanceof RoomCategory,
                "'category' must be a RoomCategory, got: ${result['category']?.class?.simpleName} (culture=${culture})")

            RoomCategory category = (RoomCategory) result["category"]
            assertNotNull(category.displayName,
                "RoomCategory.displayName must not be null (culture=${culture})")
            assertNotNull(category.trace,
                "RoomCategory.trace must not be null (culture=${culture})")
        }
    }
}
