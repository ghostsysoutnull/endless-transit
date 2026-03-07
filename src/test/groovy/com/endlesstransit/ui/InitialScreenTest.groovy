package com.endlesstransit.ui
import com.endlesstransit.model.*
import com.endlesstransit.core.*
import com.endlesstransit.ui.Terminal

println "--- RENDERING INITIAL SCREEN PREVIEW ---"

// 1. Setup stabilized environment
def game = new Game(12345) // Fixed seed for stable names
def player = game.player
def universe = game.universe

// 2. Setup a specific Street context
Street street = (Street) universe.filaments[0].children[0].children[0].getPlanets()[0].getCountries()[0].getCities()[0].getStreets()[0]
game.currentLocation = street
street.ensureChildrenPopulated()

// 3. Render the HUD
println "\n[HUD_PREVIEW]"
game.renderBridgeHUD()

// 4. Render the Adaptive Bridge (Split Pane)
println "\n[ADAPTIVE_BRIDGE_PREVIEW]"
game.renderAdaptiveBridge()

// 5. Render the Compass
println "\n[COMPASS_PREVIEW]"
def options = street.getOptions(game)
game.renderCompass(options)

println "\n--- PREVIEW COMPLETE ---"
println "Check the alignment of the ║ borders and the [╬] pivot."
