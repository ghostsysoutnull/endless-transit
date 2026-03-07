package com.endlesstransit.procgen

import groovy.transform.CompileStatic
import java.util.Random

@CompileStatic
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

    static final Map<String, Map> buildingLexicon = [
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

    static final Map<String, Map> roomLexicon = [
        "rust": [
            "adj": ["Oxidized", "Maintenance", "Patchwork", "Corroded", "Gritty", "Scrapyard", "Heavy", "Ventilation"],
            "noun": ["Sump", "Duct", "Alcove", "Intake", "Pit", "Cell", "Shaft", "Vault"]
        ],
        "neon": [
            "adj": ["Synthetic", "Neural", "Plasma", "Digital", "Fluorescent", "Data", "Encrypted", "Bio-luminescent"],
            "noun": ["Hub", "Suite", "Core", "Node", "Array", "Port", "Relay", "Buffer"]
        ],
        "baroque": [
            "adj": ["Velvet", "Gilded", "Sacred", "Golden", "Ornate", "Grand", "Silent", "Shadowed"],
            "noun": ["Vestibule", "Chamber", "Sanctum", "Atrium", "Gallery", "Nave", "Vault", "Study"]
        ],
        "monolith": [
            "adj": ["Concrete", "Brutalist", "Grey", "Eternal", "Static", "Cold", "Empty", "Impenetrable"],
            "noun": ["Block", "Unit", "Slab", "Cell", "Foundation", "Structure", "Vault", "Pillar"]
        ],
        "void": [
            "adj": ["Hollow", "Empty", "Silent", "Ghostly", "Drifting", "Dark", "Static", "Forgotten"],
            "noun": ["Pocket", "Echo", "Well", "Aperture", "Horizon", "Reach", "Shadow", "Well"]
        ],
        "organic": [
            "adj": ["Living", "Grown", "Breathing", "Soft", "Neural", "Fungal", "Wet", "Verdant"],
            "noun": ["Pod", "Spore", "Nest", "Chamber", "Cavity", "Limb", "Root", "Cell"]
        ]
    ]

    static Map<String, String> generateRoomName(String culture, String trait, long seed = 0) {
        Random r = seed != 0 ? new Random(seed) : random
        Map lexicon = (Map) (roomLexicon[culture] ?: roomLexicon["monolith"])
        
        // Use trait to influence the "type"
        Map<String, List<String>> types = [
            "Military": ["Security Station", "Barracks", "Armory", "Tactical Hub"],
            "Research": ["Laboratory", "Neural Link Array", "Observation Deck", "Bio-Server"],
            "Industrial": ["Power Plant", "Processing Core", "Maintenance Bay", "Fuel Depot"],
            "Ceremonial": ["Prayer Hall", "Ritual Chamber", "Archive", "Memory Well"],
            "Commercial": ["Trading Floor", "Logic Market", "Credit Hub", "Supply Node"],
            "Agricultural": ["Hydroponic Bay", "Spore Farm", "Oxygen Sump", "Growth Chamber"]
        ]
        
        List<String> traitTypes = (List<String>) (types[trait] ?: ["Standard Spatial Cell", "Generic Living Unit", "Transit Node", "Lattice Sub-Cell"])
        String type = traitTypes[r.nextInt(traitTypes.size())]
        
        List<String> adjs = (List<String>) lexicon.adj
        List<String> nouns = (List<String>) lexicon.noun
        String adj = adjs[r.nextInt(adjs.size())]
        String noun = nouns[r.nextInt(nouns.size())]
        String hex = Integer.toHexString(r.nextInt(0xFF)).toUpperCase()
        
        String name = "$adj $noun [0x$hex]"
        return [name: name, type: type]
    }

    static Map<String, Object> generateBuildingName(String culture, int floors, long seed = 0, int depth = 0, boolean isNullZone = false, boolean isAbyssal = false) {
        Random r = seed != 0 ? new Random(seed) : random
        
        // 1. Calculate the Rarity Curve for Legendaries (Base 3%)
        double landmarkProb = 0.03
        
        // Depth Multiplier: +0.5% per depth level beyond surface (depth 5)
        if (depth > 5) {
            landmarkProb += (depth - 5) * 0.005
        }
        
        // Zone Multipliers
        if (isNullZone) landmarkProb *= 2.0 // Double chance in Null Zones
        if (isAbyssal) landmarkProb *= 3.0  // Triple chance in Abyssal Substrate
        
        // Cap probability at 25% to keep them special
        landmarkProb = Math.min(0.25, landmarkProb)

        double roll = r.nextDouble()

        // 2. Legendary Tier (The Landmarks)
        if (roll < landmarkProb) {
            return [name: landmarkTitles[r.nextInt(landmarkTitles.size())], isLandmark: true]
        }

        // 3. Uncommon Tier (15% chance for Advanced Templates)
        boolean isUncommon = roll < (landmarkProb + 0.15)
        
        // Size-based Suffixes
        def sizes = [
            "small": ["Annex", "Cell", "Unit", "Pod", "Hut", "Point"],
            "medium": ["Block", "Plaza", "Heights", "Center", "Complex", "Heights"],
            "large": ["Arcology", "Mega-Structure", "Spire", "Sky-Anchor", "Bastion", "Citadel"]
        ]
        String sizeCat = floors < 10 ? "small" : (floors < 20 ? "medium" : "large")
        
        // Get Lexicon for culture (fall back to monolith if missing)
        Map lexicon = (Map) (buildingLexicon[culture] ?: buildingLexicon["monolith"])
        List<String> adjs = (List<String>) lexicon.adj
        List<String> nouns = (List<String>) lexicon.noun

        String name = ""
        
        if (isUncommon) {
            // Pick from "Cooler" templates (Code-based or Concept-based)
            int template = r.nextInt(2)
            if (template == 0) { // Code-Based
                name = "Unit 0x${Integer.toHexString(r.nextInt(0xFFF)).toUpperCase()} ${sizes[sizeCat][r.nextInt(sizes[sizeCat].size())]}"
            } else { // The [Noun] of [Concept]
                def concepts = ["Static", "Frequencies", "Resonance", "Stability", "Time", "Light", "The Web"]
                name = "The ${nouns[r.nextInt(nouns.size())]} of ${concepts[r.nextInt(concepts.size())]}"
            }
        } else {
            // 4. Standard Tier (Adjective + Noun or Compound)
            int template = r.nextInt(2)
            if (template == 0) { // Adjective + Noun
                name = "${adjs[r.nextInt(adjs.size())]} ${nouns[r.nextInt(nouns.size())]}"
            } else { // Compound
                def compounds = ["Gate", "Fall", "Reach", "Spire", "Well", "Root"]
                name = "${nouns[r.nextInt(nouns.size())]}${compounds[r.nextInt(compounds.size())]}"
            }
        }

        return [name: name, isLandmark: false]
    }
}
