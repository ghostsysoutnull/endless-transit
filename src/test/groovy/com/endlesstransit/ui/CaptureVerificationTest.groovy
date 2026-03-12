package com.endlesstransit.ui

import com.endlesstransit.model.Location
import com.endlesstransit.core.*
import com.endlesstransit.procgen.LocusSeed
import com.endlesstransit.procgen.WorldGenesis
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import static org.junit.jupiter.api.Assertions.*
import java.io.File

class CaptureVerificationTest {

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
    }

    @Test
    void execute() {
        Terminal.println "Running Capture Verification Test..."
        
        // 1. Setup a dummy game state
        LocusSeed seed = new LocusSeed(12345L)
        WorldGenesis.GenesisResult genesis = WorldGenesis.createInitialWorld(seed)
        BridgeView bridgeView = new BridgeView()
        Player player = new Player()
        
        // Clean up screenshots folder before starting
        File dir = new File("screenshots")
        if (dir.exists()) dir.deleteDir()
        dir.mkdirs()

        String expectedLIP = genesis.startLocation.getLIP()
        Terminal.println "Target Start Location: ${genesis.startLocation.getName()}"
        Terminal.println "Expected LIP in metadata: $expectedLIP"

        // 2. Render a frame (Use the full render method to ensure lastLocation is set)
        Terminal.clearScreen()
        bridgeView.render(genesis.startLocation, player, [:], seed)
        
        // 3. Capture
        Terminal.println "Triggering capture (Async)..."
        CaptureService.capture(bridgeView, [], new PlainFormatter())
        
        // 4. Wait for async executor
        Thread.sleep(3000)
        
        // 5. Verify file existence
        File[] files = dir.listFiles()
        if (files == null || files.length == 0) {
            fail("Screenshot file was not generated.")
        }
        
        File latest = files.sort { it.lastModified() }.last()
        Terminal.println "Latest snapshot found: ${latest.name}"
        
        String content = latest.text
        
        // Verify LIP value exists in the file content
        if (!content.contains(expectedLIP)) {
            Terminal.println "--- START SNAPSHOT CONTENT (METADATA) ---"
            Terminal.println content.take(500)
            Terminal.println "--- END SNAPSHOT CONTENT ---"
            fail("LIP Mismatch. Expected: $expectedLIP to be found in screenshot metadata.")
        }
        
        Terminal.println "SUCCESS: Snapshot integrity verified."
    }
}
