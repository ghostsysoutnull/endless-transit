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
        Planet p = new Planet(NameGenerator.generatePlanetName(locus), locus)
        p.setParent(parent)
        
        // 1. Initialize Planetary Vibe Deterministically
        String timeline = themeService.getRandomTimeline(locus.branch("TIMELINE"))
        String primary = themeService.getRandomCulture(locus.branch("CULTURE_P"))
        String secondary = themeService.getRandomCulture(locus.branch("CULTURE_S"))
        
        int attempts = 0
        while (secondary == primary && attempts < 10) {
            secondary = themeService.getRandomCulture(locus.branch("CULTURE_S_ALT" + attempts))
            attempts++
        }
        
        p.localVibe = new VibeCapsule(timeline, primary, secondary)
        
        // 2. Map color
        Map<String, String> colorMap = [
            "baroque": com.endlesstransit.ui.Terminal.YELLOW,
            "gilded": com.endlesstransit.ui.Terminal.WHITE,
            "monolith": com.endlesstransit.ui.Terminal.CYAN,
            "neon": com.endlesstransit.ui.Terminal.L_CYAN,
            "organic": com.endlesstransit.ui.Terminal.GREEN,
            "rust": com.endlesstransit.ui.Terminal.RED,
            "shogun": com.endlesstransit.ui.Terminal.MAGENTA,
            "void": com.endlesstransit.ui.Terminal.GREY,
            "zenith": com.endlesstransit.ui.Terminal.BLUE
        ]
        p.localVibe.atmosphericColor = colorMap[primary] ?: com.endlesstransit.ui.Terminal.WHITE
        p.fmt = fmt
        return p
    }

    Country createCountry(Container parent, LocusSeed locus) {
        Country c = new Country(NameGenerator.generateCountryName(locus), locus)
        c.setParent(parent)
        
        List<String> traits = ["Ceremonial", "Military", "Industrial", "Agricultural", "Research", "Commercial"]
        c.functionalTrait = (String) locus.pickFrom(traits)
        c.fmt = fmt
        return c
    }

    City createCity(Container parent, LocusSeed locus) {
        City c = new City(NameGenerator.generateCityName(locus), locus)
        c.setParent(parent)
        c.fmt = fmt
        return c
    }

    Street createStreet(Container parent, LocusSeed locus) {
        Street s = new Street(NameGenerator.generateStreetName(locus), locus)
        s.setParent(parent)
        s.fmt = fmt
        return s
    }

    Building createBuilding(Container parent, String culture, String timeline, LocusSeed locus, int depth, boolean isNull, boolean isAbyssal) {
        Building b = new Building(locus)
        b.culture = culture
        b.timeline = timeline
        b.setParent(parent)
        
        // 1. Determine Scale
        int sizeRoll = locus.nextInt(100)
        String sizeCat = "small"
        if (sizeRoll > 90) sizeCat = "massive"
        else if (sizeRoll > 70) sizeCat = "large"
        else if (sizeRoll > 40) sizeCat = "medium"
        
        // 2. Set Constraints
        switch (sizeCat) {
            case "massive":
                b.maxFloors = locus.nextInt(50, 100)
                b.apartmentsPerFloor = locus.nextInt(10, 20)
                break
            case "large":
                b.maxFloors = locus.nextInt(30, 50)
                b.apartmentsPerFloor = locus.nextInt(8, 16)
                break
            case "medium":
                b.maxFloors = locus.nextInt(10, 25)
                b.apartmentsPerFloor = locus.nextInt(4, 10)
                break
            default:
                b.maxFloors = locus.nextInt(3, 10)
                b.apartmentsPerFloor = locus.nextInt(2, 6)
        }

        // 3. Generate Name
        Map<String, Object> nameData = NameGenerator.generateBuildingName(culture, b.maxFloors, locus, depth, isNull, isAbyssal)
        b.name = (String) nameData["name"]
        b.isLandmark = (boolean) nameData["isLandmark"]
        b.fmt = fmt
        return b
    }

    Floor createFloor(Container parent, int number, int apartmentsPerFloor, String culture, String timeline, LocusSeed locus) {
        Floor f = new Floor(number, apartmentsPerFloor, culture, timeline, locus)
        f.setParent(parent)
        f.fmt = fmt
        return f
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
        int numCountries = p.locus.nextInt(2, 8)
        for (int i = 0; i < numCountries; i++) {
            p.addLocation(createCountry(p, p.locus.branch(i)))
        }
    }

    void populateCountry(Country c) {
        // Ensure we have a local mutated vibe for this country based on the planet
        if (c.localVibe == null) {
            VibeCapsule parentVibe = c.getVibe()
            if (parentVibe != null) {
                c.localVibe = parentVibe.mutate(c.functionalTrait, c.locus.nextDouble() * 0.2 - 0.1)
            }
        }

        int numCities = c.locus.nextInt(2, 10)
        for (int i = 0; i < numCities; i++) {
            c.addLocation(createCity(c, c.locus.branch(i)))
        }
    }

    void populateCity(City c) {
        if (c.localVibe == null) {
            VibeCapsule parentVibe = c.getVibe()
            if (parentVibe != null) {
                // 10% chance to be a "rebel" district and flip resonances
                if (c.locus.checkProbability(0.1)) {
                    c.isRebelDistrict = true
                    c.localVibe = new VibeCapsule(parentVibe.timeline, parentVibe.secondaryCulture, parentVibe.primaryCulture)
                    c.localVibe.latticeMutation = parentVibe.latticeMutation
                    c.localVibe.stabilityFactor = parentVibe.stabilityFactor
                    c.localVibe.atmosphericColor = parentVibe.atmosphericColor
                }
            }
        }

        int numStreets = c.locus.nextInt(3, 15)
        for (int i = 0; i < numStreets; i++) {
            c.addLocation(createStreet(c, c.locus.branch(i)))
        }
    }

    void populateStreet(Street s) {
        int numPairs = s.locus.nextInt(2, 10)
        VibeCapsule v = s.getVibe()
        String culture = v != null ? v.primaryCulture : "monolith"
        String timeline = v != null ? v.timeline : "ancient"
        int depth = s.getDepth()
        boolean isNull = s.findAncestor(NullSector.class) != null
        boolean isAbyssal = s.isAbyssal()
        for (int i = 0; i < numPairs * 2; i++) {
            s.addLocation(createBuilding(s, culture, timeline, s.locus.branch(i), depth, isNull, isAbyssal))
        }
    }

    void populateBuilding(Building b) {
        for (int i = 0; i < b.maxFloors; i++) {
            b.addLocation(createFloor(b, i, b.apartmentsPerFloor, b.culture, b.timeline, b.locus.branch(i)))
        }
    }

    Apartment populateApartment(Apartment a) {
        apartmentFactory.populate(a)
        return a
    }

    void populateCorridor(Corridor c) {
        corridorFactory.populate(c)
    }

    void populateFloor(Floor f) {
        f.corridor = createCorridor(f, f.apartmentsPerFloor, f.culture, f.timeline, f.locus.branch("CORRIDOR"))
        f.addLocation(f.corridor)
    }

    /**
     * Deterministically counts the total number of sub-locations (Corridor, Apartments, Rooms)
     * for a given floor without instantiating the full object tree.
     */
    int countSubLocations(Floor f) {
        int total = 1 // The Corridor itself
        int numApartments = f.apartmentsPerFloor
        total += numApartments
        
        LocusSeed corridorLocus = f.locus.branch("CORRIDOR")
        for (int i = 0; i < numApartments; i++) {
            LocusSeed aptLocus = corridorLocus.branch(i)
            int numRooms = aptLocus.nextInt(1, 10)
            total += numRooms
        }
        return total
    }
}
