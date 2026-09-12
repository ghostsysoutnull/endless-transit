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
    
    Universe createUniverse(LocusSeed locus) {
        Universe u = new Universe()
        u.setLocus(locus)
        u.fmt = fmt
        return u
    }

    CosmicFilament createFilament(Container parent, LocusSeed locus) {
        CosmicFilament f = new CosmicFilament(NameGenerator.generateFilamentName(locus), locus)
        f.setParent(parent)
        f.fmt = fmt
        return f
    }

    GalacticSector createSector(Container parent, LocusSeed locus) {
        GalacticSector s = new GalacticSector(NameGenerator.generateSectorName(locus), locus)
        s.setParent(parent)
        s.fmt = fmt
        return s
    }

    NullSector createNullSector(Container parent, LocusSeed locus) {
        String nullName = "Null Reach ${Integer.toHexString(locus.nextInt(0xFFF)).toUpperCase()}"
        NullSector s = new NullSector(nullName, locus)
        s.setParent(parent)
        s.fmt = fmt
        return s
    }

    SolarSystem createSolarSystem(Container parent, LocusSeed locus) {
        SolarSystem s = new SolarSystem(NameGenerator.generateSolarSystemName(locus), locus)
        s.setParent(parent)
        s.fmt = fmt
        return s
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
        int numFilaments = u.locus.nextInt(3, 7)
        for (int i = 0; i < numFilaments; i++) {
            u.addLocation(createFilament(u, u.locus.branch(i)))
        }
    }

    void populateFilament(CosmicFilament f) {
        int numNodes = f.locus.nextInt(4, 8)
        for (int i = 0; i < numNodes; i++) {
            LocusSeed childLocus = f.locus.branch(i)
            if (f.locus.nextInt(100) < 30) {
                f.addLocation(createNullSector(f, childLocus))
            } else {
                f.addLocation(createSector(f, childLocus))
            }
        }
    }

    void populateSector(GalacticSector s) {
        int numSystems = s.locus.nextInt(3, 7)
        for (int i = 0; i < numSystems; i++) {
            s.addLocation(createSolarSystem(s, s.locus.branch(i)))
        }
    }

    void populateNullSector(NullSector s) {
        int numSystems = s.locus.nextInt(1, 2)
        for (int i = 0; i < numSystems; i++) {
            LocusSeed childLocus = s.locus.branch(i)
            s.addLocation(createSolarSystem(s, childLocus))
        }
    }

    void populateSolarSystem(SolarSystem s) {
        int numPlanets = s.locus.nextInt(2, 10)
        for (int i = 0; i < numPlanets; i++) {
            s.addLocation(createPlanet(s, s.locus.branch(i)))
        }
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
