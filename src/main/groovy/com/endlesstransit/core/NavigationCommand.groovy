package com.endlesstransit.core

import com.endlesstransit.model.*
import com.endlesstransit.ui.Terminal
import groovy.transform.CompileStatic

/**
 * NavigationCommand: Handles all movement (f/b, u/d, numeric) through the world.
 */
@CompileStatic
class NavigationCommand implements GameCommand {
    private Closure action

    NavigationCommand() {}
    NavigationCommand(Closure action) { this.action = action }

    @Override String getLabel() { "Navigation" }
    @Override String getDescription() { "Perform a spatial transition to a new location." }

    @Override
    boolean execute(Game game, String choice = null) {
        if (this.action) {
            this.action.call()
            return true
        }

        if (!choice) return true

        GameState state = game.state
        ActionMapper mapper = state.mapper
        InputHandler handler = state.inputHandler

        Closure resolvedAction = mapper.resolve(choice, handler)
        if (resolvedAction) {
            state.player.stepCount++
            state.navEngine.recordChoice(choice)
            resolvedAction.call()
            return true
        }

        Terminal.println "Invalid navigation choice."
        return true
    }
}
