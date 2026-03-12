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
        
        // 3. Prevent Restore Prompt from hanging simulation
        File trace = new File("session.trace")
        if (trace.exists()) trace.delete()
        
        // 4. Initialize Game
        Game game = new Game(locus, mockInput)
        game.state.suppressRendering = true
        
        // 4. Execute Simulation
        try {
            game.start()
        } catch (Exception e) {
            Terminal.println "Simulation crashed: ${e.message}"
            e.printStackTrace()
        }
        
        // 5. Final render to capture state
        game.state.suppressRendering = false
        Map<String, Closure> options = game.state.currentLocation.getOptions(game)
        game.renderer.renderCurrentState(options)
        
        // 6. Capture final state from BridgeView
        return game.bridgeView.capture(game.inputHandler.getHistory())
    }
}
