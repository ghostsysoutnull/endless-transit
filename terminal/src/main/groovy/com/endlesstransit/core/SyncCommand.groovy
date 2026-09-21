package com.endlesstransit.core

import com.endlesstransit.ui.Terminal
import groovy.transform.CompileStatic

/**
 * SyncCommand: Synchronizes the current neural trace to persistence.
 */
@CompileStatic
class SyncCommand implements GameCommand {
    @Override String getLabel() { "Sync" }
    @Override String getDescription() { "Synchronize current state to neural substrate (save)." }

    @Override
    boolean execute(Game game, String choice = null) {
        SyncManager.sync(game)
        Terminal.println Terminal.colorize("\n>>> SYNC_STABILIZED.", Terminal.GREEN)
        return true
    }
}
