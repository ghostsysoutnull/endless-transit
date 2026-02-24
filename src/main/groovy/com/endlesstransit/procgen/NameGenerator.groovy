package com.endlesstransit.procgen

import java.util.Random

class NameGenerator {
    private static final Random random = new Random()

    static String generateSolarSystemName() {
        def prefixes = ["Alpha", "Proxima", "Sirius", "Vega", "Rigel", "Antares", "Betelgeuse", "Altair", "Deneb", "Polaris", "Zeta", "Epsilon", "Omicron", "Sigma", "Tau", "Lambda"]
        def suffixes = ["Prime", "Minor", "Major", "Borealis", "Australis", "Centauri", "Ceti", "Eridani", "Groombridge", "Kapteyn", "Luyten"]
        return "${prefixes[random.nextInt(prefixes.size())]} ${suffixes[random.nextInt(suffixes.size())]}"
    }

    static String generatePlanetName() {
        def parts1 = ["Ter", "Neo", "Xen", "Kry", "Vex", "Zion", "Aura", "Nova", "Eden", "Gaia", "Hydra", "Nyx", "Orion", "Phoe", "Rhea", "Styx"]
        def parts2 = ["ra", "on", "os", "is", "us", "ia", "ea", "ax", "ox", "un", "ar", "el", "im", "um"]
        return "${parts1[random.nextInt(parts1.size())]}${parts2[random.nextInt(parts2.size())]}"
    }

    static String generateCountryName() {
        def prefixes = ["The United", "Great", "New", "Old", "Western", "Eastern", "Northern", "Southern", "Imperial", "Democratic", "Holy", "Free"]
        def cores = ["Arid", "Frost", "Verdant", "Iron", "Storm", "Shadow", "Light", "Dust", "Glacier", "Jungle", "Desert", "Ocean"]
        def suffixes = ["Republic", "Kingdom", "Empire", "Federation", "Sovereignty", "Union", "Territories", "Lands", "Domain"]
        return "${prefixes[random.nextInt(prefixes.size())]} ${cores[random.nextInt(cores.size())]} ${suffixes[random.nextInt(suffixes.size())]}"
    }

    static String generateCityName() {
        def parts1 = ["Silver", "Gold", "Black", "White", "Iron", "Steel", "Neon", "Cyber", "Steam", "Clock", "Void", "Star", "Cloud", "Rain"]
        def parts2 = ["town", "city", "burg", "ville", "port", "gate", "haven", "peak", "spire", "bridge", "fall", "cross", "well", "ford"]
        return "${parts1[random.nextInt(parts1.size())]}${parts2[random.nextInt(parts2.size())]}"
    }

    static String generateStreetName() {
        def adjectives = ["High", "Low", "Main", "Grand", "Broad", "Dark", "Bright", "Old", "New", "Quiet", "Busy", "Long", "Short", "Hidden"]
        def nouns = ["Way", "Road", "Street", "Avenue", "Lane", "Drive", "Path", "Walk", "Boulevard", "Terrace", "Row", "Circle", "Loop", "Alley"]
        return "${adjectives[random.nextInt(adjectives.size())]} ${nouns[random.nextInt(nouns.size())]}"
    }

    static String generateFilamentName() {
        def Greek = ["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "Eta", "Theta", "Iota", "Kappa", "Lambda", "Mu"]
        def types = ["Strand", "Thread", "Web", "Link", "Sync", "Stream", "Flow", "Pulse"]
        return "${Greek[random.nextInt(Greek.size())]}-${random.nextInt(999)}-${types[random.nextInt(types.size())]}"
    }

    static String generateSectorName() {
        def descriptors = ["Outer", "Inner", "Core", "Rim", "Void", "Prime", "Secondary", "Tertiary", "Quaternary"]
        def nouns = ["Sector", "Quadrant", "Grid", "Matrix", "Zone", "Region", "Reach", "Expanse"]
        return "${descriptors[random.nextInt(descriptors.size())]} ${nouns[random.nextInt(nouns.size())]} ${random.nextInt(99)}"
    }

    static String generateBuildingName(String prefix = "") {
        def prefixes = ["Neon", "Crystal", "Obsidian", "Rusty", "Chrome", "Emerald", "Vapor", "Aether", "Marble", "Titanium", "Glass", "Onyx"]
        def suffixes = ["Tower", "Plaza", "Heights", "Complex", "Spire", "Block", "Apex", "Nexus", "Center", "Hall", "Domain", "Bastion"]
        String generated = "${prefixes[random.nextInt(prefixes.size())]} ${suffixes[random.nextInt(suffixes.size())]}"
        return prefix ? "$prefix $generated" : generated
    }
}
