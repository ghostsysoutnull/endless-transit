package com.endlesstransit.procgen

import com.endlesstransit.ui.Terminal
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*

/**
 * HK-016 step 1 pin: every key in every resource index has a non-empty file, and each generator
 * draws from the key's OWN file — never monolith's, never a literal fallback. Every list this test
 * iterates comes from an index (cultures, timelines) or mirrors a production literal (traits), so a
 * key added later without its file fails here before anyone reads a [THEME_WARN] line.
 *
 * RED on the pre-step-1 resources: no walls for gilded/rust/shogun/void/zenith, no structures for
 * Industrial/Commercial/Singularity, no lighting for atomic/digital/entropic/future, no lexicon for
 * gilded/shogun/zenith/abyssal — and 'a spatial cell' on every Industrial or Commercial room.
 */
class ThemeResourceCoverageTest {

    /** Mirrors CountryFactory.groovy:26 — the six traits a Country can roll. */
    static final List<String> TRAITS = ["Ceremonial", "Military", "Industrial", "Agricultural", "Research", "Commercial"]

    /** The structure keys the glitch branch in ThemeService.generateAtmosphere can select. */
    static final List<String> GLITCH_STRUCTURE_KEYS = ["abyssal", "Singularity"]

    /** The literals generateAtmosphere ends in when every link of a fallback chain is missing. */
    static final List<String> FALLBACK_LITERALS = ["bare surfaces", "a dim, flickering glow", "a spatial cell"]

    ThemeService service

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
        service = new ThemeService()
    }

    @Test
    void everyCultureHasWallsAndLexicon() {
        assertFalse(service.cultures.isEmpty(), "cultures index loaded nothing")
        service.cultures.keySet().each { String culture ->
            assertTrue(service.atmosphere["walls"][culture] as boolean,
                "no walls file for culture '${culture}' (themes/atmosphere/walls/${culture}.txt + index.txt)")
            Map lexicon = (Map) NameGenerator.buildingLexicon[culture]
            assertNotNull(lexicon, "no building lexicon for culture '${culture}' (names/buildings/${culture}_adj.txt, _noun.txt + index.txt)")
            assertTrue(lexicon.adj as boolean, "empty adjective lexicon for '${culture}'")
            assertTrue(lexicon.noun as boolean, "empty noun lexicon for '${culture}'")
        }
    }

    @Test
    void everyTimelineHasLighting() {
        assertFalse(service.timelines.isEmpty(), "timelines index loaded nothing")
        service.timelines.keySet().each { String timeline ->
            assertTrue(service.atmosphere["lighting"][timeline] as boolean,
                "no lighting file for timeline '${timeline}' (themes/atmosphere/lighting/${timeline}.txt + index.txt)")
        }
    }

    @Test
    void everyTraitHasStructures() {
        (TRAITS + GLITCH_STRUCTURE_KEYS).each { String key ->
            assertTrue(service.atmosphere["structures"][key] as boolean,
                "no structures file for '${key}' (themes/atmosphere/structures/${key}.txt + index.txt)")
        }
    }

    @Test
    void generateAtmosphereDrawsFromEachKeysOwnFile() {
        List<String> monolithWalls = service.atmosphere["walls"]["monolith"]
        service.cultures.keySet().each { String culture ->
            if (culture == "abyssal") return   // its own branch in generateAtmosphere; the abyssal files are pinned above
            List<String> ownWalls = service.atmosphere["walls"][culture]
            boolean mustDifferFromMonolith = culture != "monolith"
            boolean ownWallSeen = false
            service.timelines.keySet().each { String timeline ->
                TRAITS.each { String trait ->
                    (0..<8).each { int i ->
                        LocusSeed locus = new LocusSeed(1000L + i).branch("${culture}_${timeline}_${trait}")
                        Map<String, String> atmos = service.generateAtmosphere(culture, timeline, "Standard", false, trait, locus)
                        [atmos.walls, atmos.lighting, atmos.structure].each { String line ->
                            assertFalse(FALLBACK_LITERALS.contains(line),
                                "fallback literal '${line}' for ${culture}/${timeline}/${trait} — a resource file is missing")
                        }
                        if (ownWalls.contains(atmos.walls) && (!mustDifferFromMonolith || !monolithWalls.contains(atmos.walls))) ownWallSeen = true
                    }
                }
            }
            assertTrue(ownWallSeen, "walls for '${culture}' never came from its own file (always monolith's)")
        }
    }

    @Test
    void generateRoomNameUsesEachCulturesOwnLexicon() {
        List<String> monolithAdj = (List<String>) ((Map) NameGenerator.buildingLexicon["monolith"]).adj
        service.cultures.keySet().each { String culture ->
            Map lexicon = (Map) NameGenerator.buildingLexicon[culture]
            assertNotNull(lexicon, "no lexicon for '${culture}'")
            List<String> ownAdj = (List<String>) lexicon.adj
            boolean mustDifferFromMonolith = culture != "monolith"
            boolean ownSeen = (0..<40).any { int i ->
                String name = (String) NameGenerator.generateRoomName(culture, "Industrial", new LocusSeed(2000L + i).branch(culture))["name"]
                String adj = name.split(" ")[0]
                ownAdj.contains(adj) && (!mustDifferFromMonolith || !monolithAdj.contains(adj))
            }
            assertTrue(ownSeen, "room names for '${culture}' never used its own lexicon (monolith's instead)")
        }
    }
}
