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

    static String generateBuildingName(String prefix = "", long seed = 0) {
        Random r = seed != 0 ? new Random(seed) : random
        def prefixes = ["Neon", "Crystal", "Obsidian", "Rusty", "Chrome", "Emerald", "Vapor", "Aether", "Marble", "Titanium", "Glass", "Onyx"]
        def suffixes = ["Tower", "Plaza", "Heights", "Complex", "Spire", "Block", "Apex", "Nexus", "Center", "Hall", "Domain", "Bastion"]
        String generated = "${prefixes[r.nextInt(prefixes.size())]} ${suffixes[r.nextInt(suffixes.size())]}"
        return prefix ? "$prefix $generated" : generated
    }
}
