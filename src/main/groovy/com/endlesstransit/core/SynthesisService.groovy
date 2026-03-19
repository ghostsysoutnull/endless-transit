package com.endlesstransit.core
import com.endlesstransit.model.Building
import com.endlesstransit.model.Location
import groovy.transform.CompileStatic

/**
 * Encapsulates the synthesis policy for merging two inventory fragments.
 * Handles keystone detection, frequency calculation, name construction, and
 * InventoryItem creation. Extracted from Player.mergeItems() — Phase 4b.
 */
@CompileStatic
class SynthesisService {
    InventoryItem synthesize(InventoryItem item1, InventoryItem item2,
                             Location location, List<InventoryItem> currentInventory) {
        Building bldg = (Building) location?.findAncestor(Building.class)
        boolean createKeystone = bldg != null && bldg.isPrimed() &&
            !currentInventory.any { it.isKeystone && it.name.contains(bldg.name) }

        int newFreq     = createKeystone ? 0 : item1.frequency.value + item2.frequency.value
        String newName  = createKeystone
            ? "${bldg.name} Keystone"
            : "${item1.name.split(' ')[0]}-${item2.name.split(' ')[0]} Hybrid"
        int newMergeCount = (item1.sessionMergeCount ?: 0) + (item2.sessionMergeCount ?: 0) + 1

        return new InventoryItem(newName, newFreq, newMergeCount, createKeystone)
    }
}
