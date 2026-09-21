package com.endlesstransit.core

import groovy.transform.CompileStatic

/**
 * HelpCommand: Displays the available command protocols.
 */
@CompileStatic
class HelpCommand implements GameCommand {
    @Override String getLabel() { "Help" }
    @Override String getDescription() { "View clinical command documentation." }

    @Override
    boolean execute(Game game, String choice = null) {
        game.renderer.helpMenu()
        return true
    }
}
