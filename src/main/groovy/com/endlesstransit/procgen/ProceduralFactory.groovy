package com.endlesstransit.procgen
import com.endlesstransit.ui.Terminal

import com.endlesstransit.model.*

import groovy.transform.CompileStatic

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

    // --- Population Strategies ---

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
