package com.endlesstransit.core

import com.endlesstransit.model.*
import com.endlesstransit.ui.*
import com.endlesstransit.procgen.*
import com.endlesstransit.ui.Terminal
import groovy.transform.CompileStatic

/**
 * Game: The high-level orchestrator of the Endless Transit engine.
 * Coordinates input, action mapping, navigation, and world state through specialized services.
 */
@CompileStatic
class Game {
    GameState state
    OutputFormatter fmt
    /** The world generator (HK-008): one per game, built with this game's formatter, never a static. */
    final ProceduralFactory factory

    // Services
    NavigationOrchestrator navOrchestrator
    PersistenceService persistence
    TurnProcessor turnProcessor
    RenderingCoordinator renderer
    final QuantumBufferController inventoryController = new QuantumBufferController()
    /** The session scribe (HK-011): one per Game, attached to the bus, read by the HUD ticker. */
    final JournalManager journal = new JournalManager()
    /** Where this game saves and restores its neural trace (HK-012). Tests point it at a scratch file. */
    String saveFile = SyncManager.SAVE_FILE

    Game(long seedValue = System.currentTimeMillis(), InputSource inputSource = null) {
        this(new LocusSeed(seedValue), inputSource)
    }

    Game(LocusSeed masterLocus, InputSource inputSource = null) {
        this.fmt = new com.endlesstransit.ui.StandardTerminalAdapter()
        this.factory = new ProceduralFactory(fmt)
        this.state = new GameState(masterLocus)
        journal.attach(state.events)
        new RitualTracker().attach(state.events)
        InputHandler inputHandler = new InputHandler(inputSource ?: InputHandler.defaultSource)
        this.navOrchestrator = new NavigationOrchestrator(state, factory)
        this.persistence = new PersistenceService(state, navOrchestrator, inputHandler, factory)
        this.renderer = new RenderingCoordinator(state, inputHandler, journal)
        this.turnProcessor = new TurnProcessor(state, renderer, navOrchestrator, inputHandler)
        
        navOrchestrator.initializeWorld()
    }

    // --- Convenience Accessors for External API ---
    Universe getUniverse() { state.universe }
    Location getCurrentLocation() { state.currentLocation }
    void setCurrentLocation(Location l) { state.currentLocation = l }
    Player getPlayer() { state.player }
    void setPlayer(Player p) { state.player = p }
    LocusSeed getMasterLocus() { state.masterLocus }
    InputHandler getInputHandler() { turnProcessor.inputHandler }
    ActionMapper getMapper() { turnProcessor.mapper }
    NavigationEngine getNavEngine() { navOrchestrator.navEngine }
    BridgeView getBridgeView() { renderer.bridgeView }
    boolean getInstantRender() { state.instantRender }
    void setInstantRender(boolean v) { state.instantRender = v }

    GameMemento createMemento() { persistence.createMemento() }
    void restore(GameMemento memento) { persistence.restore(memento) }
    void restoreSession() { persistence.restoreSession(saveFile) }

    boolean processTurn() { turnProcessor.processTurn() }
    boolean handleInput() { turnProcessor.handleInput(this) }

    /**
     * Directly processes an input string, bypassing the InputSource.
     * Useful for automated testing of commands.
     */
    void processInput(String choice) {
        turnProcessor.dispatch(this, choice)
    }

    // WF-005: the loop's catch-all reports the failure and exits; the test runner's abort hook depends on it.
    @SuppressWarnings('SystemExit')
    void start() {
        Terminal.println(Terminal.colorize("Welcome to Endless Transit!", Terminal.L_CYAN))
        Logger.info("Game started.")
        journal.startSession(state.player)
        
        if (new File(saveFile).exists()) {
            Terminal.println Terminal.dim("  [DETECTED_NEURAL_TRACE_SUBSTRATE]")
            Terminal.print Terminal.colorize("  Restore previous session? [y/N]: ", Terminal.YELLOW)
            if (turnProcessor.inputHandler.readLine().toLowerCase() == "y") persistence.restoreSession(saveFile)
        }
        
        try {
            while (true) {
                // 1. Process Turn Context (Coherence & Events)
                if (!turnProcessor.processTurn()) break

                // 2. Map Actions
                Map<String, Closure> options = state.currentLocation.getOptions(this)
                turnProcessor.mapper.update(options)
                navOrchestrator.navEngine.updateRepetitionContext(turnProcessor.mapper, options)

                // 3. Render
                if (!state.suppressRendering) {
                    renderer.renderCurrentState(options)
                }
                
                // 4. Input & Dispatch
                if (!turnProcessor.handleInput(this)) break
            }
        } catch (Throwable t) {
            Logger.reportCriticalFailure(state.currentLocation, state.player, navOrchestrator.navEngine.lastChoice, state.masterLocus, t)
            Terminal.println(Terminal.colorize("\n!!! CRITICAL SYSTEM FAILURE DETECTED !!!", Terminal.RED))
            System.exit(1)
        }
    }

    // --- Delegation to NavOrchestrator ---
    void enterLocation(Location loc) { navOrchestrator.enterLocation(loc) }
    void exitLocation() { navOrchestrator.exitLocation() }
}
