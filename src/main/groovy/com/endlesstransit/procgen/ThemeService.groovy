package com.endlesstransit.procgen

import groovy.transform.CompileStatic
import java.util.Random

@CompileStatic
class ThemeService {
    final String CULTURES_DIR = "src/main/resources/themes/cultures"
    final String TIMELINES_DIR = "src/main/resources/themes/timelines"
    final String ATMOSPHERE_DIR = "src/main/resources/themes/atmosphere"

    Map<String, List<String>> cultures = new TreeMap<String, List<String>>()
    Map<String, List<String>> timelines = new TreeMap<String, List<String>>()
    Map<String, Map<String, List<String>>> atmosphere = [
        "walls": new TreeMap<String, List<String>>(),
        "lighting": new TreeMap<String, List<String>>(),
        "structures": new TreeMap<String, List<String>>()
    ]

    ThemeService() {
        loadThemes()
    }

    private void loadThemes() {
        File cultDir = new File(CULTURES_DIR)
        if (cultDir.exists()) {
            cultDir.eachFile { file ->
                if (file.isFile()) {
                    cultures[file.name.replace(".txt", "")] = file.readLines().collect { it.trim() }.findAll { !it.isEmpty() }
                }
            }
        }
        
        File timeDir = new File(TIMELINES_DIR)
        if (timeDir.exists()) {
            timeDir.eachFile { file ->
                if (file.isFile()) {
                    timelines[file.name.replace(".txt", "")] = file.readLines().collect { it.trim() }.findAll { !it.isEmpty() }
                }
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
     * Synthesizes atmosphere components based on vibe.
     */
    Map<String, String> generateAtmosphere(String culture, String timeline, String mutation, boolean isAnomaly, LocusSeed locus) {
        // If it is abyssal, force it
        if (culture == "abyssal") {
            List<String> wallPool = atmosphere["walls"]["abyssal"] ?: ["raw concrete"]
            List<String> lightPool = atmosphere["lighting"]["abyssal"] ?: ["red strobe"]
            List<String> structPool = atmosphere["structures"]["abyssal"] ?: ["void"]
            return [walls: (String)locus.pickFrom(wallPool), 
                    lighting: (String)locus.pickFrom(lightPool), 
                    structure: (String)locus.pickFrom(structPool)]
        }

        String wallTheme = culture
        String lightTheme = timeline
        String structTheme = mutation

        // Glitch Logic: Randomize themes if anomaly is detected
        if (isAnomaly || locus.checkProbability(0.05)) {
            if (locus.nextBoolean()) wallTheme = getRandomCulture(locus.branch("WALL_GLITCH"))
            if (locus.nextBoolean()) lightTheme = getRandomTimeline(locus.branch("LIGHT_GLITCH"))
            if (locus.nextBoolean()) structTheme = locus.nextBoolean() ? "Abyssal" : "Singularity"
        }

        // Walls pull from Culture (or glitched culture)
        List<String> wallPool = atmosphere["walls"][wallTheme] ?: ["bare surfaces"]
        String walls = (String) locus.pickFrom(wallPool)
        
        // Lighting pulls from Timeline (or glitched timeline)
        List<String> lightPool = atmosphere["lighting"][lightTheme] ?: ["a dim, flickering glow"]
        String lighting = (String) locus.pickFrom(lightPool)
        
        // Structure pulls from Mutation (or glitched mutation)
        List<String> structPool = atmosphere["structures"][structTheme] ?: atmosphere["structures"]["Standard"] ?: ["a spatial cell"]
        String structure = (String) locus.pickFrom(structPool)
        
        return [walls: walls, lighting: lighting, structure: structure]
    }

    String generateHybridObject(String culture, String timeline, LocusSeed locus) {
        List<String> cAssets = getCultureAssets(culture)
        List<String> tAssets = getTimelineAssets(timeline)

        if (cAssets && tAssets) {
            String cItem = (String) locus.pickFrom(cAssets)
            String tItem = (String) locus.pickFrom(tAssets)
            
            // Randomly decide which one comes first for variety
            return locus.nextBoolean() ? "${tItem} with ${cItem}" : "${cItem} infused with ${tItem}"
        }
        return "Strange Object"
    }
}
