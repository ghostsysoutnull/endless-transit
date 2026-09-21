package com.endlesstransit.core

import com.endlesstransit.model.Location
import groovy.transform.CompileStatic

/**
 * ItemCaptured: an InventoryItem entered the player's buffer at a location (Phase 10b).
 * Published by Player.capture(); location may be null when the capture has no locus.
 */
@CompileStatic
class ItemCaptured extends DomainEvent {
    final InventoryItem item
    final Location location

    ItemCaptured(InventoryItem item, Location location) {
        this.item = item
        this.location = location
        this.itemName = item.name
        this.lip = location?.getLIP()
    }
}
