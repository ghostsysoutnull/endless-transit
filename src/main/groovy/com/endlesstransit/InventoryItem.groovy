package com.endlesstransit

class InventoryItem {
    String name
    int frequency

    InventoryItem(String name, int frequency) {
        this.name = name
        this.frequency = frequency
    }

    @Override
    String toString() {
        return "$name: $frequency"
    }
}
