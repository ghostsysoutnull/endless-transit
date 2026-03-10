package com.endlesstransit.core

import com.endlesstransit.model.*
import com.endlesstransit.procgen.*
import com.endlesstransit.ui.*
import groovy.transform.CompileStatic
import java.io.File

/**
 * PersistenceService: Manages saving, loading, and memento creation.
 */
@CompileStatic
class PersistenceService {
    private GameState state
    private NavigationOrchestrator navOrchestrator

    PersistenceService(GameState state, NavigationOrchestrator navOrchestrator) {
        this.state = state
        this.navOrchestrator = navOrchestrator
    }

    GameMemento createMemento() {
        return new GameMemento(
            masterSeed: state.masterLocus.value,
            currentLIP: state.currentLocation.getLIP(),
            playerCoherence: state.player.coherence,
            inventory: new ArrayList<InventoryItem>(state.player.inventory),
            inputHistory: new ArrayList<String>(state.inputHandler.getHistory())
        )
    }

    void restore(GameMemento memento) {
        state.masterLocus = new LocusSeed(memento.masterSeed)
        state.player = new Player()
        state.player.coherence = memento.playerCoherence
        state.player.inventory.addAll(memento.inventory)
        state.inputHandler = new InputHandler(state.inputHandler.source)
        state.inputHandler.restoreHistory(memento.inputHistory)
        
        navOrchestrator.initializeWorld()
        
        // Now navigate to the specific LIP
        Location target = WorldGenesis.resolveLIP(state.universe, memento.currentLIP)
        if (target != null) {
            navOrchestrator.enterLocation(target)
        }
    }

    void restoreSession() {
        GameSession snapshot = SyncManager.restore()
        if (!snapshot) return
        state.masterLocus = snapshot.locus
        state.player = snapshot.player
        state.currentLocation = snapshot.currentLocation
        state.universe = (Universe) state.currentLocation.findAncestor(Universe.class) ?: ProceduralFactory.instance.createUniverse(state.masterLocus)
        state.instantRender = true
    }
}
