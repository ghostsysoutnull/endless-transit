package com.endlesstransit.core

import com.endlesstransit.model.Building
import com.endlesstransit.ui.Terminal
import groovy.transform.CompileStatic

@CompileStatic
class BreachBedrockCommand implements LatticeCommand {
    String getLabel() { "BREACH" }
    String getDescription() { "Instantly breach bedrock and teleport to Layer -1." }

    @Override
    boolean shouldCloseMenu() { true }

    @Override
    boolean execute(Game game, String choice = null) {
        Building bldg = (Building) game.currentLocation.findAncestor(Building.class)
        if (bldg != null) {
            bldg.isBreached = true
            game.enterLocation(bldg.getFloor(-1))
            Terminal.println Terminal.colorize(">>> BREACHED. Descent initiated.", Terminal.RED)
        } else {
            Terminal.println Terminal.colorize(">>> ERROR: No building ancestor found.", Terminal.RED)
        }
        return true 
    }
}
