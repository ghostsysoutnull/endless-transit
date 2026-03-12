package com.endlesstransit.core
import com.endlesstransit.ui.Terminal
import com.endlesstransit.model.*
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager
import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*

class StartupTest {
    @Test
    void testGameInitialization() {
        try {
            def game = new Game()
            assertNotNull(game, "Game should initialize")
            assertNotNull(game.player, "Player should exist")
            assertNotNull(game.currentLocation, "Current location should be set")
            
            // Simulate the first turn's context mapping
            Map<String, Closure> options = game.currentLocation.getOptions(game)
            assertNotNull(options, "Initial location should have options")
            assertFalse(options.isEmpty(), "Options should not be empty")
            
            game.mapper.update(options)
            
            // Test getActionName for the initial state (lastChoice is null)
            String lastActionName = game.mapper.getActionName(game.navEngine.lastChoice)
            assertEquals("", lastActionName, "Initial last choice name should be empty")
            
            Terminal.println "SUCCESS: Game initialization and first turn context verified."
        } catch (Throwable t) {
            fail("Game failed to initialize or prepare first turn: ${t.message}")
        }
    }
}
