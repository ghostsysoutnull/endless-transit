package com.endlesstransit.core

import com.endlesstransit.model.*
import com.endlesstransit.ui.*
import groovy.transform.CompileStatic

/**
 * TurnProcessor: Manages the game loop, turn processing, and input dispatching.
 * Refactored to use Command Dispatch system (Phase 2.2).
 */
@CompileStatic
class TurnProcessor {
    private GameState state
    private RenderingCoordinator renderer
    private NavigationOrchestrator navOrchestrator
    final InputHandler inputHandler
    final ActionMapper mapper = new ActionMapper()
    
    final GlobalCommands globalCommands = new GlobalCommands()
    private NavigationCommand navCommand = new NavigationCommand()

    TurnProcessor(GameState state, RenderingCoordinator renderer, NavigationOrchestrator navOrchestrator, InputHandler inputHandler) {
        this.state = state
        this.renderer = renderer
        this.navOrchestrator = navOrchestrator
        this.inputHandler = inputHandler
        initializeGlobalCommands()
    }

    /** Keys, aliases and case rule in one place (HK-020); the player's guide cites this table. */
    private void initializeGlobalCommands() {
        globalCommands.register("i", new InventoryCommand())
        globalCommands.register("sync", new SyncCommand())
        globalCommands.register("map", new MapCommand())
        globalCommands.register("lattice", new LatticeTraceCommand())
        globalCommands.register("help", new HelpCommand())
        globalCommands.register("glitch", new GlitchMenuCommand())
        globalCommands.register("quit", new QuitCommand())
        // Exact keys: case is the command for p/P; s, ll and quitnow have always been typed exactly.
        globalCommands.register("p", new CaptureCommand(false), false)
        globalCommands.register("P", new CaptureCommand(true), false)
        globalCommands.register("s", new ScanCommand(), false)
        globalCommands.register("quitnow", new QuitNowCommand(), false)
        globalCommands.alias("m", "map")
        globalCommands.alias("q", "quit")
        globalCommands.alias("?", "help")
        globalCommands.register("ll", globalCommands.resolve("lattice"), false)
    }

    boolean processTurn() {
        VibeCapsule vibe = state.currentLocation.getVibe()
        double drain = (state.currentLocation.isAbyssal() ? 2.0 : 1.0) * (vibe?.timeline == "entropic" ? 2.0 : 1.0)
        state.player.adjustCoherence(-drain) 
        
        if (state.player.coherence <= 0) {
            reboot()
            return true
        }

        state.currentLocation.enter(state.player)
        state.currentLocation.processAction(state.player)
        return true
    }

    boolean handleInput(Game game) {
        String choice = ""
        while (true) {
            NavigationEngine navEngine = navOrchestrator.navEngine
            String raw = inputHandler.getRawInput(mapper.getActionName(navEngine.lastChoice))
            choice = navEngine.checkBoundaryReversal(raw, mapper) ?: inputHandler.normalize(raw, navEngine.lastChoice)

            if (choice == "-2") continue
            break
        }

        return dispatch(game, choice)
    }

    /**
     * Routes one normalized choice: a global command if registered, otherwise navigation.
     * The single dispatch path for the live loop (handleInput) and for Game.processInput.
     */
    boolean dispatch(Game game, String choice) {
        // 1. Check Global Commands
        GameCommand cmd = globalCommands.resolve(choice)
        if (cmd) {
            return cmd.execute(game, choice)
        }

        // 2. Delegate to Navigation Command (Context-specific)
        return navCommand.execute(game, choice)
    }

    private void reboot() {
        Terminal.clearScreen()
        Terminal.println Terminal.colorize("!!! CRITICAL_COHERENCE_FAILURE !!! REBOOTING...", Terminal.RED)
        inputHandler.waitForEnter()
        navOrchestrator.initializeWorld()
        state.player.adjustCoherence(100.0)
    }
}
