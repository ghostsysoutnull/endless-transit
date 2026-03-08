package com.endlesstransit.core

import com.endlesstransit.model.Location
import groovy.transform.CompileStatic

/**
 * NavigationEngine: Manages behavioral rules for moving through the world.
 * Encapsulates repetition logic and boundary-based auto-reversal.
 */
@CompileStatic
class NavigationEngine {
    String lastChoice
    
    /**
     * Updates the lastChoice for repetition logic based on the new location's options.
     * If the user was "leaving", we find the equivalent "leave" key in the new room.
     */
    void updateRepetitionContext(ActionMapper mapper, Map<String, Closure> options) {
        if (lastChoice == null) return
        
        String prevLabel = mapper.getActionName(lastChoice).toLowerCase()
        if (prevLabel.contains("leave") || prevLabel.contains("exit") || prevLabel.contains("go back")) {
            // Find the new "leave" key in this location
            def newLeaveEntry = options.find { String k, Closure v -> 
                String l = k.toLowerCase()
                l.contains("leave") || l.contains("exit") || l.contains("go back")
            }
            
            if (newLeaveEntry != null) {
                String newLeaveKey = (String) newLeaveEntry.key
                lastChoice = newLeaveKey.contains(".") ? newLeaveKey.split("\\.")[0].trim() : newLeaveKey
                Logger.info("NAV_ENGINE: Auto-mapped repetition key: $lastChoice")
            }
        }
    }

    /**
     * Checks if a boundary (e.g., end of a corridor) was reached and 
     * automatically reverses the direction if the user provided empty input.
     * Returns the new choice if reversed, or null otherwise.
     */
    String checkBoundaryReversal(String rawInput, ActionMapper mapper) {
        if (rawInput != "" || lastChoice == null) return null
        
        Map<String, String> reversalPairs = ["f": "b", "b": "f", "u": "d", "d": "u"]
        String oppositeKey = reversalPairs[lastChoice]
        
        if (oppositeKey && !mapper.hasOption(lastChoice) && mapper.hasOption(oppositeKey)) {
            println "Boundary reached. Reversing direction."
            lastChoice = oppositeKey
            return oppositeKey
        }
        
        return null
    }

    /**
     * Records a successful navigation choice.
     */
    void recordChoice(String choice) {
        this.lastChoice = choice
    }

    String getLastChoice() {
        return lastChoice
    }
}
