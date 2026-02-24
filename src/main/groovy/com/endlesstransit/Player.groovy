package com.endlesstransit

class Player {
    List<InventoryItem> inventory
    int stepCount = 0

    Player() {
        inventory = new ArrayList<InventoryItem>()
        stepCount = 0
    }

    void listInventory() {
        if (inventory.isEmpty()) {
            println("Your inventory is empty.")
        } else {
            println("Inventory:")
            inventory.each { item ->
                println(" - $item")
            }
        }
    }
}
