package com.endlesstransit.core

import com.endlesstransit.model.Building
import com.endlesstransit.ui.Terminal
import groovy.transform.CompileStatic

@CompileStatic
class PrimeBuildingCommand implements LatticeCommand {
    String getLabel() { "PRIME" }
    String getDescription() { "Instantly sample all floors and set infusion count." }

    @Override
    boolean shouldCloseMenu() { false }

    @Override
    boolean execute(Game game, String choice = null) {
        Building bldg = (Building) game.currentLocation.findAncestor(Building.class)
        if (bldg != null) {
            for (int i = 0; i < bldg.maxFloors; i++) bldg.notifySampled(i)
            bldg.infusionCount = 7
            Terminal.println Terminal.colorize(">>> Building ${bldg.name} PRIMED.", Terminal.GREEN)
        } else {
            Terminal.println Terminal.colorize(">>> ERROR: No building ancestor found.", Terminal.RED)
        }
        return true
    }
}
