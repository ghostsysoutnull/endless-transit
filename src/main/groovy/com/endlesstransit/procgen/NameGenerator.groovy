package com.endlesstransit.procgen

import com.endlesstransit.model.RoomCategory
import com.endlesstransit.ui.Terminal
import groovy.transform.CompileStatic

/**
 * NameGenerator: Strictly deterministic name synthesis for the Vinculum engine.
 * Every method requires an explicit LocusSeed; one instance per ProceduralFactory, its owner (HK-022).
 */
@CompileStatic
class NameGenerator {

    String generateSolarSystemName(LocusSeed locus) {
        Random r = locus.nextRandom()
        def prefixes = ["Alpha", "Proxima", "Sirius", "Vega", "Rigel", "Antares", "Betelgeuse", "Altair", "Deneb", "Polaris", "Zeta", "Epsilon", "Omicron", "Sigma", "Tau", "Lambda"]
        def suffixes = ["Prime", "Minor", "Major", "Borealis", "Australis", "Centauri", "Ceti", "Eridani", "Groombridge", "Kapteyn", "Luyten"]
        return "${prefixes[r.nextInt(prefixes.size())]} ${suffixes[r.nextInt(suffixes.size())]}"
    }

    String generatePlanetName(LocusSeed locus) {
        Random r = locus.nextRandom()
        def parts1 = ["Ter", "Neo", "Xen", "Kry", "Vex", "Zion", "Aura", "Nova", "Eden", "Gaia", "Hydra", "Nyx", "Orion", "Phoe", "Rhea", "Styx"]
        def parts2 = ["ra", "on", "os", "is", "us", "ia", "ea", "ax", "ox", "un", "ar", "el", "im", "um"]
        return "${parts1[r.nextInt(parts1.size())]}${parts2[r.nextInt(parts2.size())]}"
    }

    String generateCountryName(LocusSeed locus) {
        Random r = locus.nextRandom()
        def prefixes = ["The United", "Great", "New", "Old", "Western", "Eastern", "Northern", "Southern", "Imperial", "Democratic", "Holy", "Free"]
        def cores = ["Arid", "Frost", "Verdant", "Iron", "Storm", "Shadow", "Light", "Dust", "Glacier", "Jungle", "Desert", "Ocean"]
        def suffixes = ["Republic", "Kingdom", "Empire", "Federation", "Sovereignty", "Union", "Territories", "Lands", "Domain"]
        return "${prefixes[r.nextInt(prefixes.size())]} ${cores[r.nextInt(cores.size())]} ${suffixes[r.nextInt(suffixes.size())]}"
    }

    String generateCityName(LocusSeed locus) {
        Random r = locus.nextRandom()
        def parts1 = ["Silver", "Gold", "Black", "White", "Iron", "Steel", "Neon", "Cyber", "Steam", "Clock", "Void", "Star", "Cloud", "Rain"]
        def parts2 = ["town", "city", "burg", "ville", "port", "gate", "haven", "peak", "spire", "bridge", "fall", "cross", "well", "ford"]
        return "${parts1[r.nextInt(parts1.size())]}${parts2[r.nextInt(parts2.size())]}"
    }

    String generateStreetName(LocusSeed locus) {
        Random r = locus.nextRandom()
        def adjectives = ["High", "Low", "Main", "Grand", "Broad", "Dark", "Bright", "Old", "New", "Quiet", "Busy", "Long", "Short", "Hidden"]
        def nouns = ["Way", "Road", "Street", "Avenue", "Lane", "Drive", "Path", "Walk", "Boulevard", "Terrace", "Row", "Circle", "Loop", "Alley"]
        return "${adjectives[r.nextInt(adjectives.size())]} ${nouns[r.nextInt(nouns.size())]}"
    }

    String generateFilamentName(LocusSeed locus) {
        Random r = locus.nextRandom()
        def Greek = ["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "Eta", "Theta", "Iota", "Kappa", "Lambda", "Mu"]
        def types = ["Strand", "Thread", "Web", "Link", "Sync", "Stream", "Flow", "Pulse"]
        return "${Greek[r.nextInt(Greek.size())]}-${r.nextInt(999)}-${types[r.nextInt(types.size())]}"
    }

    String generateSectorName(LocusSeed locus) {
        Random r = locus.nextRandom()
        def descriptors = ["Outer", "Inner", "Core", "Rim", "Void", "Prime", "Secondary", "Tertiary", "Quaternary"]
        def nouns = ["Sector", "Quadrant", "Grid", "Matrix", "Zone", "Region", "Reach", "Expanse"]
        return "${descriptors[r.nextInt(descriptors.size())]} ${nouns[r.nextInt(nouns.size())]} ${r.nextInt(99)}"
    }

    final Map buildingLexicon = loadBuildingLexicon()

    private Map loadBuildingLexicon() {
        Map lexicon = new LinkedHashMap()
        // HK-016: cultures enumerated by names/buildings/index.txt (Phase 2a shape), not a literal list.
        for (String culture in loadLexiconFile("/names/buildings/index.txt")) {
            lexicon[culture] = [
                "adj" : loadLexiconFile("/names/buildings/${culture}_adj.txt"),
                "noun": loadLexiconFile("/names/buildings/${culture}_noun.txt")
            ]
        }
        return lexicon
    }

    private List<String> loadLexiconFile(String resourcePath) {
        InputStream stream = NameGenerator.class.getResourceAsStream(resourcePath)
        if (!stream) return []
        return stream.readLines().collect { it.trim() }.findAll { !it.isEmpty() }
    }

    static final List<String> landmarkTitles = [
        "The Eye of the Web",
        "Old Unimatrix Root",
        "The Last Stable Surface",
        "The Crystal Sanctum",
        "The Silent Node",
        "The Phantom Spire",
        "The First Pillar",
        "The Heart of the Strata",
        "Apex of Lost Frequencies",
        "The Great Neural Anchor",
        "Pillar of Eternal Static",
        "Unit Zero",
        "The Bleeding Sky-Structure",
        "Memory of the First Pulse",
        "The Void-Watcher"
    ]

    /**
     * HK-016: a culture's lexicon, or monolith's with a visible warning. Every culture in
     * cultures/index.txt has a lexicon (ThemeResourceCoverageTest), so this never fires in production.
     */
    private Map lexiconFor(String culture) {
        Map lexicon = (Map) buildingLexicon[culture]
        if (lexicon == null) {
            Terminal.println "[THEME_WARN] no building lexicon for culture '${culture}' — using monolith's"
            return (Map) buildingLexicon["monolith"]
        }
        return lexicon
    }

    /** The adjectives a culture names its buildings and cells with (HK-016 step 2: dealt per apartment). */
    List<String> adjectivesFor(String culture) {
        return (List<String>) lexiconFor(culture).adj
    }

    /**
     * A cell's category (from the Country trait) and its designation. HK-016 step 2: the designation is
     * "<adjective> <category display name>" — the category is the room's identity, the adjective its
     * culture; the hex serial that used to carry uniqueness is gone. The category is still the first
     * draw, so door traces (CorridorFactory) are unchanged. An apartment passes a dealt adjective so no
     * two of its cells share a name; a null adjective draws one from the lexicon.
     */
    Map<String, Object> generateRoomName(String culture, String trait, LocusSeed locus, String adjective = null) {
        Random r = locus.nextRandom()
        Map lexicon = lexiconFor(culture)

        Map<String, List<RoomCategory>> types = [
            "Military"    : [RoomCategory.SECURITY_STATION, RoomCategory.BARRACKS, RoomCategory.ARMORY, RoomCategory.TACTICAL_HUB],
            "Research"    : [RoomCategory.LABORATORY, RoomCategory.NEURAL_LINK_ARRAY, RoomCategory.OBSERVATION_DECK, RoomCategory.BIO_SERVER],
            "Industrial"  : [RoomCategory.POWER_PLANT, RoomCategory.PROCESSING_CORE, RoomCategory.MAINTENANCE_BAY, RoomCategory.FUEL_DEPOT],
            "Ceremonial"  : [RoomCategory.PRAYER_HALL, RoomCategory.RITUAL_CHAMBER, RoomCategory.ARCHIVE, RoomCategory.MEMORY_WELL],
            "Commercial"  : [RoomCategory.TRADING_FLOOR, RoomCategory.LOGIC_MARKET, RoomCategory.CREDIT_HUB, RoomCategory.SUPPLY_NODE],
            "Agricultural": [RoomCategory.HYDROPONIC_BAY, RoomCategory.SPORE_FARM, RoomCategory.OXYGEN_SUMP, RoomCategory.GROWTH_CHAMBER]
        ]

        List<RoomCategory> traitTypes = (List<RoomCategory>) (types[trait] ?: [RoomCategory.STANDARD_SPATIAL_CELL, RoomCategory.GENERIC_LIVING_UNIT, RoomCategory.TRANSIT_NODE, RoomCategory.LATTICE_SUB_CELL])
        RoomCategory category = (RoomCategory) traitTypes[r.nextInt(traitTypes.size())]

        List<String> adjs = (List<String>) lexicon.adj
        String adj = adjective ?: (String) adjs[r.nextInt(adjs.size())]

        String name = "$adj ${category.displayName}"
        return [name: name, category: category]
    }

    Map<String, Object> generateBuildingName(String culture, int floors, LocusSeed locus, int depth, boolean isNullZone, boolean isAbyssal) {
        Random r = locus.nextRandom()
        double landmarkProb = 0.03
        if (depth > 5) landmarkProb += (depth - 5) * 0.005
        if (isNullZone) landmarkProb *= 2.0
        if (isAbyssal) landmarkProb *= 3.0
        landmarkProb = Math.min(0.25, landmarkProb)

        double roll = r.nextDouble()

        if (roll < landmarkProb) {
            return [name: landmarkTitles[r.nextInt(landmarkTitles.size())], isLandmark: true]
        }

        boolean isUncommon = roll < (landmarkProb + 0.15)
        
        Map<String, List<String>> sizes = [
            "small": ["Annex", "Cell", "Unit", "Pod", "Hut", "Point"],
            "medium": ["Block", "Plaza", "Heights", "Center", "Complex"],
            "large": ["Arcology", "Mega-Structure", "Spire", "Sky-Anchor", "Bastion", "Citadel"]
        ]
        String sizeCat = floors < 10 ? "small" : (floors < 20 ? "medium" : "large")
        
        Map lexicon = lexiconFor(culture)
        List<String> adjs = (List<String>) lexicon.adj
        List<String> nouns = (List<String>) lexicon.noun

        String name = ""
        
        if (isUncommon) {
            int template = r.nextInt(2)
            if (template == 0) {
                List<String> catList = sizes[sizeCat]
                name = "Unit 0x${Integer.toHexString(r.nextInt(0xFFF)).toUpperCase()} ${(String)catList[r.nextInt(catList.size())]}"
            } else {
                def concepts = ["Static", "Frequencies", "Resonance", "Stability", "Time", "Light", "The Web"]
                name = "The ${(String)nouns[r.nextInt(nouns.size())]} of ${(String)concepts[r.nextInt(concepts.size())]}"
            }
        } else {
            int template = r.nextInt(2)
            if (template == 0) {
                name = "${(String)adjs[r.nextInt(adjs.size())]} ${(String)nouns[r.nextInt(nouns.size())]}"
            } else {
                def compounds = ["Gate", "Fall", "Reach", "Spire", "Well", "Root"]
                name = "${(String)nouns[r.nextInt(nouns.size())]}${(String)compounds[r.nextInt(compounds.size())]}"
            }
        }

        return [name: name, isLandmark: false]
    }
}
