package com.endlesstransit.ui

import com.endlesstransit.model.Location
import com.endlesstransit.core.Player
import com.endlesstransit.procgen.LocusSeed
import com.endlesstransit.procgen.WorldGenesis
import groovy.transform.CompileStatic
import java.io.File

@CompileStatic
class CaptureVerificationTest {
    static void main(String[] args) {
        Terminal.println "Running Capture Verification Test..."
        
        // 1. Initialize Terminal with VirtualBuffer
        Terminal.initialize(true)
        
        // 2. Setup a dummy game state
        LocusSeed seed = new LocusSeed(12345L)
        WorldGenesis.GenesisResult genesis = WorldGenesis.createInitialWorld(seed)
        BridgeView bridgeView = new BridgeView()
        Player player = new Player()
        
        // 3. Render a frame to the buffer
        Terminal.clearScreen()
        bridgeView.render(genesis.startLocation, player, [:], seed.value)
        
        // 4. Capture
        Terminal.println "Triggering capture..."
        CaptureService.capture(bridgeView, new PlainFormatter())
        
        // 5. Wait for async executor
        Thread.sleep(1000)
        
        // 6. Verify file existence
        File dir = new File("screenshots")
        if (!dir.exists() || dir.listFiles().length == 0) {
            Terminal.println Terminal.colorize("FAILURE: No screenshots found in /screenshots/", Terminal.RED)
            System.exit(1)
        }
        
        File latest = dir.listFiles().sort { it.lastModified() }.last()
        Terminal.println "Latest snapshot: ${latest.name}"
        
        String content = latest.text
        if (content.contains("[VINCULUM_SNAPSHOT_METADATA]") && content.contains("LIP: 0.0.0.0.0.0.0")) {
            Terminal.println Terminal.colorize("SUCCESS: Snapshot integrity verified.", Terminal.GREEN)
        } else {
            Terminal.println Terminal.colorize("FAILURE: Snapshot content mismatch.", Terminal.RED)
            Terminal.println "Content preview:\n${content.take(200)}..."
            System.exit(1)
        }
    }
}
