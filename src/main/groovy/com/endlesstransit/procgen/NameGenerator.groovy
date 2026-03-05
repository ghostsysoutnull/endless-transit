package com.endlesstransit.procgen

import java.util.Random

class NameGenerator {
    private static final Random random = new Random()

    static String generateSolarSystemName(long seed = 0) {
        Random r = seed != 0 ? new Random(seed) : random
        def prefixes = ["Alpha", "Proxima", "Sirius", "Vega", "Rigel", "Antares", "Betelgeuse", "Altair", "Deneb", "Polaris", "Zeta", "Epsilon", "Omicron", "Sigma", "Tau", "Lambda"]
        def suffixes = ["Prime", "Minor", "Major", "Borealis", "Australis", "Centauri", "Ceti", "Eridani", "Groombridge", "Kapteyn", "Luyten"]
        return "${prefixes[r.nextInt(prefixes.size())]} ${suffixes[r.nextInt(suffixes.size())]}"
    }

    static String generatePlanetName(long seed = 0) {
        Random r = seed != 0 ? new Random(seed) : random
        def parts1 = ["Ter", "Neo", "Xen", "Kry", "Vex", "Zion", "Aura", "Nova", "Eden", "Gaia", "Hydra", "Nyx", "Orion", "Phoe", "Rhea", "Styx"]
        def parts2 = ["ra", "on", "os", "is", "us", "ia", "ea", "ax", "ox", "un", "ar", "el", "im", "um"]
        return "${parts1[r.nextInt(parts1.size())]}${parts2[r.nextInt(parts2.size())]}"
    }

    static String generateCountryName(long seed = 0) {
        Random r = seed != 0 ? new Random(seed) : random
        def prefixes = ["The United", "Great", "New", "Old", "Western", "Eastern", "Northern", "Southern", "Imperial", "Democratic", "Holy", "Free"]
        def cores = ["Arid", "Frost", "Verdant", "Iron", "Storm", "Shadow", "Light", "Dust", "Glacier", "Jungle", "Desert", "Ocean"]
        def suffixes = ["Republic", "Kingdom", "Empire", "Federation", "Sovereignty", "Union", "Territories", "Lands", "Domain"]
        return "${prefixes[r.nextInt(prefixes.size())]} ${cores[r.nextInt(cores.size())]} ${suffixes[r.nextInt(suffixes.size())]}"
    }

    static String generateCityName(long seed = 0) {
        Random r = seed != 0 ? new Random(seed) : random
        def parts1 = ["Silver", "Gold", "Black", "White", "Iron", "Steel", "Neon", "Cyber", "Steam", "Clock", "Void", "Star", "Cloud", "Rain"]
        def parts2 = ["town", "city", "burg", "ville", "port", "gate", "haven", "peak", "spire", "bridge", "fall", "cross", "well", "ford"]
        return "${parts1[r.nextInt(parts1.size())]}${parts2[r.nextInt(parts2.size())]}"
    }

    static String generateStreetName(long seed = 0) {
        Random r = seed != 0 ? new Random(seed) : random
        def adjectives = ["High", "Low", "Main", "Grand", "Broad", "Dark", "Bright", "Old", "New", "Quiet", "Busy", "Long", "Short", "Hidden"]
        def nouns = ["Way", "Road", "Street", "Avenue", "Lane", "Drive", "Path", "Walk", "Boulevard", "Terrace", "Row", "Circle", "Loop", "Alley"]
        return "${adjectives[r.nextInt(adjectives.size())]} ${nouns[r.nextInt(nouns.size())]}"
    }

    static String generateFilamentName(long seed = 0) {
        Random r = seed != 0 ? new Random(seed) : random
        def Greek = ["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "Eta", "Theta", "Iota", "Kappa", "Lambda", "Mu"]
        def types = ["Strand", "Thread", "Web", "Link", "Sync", "Stream", "Flow", "Pulse"]
        return "${Greek[r.nextInt(Greek.size())]}-${r.nextInt(999)}-${types[r.nextInt(types.size())]}"
    }

    static String generateSectorName(long seed = 0) {
        Random r = seed != 0 ? new Random(seed) : random
        def descriptors = ["Outer", "Inner", "Core", "Rim", "Void", "Prime", "Secondary", "Tertiary", "Quaternary"]
        def nouns = ["Sector", "Quadrant", "Grid", "Matrix", "Zone", "Region", "Reach", "Expanse"]
        return "${descriptors[r.nextInt(descriptors.size())]} ${nouns[r.nextInt(nouns.size())]} ${r.nextInt(99)}"
    }

    static final Map<String, Map<String, List<String>>> buildingLexicon = [
        "rust": [
            "adj": ["Corroded", "Oxidized", "Patchwork", "Scrapyard", "Weathered", "Fading", "Dusty", "Assembled"],
            "noun": ["Shell", "Stack", "Monolith", "Heap", "Vault", "Husk", "Anchor", "Frame"]
        ],
        "neon": [
            "adj": ["Fluorescent", "Plasma", "Flickering", "Pulsing", "Synthetic", "Vibrant", "Glowing", "Digital"],
            "noun": ["Hub", "Grid", "Node", "Array", "Matrix", "Circuit", "Core", "Nexus"]
        ],
        "baroque": [
            "adj": ["Gilded", "Velvet", "Marble", "Ornate", "Grand", "Opulent", "Sacred", "Golden"],
            "noun": ["Cathedral", "Sanctum", "Archive", "Palace", "Temple", "Gallery", "Hall", "Pillar"]
        ],
        "monolith": [
            "adj": ["Brutalist", "Concrete", "Silent", "Impenetrable", "Grey", "Eternal", "Static", "Cold"],
            "noun": ["Slab", "Tower", "Obelisk", "Block", "Unit", "Monolith", "Foundation", "Pillar"]
        ],
        "void": [
            "adj": ["Hollow", "Empty", "Silent", "Ghostly", "Drifting", "Dark", "Abyssal", "Stellar"],
            "noun": ["Void", "Shadow", "Echo", "Aperture", "Gravity", "Well", "Horizon", "Reach"]
        ],
        "organic": [
            "adj": ["Living", "Grown", "Pulsing", "Verdant", "Breathing", "Soft", "Neural", "Fungal"],
            "noun": ["Pod", "Spore", "Nest", "Shell", "Chamber", "Limb", "Leaf", "Root"]
        ]
    ]

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

    static Map<String, Object> generateBuildingName(String culture, int floors, long seed = 0) {
        Random r = seed != 0 ? new Random(seed) : random
        
        // 10% Landmark Check
        if (r.nextDouble() < 0.10) {
            return [name: landmarkTitles[r.nextInt(landmarkTitles.size())], isLandmark: true]
        }

        // Size-based Suffixes
        def sizes = [
            "small": ["Annex", "Cell", "Unit", "Pod", "Hut", "Point"],
            "medium": ["Block", "Plaza", "Heights", "Center", "Complex", "Heights"],
            "large": ["Arcology", "Mega-Structure", "Spire", "Sky-Anchor", "Bastion", "Citadel"]
        ]
        String sizeCat = floors < 10 ? "small" : (floors < 20 ? "medium" : "large")
        
        // Get Lexicon for culture (fall back to monolith if missing)
        def lexicon = buildingLexicon[culture] ?: buildingLexicon["monolith"]
        
        // Pick a template
        int template = r.nextInt(4)
        String name = ""
        switch(template) {
            case 0: // Adjective + Noun
                name = "${lexicon.adj[r.nextInt(lexicon.adj.size())]} ${lexicon.noun[r.nextInt(lexicon.noun.size())]}"
                break
            case 1: // The [Noun] of [Concept]
                def concepts = ["Static", "Frequencies", "Resonance", "Stability", "Time", "Light", "The Web"]
                name = "The ${lexicon.noun[r.nextInt(lexicon.noun.size())]} of ${concepts[r.nextInt(concepts.size())]}"
                break
            case 2: // Code-Based
                name = "Unit 0x${Integer.toHexString(r.nextInt(0xFFF)).toUpperCase()} ${sizes[sizeCat][r.nextInt(sizes[sizeCat].size())]}"
                break
            case 3: // Compound
                def compounds = ["Gate", "Fall", "Reach", "Spire", "Well", "Root"]
                name = "${lexicon.noun[r.nextInt(lexicon.noun.size())]}${compounds[r.nextInt(compounds.size())]}"
                break
        }

        return [name: name, isLandmark: false]
    }
}
