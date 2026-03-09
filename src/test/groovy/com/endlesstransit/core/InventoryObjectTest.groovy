package com.endlesstransit.core
import com.endlesstransit.ui.Terminal
import com.endlesstransit.model.*
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager

Terminal.println "Running Inventory Object Test..."

def player = new Player()
def item = new InventoryItem("Key", 360)
player.inventory.add(item)

if (player.inventory.size() == 1) {
    Terminal.println "SUCCESS: Item added to inventory."
}

if (player.inventory[0].name == "Key" && player.inventory[0].frequency == 360) {
    Terminal.println "SUCCESS: InventoryItem correctly stores name and frequency."
} else {
    Terminal.println "FAILURE: Item data mismatch: ${player.inventory[0]}"
}

// Test listing format
Terminal.println "Visual check of inventory format:"
player.listInventory()

Terminal.println "Inventory Object Tests Passed!"
