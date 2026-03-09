package com.endlesstransit.core
import com.endlesstransit.ui.Terminal
import com.endlesstransit.model.*
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager

Terminal.println "Running Single Object Automatic Take Test..."

def player = new Player()
def game = new Game()
game.player = player

// Setup a room with exactly one object
def room = new Room()
room.objects = ["Singular Crystal"]
room.markVisited()

def options = room.getOptions(game)
def takeAction = options["t. Interact with objects"]

if (takeAction) {
    Terminal.println "Executing take action for single object..."
    
    // We need to mock or handle the printlns and game.instantRender
    // Since it's a Closure, we just call it.
    takeAction.call()
    
    if (player.inventory.size() == 1 && player.inventory[0].name == "Singular Crystal") {
        Terminal.println "SUCCESS: Object was taken automatically."
    } else {
        Terminal.println "FAILURE: Object was not taken. Inventory size: ${player.inventory.size()}"
        System.exit(1)
    }
    
    if (room.objects.isEmpty()) {
        Terminal.println "SUCCESS: Object was removed from room."
    } else {
        Terminal.println "FAILURE: Object remains in room."
        System.exit(1)
    }
} else {
    Terminal.println "FAILURE: Take option not found in room."
    System.exit(1)
}

Terminal.println "All Single Object Take Tests Passed!"
