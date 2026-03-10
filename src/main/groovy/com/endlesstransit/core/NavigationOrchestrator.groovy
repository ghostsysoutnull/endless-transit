package com.endlesstransit.core

import com.endlesstransit.model.*
import com.endlesstransit.procgen.WorldGenesis
import com.endlesstransit.ui.*
import groovy.transform.CompileStatic

/**
 * NavigationOrchestrator: Manages world initialization and location transitions.
 */
@CompileStatic
class NavigationOrchestrator {
    private GameState state

    NavigationOrchestrator(GameState state) {
        this.state = state
    }

    void initializeWorld() {
        WorldGenesis.GenesisResult result = WorldGenesis.createInitialWorld(state.masterLocus)
        state.universe = result.universe
        enterLocation(result.startLocation)
    }

    void enterLocation(Location loc) {
        if (!loc) return
        state.currentLocation = loc
        state.player.currentLocation = loc
        state.player.markFootprint(loc)
        Location p = loc.parent
        while (p) { 
            if (p instanceof Building || p instanceof City || p instanceof Planet) {
                state.player.markFootprint(p)
            }
            p = p.parent 
        }
    }
    
    void exitLocation() {
        if (state.currentLocation.parent) {
            enterLocation(state.currentLocation.parent)
        } else {
            Terminal.println "End of reality reached."
        }
    }
}
