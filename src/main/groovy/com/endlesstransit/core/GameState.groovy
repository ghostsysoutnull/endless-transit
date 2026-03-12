package com.endlesstransit.core

import com.endlesstransit.model.Location
import com.endlesstransit.model.Universe
import com.endlesstransit.procgen.LocusSeed
import com.endlesstransit.ui.BridgeView
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
    
    // Components that manage aspects of the state
    BridgeView bridgeView = new BridgeView()
    InputHandler inputHandler
    ActionMapper mapper = new ActionMapper()
    NavigationEngine navEngine = new NavigationEngine()
    QuantumBufferController inventoryController = new QuantumBufferController()

    GameState(LocusSeed locus, InputSource inputSource) {
        this.masterLocus = locus
        this.player = new Player()
        this.inputHandler = new InputHandler(inputSource)
    }
}
