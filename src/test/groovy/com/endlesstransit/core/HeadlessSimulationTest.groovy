package com.endlesstransit.core

import com.endlesstransit.ui.Terminal
import com.endlesstransit.ui.ScreenBuffer
import com.endlesstransit.ui.VisualAssertionEngine
import com.endlesstransit.procgen.LocusSeed
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import static org.junit.jupiter.api.Assertions.*

class HeadlessSimulationTest {

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
    }

    @Test
    void execute() {
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
        assertTrue(parts.length >= 7, "Simulation ended at unexpected depth: ${parts.length}")
        Terminal.println "SUCCESS: Headless simulation reached deep building strata."

        // 2. Visual Validation (DSL)
        VisualAssertionEngine.expect(finalScreen).isBoxedCorrectly()
        Terminal.println "SUCCESS: UI Boxing verified in headless mode."
    }
}
