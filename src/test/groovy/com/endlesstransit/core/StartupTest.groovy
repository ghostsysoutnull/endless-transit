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
            println "SUCCESS: Game initialized without GroovyCastException."
        } catch (Throwable t) {
            fail("Game failed to initialize: ${t.message}")
        }
    }
}
