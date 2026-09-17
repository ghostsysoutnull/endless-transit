package com.endlesstransit.procgen

import com.endlesstransit.ui.Terminal
import groovy.transform.CompileStatic

@CompileStatic
class ThemeService {
    Map<String, List<String>> cultures = new TreeMap<String, List<String>>()
    Map<String, List<String>> timelines = new TreeMap<String, List<String>>()
    /** HK-016 step 2: the condition words furniture is described in (themes/conditions.txt). */
    List<String> conditions = []
    /** HK-016 step 2: description variants per location kind (themes/descriptions/<kind>.txt, indexed). */
    Map<String, List<String>> descriptions = new TreeMap<String, List<String>>()
    Map<String, Map<String, List<String>>> atmosphere = [
        "walls": new TreeMap<String, List<String>>(),
        "lighting": new TreeMap<String, List<String>>(),
        "structures": new TreeMap<String, List<String>>()
    ]

    ThemeService() {
        loadThemes()
    }

    private List<String> loadResourceLines(String resourcePath) {
        InputStream stream = this.class.getResourceAsStream(resourcePath)
        if (!stream) return []
        return stream.readLines().collect { it.trim() }.findAll { !it.isEmpty() }
    }

    private void loadThemes() {
        for (String key in loadResourceLines("/themes/cultures/index.txt")) {
            cultures[key] = loadResourceLines("/themes/cultures/${key}.txt")
        }
        for (String key in loadResourceLines("/themes/timelines/index.txt")) {
            timelines[key] = loadResourceLines("/themes/timelines/${key}.txt")
        }
        conditions = loadResourceLines("/themes/conditions.txt")
        for (String key in loadResourceLines("/themes/descriptions/index.txt")) {
            descriptions[key] = loadResourceLines("/themes/descriptions/${key}.txt")
        }
        for (String category in ["walls", "lighting", "structures"]) {
            Map<String, List<String>> catMap = (Map<String, List<String>>) atmosphere[category]
            for (String key in loadResourceLines("/themes/atmosphere/${category}/index.txt")) {
                catMap[key] = loadResourceLines("/themes/atmosphere/${category}/${key}.txt")
            }
        }
    }

    String getRandomCulture(LocusSeed locus) {
        String culture = locus.pickFromKeys(cultures)
        return culture ?: "monolith"
    }

    String getRandomTimeline(LocusSeed locus) {
        String timeline = locus.pickFromKeys(timelines)
        return timeline ?: "digital"
    }

    List<String> getCultureAssets(String cultureName) {
        return cultures[cultureName] ?: []
    }

    List<String> getTimelineAssets(String timelineName) {
        return timelines[timelineName] ?: []
    }

    /**
     * Synthesizes atmosphere components based on vibe and functional trait.
     */
    Map<String, String> generateAtmosphere(String culture, String timeline, String mutation, boolean isAnomaly, String trait, LocusSeed locus) {
        Random r = locus.nextRandom()
        // If it is abyssal, force it
        if (culture == "abyssal") {
            List<String> wallPool = atmosphere["walls"]["abyssal"] ?: ["raw concrete"]
            List<String> lightPool = atmosphere["lighting"]["abyssal"] ?: ["red strobe"]
            List<String> structPool = atmosphere["structures"]["abyssal"] ?: ["void"]
            return [walls: (String)wallPool[r.nextInt(wallPool.size())], 
                    lighting: (String)lightPool[r.nextInt(lightPool.size())], 
                    structure: (String)structPool[r.nextInt(structPool.size())]]
        }

        String wallTheme = culture
        String lightTheme = timeline
        String structTheme = trait != "Standard" ? trait : mutation

        // Glitch Logic: Randomize themes if anomaly is detected
        if (isAnomaly || r.nextDouble() < 0.05) {
            if (r.nextBoolean()) wallTheme = getRandomCulture(locus.branch("WALL_GLITCH"))
            if (r.nextBoolean()) lightTheme = getRandomTimeline(locus.branch("LIGHT_GLITCH"))
            // HK-016: "abyssal" is the file's key (was "Abyssal", which no file matched and fell back silently).
            if (r.nextBoolean()) structTheme = r.nextBoolean() ? "abyssal" : "Singularity"
        }

        // Walls pull from Culture (or glitched culture)
        List<String> wallPool = poolOrWarn("walls", wallTheme, atmosphere["walls"]["monolith"] ?: ["bare surfaces"])
        String walls = (String) wallPool[r.nextInt(wallPool.size())]
        
        // Lighting pulls from Timeline (or glitched timeline)
        List<String> lightPool = poolOrWarn("lighting", lightTheme, atmosphere["lighting"]["monolith"] ?: ["a dim, flickering glow"])
        String lighting = (String) lightPool[r.nextInt(lightPool.size())]
        
        // Structure pulls from trait (or glitched mutation)
        List<String> structPool = poolOrWarn("structures", structTheme, atmosphere["structures"]["monolith"] ?: atmosphere["structures"]["Standard"] ?: ["a spatial cell"])
        String structure = (String) structPool[r.nextInt(structPool.size())]
        
        return [walls: walls, lighting: lighting, structure: structure]
    }

    /**
     * HK-016: the pool for a key, or the given fallback with a visible warning. Every key in an
     * index has a file (ThemeResourceCoverageTest), so this never fires in production; if it does,
     * a resource file is missing and the world has gone quiet somewhere.
     */
    private List<String> poolOrWarn(String category, String key, List<String> fallback) {
        List<String> pool = atmosphere[category][key]
        if (!pool) {
            Terminal.println "[THEME_WARN] no ${category} file for '${key}' — falling back to ${fallback.size()} generic line(s)"
            return fallback
        }
        return pool
    }

    private final Map<String, List<String>> objectDecks = new HashMap<String, List<String>>()

    /**
     * HK-016 step 2: every object an apartment of this culture and era can hold, in a fixed order —
     * each culture item x each era item in four two-word forms, then every item alone. Built once per
     * (culture, era) and shared; callers copy before shuffling. ["Strange Object"] when a list is empty.
     */
    List<String> objectDeck(String culture, String timeline) {
        String key = culture + "|" + timeline
        List<String> deck = objectDecks[key]
        if (deck == null) {
            deck = buildObjectDeck(getCultureAssets(culture), getTimelineAssets(timeline))
            objectDecks[key] = deck
        }
        return deck
    }

    private static List<String> buildObjectDeck(List<String> cAssets, List<String> tAssets) {
        if (!cAssets || !tAssets) return Collections.unmodifiableList(["Strange Object"])
        List<String> deck = []
        for (String c in cAssets) {
            for (String t in tAssets) {
                deck << "${t} with ${c}".toString()
                deck << "${c} infused with ${t}".toString()
                deck << "${c} fused to ${t}".toString()
                deck << "${t} grafted onto ${c}".toString()
            }
        }
        deck.addAll(cAssets)
        deck.addAll(tAssets)
        return Collections.unmodifiableList(deck)
    }

    /**
     * HK-016 step 2: furniture is a culture item in a condition ("overturned tatami mat"), never a
     * hybrid — the FURNITURE line stops reading as a second objects line. Items are dealt without
     * replacement (a shuffled copy of the culture list), each with a condition drawn by r.
     */
    List<String> generateFurniture(String culture, int count, Random r) {
        List<String> items = new ArrayList<String>(getCultureAssets(culture))
        if (!items) return (List<String>) (1..count).collect { "Strange Fixture" }
        Collections.shuffle(items, r)
        List<String> out = []
        for (int i = 0; i < Math.min(count, items.size()); i++) {
            String condition = conditions ? (String) conditions[r.nextInt(conditions.size())] : null
            out << (condition ? "${condition} ${items[i]}".toString() : (String) items[i])
        }
        return out
    }

    /**
     * HK-016 step 2: one of the kind's description variants, chosen by the location's own seed at
     * creation (the factory stores it on the model). Null, with a warning, when the file is missing —
     * the model then keeps its built-in sentence.
     */
    String descriptionVariant(String kind, LocusSeed locus) {
        List<String> pool = descriptions[kind]
        if (!pool) {
            Terminal.println "[THEME_WARN] no descriptions file for '${kind}' — using the built-in sentence"
            return null
        }
        return (String) pool[locus.branch("DESC").nextInt(pool.size())]
    }

    /** One object drawn with replacement from the deck (HK-016 step 2: one nextInt per call). */
    String generateHybridObject(String culture, String timeline, Random r) {
        List<String> deck = objectDeck(culture, timeline)
        return deck[r.nextInt(deck.size())]
    }
}
