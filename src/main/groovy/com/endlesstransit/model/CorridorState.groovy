package com.endlesstransit.model

import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import groovy.transform.CompileStatic

/**
 * Corridor mode: the way back to the elevator followed by the child {@link Corridor}'s own
 * options; content is the Corridor's access list. Bodies moved verbatim from {@code Floor} (Phase 8a).
 */
@CompileStatic
class CorridorState implements FloorState {
    static final String ID = "CORRIDOR"
    static final CorridorState INSTANCE = new CorridorState()

    private CorridorState() {}

    @Override
    String getId() { ID }

    @Override
    Map<String, Closure> getOptions(Floor floor, Game game) {
        Map<String, Closure> options = [:]

        // Back to Elevator shortcut
        options["b. Back to Elevator"] = {
            floor.returnToElevator()
            game.instantRender = true
        }

        // HK-018: the Peak offers the breach in either mode
        floor.addBreachOption(options, game)

        // Door options from sub-corridor
        options.putAll(floor.getCorridor().getOptions(game))

        return options
    }

    @Override
    List<String> getExtraContent(Floor floor, Player player, int width) {
        return floor.getCorridor().getExtraContent(player, width)
    }

    @Override
    Location getScanTarget(Floor floor) {
        return floor.getCorridor()
    }
}
