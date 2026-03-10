package com.endlesstransit.core

import com.endlesstransit.model.*
import com.endlesstransit.ui.*
import groovy.transform.CompileStatic

/**
 * TurnProcessor: Manages the game loop, turn processing, and input dispatching.
 */
@CompileStatic
class TurnProcessor {
    private GameState state
    private RenderingCoordinator renderer
    private NavigationOrchestrator navOrchestrator

    TurnProcessor(GameState state, RenderingCoordinator renderer, NavigationOrchestrator navOrchestrator) {
        this.state = state
        this.renderer = renderer
        this.navOrchestrator = navOrchestrator
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

            switch (choice) {
                case "i": state.inventoryController.open(game); return true
                case "p": CaptureCommand.execute(state.bridgeView, state.inputHandler.getHistory()); return true
                case "P": CaptureCommand.execute(state.bridgeView, state.inputHandler.getHistory(), true); return true
                case "s": new ScanCommand().execute(game); return true
                case "sync": SyncManager.sync(game); Terminal.println Terminal.colorize("\n>>> SYNC_STABILIZED.", Terminal.GREEN); return true
                case "map": renderer.renderLatticeMap(); return true
                case "lattice":
                case "ll": renderer.renderLatticeTrace(); return true
                case "help": renderer.helpMenu(); return true
                case "glitch": renderer.glitchMenu(game); return true
                case "quit": return confirmQuit(game)
                case "-2": continue
                default: break
            }
            break
        }

        Closure action = state.mapper.resolve(choice, state.inputHandler)
        if (action) {
            state.player.stepCount++
            state.navEngine.recordChoice(choice)
            action.call()
        } else {
            Terminal.println "Invalid choice."
        }
        return true
    }

    private boolean confirmQuit(Game game) {
        Terminal.print Terminal.colorize("Are you sure you want to quit? [y/N]: ", Terminal.YELLOW)
        if (state.inputHandler.readLine().toLowerCase() == "y") {
            Terminal.print Terminal.colorize("Synchronize neural trace before termination? [Y/n]: ", Terminal.CYAN)
            if (state.inputHandler.readLine().toLowerCase() != "n") SyncManager.sync(game)
            JournalManager.saveSession(state.player)
            SessionRecap.show(state.currentLocation, state.player, state.bridgeView)
            return false
        }
        return true
    }

    private void reboot() {
        Terminal.clearScreen()
        Terminal.println Terminal.colorize("!!! CRITICAL_COHERENCE_FAILURE !!! REBOOTING...", Terminal.RED)
        Thread.sleep(2000)
        state.player.coherence = 100
        navOrchestrator.initializeWorld()
    }
}
