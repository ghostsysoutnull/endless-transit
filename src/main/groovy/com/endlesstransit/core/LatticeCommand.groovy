package com.endlesstransit.core

import groovy.transform.CompileStatic

/**
 * LatticeCommand: Structure for executing mutations or debug actions
 * against the game state.
 */
@CompileStatic
interface LatticeCommand {
    String getLabel()
    String getDescription()
    
    /**
     * Executes the command. 
     * Returns true if the menu should close after execution.
     */
    boolean execute(Game game)
}
