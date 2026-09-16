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
    private InputHandler inputHandler
    private final ProceduralFactory factory

    PersistenceService(GameState state, NavigationOrchestrator navOrchestrator, InputHandler inputHandler, ProceduralFactory factory) {
        this.state = state
        this.navOrchestrator = navOrchestrator
        this.inputHandler = inputHandler
        this.factory = factory
    }

    GameMemento createMemento() {
        return new GameMemento(
            masterLocus: state.masterLocus,
            currentLIP: state.currentLocation.getLIP(),
            playerCoherence: state.player.coherence,
            inventory: new ArrayList<InventoryItem>(state.player.inventory),
            inputHistory: new ArrayList<String>(inputHandler.getHistory())
        )
    }

    void restore(GameMemento memento) {
        state.masterLocus = memento.masterLocus
        state.player = new Player(state.events)
        state.player.coherence = memento.playerCoherence
        state.player.inventory.addAll(memento.inventory)
        // Restore history in place: the handler is shared with other services,
        // so the instance must not be replaced (Phase 6b).
        inputHandler.restoreHistory(memento.inputHistory)
        
        navOrchestrator.initializeWorld()
        
        // Now navigate to the specific LIP
        Location target = WorldGenesis.resolveLIP(state.universe, memento.currentLIP)
        if (target != null) {
            navOrchestrator.enterLocation(target)
        }
    }

    void restoreSession(String saveFile) {
        GameSession snapshot = SyncManager.restore(factory, state.events, saveFile)
        if (!snapshot) return
        state.masterLocus = snapshot.locus
        state.player = snapshot.player
        state.currentLocation = snapshot.currentLocation
        state.universe = (Universe) state.currentLocation.findAncestor(Universe.class) ?: factory.createUniverse(state.masterLocus)
        state.instantRender = true
    }
}
