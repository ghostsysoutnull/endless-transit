package com.endlesstransit.model

import groovy.transform.CompileStatic
import groovy.transform.Immutable

/**
 * DoorAppearance: Encapsulates the core physical attributes of a door.
 * Refactored to provide evocative narratives for sensory immersion.
 */
@CompileStatic
@Immutable
class DoorAppearance {
    String material    // e.g., "Heavy Bulkhead", "Synth-Glass Slab", "Pitted Concrete"
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

    /**
     * Returns an evocative sentence describing the physical sensation of the door.
     */
    String getNarrative() {
        String base = "A ${material.toLowerCase()}."
        if (material.contains("Bulkhead")) base = "A heavily reinforced poly-slab bulkhead."
        if (material.contains("Synth-Glass")) base = "A pristine synth-glass barrier, reflecting the corridor's dim light."
        if (material.contains("Concrete") || material.contains("Brutalist")) base = "A massive brutalist slab of pitted concrete."
        
        String stateDesc = ""
        switch (physicalState?.toLowerCase()) {
            case "vibrating": stateDesc = "The surface is vibrating with a low-frequency thrum."; break
            case "cold":      stateDesc = "The frame is ice-cold to the touch, pulling heat from your palm."; break
            case "rusted":    stateDesc = "The metal hinges are fused by deep, flakey oxidation."; break
            case "pitted":    stateDesc = "The surface is heavily scarred by micro-impacts and substrate decay."; break
            case "polished":  stateDesc = "The surface is perfectly smooth and sterile."; break
            case "static":    stateDesc = "The door is totally motionless, appearing almost like a static image."; break
            default:          stateDesc = "The structure appears stable."; break
        }
        
        return "${base} ${stateDesc}"
    }
}
