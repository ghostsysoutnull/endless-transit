package com.endlesstransit.core
import groovy.transform.CompileStatic

@CompileStatic
class InventoryItem {
    String name
    SpectralFrequency frequency
    int sessionMergeCount = 0
    boolean isKeystone = false
    /** HK-018: the LIP of the building a Keystone opens. The name is display only; null opens nothing. */
    String boundLip

    InventoryItem(String name, int freqValue, int sessionMergeCount = 0, boolean isKeystone = false, String boundLip = null) {
        this.name = name
        this.frequency = new SpectralFrequency(freqValue)
        this.sessionMergeCount = sessionMergeCount
        this.isKeystone = isKeystone
        this.boundLip = boundLip
    }

    @Override
    String toString() {
        return "$name: ${frequency.value}"
    }
}
