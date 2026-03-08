package com.endlesstransit.core

import com.endlesstransit.model.Building
import com.endlesstransit.ui.Terminal
import groovy.transform.CompileStatic

@CompileStatic
class SpawnKeystoneCommand implements LatticeCommand {
    String getLabel() { "KEYSTONE" }
    String getDescription() { "Spawn current building's Keystone fragment." }

    boolean execute(Game game) {
        Building bldg = (Building) game.currentLocation.findAncestor(Building.class)
        if (bldg != null) {
            game.player.inventory << new com.endlesstransit.core.InventoryItem("${bldg.name} Keystone", 0, 0, true)
            println Terminal.colorize(">>> KEYSTONE generated in Trace Buffer.", Terminal.GREEN)
        } else {
            println Terminal.colorize(">>> ERROR: No building ancestor found.", Terminal.RED)
        }
        return false
    }
}
