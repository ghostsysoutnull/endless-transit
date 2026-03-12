package com.endlesstransit.ui
import com.endlesstransit.model.*
import com.endlesstransit.core.*
import com.endlesstransit.procgen.LocusSeed
import com.endlesstransit.procgen.ProceduralFactory
import com.endlesstransit.ui.Terminal
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach

class InitialScreenTest {

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
    }

    @Test
    void execute() {
        Terminal.println "--- RENDERING INITIAL SCREEN PREVIEW ---"

        // 1. Setup stabilized environment
        long masterSeed = 12345L
        def game = new Game(masterSeed) // Fixed seed for stable names
        def player = game.player
        def universe = game.universe

        // 2. Setup a specific Street context
        Street street = (Street) universe.getFilaments()[0].getChildren()[0].getChildren()[0].getPlanets()[0].getCountries()[0].getCities()[0].getStreets()[0]
        game.currentLocation = street
        street.ensureChildrenPopulated()

        // 3. Render the HUD
        Terminal.println "\n[HUD_PREVIEW]"
        game.bridgeView.renderBridgeHUD(game.currentLocation, player)

        // 4. Render the Adaptive Bridge (Split Pane)
        Terminal.println "\n[ADAPTIVE_BRIDGE_PREVIEW]"
        game.bridgeView.renderAdaptiveBridge(game.currentLocation, player, game.masterLocus)

        // 5. Render the Compass
        Terminal.println "\n[COMPASS_PREVIEW]"
        def options = street.getOptions(game)
        game.bridgeView.renderCompass(game.currentLocation, options)

        // 6. Render Building Diagnostics (Stress Test Alignment)
        Terminal.println "\n[BUILDING_DIAGNOSTICS_PREVIEW]"
        Building bld = street.getBuildings()[0]
        bld.markVisited()
        bld.getFloor(0).markVisited()
        bld.getFloor(1).markVisited()
        game.enterLocation(bld.getFloor(1)) // Correctly updates player and game state
        game.bridgeView.renderAdaptiveBridge(game.currentLocation, player, game.masterLocus)

        Terminal.println "\n--- PREVIEW COMPLETE ---"
        Terminal.println "Check the alignment of the ║ borders and the [╬] pivot."
    }
}
