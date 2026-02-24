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

    static String getRandomCulture() {
        def keys = new ArrayList<>(cultures.keySet())
        return keys[new Random().nextInt(keys.size())]
    }

    static String getRandomTimeline() {
        def keys = new ArrayList<>(timelines.keySet())
        return keys[new Random().nextInt(keys.size())]
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
    static Map<String, String> generateAtmosphere(String culture, String timeline, String mutation = "Standard") {
        Random r = new Random()
        
        // Walls pull from Culture
        def wallPool = atmosphere["walls"][culture] ?: ["bare surfaces"]
        String walls = wallPool[r.nextInt(wallPool.size())]
        
        // Lighting pulls from Timeline
        def lightPool = atmosphere["lighting"][timeline] ?: ["a dim, flickering glow"]
        String lighting = lightPool[r.nextInt(lightPool.size())]
        
        // Structure pulls from Mutation
        def structPool = atmosphere["structures"][mutation] ?: ["a standard spatial cell"]
        String structure = structPool[r.nextInt(structPool.size())]
        
        return [walls: walls, lighting: lighting, structure: structure]
    }

    static String generateHybridObject(String culture, String timeline) {
        Random r = new Random()
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
