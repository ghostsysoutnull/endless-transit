package com.endlesstransit.procgen
import com.endlesstransit.ui.Terminal

import com.endlesstransit.model.*

import groovy.transform.CompileStatic

@CompileStatic
class ProceduralFactory {
    static ProceduralFactory instance = new ProceduralFactory()
    ThemeService themeService = new ThemeService()
    
    Universe createUniverse(LocusSeed locus) {
        Universe u = new Universe()
        u.setLocus(locus)
        return u
    }

    CosmicFilament createFilament(Container parent, LocusSeed locus) {
        CosmicFilament f = new CosmicFilament(NameGenerator.generateFilamentName(locus.value), locus)
        f.setParent(parent)
        return f
    }

    GalacticSector createSector(Container parent, LocusSeed locus) {
        GalacticSector s = new GalacticSector(NameGenerator.generateSectorName(locus.value), locus)
        s.setParent(parent)
        return s
    }

    NullSector createNullSector(Container parent, LocusSeed locus) {
        String nullName = "Null Reach ${Integer.toHexString(locus.nextInt(0xFFF)).toUpperCase()}"
        NullSector s = new NullSector(nullName, locus)
        s.setParent(parent)
        return s
    }

    SolarSystem createSolarSystem(Container parent, LocusSeed locus) {
        SolarSystem s = new SolarSystem(NameGenerator.generateSolarSystemName(locus.value), locus)
        s.setParent(parent)
        return s
    }

    Planet createPlanet(Container parent, LocusSeed locus) {
        Planet p = new Planet(NameGenerator.generatePlanetName(locus.value), locus)
        p.setParent(parent)
        
        // 1. Initialize Planetary Vibe Deterministically
        String timeline = themeService.getRandomTimeline(locus.branch("TIMELINE").value)
        String primary = themeService.getRandomCulture(locus.branch("CULTURE_P").value)
        String secondary = themeService.getRandomCulture(locus.branch("CULTURE_S").value)
        
        int attempts = 0
        while (secondary == primary && attempts < 10) {
            secondary = themeService.getRandomCulture(locus.branch("CULTURE_S_ALT" + attempts).value)
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
        
        return p
    }

    Country createCountry(Container parent, LocusSeed locus) {
        Country c = new Country(NameGenerator.generateCountryName(locus.value), locus)
        c.setParent(parent)
        
        List<String> traits = ["Ceremonial", "Military", "Industrial", "Agricultural", "Research", "Commercial"]
        c.functionalTrait = locus.pickFrom(traits)
        
        return c
    }

    City createCity(Container parent, LocusSeed locus) {
        City c = new City(NameGenerator.generateCityName(locus.value), locus)
        c.setParent(parent)
        return c
    }

    Street createStreet(Container parent, LocusSeed locus) {
        Street s = new Street(NameGenerator.generateStreetName(locus.value), locus)
        s.setParent(parent)
        return s
    }

    Building createBuilding(Container parent, String culture, String timeline, LocusSeed locus, int depth, boolean isNull, boolean isAbyssal) {
        Building b = new Building(locus)
        b.culture = culture
        b.timeline = timeline
        b.setParent(parent)
        
        Random r = locus.nextRandom()
        
        // 1. Determine Scale
        int sizeRoll = r.nextInt(100)
        String sizeCat = "small"
        if (sizeRoll > 90) sizeCat = "massive"
        else if (sizeRoll > 70) sizeCat = "large"
        else if (sizeRoll > 40) sizeCat = "medium"
        
        // 2. Set Constraints
        switch (sizeCat) {
            case "massive":
                b.maxFloors = r.nextInt(50) + 50 // 50 to 100
                b.apartmentsPerFloor = r.nextInt(10) + 10 // 10 to 20
                break
            case "large":
                b.maxFloors = r.nextInt(20) + 30 // 30 to 50
                b.apartmentsPerFloor = r.nextInt(8) + 8 // 8 to 16
                break
            case "medium":
                b.maxFloors = r.nextInt(15) + 10 // 10 to 25
                b.apartmentsPerFloor = r.nextInt(6) + 4 // 4 to 10
                break
            default:
                b.maxFloors = r.nextInt(7) + 3 // 3 to 10
                b.apartmentsPerFloor = r.nextInt(4) + 2 // 2 to 6
        }

        // 3. Generate Name
        Map<String, Object> nameData = NameGenerator.generateBuildingName(culture, b.maxFloors, locus.value, depth, isNull, isAbyssal)
        b.name = (String) nameData["name"]
        b.isLandmark = (boolean) nameData["isLandmark"]

        return b
    }

    Floor createFloor(Container parent, int number, int apartmentsPerFloor, String culture, String timeline, LocusSeed locus) {
        Floor f = new Floor(number, apartmentsPerFloor, culture, timeline, locus)
        f.setParent(parent)
        return f
    }

    Corridor createCorridor(Container parent, int numApartments, String culture, String timeline, LocusSeed locus) {
        Corridor c = new Corridor(numApartments, culture, timeline, locus)
        c.setParent(parent)
        return c
    }

    Apartment createApartment(Container parent, String doorDesc, String culture, String timeline, LocusSeed locus) {
        Apartment a = new Apartment(doorDesc, culture, timeline, locus)
        a.setParent(parent)
        
        Random r = locus.nextRandom()
        VibeCapsule vibe = a.getVibe()
        if (vibe != null && r.nextDouble() > 0.01) { // 99% chance to match vibe
            a.timeline = vibe.timeline
            a.culture = vibe.pickCulture(locus.branch("CULTURE_SELECTOR").value)
        } else if (vibe != null) {
            a.isAnomaly = true
        }
        
        return a
    }

    Room createRoom(Container parent, String culture, String timeline, LocusSeed locus) {
        Room r = new Room()
        r.culture = culture
        r.timeline = timeline
        r.setLocus(locus)
        r.setParent(parent)
        
        Random rand = locus.nextRandom()
        
        // 1. Initial Attributes
        String[] colors = ["white", "blue", "pink", "gray", "purple", "orange", "green", "red"]
        r.color = colors[rand.nextInt(colors.length)]
        
        // 2. Anomaly Logic
        if (parent instanceof Apartment) {
            r.isAnomaly = ((Apartment)parent).isAnomaly
        }

        // 3. Functional Naming
        Country country = (Country) r.findAncestor(Country.class)
        String trait = country != null ? country.functionalTrait : "Standard"
        Map<String, String> nameData = NameGenerator.generateRoomName(culture, trait, locus.value)
        r.roomName = nameData["name"]
        r.roomType = nameData["type"]

        // 4. Atmosphere
        VibeCapsule vibe = r.getVibe()
        String mutation = vibe != null ? vibe.latticeMutation : "Standard"
        Map<String, String> atmos = themeService.generateAtmosphere(culture, timeline, mutation, r.isAnomaly, locus.value)
        r.walls = atmos["walls"]
        r.lightingDesc = atmos["lighting"]
        r.structureDesc = atmos["structure"]

        // 5. Atmo-Traits
        r.atmoTraits["OXYGEN"] = "${rand.nextInt(10) + 12}%".toString()
        r.atmoTraits["TEMP"] = "${rand.nextInt(20) + 5}°C".toString()
        r.atmoTraits["SIGNAL"] = rand.nextBoolean() ? "[SHIELDED]" : "[CLEAR]"
        
        // 6. Furniture
        int numFurniture = rand.nextInt(3) + 1
        for (int i = 0; i < numFurniture; i++) {
            r.furniture << themeService.generateHybridObject(culture, timeline, locus.branch("FURN_" + i).value)
        }

        return r
    }

    // --- Population Strategies ---

    void populateUniverse(Universe u) {
        Random r = u.locus.nextRandom()
        int numFilaments = r.nextInt(5) + 3
        for (int i = 0; i < numFilaments; i++) {
            u.addLocation(createFilament(u, u.locus.branch(i)))
        }
    }

    void populateFilament(CosmicFilament f) {
        Random r = f.locus.nextRandom()
        int numNodes = r.nextInt(5) + 4
        for (int i = 0; i < numNodes; i++) {
            LocusSeed childLocus = f.locus.branch(i)
            if (r.nextInt(10) < 3) {
                f.addLocation(createNullSector(f, childLocus))
            } else {
                f.addLocation(createSector(f, childLocus))
            }
        }
    }

    void populateSector(GalacticSector s) {
        Random r = s.locus.nextRandom()
        int numSystems = r.nextInt(5) + 3
        for (int i = 0; i < numSystems; i++) {
            s.addLocation(createSolarSystem(s, s.locus.branch(i)))
        }
    }

    void populateNullSector(NullSector s) {
        Random r = s.locus.nextRandom()
        int numSystems = r.nextInt(2) + 1
        for (int i = 0; i < numSystems; i++) {
            LocusSeed childLocus = s.locus.branch(i)
            s.addLocation(new SolarSystem("Lost " + NameGenerator.generateSolarSystemName(childLocus.value), childLocus))
        }
    }

    void populateSolarSystem(SolarSystem s) {
        Random r = s.locus.nextRandom()
        int numPlanets = r.nextInt(9) + 2
        for (int i = 0; i < numPlanets; i++) {
            s.addLocation(createPlanet(s, s.locus.branch(i)))
        }
    }

    void populatePlanet(Planet p) {
        Random r = p.locus.nextRandom()
        int numCountries = r.nextInt(7) + 2
        for (int i = 0; i < numCountries; i++) {
            p.addLocation(createCountry(p, p.locus.branch(i)))
        }
    }

    void populateCountry(Country c) {
        Random r = c.locus.nextRandom()
        
        // Ensure we have a local mutated vibe for this country based on the planet
        if (c.localVibe == null) {
            VibeCapsule parentVibe = c.getVibe()
            if (parentVibe != null) {
                c.localVibe = parentVibe.mutate(c.functionalTrait, r.nextDouble() * 0.2 - 0.1)
            }
        }

        int numCities = r.nextInt(9) + 2
        for (int i = 0; i < numCities; i++) {
            c.addLocation(createCity(c, c.locus.branch(i)))
        }
    }

    void populateCity(City c) {
        Random r = c.locus.nextRandom()
        
        if (c.localVibe == null) {
            VibeCapsule parentVibe = c.getVibe()
            if (parentVibe != null) {
                // 10% chance to be a "rebel" district and flip resonances
                if (r.nextDouble() < 0.1) {
                    c.isRebelDistrict = true
                    c.localVibe = new VibeCapsule(parentVibe.timeline, parentVibe.secondaryCulture, parentVibe.primaryCulture)
                    c.localVibe.latticeMutation = parentVibe.latticeMutation
                    c.localVibe.stabilityFactor = parentVibe.stabilityFactor
                    c.localVibe.atmosphericColor = parentVibe.atmosphericColor
                }
            }
        }

        int numStreets = r.nextInt(13) + 3
        for (int i = 0; i < numStreets; i++) {
            c.addLocation(createStreet(c, c.locus.branch(i)))
        }
    }

    void populateStreet(Street s) {
        Random r = s.locus.nextRandom()
        int numPairs = r.nextInt(9) + 2
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

    Apartment populateApartment(Apartment a) {
        Random r = a.locus.nextRandom()
        int numRooms = r.nextInt(10) + 1
        
        List<String> objectPool = []
        int totalObjects = r.nextInt(15) + 5
        for (int i = 0; i < totalObjects; i++) {
            objectPool << themeService.generateHybridObject(a.culture, a.timeline, a.locus.branch("OBJ_" + i).value)
        }

        for (int i = 0; i < numRooms; i++) {
            Room room = createRoom(a, a.culture, a.timeline, a.locus.branch(i))
            a.rooms << room
            a.addLocation(room)
        }

        while (!objectPool.isEmpty()) {
            int roomIdx = r.nextInt(a.rooms.size())
            a.rooms[roomIdx].objects << (String) objectPool.remove(0)
        }
        return a
    }

    void populateCorridor(Corridor c) {
        LocusSeed locus = c.locus
        for (int i = 0; i < c.numApartments; i++) {
            LocusSeed childLocus = locus.branch(i)
            Door door = new Door(childLocus.value)
            c.doors << door
            Apartment apartment = createApartment(c, door.getDescription(), c.culture, c.timeline, childLocus)
            c.apartments << apartment
            c.addLocation(apartment)
        }
    }

    void populateFloor(Floor f) {
        f.corridor = createCorridor(f, f.apartmentsPerFloor, f.culture, f.timeline, f.locus.branch("CORRIDOR"))
        f.addLocation(f.corridor)
    }
}
