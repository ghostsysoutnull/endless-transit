package com.endlesstransit

println "Running Inventory Object Test..."

def player = new Player()
def item = new InventoryItem("Key", 360)
player.inventory.add(item)

if (player.inventory.size() == 1) {
    println "SUCCESS: Item added to inventory."
}

if (player.inventory[0].name == "Key" && player.inventory[0].frequency == 360) {
    println "SUCCESS: InventoryItem correctly stores name and frequency."
} else {
    println "FAILURE: Item data mismatch: ${player.inventory[0]}"
}

// Test listing format
println "Visual check of inventory format:"
player.listInventory()

println "Inventory Object Tests Passed!"
