package com.endlesstransit.core

import groovy.transform.CompileStatic

/**
 * GameCommand: The base interface for all executable player actions.
 */
@CompileStatic
interface GameCommand {
    /**
     * Returns the visual label (name) for the command.
     */
    String getLabel()

    /**
     * Returns a brief description of the command's purpose.
     */
    String getDescription()

    /**
     * Executes the command logic.
     * @param game The game orchestrator.
     * @param choice The specific input that triggered this command (optional).
     * @return true if the game loop should continue, false if it should terminate.
     */
    boolean execute(Game game, String choice)
}
