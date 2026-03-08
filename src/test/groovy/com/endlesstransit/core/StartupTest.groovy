package com.endlesstransit.core
import com.endlesstransit.model.*
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager

import groovy.test.GroovyTestCase

class StartupTest extends GroovyTestCase {
    void testGameInitialization() {
        try {
            def game = new Game()
            assertNotNull("Game should initialize", game)
            assertNotNull("Player should exist", game.player)
            assertNotNull("Current location should be set", game.currentLocation)
            
            // Simulate the first turn's context mapping
            Map<String, Closure> options = game.currentLocation.getOptions(game)
            assertNotNull("Initial location should have options", options)
            assertFalse("Options should not be empty", options.isEmpty())
            
            game.mapper.update(options)
            
            // Test getActionName for the initial state (lastChoice is null)
            String lastActionName = game.mapper.getActionName(game.navEngine.lastChoice)
            assertEquals("Initial last choice name should be empty", "", lastActionName)
            
            println "SUCCESS: Game initialization and first turn context verified."
        } catch (Throwable t) {
            fail("Game failed to initialize or prepare first turn: ${t.message}")
        }
    }
}
