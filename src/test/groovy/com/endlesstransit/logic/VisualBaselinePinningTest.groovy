package com.endlesstransit.logic

import com.endlesstransit.core.*
import com.endlesstransit.ui.*
import com.endlesstransit.procgen.LocusSeed
import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*
import java.nio.file.Files
import java.nio.file.Paths

class VisualBaselinePinningTest {

    @Test
    void captureAndVerifyBridgeView() {
        LocusSeed seed = new LocusSeed(12345L)
        // Ensure we are in a deterministic location
        // Passing an empty list or a list that doesn't quit immediately 
        // ensures we capture the first location's BridgeView.
        com.endlesstransit.ui.ScreenBuffer buffer = HeadlessRunner.run(seed, [])
        
        String baseline = buffer.toString()
        assertNotNull(baseline, "Baseline capture should not be null")
        // Check for common HUD markers
        assertTrue(baseline.contains("PULSE_TRAVERSAL"), "Baseline should contain HUD markers")
        assertTrue(baseline.contains("COHERENCE"), "Baseline should contain HUD markers")
        
        // Write once — only captures if the baseline doesn't already exist.
        // To refresh: delete the file and re-run the test.
        String path = "screenshots/baseline_refactor_survival.txt"
        File baselineFile = new File(path)
        if (!baselineFile.exists()) {
            new File("screenshots").mkdirs()
            Files.write(Paths.get(path), baseline.getBytes())
            Terminal.println "Visual baseline captured to $path"
        }
    }
}
