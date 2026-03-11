package com.endlesstransit.core

import groovy.transform.CompileStatic

/**
 * InventoryCommand: Opens the player's neural substrate inventory.
 */
@CompileStatic
class InventoryCommand implements GameCommand {
    @Override String getLabel() { "Inventory" }
    @Override String getDescription() { "Access stored items and neural artifacts." }

    @Override
    boolean execute(Game game, String choice = null) {
        game.state.inventoryController.open(game)
        return true
    }
}
