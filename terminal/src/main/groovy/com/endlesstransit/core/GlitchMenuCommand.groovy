package com.endlesstransit.core

import groovy.transform.CompileStatic

/**
 * GlitchMenuCommand: Opens the substrate modification interface.
 */
@CompileStatic
class GlitchMenuCommand implements GameCommand {
    @Override String getLabel() { "Glitch" }
    @Override String getDescription() { "Access core substrate modification tools." }

    @Override
    boolean execute(Game game, String choice = null) {
        game.renderer.glitchMenu(game)
        return true
    }
}
