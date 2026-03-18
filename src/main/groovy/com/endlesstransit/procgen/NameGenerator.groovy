package com.endlesstransit.procgen

import groovy.transform.CompileStatic

/**
 * NameGenerator: Strictly deterministic name synthesis for the Vinculum engine.
 * Every method requires an explicit LocusSeed to ensure cross-session stability.
 */
@CompileStatic
class NameGenerator {

    static String generateSolarSystemName(LocusSeed locus) {
        Random r = locus.nextRandom()
        def prefixes = ["Alpha", "Proxima", "Sirius", "Vega", "Rigel", "Antares", "Betelgeuse", "Altair", "Deneb", "Polaris", "Zeta", "Epsilon", "Omicron", "Sigma", "Tau", "Lambda"]
        def suffixes = ["Prime", "Minor", "Major", "Borealis", "Australis", "Centauri", "Ceti", "Eridani", "Groombridge", "Kapteyn", "Luyten"]
        return "${prefixes[r.nextInt(prefixes.size())]} ${suffixes[r.nextInt(suffixes.size())]}"
    }

    static String generatePlanetName(LocusSeed locus) {
        Random r = locus.nextRandom()
        def parts1 = ["Ter", "Neo", "Xen", "Kry", "Vex", "Zion", "Aura", "Nova", "Eden", "Gaia", "Hydra", "Nyx", "Orion", "Phoe", "Rhea", "Styx"]
        def parts2 = ["ra", "on", "os", "is", "us", "ia", "ea", "ax", "ox", "un", "ar", "el", "im", "um"]
        return "${parts1[r.nextInt(parts1.size())]}${parts2[r.nextInt(parts2.size())]}"
    }

    static String generateCountryName(LocusSeed locus) {
        Random r = locus.nextRandom()
        def prefixes = ["The United", "Great", "New", "Old", "Western", "Eastern", "Northern", "Southern", "Imperial", "Democratic", "Holy", "Free"]
        def cores = ["Arid", "Frost", "Verdant", "Iron", "Storm", "Shadow", "Light", "Dust", "Glacier", "Jungle", "Desert", "Ocean"]
        def suffixes = ["Republic", "Kingdom", "Empire", "Federation", "Sovereignty", "Union", "Territories", "Lands", "Domain"]
        return "${prefixes[r.nextInt(prefixes.size())]} ${cores[r.nextInt(cores.size())]} ${suffixes[r.nextInt(suffixes.size())]}"
    }

    static String generateCityName(LocusSeed locus) {
        Random r = locus.nextRandom()
        def parts1 = ["Silver", "Gold", "Black", "White", "Iron", "Steel", "Neon", "Cyber", "Steam", "Clock", "Void", "Star", "Cloud", "Rain"]
        def parts2 = ["town", "city", "burg", "ville", "port", "gate", "haven", "peak", "spire", "bridge", "fall", "cross", "well", "ford"]
        return "${parts1[r.nextInt(parts1.size())]}${parts2[r.nextInt(parts2.size())]}"
    }

    static String generateStreetName(LocusSeed locus) {
        Random r = locus.nextRandom()
        def adjectives = ["High", "Low", "Main", "Grand", "Broad", "Dark", "Bright", "Old", "New", "Quiet", "Busy", "Long", "Short", "Hidden"]
        def nouns = ["Way", "Road", "Street", "Avenue", "Lane", "Drive", "Path", "Walk", "Boulevard", "Terrace", "Row", "Circle", "Loop", "Alley"]
        return "${adjectives[r.nextInt(adjectives.size())]} ${nouns[r.nextInt(nouns.size())]}"
    }

    static String generateFilamentName(LocusSeed locus) {
        Random r = locus.nextRandom()
        def Greek = ["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "Eta", "Theta", "Iota", "Kappa", "Lambda", "Mu"]
        def types = ["Strand", "Thread", "Web", "Link", "Sync", "Stream", "Flow", "Pulse"]
        return "${Greek[r.nextInt(Greek.size())]}-${r.nextInt(999)}-${types[r.nextInt(types.size())]}"
    }

    static String generateSectorName(LocusSeed locus) {
        Random r = locus.nextRandom()
        def descriptors = ["Outer", "Inner", "Core", "Rim", "Void", "Prime", "Secondary", "Tertiary", "Quaternary"]
        def nouns = ["Sector", "Quadrant", "Grid", "Matrix", "Zone", "Region", "Reach", "Expanse"]
        return "${descriptors[r.nextInt(descriptors.size())]} ${nouns[r.nextInt(nouns.size())]} ${r.nextInt(99)}"
    }

    static final Map buildingLexicon = loadBuildingLexicon()

    private static Map loadBuildingLexicon() {
        Map lexicon = new LinkedHashMap()
        for (String culture in ["rust", "neon", "baroque", "monolith", "void", "organic"]) {
            lexicon[culture] = [
                "adj" : loadLexiconFile("src/main/resources/names/buildings/${culture}_adj.txt"),
                "noun": loadLexiconFile("src/main/resources/names/buildings/${culture}_noun.txt")
            ]
        }
        return lexicon
    }

    private static List<String> loadLexiconFile(String path) {
        File file = new File(path)
        if (!file.exists()) return []
        return file.readLines().collect { it.trim() }.findAll { !it.isEmpty() }
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

    static Map<String, String> generateRoomName(String culture, String trait, LocusSeed locus) {
        Random r = locus.nextRandom()
        Map lexicon = (Map) (buildingLexicon[culture] ?: buildingLexicon["monolith"])
        
        Map<String, List<String>> types = [
            "Military": ["Security Station", "Barracks", "Armory", "Tactical Hub"],
            "Research": ["Laboratory", "Neural Link Array", "Observation Deck", "Bio-Server"],
            "Industrial": ["Power Plant", "Processing Core", "Maintenance Bay", "Fuel Depot"],
            "Ceremonial": ["Prayer Hall", "Ritual Chamber", "Archive", "Memory Well"],
            "Commercial": ["Trading Floor", "Logic Market", "Credit Hub", "Supply Node"],
            "Agricultural": ["Hydroponic Bay", "Spore Farm", "Oxygen Sump", "Growth Chamber"]
        ]
        
        List<String> traitTypes = (List<String>) (types[trait] ?: ["Standard Spatial Cell", "Generic Living Unit", "Transit Node", "Lattice Sub-Cell"])
        String type = (String) traitTypes[r.nextInt(traitTypes.size())]
        
        List<String> adjs = (List<String>) lexicon.adj
        List<String> nouns = (List<String>) lexicon.noun
        String adj = (String) adjs[r.nextInt(adjs.size())]
        String noun = (String) nouns[r.nextInt(nouns.size())]
        String hex = Integer.toHexString(r.nextInt(0xFF)).toUpperCase()
        
        String name = "$adj $noun [0x$hex]"
        return [name: name, type: type]
    }

    static Map<String, Object> generateBuildingName(String culture, int floors, LocusSeed locus, int depth, boolean isNullZone, boolean isAbyssal) {
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
        
        Map lexicon = (Map) (buildingLexicon[culture] ?: buildingLexicon["monolith"])
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

    static String generateContainerName(LocusSeed locus) {
        Random r = locus.nextRandom()
        def prefixes = ["Steel", "Quantum", "Hidden", "Old", "Digital", "Mechanical", "Void", "Sealed"]
        def types = ["Crate", "Locker", "Chest", "Box", "Safe", "Pod", "Vault", "Terminal"]
        return "${prefixes[r.nextInt(prefixes.size())]} ${types[r.nextInt(types.size())]}"
    }
}
