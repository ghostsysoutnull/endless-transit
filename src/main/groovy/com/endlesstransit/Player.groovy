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
            println(Terminal.dim("Your inventory is empty."))
        } else {
            println(Terminal.colorize("INVENTORY:", Terminal.L_CYAN))
            inventory.each { item ->
                String freq = String.format("%04d", item.frequency)
                println(" - ${Terminal.dim(freq + "Hz")} ${Terminal.bold(item.name)}")
            }
        }
    }
}
