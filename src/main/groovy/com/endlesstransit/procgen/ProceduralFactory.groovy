package com.endlesstransit.procgen

import com.endlesstransit.model.*

import groovy.transform.CompileStatic

/**
 * Registry facade over the per-type location factories (Phase 9).
 *
 * Every public {@code create*} method delegates to the factory that owns that type; the
 * signatures are the pre-split ones, so factories, core services and tests call this facade
 * unchanged. Population is registry dispatch: {@code Container.populateChildren()} calls
 * {@link #populate(Container)}, which selects the factory registered under the exact model
 * class ({@link LocationFactory#getType()}). The per-type {@code populate*} delegators were
 * removed in HK-005 and HK-009; {@code populate(Container)} is the only population entry point.
 *
 * Shared services live here: the single {@link ThemeService} and the {@code fmt} formatter,
 * given to the constructor. Factories read both through their back-reference at call time.
 * The facade stamps its identity on every {@link Container} it hands out ({@code factory}), so
 * lazy population dispatches back to the registry that created the location (HK-008).
 */
@CompileStatic
class ProceduralFactory {
    /** HK-008 scaffolding: removed once every reader holds its own instance. */
    static ProceduralFactory instance = new ProceduralFactory(null)
    ThemeService themeService = new ThemeService()
    OutputFormatter fmt
    final RoomFactory roomFactory = new RoomFactory(this)
    final ApartmentFactory apartmentFactory = new ApartmentFactory(this)
    final CorridorFactory corridorFactory = new CorridorFactory(this)
    final FloorFactory floorFactory = new FloorFactory(this)
    final BuildingFactory buildingFactory = new BuildingFactory(this)
    final StreetFactory streetFactory = new StreetFactory(this)
    final CityFactory cityFactory = new CityFactory(this)
    final CountryFactory countryFactory = new CountryFactory(this)
    final PlanetFactory planetFactory = new PlanetFactory(this)
    final SolarSystemFactory solarSystemFactory = new SolarSystemFactory(this)
    final SectorFactory sectorFactory = new SectorFactory(this)
    final NullSectorFactory nullSectorFactory = new NullSectorFactory(this)
    final FilamentFactory filamentFactory = new FilamentFactory(this)
    final UniverseFactory universeFactory = new UniverseFactory(this)

    private final Map<Class<? extends Container>, LocationFactory<? extends Container>> registry

    ProceduralFactory(OutputFormatter fmt) {
        this.fmt = fmt
        Map<Class<? extends Container>, LocationFactory<? extends Container>> map = [:]
        register(map, universeFactory)
        register(map, filamentFactory)
        register(map, sectorFactory)
        register(map, nullSectorFactory)
        register(map, solarSystemFactory)
        register(map, planetFactory)
        register(map, countryFactory)
        register(map, cityFactory)
        register(map, streetFactory)
        register(map, buildingFactory)
        register(map, floorFactory)
        register(map, corridorFactory)
        register(map, apartmentFactory)
        registry = Collections.unmodifiableMap(map)
    }

    private static void register(Map<Class<? extends Container>, LocationFactory<? extends Container>> map,
                                 LocationFactory<? extends Container> factory) {
        map.put(factory.type, factory)
    }

    /** Every container leaves through here: it remembers the registry that made it. */
    private <T extends Container> T wire(T location) {
        location.factory = this
        return location
    }

    /** The factory registered for exactly {@code type}, or null when none is. */
    public <T extends Container> LocationFactory<T> factoryFor(Class<T> type) {
        return (LocationFactory<T>) registry.get(type)
    }

    /** Dispatches population on the exact model class of {@code location}. */
    void populate(Container location) {
        LocationFactory<Container> f = (LocationFactory<Container>) registry.get(location.getClass())
        if (f == null) {
            throw new IllegalStateException("No LocationFactory registered for ${location.getClass().simpleName}")
        }
        f.populate(location)
    }

    // --- Creation delegators (signatures unchanged since before the split) ---

    Universe createUniverse(LocusSeed locus) {
        return wire(universeFactory.create(locus))
    }

    CosmicFilament createFilament(Container parent, LocusSeed locus) {
        return wire(filamentFactory.create(parent, locus))
    }

    GalacticSector createSector(Container parent, LocusSeed locus) {
        return wire(sectorFactory.create(parent, locus))
    }

    NullSector createNullSector(Container parent, LocusSeed locus) {
        return wire(nullSectorFactory.create(parent, locus))
    }

    SolarSystem createSolarSystem(Container parent, LocusSeed locus) {
        return wire(solarSystemFactory.create(parent, locus))
    }

    Planet createPlanet(Container parent, LocusSeed locus) {
        return wire(planetFactory.create(parent, locus))
    }

    Country createCountry(Container parent, LocusSeed locus) {
        return wire(countryFactory.create(parent, locus))
    }

    City createCity(Container parent, LocusSeed locus) {
        return wire(cityFactory.create(parent, locus))
    }

    Street createStreet(Container parent, LocusSeed locus) {
        return wire(streetFactory.create(parent, locus))
    }

    Building createBuilding(Container parent, String culture, String timeline, LocusSeed locus, int depth, boolean isNull, boolean isAbyssal) {
        return wire(buildingFactory.create(parent, culture, timeline, locus, depth, isNull, isAbyssal))
    }

    Floor createFloor(Container parent, int number, int apartmentsPerFloor, String culture, String timeline, LocusSeed locus) {
        return wire(floorFactory.create(parent, number, apartmentsPerFloor, culture, timeline, locus))
    }

    Corridor createCorridor(Container parent, int numApartments, String culture, String timeline, LocusSeed locus) {
        return wire(corridorFactory.create(parent, numApartments, culture, timeline, locus))
    }

    Apartment createApartment(Container parent, String doorDesc, String culture, String timeline, LocusSeed locus) {
        return wire(apartmentFactory.create(parent, doorDesc, culture, timeline, locus))
    }

    Room createRoom(Container parent, String culture, String timeline, LocusSeed locus) {
        return roomFactory.create(parent, culture, timeline, locus)
    }

    // --- Population ---
    // populate(Container) above is the one population path (HK-005: Container.populateChildren()).

    /**
     * Deterministically counts the total number of sub-locations (Corridor, Apartments, Rooms)
     * for a given floor without instantiating the full object tree.
     */
    int countSubLocations(Floor f) {
        return floorFactory.countSubLocations(f)
    }
}
