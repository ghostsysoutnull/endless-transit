package com.endlesstransit

class Player {
    List<Integer> inventory

    Player() {
        inventory = new ArrayList<Integer>()
    }

    void listInventory() {
        if (inventory.isEmpty()) {
            println("Your inventory is empty.")
        } else {
            println("Inventory:")
            inventory.each { item ->
                println("{$item}")
            }
        }
    }
}
