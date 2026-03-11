package com.endlesstransit.core

import com.endlesstransit.ui.Terminal
import com.endlesstransit.ui.SessionRecap
import groovy.transform.CompileStatic

/**
 * QuitCommand: Safely terminates the neural link and saves session state.
 */
@CompileStatic
class QuitCommand implements GameCommand {
    @Override String getLabel() { "Quit" }
    @Override String getDescription() { "Terminate neural link and exit reality." }

    @Override
    boolean execute(Game game, String choice = null) {
        GameState state = game.state
        Terminal.print Terminal.colorize("Are you sure you want to quit? [y/N]: ", Terminal.YELLOW)
        if (state.inputHandler.readLine().toLowerCase() == "y") {
            Terminal.print Terminal.colorize("Synchronize neural trace before termination? [Y/n]: ", Terminal.CYAN)
            if (state.inputHandler.readLine().toLowerCase() != "n") SyncManager.sync(game)
            JournalManager.saveSession(state.player)
            SessionRecap.show(state.currentLocation, state.player, state.bridgeView)
            return false // Terminate loop
        }
        return true // Continue loop
    }
}
