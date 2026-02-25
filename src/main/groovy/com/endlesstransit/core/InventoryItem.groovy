package com.endlesstransit.core
import com.endlesstransit.model.*
import com.endlesstransit.ui.*
import com.endlesstransit.procgen.*
import com.endlesstransit.*

class InventoryItem {
    String name
    int frequency
    int sessionMergeCount = 0
    boolean isKeystone = false

    InventoryItem(String name, int frequency, int sessionMergeCount = 0, boolean isKeystone = false) {
        this.name = name
        this.frequency = frequency
        this.sessionMergeCount = sessionMergeCount
        this.isKeystone = isKeystone
    }

    @Override
    String toString() {
        return "$name: $frequency"
    }
}
