package com.endlesstransit.core

import groovy.transform.CompileStatic

/**
 * LatticeTraceCommand: Renders the historical lattice footprint.
 */
@CompileStatic
class LatticeTraceCommand implements GameCommand {
    @Override String getLabel() { "Lattice" }
    @Override String getDescription() { "View historical neural trace path." }

    @Override
    boolean execute(Game game, String choice = null) {
        game.renderer.renderLatticeTrace()
        return true
    }
}
