package com.endlesstransit.procgen

import com.endlesstransit.model.*

import groovy.transform.CompileStatic

/**
 * Registry facade over the per-type location factories (Phase 9).
 *
 * Every public {@code create*} / {@code populate*} method delegates to the factory that owns
 * that type. The signatures are the pre-split ones, so model classes, core services and tests
 * call this facade unchanged. {@link #populate(Container)} dispatches on the exact model class
 * through a registry keyed by each factory's {@link LocationFactory#getType()}.
 *
 * Shared services live here: the single {@link ThemeService} and the {@code fmt} formatter,
 * which {@code Game} injects after construction. Factories read both through their
 * back-reference at call time, never at construction.
 */
@CompileStatic
class ProceduralFactory {
    static ProceduralFactory instance = new ProceduralFactory()
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

    ProceduralFactory() {
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
        return universeFactory.create(locus)
    }

    CosmicFilament createFilament(Container parent, LocusSeed locus) {
        return filamentFactory.create(parent, locus)
    }

    GalacticSector createSector(Container parent, LocusSeed locus) {
        return sectorFactory.create(parent, locus)
    }

    NullSector createNullSector(Container parent, LocusSeed locus) {
        return nullSectorFactory.create(parent, locus)
    }

    SolarSystem createSolarSystem(Container parent, LocusSeed locus) {
        return solarSystemFactory.create(parent, locus)
    }

    Planet createPlanet(Container parent, LocusSeed locus) {
        return planetFactory.create(parent, locus)
    }

    Country createCountry(Container parent, LocusSeed locus) {
        return countryFactory.create(parent, locus)
    }

    City createCity(Container parent, LocusSeed locus) {
        return cityFactory.create(parent, locus)
    }

    Street createStreet(Container parent, LocusSeed locus) {
        return streetFactory.create(parent, locus)
    }

    Building createBuilding(Container parent, String culture, String timeline, LocusSeed locus, int depth, boolean isNull, boolean isAbyssal) {
        return buildingFactory.create(parent, culture, timeline, locus, depth, isNull, isAbyssal)
    }

    Floor createFloor(Container parent, int number, int apartmentsPerFloor, String culture, String timeline, LocusSeed locus) {
        return floorFactory.create(parent, number, apartmentsPerFloor, culture, timeline, locus)
    }

    Corridor createCorridor(Container parent, int numApartments, String culture, String timeline, LocusSeed locus) {
        return corridorFactory.create(parent, numApartments, culture, timeline, locus)
    }

    Apartment createApartment(Container parent, String doorDesc, String culture, String timeline, LocusSeed locus) {
        return apartmentFactory.create(parent, doorDesc, culture, timeline, locus)
    }

    Room createRoom(Container parent, String culture, String timeline, LocusSeed locus) {
        return roomFactory.create(parent, culture, timeline, locus)
    }

    // --- Population delegators ---

    void populateUniverse(Universe u) {
        universeFactory.populate(u)
    }

    void populateFilament(CosmicFilament f) {
        filamentFactory.populate(f)
    }

    void populateSector(GalacticSector s) {
        sectorFactory.populate(s)
    }

    void populateNullSector(NullSector s) {
        nullSectorFactory.populate(s)
    }

    void populateSolarSystem(SolarSystem s) {
        solarSystemFactory.populate(s)
    }

    void populatePlanet(Planet p) {
        planetFactory.populate(p)
    }

    void populateCountry(Country c) {
        countryFactory.populate(c)
    }

    void populateCity(City c) {
        cityFactory.populate(c)
    }

    void populateStreet(Street s) {
        streetFactory.populate(s)
    }

    void populateBuilding(Building b) {
        buildingFactory.populate(b)
    }

    Apartment populateApartment(Apartment a) {
        apartmentFactory.populate(a)
        return a
    }

    void populateCorridor(Corridor c) {
        corridorFactory.populate(c)
    }

    void populateFloor(Floor f) {
        floorFactory.populate(f)
    }

    /**
     * Deterministically counts the total number of sub-locations (Corridor, Apartments, Rooms)
     * for a given floor without instantiating the full object tree.
     */
    int countSubLocations(Floor f) {
        return floorFactory.countSubLocations(f)
    }
}
