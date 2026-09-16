package com.endlesstransit.procgen

import com.endlesstransit.model.*
import com.endlesstransit.ui.Terminal
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*

/**
 * Phase 9o: pins the registry facade contract.
 *
 * Every Container subclass in the model has exactly one LocationFactory registered under its
 * own class, and populate(Container) dispatches to it. Since HK-005, Container.populateChildren()
 * is the production caller of the dispatcher: every lazy population in the world goes through
 * this registry, so this test is what keeps it honest.
 */
class ProceduralFactoryRegistryTest {

    /** Every concrete Container in com.endlesstransit.model, grepped for `extends Container`. */
    static final List<Class<? extends Container>> CONTAINER_TYPES = [
        Universe, CosmicFilament, GalacticSector, NullSector, SolarSystem, Planet,
        Country, City, Street, Building, Floor, Corridor, Apartment
    ]

    /** A Container no factory knows about. */
    static class Orphan extends Container {
        String getDescription() { "orphan" }
        String getMapSymbol() { "?" }
        Map getOptions(com.endlesstransit.core.Game game) { [:] }
    }

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
    }

    @Test
    void everyContainerType_hasAFactoryRegisteredUnderItsExactClass() {
        CONTAINER_TYPES.each { Class<? extends Container> type ->
            LocationFactory<?> factory = ProceduralFactory.instance.factoryFor(type)
            assertNotNull(factory, "no LocationFactory registered for ${type.simpleName}")
            assertSame(type, factory.type, "${factory.class.simpleName}.getType() must be exactly ${type.simpleName}")
        }
        assertEquals(13, CONTAINER_TYPES.size(), "one entry per Container subclass in the model")
    }

    @Test
    void factoryFor_unregisteredType_returnsNull() {
        assertNull(ProceduralFactory.instance.factoryFor(Orphan))
    }

    @Test
    void populate_dispatchesOnExactClass_pinnedForSeed0x1234() {
        Universe u = ProceduralFactory.instance.createUniverse(new LocusSeed(0x1234L))
        Container sector = (Container) u.getFilaments()[0].getChildren()[0]
        SolarSystem sys = (SolarSystem) sector.getChildren()[0]
        Street street = sys.getPlanets()[0].getCountries()[0].getCities()[0].getStreets()[0]
        assertEquals("Busy Terrace", street.name, "precondition: same street ProcgenSnapshotTest pins")

        // Mirror Container.ensureChildrenPopulated: flag first, so the read below does not re-populate.
        street.childrenPopulated = true
        ProceduralFactory.instance.populate(street)

        assertEquals(14, street.getChildren().size(), "populate(Container) must run StreetFactory.populate exactly once (ProcgenDeepSnapshotTest pins 14)")
        assertTrue(street.getChildren().every { it instanceof Building })
    }

    @Test
    void lazyAccess_unregisteredType_failsLoudOnFirstAccess() {
        // HK-005: Container.populateChildren() dispatches through populate(Container).
        // Container.ensureChildrenPopulated sets the flag BEFORE populating, so only the first
        // access throws; a second access would return an empty list silently.
        IllegalStateException ex = assertThrows(IllegalStateException) {
            new Orphan().getChildren().size()
        }
        assertTrue(ex.message.contains("Orphan"), ex.message)
    }

    @Test
    void populate_unregisteredType_throws() {
        IllegalStateException ex = assertThrows(IllegalStateException) {
            ProceduralFactory.instance.populate(new Orphan())
        }
        assertTrue(ex.message.contains("Orphan"), ex.message)
    }
}
