package com.endlesstransit.core

import com.endlesstransit.model.*
import com.endlesstransit.ui.*
import com.endlesstransit.procgen.*
import com.endlesstransit.ui.Terminal
import com.endlesstransit.ui.SessionRecap
import groovy.transform.CompileStatic
import java.io.File

/**
 * Game: The high-level orchestrator of the Endless Transit engine.
 * Coordinates input, action mapping, navigation, and world state through specialized services.
 */
@CompileStatic
class Game {
    GameState state
    
    // Services
    NavigationOrchestrator navOrchestrator
    PersistenceService persistence
    TurnProcessor turnProcessor
    RenderingCoordinator renderer

    Game(long seedValue = System.currentTimeMillis(), InputSource inputSource = null) {
        this(new LocusSeed(seedValue), inputSource)
    }

    Game(LocusSeed masterLocus, InputSource inputSource = null) {
        ModelOutput.fmt = new com.endlesstransit.ui.StandardTerminalAdapter()
        this.state = new GameState(masterLocus, inputSource ?: InputHandler.defaultSource)
        this.navOrchestrator = new NavigationOrchestrator(state)
        this.persistence = new PersistenceService(state, navOrchestrator)
        this.renderer = new RenderingCoordinator(state)
        this.turnProcessor = new TurnProcessor(state, renderer, navOrchestrator)
        
        navOrchestrator.initializeWorld()
    }

    // --- Convenience Accessors for External API ---
    Universe getUniverse() { state.universe }
    Location getCurrentLocation() { state.currentLocation }
    void setCurrentLocation(Location l) { state.currentLocation = l }
    Player getPlayer() { state.player }
    void setPlayer(Player p) { state.player = p }
    LocusSeed getMasterLocus() { state.masterLocus }
    InputHandler getInputHandler() { state.inputHandler }
    ActionMapper getMapper() { state.mapper }
    NavigationEngine getNavEngine() { state.navEngine }
    BridgeView getBridgeView() { state.bridgeView }
    boolean getInstantRender() { state.instantRender }
    void setInstantRender(boolean v) { state.instantRender = v }

    GameMemento createMemento() { persistence.createMemento() }
    void restore(GameMemento memento) { persistence.restore(memento) }
    void restoreSession() { persistence.restoreSession() }

    boolean processTurn() { turnProcessor.processTurn() }
    boolean handleInput() { turnProcessor.handleInput(this) }

    /**
     * Directly processes an input string, bypassing the InputSource.
     * Useful for automated testing of commands.
     */
    void processInput(String choice) {
        // Handle global commands first (mimicking TurnProcessor.handleInput)
        switch (choice) {
            case "s": new ScanCommand().execute(this); return
            case "sync": SyncManager.sync(this); return
            case "map": renderer.renderLatticeMap(); return
            case "lattice":
            case "ll": renderer.renderLatticeTrace(); return
        }

        Closure action = state.mapper.resolve(choice, state.inputHandler)
        if (action) {
            state.player.stepCount++
            state.navEngine.recordChoice(choice)
            action.call()
        }
    }

    void start() {
        Terminal.println(Terminal.colorize("Welcome to Endless Transit!", Terminal.L_CYAN))
        Logger.info("Game started.")
        JournalManager.startSession(state.player)
        
        if (new File(SyncManager.SAVE_FILE).exists()) {
            Terminal.println Terminal.dim("  [DETECTED_NEURAL_TRACE_SUBSTRATE]")
            Terminal.print Terminal.colorize("  Restore previous session? [y/N]: ", Terminal.YELLOW)
            if (state.inputHandler.readLine().toLowerCase() == "y") persistence.restoreSession()
        }
        
        try {
            while (true) {
                // 1. Process Turn Context (Coherence & Events)
                if (!turnProcessor.processTurn()) break

                // 2. Map Actions
                Map<String, Closure> options = state.currentLocation.getOptions(this)
                state.mapper.update(options)
                state.navEngine.updateRepetitionContext(state.mapper, options)

                // 3. Render
                renderer.renderCurrentState(options)
                
                // 4. Input & Dispatch
                if (!turnProcessor.handleInput(this)) break
            }
        } catch (Throwable t) {
            Logger.reportCriticalFailure(state.currentLocation, state.player, state.navEngine.lastChoice, state.masterLocus, t)
            Terminal.println(Terminal.colorize("\n!!! CRITICAL SYSTEM FAILURE DETECTED !!!", Terminal.RED))
            System.exit(1)
        }
    }

    // --- Delegation to NavOrchestrator ---
    void enterLocation(Location loc) { navOrchestrator.enterLocation(loc) }
    void exitLocation() { navOrchestrator.exitLocation() }
}
