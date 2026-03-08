package com.endlesstransit.core

import com.endlesstransit.model.Building
import com.endlesstransit.ui.Terminal
import groovy.transform.CompileStatic

@CompileStatic
class BreachBedrockCommand implements LatticeCommand {
    String getLabel() { "BREACH" }
    String getDescription() { "Instantly breach bedrock and teleport to Layer -1." }

    boolean execute(Game game) {
        Building bldg = (Building) game.currentLocation.findAncestor(Building.class)
        if (bldg != null) {
            bldg.isBreached = true
            game.enterLocation(bldg.getFloor(-1))
            println Terminal.colorize(">>> BREACHED. Descent initiated.", Terminal.RED)
            return true // Close menu
        } else {
            println Terminal.colorize(">>> ERROR: No building ancestor found.", Terminal.RED)
        }
        return false
    }
}
