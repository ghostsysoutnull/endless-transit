package com.endlesstransit.procgen

import com.endlesstransit.model.*
import com.endlesstransit.ui.ThemeManager
import groovy.transform.CompileStatic

@CompileStatic
class ProceduralFactory {
    
    static Universe createUniverse(long seed) {
        return new Universe(seed)
    }

    static CosmicFilament createFilament(Container parent, long seed) {
        CosmicFilament f = new CosmicFilament(NameGenerator.generateFilamentName(seed), seed)
        f.setParent(parent)
        return f
    }

    static GalacticSector createSector(Container parent, long seed) {
        GalacticSector s = new GalacticSector(NameGenerator.generateSectorName(seed), seed)
        s.setParent(parent)
        return s
    }

    static NullSector createNullSector(Container parent, long seed) {
        Random r = new Random(seed)
        String nullName = "Null Reach ${Integer.toHexString(r.nextInt(0xFFF)).toUpperCase()}"
        NullSector s = new NullSector(nullName, seed)
        s.setParent(parent)
        return s
    }

    static SolarSystem createSolarSystem(Container parent, long seed) {
        SolarSystem s = new SolarSystem(NameGenerator.generateSolarSystemName(seed), seed)
        s.setParent(parent)
        return s
    }

    static Planet createPlanet(Container parent, long seed) {
        Planet p = new Planet(NameGenerator.generatePlanetName(seed), seed)
        p.setParent(parent)
        
        // 1. Initialize Planetary Vibe Deterministically
        String timeline = ThemeManager.getRandomTimeline(seed != 0 ? seed : 0)
        String primary = ThemeManager.getRandomCulture(seed != 0 ? seed + 1 : 0)
        String secondary = ThemeManager.getRandomCulture(seed != 0 ? seed + 2 : 0)
        while (secondary == primary) {
            secondary = ThemeManager.getRandomCulture(seed != 0 ? seed + 3 : 0)
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

    static Country createCountry(Container parent, long seed) {
        Country c = new Country(NameGenerator.generateCountryName(seed), seed)
        c.setParent(parent)
        
        Random r = seed != 0 ? new Random(seed) : new Random()
        List<String> traits = ["Ceremonial", "Military", "Industrial", "Agricultural", "Research", "Commercial"]
        c.functionalTrait = traits[r.nextInt(traits.size())]
        
        return c
    }

    static City createCity(Container parent, long seed) {
        City c = new City(NameGenerator.generateCityName(seed), seed)
        c.setParent(parent)
        return c
    }

    static Street createStreet(Container parent, long seed) {
        Street s = new Street(NameGenerator.generateStreetName(seed), seed)
        s.setParent(parent)
        return s
    }

    static Building createBuilding(Container parent, String culture, String timeline, long seed, int depth, boolean isNull, boolean isAbyssal) {
        Building b = new Building()
        b.culture = culture
        b.timeline = timeline
        b.seed = seed
        b.setParent(parent)
        
        Random scrambler = seed != 0 ? new Random(seed) : new Random()
        
        // 1. Determine Scale
        int sizeRoll = scrambler.nextInt(100)
        String sizeCat = "small"
        if (sizeRoll > 90) sizeCat = "massive"
        else if (sizeRoll > 70) sizeCat = "large"
        else if (sizeRoll > 40) sizeCat = "medium"
        
        // 2. Set Constraints
        switch (sizeCat) {
            case "massive":
                b.maxFloors = scrambler.nextInt(50) + 50 // 50 to 100
                b.apartmentsPerFloor = scrambler.nextInt(10) + 10 // 10 to 20
                break
            case "large":
                b.maxFloors = scrambler.nextInt(20) + 30 // 30 to 50
                b.apartmentsPerFloor = scrambler.nextInt(8) + 8 // 8 to 16
                break
            case "medium":
                b.maxFloors = scrambler.nextInt(15) + 10 // 10 to 25
                b.apartmentsPerFloor = scrambler.nextInt(6) + 4 // 4 to 10
                break
            default:
                b.maxFloors = scrambler.nextInt(7) + 3 // 3 to 10
                b.apartmentsPerFloor = scrambler.nextInt(4) + 2 // 2 to 6
        }

        // 3. Generate Name
        Map<String, Object> nameData = NameGenerator.generateBuildingName(culture, b.maxFloors, seed, depth, isNull, isAbyssal)
        b.name = (String) nameData["name"]
        b.isLandmark = (boolean) nameData["isLandmark"]

        return b
    }

    static Floor createFloor(Container parent, int number, int apartmentsPerFloor, String culture, String timeline, long seed) {
        Floor f = new Floor(number, apartmentsPerFloor, culture, timeline, seed)
        f.setParent(parent)
        return f
    }

    static Corridor createCorridor(Container parent, int numApartments, String culture, String timeline, long seed) {
        Corridor c = new Corridor(numApartments, culture, timeline, seed)
        c.setParent(parent)
        return c
    }

    static Apartment createApartment(Container parent, String doorDesc, String culture, String timeline, long seed) {
        Apartment a = new Apartment(doorDesc, culture, timeline, seed)
        a.setParent(parent)
        
        Random scrambler = seed != 0 ? new Random(seed) : new Random()
        VibeCapsule vibe = a.getVibe()
        if (vibe != null && scrambler.nextDouble() > 0.01) {
            a.timeline = vibe.timeline
            a.culture = vibe.pickCulture(scrambler.nextLong())
        } else if (vibe != null) {
            a.isAnomaly = true
        }
        
        return a
    }

    static Room createRoom(Container parent, String culture, String timeline, long seed) {
        Room r = new Room()
        r.culture = culture
        r.timeline = timeline
        r.seed = seed
        r.setParent(parent)
        
        Random random = seed != 0 ? new Random(seed) : new Random()
        
        // 1. Initial Attributes
        String[] colors = ["white", "blue", "pink", "gray", "purple", "orange", "green", "red"]
        r.color = colors[random.nextInt(colors.length)]
        
        // 2. Anomaly Logic
        if (parent instanceof Apartment) {
            r.isAnomaly = ((Apartment)parent).isAnomaly
        }

        // 3. Functional Naming
        Country country = (Country) r.findAncestor(Country.class)
        String trait = country != null ? country.functionalTrait : "Standard"
        Map<String, String> nameData = NameGenerator.generateRoomName(culture, trait, seed)
        r.roomName = nameData["name"]
        r.roomType = nameData["type"]

        // 4. Atmosphere
        VibeCapsule vibe = r.getVibe()
        String mutation = vibe != null ? vibe.latticeMutation : "Standard"
        Map<String, String> atmos = ThemeManager.generateAtmosphere(culture, timeline, mutation, r.isAnomaly, seed)
        r.walls = atmos["walls"]
        r.lightingDesc = atmos["lighting"]
        r.structureDesc = atmos["structure"]

        // 5. Atmo-Traits
        r.atmoTraits["OXYGEN"] = "${random.nextInt(10) + 12}%".toString()
        r.atmoTraits["TEMP"] = "${random.nextInt(20) + 5}°C".toString()
        r.atmoTraits["SIGNAL"] = random.nextBoolean() ? "[SHIELDED]" : "[CLEAR]"
        
        // 6. Furniture
        int numFurniture = random.nextInt(3) + 1
        for (int i = 0; i < numFurniture; i++) {
            r.furniture << ThemeManager.generateHybridObject(culture, timeline, seed != 0 ? seed + i + 100 : 0)
        }

        return r
    }

    // --- Population Strategies ---

    static void populateUniverse(Universe u) {
        Random scrambler = new Random(u.seed)
        int numFilaments = scrambler.nextInt(5) + 3
        for (int i = 0; i < numFilaments; i++) {
            u.addLocation(createFilament(u, scrambler.nextLong()))
        }
    }

    static void populateFilament(CosmicFilament f) {
        Random scrambler = new Random(f.seed)
        int numNodes = scrambler.nextInt(5) + 4
        for (int i = 0; i < numNodes; i++) {
            long childSeed = scrambler.nextLong()
            if (scrambler.nextInt(10) < 3) {
                f.addLocation(createNullSector(f, childSeed))
            } else {
                f.addLocation(createSector(f, childSeed))
            }
        }
    }

    static void populateSector(GalacticSector s) {
        Random scrambler = new Random(s.seed)
        int numSystems = scrambler.nextInt(5) + 3
        for (int i = 0; i < numSystems; i++) {
            s.addLocation(createSolarSystem(s, scrambler.nextLong()))
        }
    }

    static void populateNullSector(NullSector s) {
        Random scrambler = new Random(s.seed)
        int numSystems = scrambler.nextInt(2) + 1
        for (int i = 0; i < numSystems; i++) {
            long childSeed = scrambler.nextLong()
            s.addLocation(new SolarSystem("Lost " + NameGenerator.generateSolarSystemName(childSeed), childSeed))
        }
    }

    static void populateSolarSystem(SolarSystem s) {
        Random scrambler = new Random(s.seed)
        int numPlanets = scrambler.nextInt(9) + 2
        for (int i = 0; i < numPlanets; i++) {
            s.addLocation(createPlanet(s, scrambler.nextLong()))
        }
    }

    static void populatePlanet(Planet p) {
        Random scrambler = new Random(p.seed)
        int numCountries = scrambler.nextInt(7) + 2
        for (int i = 0; i < numCountries; i++) {
            p.addLocation(createCountry(p, scrambler.nextLong()))
        }
    }

    static void populateCountry(Country c) {
        Random scrambler = new Random(c.seed)
        
        // Ensure we have a local mutated vibe for this country based on the planet
        if (c.localVibe == null) {
            VibeCapsule parentVibe = c.getVibe()
            if (parentVibe != null) {
                c.localVibe = parentVibe.mutate(c.functionalTrait, scrambler.nextDouble() * 0.2 - 0.1)
            }
        }

        int numCities = scrambler.nextInt(9) + 2
        for (int i = 0; i < numCities; i++) {
            c.addLocation(createCity(c, scrambler.nextLong()))
        }
    }

    static void populateCity(City c) {
        Random scrambler = new Random(c.seed)
        
        if (c.localVibe == null) {
            VibeCapsule parentVibe = c.getVibe()
            if (parentVibe != null) {
                // 10% chance to be a "rebel" district and flip resonances
                if (scrambler.nextDouble() < 0.1) {
                    c.isRebelDistrict = true
                    c.localVibe = new VibeCapsule(parentVibe.timeline, parentVibe.secondaryCulture, parentVibe.primaryCulture)
                    c.localVibe.latticeMutation = parentVibe.latticeMutation
                    c.localVibe.stabilityFactor = parentVibe.stabilityFactor
                    c.localVibe.atmosphericColor = parentVibe.atmosphericColor
                }
            }
        }

        int numStreets = scrambler.nextInt(13) + 3
        for (int i = 0; i < numStreets; i++) {
            c.addLocation(createStreet(c, scrambler.nextLong()))
        }
    }

    static void populateStreet(Street s) {
        Random scrambler = new Random(s.seed)
        int numPairs = scrambler.nextInt(9) + 2
        VibeCapsule v = s.getVibe()
        String culture = v != null ? v.primaryCulture : "monolith"
        String timeline = v != null ? v.timeline : "ancient"
        int depth = s.getDepth()
        boolean isNull = s.findAncestor(NullSector.class) != null
        boolean isAbyssal = s.isAbyssal()
        for (int i = 0; i < numPairs * 2; i++) {
            s.addLocation(createBuilding(s, culture, timeline, scrambler.nextLong(), depth, isNull, isAbyssal))
        }
    }

    static void populateApartment(Apartment a) {
        Random scrambler = new Random(a.seed)
        int numRooms = scrambler.nextInt(10) + 1
        
        List<String> objectPool = []
        int totalObjects = scrambler.nextInt(15) + 5
        for (int i = 0; i < totalObjects; i++) {
            objectPool << ThemeManager.generateHybridObject(a.culture, a.timeline, scrambler.nextLong())
        }

        for (int i = 0; i < numRooms; i++) {
            a.rooms << createRoom(a, a.culture, a.timeline, scrambler.nextLong())
            a.addLocation(a.rooms.last())
        }

        while (!objectPool.isEmpty()) {
            int roomIdx = scrambler.nextInt(a.rooms.size())
            a.rooms[roomIdx].objects << (String) objectPool.remove(0)
        }
    }

    static void populateCorridor(Corridor c) {
        Random scrambler = new Random(c.seed)
        for (int i = 0; i < c.numApartments; i++) {
            long childSeed = c.seed != 0 ? c.seed + i + 1 : 0
            Door door = new Door(childSeed)
            c.doors << door
            Apartment apartment = createApartment(c, door.getDescription(), c.culture, c.timeline, childSeed)
            c.apartments << apartment
            c.addLocation(apartment)
        }
    }

    static void populateFloor(Floor f) {
        f.corridor = createCorridor(f, f.apartmentsPerFloor, f.culture, f.timeline, f.seed != 0 ? f.seed + 1 : 0)
        f.addLocation(f.corridor)
    }
}

