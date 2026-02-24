package com.endlesstransit.core
import com.endlesstransit.model.*
import com.endlesstransit.ui.*
import com.endlesstransit.procgen.*
import com.endlesstransit.*

class InventoryItem {
    String name
    int frequency
    int sessionMergeCount = 0

    InventoryItem(String name, int frequency, int sessionMergeCount = 0) {
        this.name = name
        this.frequency = frequency
        this.sessionMergeCount = sessionMergeCount
    }

    @Override
    String toString() {
        return "$name: $frequency"
    }
}
