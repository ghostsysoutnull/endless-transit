package com.endlesstransit.core

import com.endlesstransit.model.Location
import com.endlesstransit.model.Universe
import com.endlesstransit.procgen.LocusSeed
import groovy.transform.CompileStatic

/**
 * GameState: The central container for all live game data.
 */
@CompileStatic
class GameState {
    Universe universe
    Location currentLocation
    Player player
    boolean instantRender = false
    boolean suppressRendering = false
    LocusSeed masterLocus

    GameState(LocusSeed locus) {
        this.masterLocus = locus
        this.player = new Player()
    }
}
