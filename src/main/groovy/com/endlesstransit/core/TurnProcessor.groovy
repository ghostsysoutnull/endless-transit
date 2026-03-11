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
    
    private Map<String, GameCommand> globalCommands = [:]
    private NavigationCommand navCommand = new NavigationCommand()

    TurnProcessor(GameState state, RenderingCoordinator renderer, NavigationOrchestrator navOrchestrator) {
        this.state = state
        this.renderer = renderer
        this.navOrchestrator = navOrchestrator
        initializeGlobalCommands()
    }

    private void initializeGlobalCommands() {
        globalCommands["i"] = new InventoryCommand()
        globalCommands["p"] = new CaptureCommand(false)
        globalCommands["P"] = new CaptureCommand(true)
        globalCommands["s"] = new ScanCommand()
        globalCommands["sync"] = new SyncCommand()
        globalCommands["map"] = new MapCommand()
        globalCommands["lattice"] = new LatticeTraceCommand()
        globalCommands["ll"] = globalCommands["lattice"]
        globalCommands["help"] = new HelpCommand()
        globalCommands["glitch"] = new GlitchMenuCommand()
        globalCommands["quit"] = new QuitCommand()
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
            String raw = state.inputHandler.getRawInput(state.mapper.getActionName(state.navEngine.lastChoice))
            choice = state.navEngine.checkBoundaryReversal(raw, state.mapper) ?: state.inputHandler.normalize(raw, state.navEngine.lastChoice)

            if (choice == "-2") continue
            break
        }

        // 1. Check Global Commands
        GameCommand cmd = globalCommands[choice]
        if (cmd) {
            return cmd.execute(game, choice)
        }

        // 2. Delegate to Navigation Command (Context-specific)
        return navCommand.execute(game, choice)
    }

    private void reboot() {
        Terminal.clearScreen()
        Terminal.println Terminal.colorize("!!! CRITICAL_COHERENCE_FAILURE !!! REBOOTING...", Terminal.RED)
        state.inputHandler.waitForEnter()
        navOrchestrator.initializeWorld()
        state.player.adjustCoherence(100.0)
    }
}
