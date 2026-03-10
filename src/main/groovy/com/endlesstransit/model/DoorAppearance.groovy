package com.endlesstransit.model

import groovy.transform.CompileStatic
import groovy.transform.Immutable

/**
 * DoorAppearance: Encapsulates the core physical attributes of a door.
 */
@CompileStatic
@Immutable
class DoorAppearance {
    String material    // e.g., "Heavy Bulkhead", "Synth-Glass", "Concrete Slab"
    String physicalState // e.g., "Vibrating", "Cold", "Rusted", "Stable"
    
    /**
     * Returns the basic description for HUD lists.
     */
    String getBrief() {
        if (physicalState && physicalState != "Stable") {
            return "${material} [${physicalState.toUpperCase()}]"
        }
        return material
    }
}
