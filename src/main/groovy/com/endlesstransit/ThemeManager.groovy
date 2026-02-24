package com.endlesstransit

class ThemeManager {
    static final String CULTURES_DIR = "src/main/resources/themes/cultures"
    static final String TIMELINES_DIR = "src/main/resources/themes/timelines"

    static Map<String, List<String>> cultures = [:]
    static Map<String, List<String>> timelines = [:]

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
