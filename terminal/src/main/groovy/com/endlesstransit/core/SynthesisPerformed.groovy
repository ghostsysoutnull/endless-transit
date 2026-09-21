package com.endlesstransit.core

import com.endlesstransit.model.Location
import groovy.transform.CompileStatic

/**
 * SynthesisPerformed: two fragments collapsed into a hybrid at a location (Phase 10b).
 * Published by Player.mergeItems(); location may be null when the merge has no locus.
 */
@CompileStatic
class SynthesisPerformed extends DomainEvent {
    final InventoryItem item
    final Location location

    SynthesisPerformed(InventoryItem item, Location location) {
        this.item = item
        this.location = location
        this.itemName = item.name
        this.lip = location?.getLIP()
    }
}
