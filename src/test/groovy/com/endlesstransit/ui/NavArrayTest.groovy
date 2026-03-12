package com.endlesstransit.ui
import com.endlesstransit.ui.Terminal
import com.endlesstransit.core.Game
import com.endlesstransit.model.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import static org.junit.jupiter.api.Assertions.*

class NavArrayTest {

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
    }

    @Test
    void testCompassLabelExtraction() {
        def game = new Game()
        def options = [
            "u. Go Up": {},
            "d. Go Down": {},
            "1. Enter: Floor 16": {},
            "l. Leave Building": {}
        ]
        
        assertEquals("Go Up", game.bridgeView.getCompassLabel("u.", options))
        assertEquals("Go Down", game.bridgeView.getCompassLabel("d.", options))
        assertEquals("Leave Building", game.bridgeView.getCompassLabel("l.", options))
        // Special case: numbered options are not directions in the current logic
        assertEquals("", game.bridgeView.getCompassLabel("f.", options))
    }

    @Test
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
            game.bridgeView.renderCompass(game.currentLocation, options)
            Terminal.println "SUCCESS: Vector Array rendered without crash."
        } catch (Exception e) {
            fail("Compass rendering failed: ${e.message}")
        }
    }
}
