package com.endlesstransit

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
