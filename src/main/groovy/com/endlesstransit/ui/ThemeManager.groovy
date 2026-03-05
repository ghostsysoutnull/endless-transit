package com.endlesstransit.ui

class ThemeManager {
    static final String CULTURES_DIR = "src/main/resources/themes/cultures"
    static final String TIMELINES_DIR = "src/main/resources/themes/timelines"
    static final String ATMOSPHERE_DIR = "src/main/resources/themes/atmosphere"

    static Map<String, List<String>> cultures = [:]
    static Map<String, List<String>> timelines = [:]
    static Map<String, Map<String, List<String>>> atmosphere = [
        "walls": [:],
        "lighting": [:],
        "structures": [:]
    ]

    static {
        loadThemes()
    }

    private static void loadThemes() {
        new File(CULTURES_DIR).eachFile { file ->
            if (file.isFile()) {
                cultures[file.name.replace(".txt", "")] = file.readLines().collect { it.trim() }.findAll { !it.isEmpty() }
            }
        }
        new File(TIMELINES_DIR).eachFile { file ->
            if (file.isFile()) {
                timelines[file.name.replace(".txt", "")] = file.readLines().collect { it.trim() }.findAll { !it.isEmpty() }
            }
        }
        
        // Load Atmosphere
        ["walls", "lighting", "structures"].each { category ->
            File catDir = new File("${ATMOSPHERE_DIR}/${category}")
            if (catDir.exists()) {
                catDir.eachFile { file ->
                    if (file.isFile()) {
                        atmosphere[category][file.name.replace(".txt", "")] = file.readLines().collect { it.trim() }.findAll { !it.isEmpty() }
                    }
                }
            }
        }
    }

    static String getRandomCulture(long seed = 0) {
        def keys = new ArrayList<>(cultures.keySet())
        Random r = seed != 0 ? new Random(seed) : new Random()
        return keys[r.nextInt(keys.size())]
    }

    static String getRandomTimeline(long seed = 0) {
        def keys = new ArrayList<>(timelines.keySet())
        Random r = seed != 0 ? new Random(seed) : new Random()
        return keys[r.nextInt(keys.size())]
    }

    static List<String> getCultureAssets(String cultureName) {
        return cultures[cultureName] ?: []
    }

    static List<String> getTimelineAssets(String timelineName) {
        return timelines[timelineName] ?: []
    }

    /**
     * Synthesizes atmosphere components based on vibe.
     */
    static Map<String, String> generateAtmosphere(String culture, String timeline, String mutation = "Standard", boolean isAnomaly = false, long seed = 0) {
        Random r = seed != 0 ? new Random(seed) : new Random()
        
        // If it is abyssal, force it
        if (culture == "abyssal") {
            def wallPool = atmosphere["walls"]["abyssal"] ?: ["raw concrete"]
            def lightPool = atmosphere["lighting"]["abyssal"] ?: ["red strobe"]
            def structPool = atmosphere["structures"]["abyssal"] ?: ["void"]
            return [walls: wallPool[r.nextInt(wallPool.size())], 
                    lighting: lightPool[r.nextInt(lightPool.size())], 
                    structure: structPool[r.nextInt(structPool.size())]]
        }

        String wallTheme = culture
        String lightTheme = timeline
        String structTheme = mutation

        // Glitch Logic: Randomize themes if anomaly is detected
        if (isAnomaly || r.nextDouble() < 0.05) {
            if (r.nextBoolean()) wallTheme = getRandomCulture(seed != 0 ? seed + 1 : 0)
            if (r.nextBoolean()) lightTheme = getRandomTimeline(seed != 0 ? seed + 2 : 0)
            if (r.nextBoolean()) structTheme = r.nextBoolean() ? "Abyssal" : "Singularity"
        }

        // Walls pull from Culture (or glitched culture)
        def wallPool = atmosphere["walls"][wallTheme] ?: ["bare surfaces"]
        String walls = wallPool[r.nextInt(wallPool.size())]
        
        // Lighting pulls from Timeline (or glitched timeline)
        def lightPool = atmosphere["lighting"][lightTheme] ?: ["a dim, flickering glow"]
        String lighting = lightPool[r.nextInt(lightPool.size())]
        
        // Structure pulls from Mutation (or glitched mutation)
        def structPool = atmosphere["structures"][structTheme] ?: atmosphere["structures"]["Standard"] ?: ["a spatial cell"]
        String structure = structPool[r.nextInt(structPool.size())]
        
        return [walls: walls, lighting: lighting, structure: structure]
    }

    static String generateHybridObject(String culture, String timeline, long seed = 0) {
        Random r = seed != 0 ? new Random(seed) : new Random()
        def cAssets = getCultureAssets(culture)
        def tAssets = getTimelineAssets(timeline)

        if (cAssets && tAssets) {
            // Mix: Timeline adjective + Culture noun OR Culture adjective + Timeline noun
            // For simplicity, we'll just pick one from each and join them
            String cItem = cAssets[r.nextInt(cAssets.size())]
            String tItem = tAssets[r.nextInt(tAssets.size())]
            
            // Randomly decide which one comes first for variety
            return r.nextBoolean() ? "${tItem} with ${cItem}" : "${cItem} infused with ${tItem}"
        }
        return "Strange Object"
    }
}
