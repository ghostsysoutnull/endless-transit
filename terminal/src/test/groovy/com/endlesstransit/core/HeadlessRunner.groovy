package com.endlesstransit.core

import com.endlesstransit.ui.Terminal
import com.endlesstransit.ui.ScreenBuffer
import com.endlesstransit.procgen.LocusSeed
import groovy.transform.CompileStatic

/**
 * A test harness for running automated, deterministic game simulations.
 */
@CompileStatic
class HeadlessRunner {
    
    static ScreenBuffer run(LocusSeed locus, List<String> script) {
        // 1. Initialize Terminal in Instant/Headless mode
        // We use virtualBuffer = true so we can capture the final screen
        Terminal.initialize(true, true)
        
        // 2. Setup Mock Input
        MockInputSource mockInput = new MockInputSource(script)
        
        // 3. Initialize Game
        Game game = new Game(locus, mockInput)
        game.state.suppressRendering = true

        // 4. Point the game at a scratch trace that does not exist, so the restore prompt never
        //    appears and a script that syncs writes there. Never the player's session.trace —
        //    this runner deleted it before every run from 2026-03-12 to 2026-09-16 (HK-012).
        File scratchTrace = new File(System.getProperty("java.io.tmpdir"), "endless-transit-headless-${System.nanoTime()}.trace")
        game.saveFile = scratchTrace.path

        // 5. Execute Simulation
        try {
            game.start()
        } catch (Exception e) {
            Terminal.println "Simulation crashed: ${e.message}"
            e.printStackTrace()
        } finally {
            scratchTrace.delete()
        }
        
        // 6. Final render to capture state
        game.state.suppressRendering = false
        Map<String, Closure> options = game.state.currentLocation.getOptions(game)
        game.renderer.renderCurrentState(options)
        
        // 7. Capture final state from BridgeView
        return game.bridgeView.capture(game.inputHandler.getHistory())
    }
}
