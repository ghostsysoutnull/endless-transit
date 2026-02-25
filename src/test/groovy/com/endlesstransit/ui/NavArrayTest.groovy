package com.endlesstransit.ui
import com.endlesstransit.core.Game
import com.endlesstransit.model.*
import groovy.test.GroovyTestCase

class NavArrayTest extends GroovyTestCase {
    void testCompassLabelExtraction() {
        def game = new Game()
        def options = [
            "u. Go Up": {},
            "d. Go Down": {},
            "1. Enter: Floor 16": {},
            "l. Leave Building": {}
        ]
        
        assertEquals("Go Up", game.getCompassLabel("u.", options))
        assertEquals("Go Down", game.getCompassLabel("d.", options))
        assertEquals("Leave Building", game.getCompassLabel("l.", options))
        // Special case: numbered options are not directions in the current logic
        assertEquals("", game.getCompassLabel("f.", options))
    }

    void testVectorRenderingStability() {
        def game = new Game()
        game.currentLocation = new Street("Test")
        // Mock options for a Room (linear navigation)
        def options = [
            "f. Go forward": {},
            "b. Go back": {}
        ]
        
        // Simply ensure it doesn't crash during rendering
        try {
            game.renderCompass(options)
            println "SUCCESS: Vector Array rendered without crash."
        } catch (Exception e) {
            fail("Compass rendering failed: ${e.message}")
        }
    }
}
