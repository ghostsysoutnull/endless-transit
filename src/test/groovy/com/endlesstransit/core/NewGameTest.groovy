package com.endlesstransit.core
import com.endlesstransit.ui.Terminal

import groovy.test.GroovyTestCase
import com.endlesstransit.model.*

class NewGameTest extends GroovyTestCase {
    void testNewGameInitializationAndFirstRender() {
        Terminal.println "Stress testing game world initialization AND rendering with 50 random seeds..."
        // Disable sleep for tests to speed up the process
        Terminal.initialize(true, true)

        Random r = new Random()
        for (int i = 0; i < 50; i++) {
            long seed = r.nextLong()
            try {
                Game game = new Game(seed)
                assertNotNull("Game universe should be initialized", game.universe)
                assertNotNull("Current location should be set", game.currentLocation)
                
                // Simulate the first pass of the main loop before input
                game.bridgeView.renderBridgeHUD(game.currentLocation, game.player)
                game.bridgeView.renderAdaptiveBridge(game.currentLocation, game.player, game.masterLocus.value)
                
                // Verify no crash during option generation
                Map<String, Closure> options = game.currentLocation.getOptions(game)
                assertFalse("Initial location should have navigation options", options.isEmpty())
                
                // 3. Simulate first navigation step (Enter first building)
                String firstKey = (String) options.keySet().find { ((String)it).contains("Enter Building:") }
                if (firstKey != null) {
                    Terminal.println "  >> Testing navigation to: $firstKey"
                    options[firstKey].call()
                    assertNotNull("Should have moved to a building", game.currentLocation)
                    assertTrue("Should be in a building", game.currentLocation instanceof com.endlesstransit.model.Building)
                }
                
            } catch (Exception e) {
                Terminal.println "FAILURE with seed: $seed"
                e.printStackTrace()
                fail("Game initialization or FIRST RENDER failed for seed $seed: ${e.message}")
            }
        }
        Terminal.println "SUCCESS: 50 initializations and renders completed without error."
    }
}
