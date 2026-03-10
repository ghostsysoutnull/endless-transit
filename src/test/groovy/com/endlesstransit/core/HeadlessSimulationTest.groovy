package com.endlesstransit.core

import com.endlesstransit.ui.Terminal
import com.endlesstransit.ui.ScreenBuffer
import com.endlesstransit.ui.VisualAssertionEngine
import com.endlesstransit.procgen.LocusSeed
import groovy.transform.CompileStatic

@CompileStatic
class HeadlessSimulationTest {
    static void main(String[] args) {
        Terminal.println "Running Headless Simulation Test..."
        LocusSeed locus = new LocusSeed(12345L)

        // Script:
        // 1. "n" to Restore prompt (if exists)
        // 2. "01" to Enter Building
        // 3. "00" to Enter Floor 0 (Lobby)
        // 4. "c" to Enter Corridor
        // 5. "quit"
        // 6. "y" to Confirm Quit
        // 7. "n" to Sync before terminate
        List<String> script = ["n", "01", "00", "c", "quit", "y", "n"]

        ScreenBuffer finalScreen = HeadlessRunner.run(locus, script)

        Terminal.println "\nSimulation complete."
        Terminal.println "Final Location (LIP): ${finalScreen.locationPath}"

        // 1. Structural Validation (LIP)
        String[] parts = finalScreen.locationPath.split("\\.")
        if (parts.length >= 7) { // Adjusted depth expectation for 12345L
            Terminal.println Terminal.colorize("SUCCESS: Headless simulation reached deep building strata.", Terminal.GREEN)
        } else {
            Terminal.println Terminal.colorize("FAILURE: Simulation ended at unexpected depth: ${parts.length}", Terminal.RED)
            System.exit(1)
        }

        // 2. Visual Validation (DSL)
        try {
            VisualAssertionEngine.expect(finalScreen).isBoxedCorrectly()
            Terminal.println Terminal.colorize("SUCCESS: UI Boxing verified in headless mode.", Terminal.GREEN)
        } catch (AssertionError e) {
            Terminal.println Terminal.colorize("FAILURE: Visual assertion failed: ${e.message}", Terminal.RED)
            System.exit(1)
        }
    }
}
