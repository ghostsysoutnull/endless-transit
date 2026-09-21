package com.endlesstransit.core

import groovy.transform.CompileStatic

/**
 * LatticeCommand: Structure for executing mutations or debug actions
 * against the game state.
 */
@CompileStatic
interface LatticeCommand extends GameCommand {
    /**
     * Returns true if the glitch menu should close after execution.
     */
    boolean shouldCloseMenu()

    @Override
    boolean execute(Game game, String choice)
}
