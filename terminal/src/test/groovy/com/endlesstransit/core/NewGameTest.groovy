package com.endlesstransit.core
import com.endlesstransit.ui.Terminal
import com.endlesstransit.model.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.DisplayName
import static org.junit.jupiter.api.Assertions.*

class NewGameTest {
    @Test
    @DisplayName("Stress test game world initialization and first render")
    void testNewGameInitializationAndFirstRender() {
        Terminal.println "Stress testing game world initialization AND rendering with 50 random seeds..."
        // Disable sleep for tests to speed up the process
        Terminal.initialize(true, true)

        Random r = new Random()
        for (int i = 0; i < 50; i++) {
            long seed = r.nextLong()
            try {
                Game game = new Game(seed)
                assertNotNull(game.universe, "Game universe should be initialized")
                assertNotNull(game.currentLocation, "Current location should be set")
                
                // Simulate the first pass of the main loop before input
                game.bridgeView.renderBridgeHUD(game.currentLocation, game.player)
                game.bridgeView.renderAdaptiveBridge(game.currentLocation, game.player, game.masterLocus)
                
                // Verify no crash during option generation
                Map<String, Closure> options = game.currentLocation.getOptions(game)
                assertFalse(options.isEmpty(), "Initial location should have navigation options")
                
                // 3. Simulate first navigation step (Enter first building)
                String firstKey = (String) options.keySet().find { ((String)it).contains("Enter Building:") }
                if (firstKey != null) {
                    Terminal.println "  >> Testing navigation to: $firstKey"
                    options[firstKey].call()
                    assertNotNull(game.currentLocation, "Should have moved to a building")
                    assertTrue(game.currentLocation instanceof com.endlesstransit.model.Building, "Should be in a building")
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
