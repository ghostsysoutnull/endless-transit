package com.endlesstransit.procgen

import com.endlesstransit.ui.Terminal
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*

/**
 * Phase 2a gate: verifies ThemeService loads all resource files via classpath.
 *
 * If src/main/resources falls off the classpath these assertions fail with a
 * clear "cultures not loaded" message rather than a cryptic procgen failure
 * in ProcgenSnapshotTest or DeterministicUniverseTest.
 */
class ThemeServiceLoadTest {

    ThemeService service

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
        service = new ThemeService()
    }

    @Test
    void cultures_areLoadedFromClasspath() {
        assertFalse(service.cultures.isEmpty(),
            "ThemeService.cultures must not be empty — check src/main/resources is on the classpath")
        assertTrue(service.cultures.containsKey("monolith"),
            "cultures must include 'monolith' (canonical fallback culture)")
        assertTrue(service.cultures.containsKey("rust"),
            "cultures must include 'rust'")
        service.cultures.each { key, values ->
            assertFalse(values.isEmpty(),
                "Culture '${key}' loaded an empty asset list — check themes/cultures/${key}.txt")
        }
    }

    @Test
    void timelines_areLoadedFromClasspath() {
        assertFalse(service.timelines.isEmpty(),
            "ThemeService.timelines must not be empty — check src/main/resources is on the classpath")
        assertTrue(service.timelines.containsKey("digital"),
            "timelines must include 'digital' (canonical fallback timeline)")
        service.timelines.each { key, values ->
            assertFalse(values.isEmpty(),
                "Timeline '${key}' loaded an empty asset list — check themes/timelines/${key}.txt")
        }
    }

    @Test
    void atmosphere_wallsAndLighting_areLoadedFromClasspath() {
        Map<String, List<String>> walls = (Map<String, List<String>>) service.atmosphere["walls"]
        Map<String, List<String>> lighting = (Map<String, List<String>>) service.atmosphere["lighting"]

        assertFalse(walls.isEmpty(),
            "atmosphere['walls'] must not be empty")
        assertTrue(walls.containsKey("monolith"),
            "walls must include 'monolith' (used as fallback in generateAtmosphere)")
        walls.each { key, values ->
            assertFalse(values.isEmpty(),
                "Walls '${key}' loaded an empty asset list")
        }

        assertFalse(lighting.isEmpty(),
            "atmosphere['lighting'] must not be empty")
        lighting.each { key, values ->
            assertFalse(values.isEmpty(),
                "Lighting '${key}' loaded an empty asset list")
        }
    }

    @Test
    void atmosphere_structures_areLoadedFromClasspath() {
        Map<String, List<String>> structures = (Map<String, List<String>>) service.atmosphere["structures"]

        assertFalse(structures.isEmpty(),
            "atmosphere['structures'] must not be empty")
        // Keys are capitalised to match trait strings ("Military", "Research", etc.)
        assertTrue(structures.containsKey("Military"),
            "structures must include 'Military' (trait key used in generateAtmosphere)")
        structures.each { key, values ->
            assertFalse(values.isEmpty(),
                "Structure '${key}' loaded an empty asset list")
        }
    }
}
