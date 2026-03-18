package com.endlesstransit.core
import groovy.transform.CompileStatic

@CompileStatic
class InventoryItem {
    String name
    SpectralFrequency frequency
    int sessionMergeCount = 0
    boolean isKeystone = false

    InventoryItem(String name, int freqValue, int sessionMergeCount = 0, boolean isKeystone = false) {
        this.name = name
        this.frequency = new SpectralFrequency(freqValue)
        this.sessionMergeCount = sessionMergeCount
        this.isKeystone = isKeystone
    }

    @Override
    String toString() {
        return "$name: ${frequency.value}"
    }
}
