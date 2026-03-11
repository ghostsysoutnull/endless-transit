package com.endlesstransit.core

import groovy.transform.CompileStatic

/**
 * MapCommand: Renders the current neural web map.
 */
@CompileStatic
class MapCommand implements GameCommand {
    @Override String getLabel() { "Map" }
    @Override String getDescription() { "Render the spatial resonance map." }

    @Override
    boolean execute(Game game, String choice = null) {
        game.renderer.renderLatticeMap()
        return true
    }
}
