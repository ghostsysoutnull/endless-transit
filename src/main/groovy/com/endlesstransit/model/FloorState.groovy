package com.endlesstransit.model

import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import groovy.transform.CompileStatic

/**
 * A Floor's spatial-pivot mode (OOA Phase 8, State pattern — OOA report §4.11).
 * <p>
 * Elevator mode offers vertical navigation and the floor diagnostic suite; Corridor mode
 * offers the child {@link Corridor}'s doors. Implementations are stateless singletons —
 * the {@link Floor} is passed in — so a transition is a pointer swap on the Floor
 * ({@link Floor#enterCorridor()} / {@link Floor#returnToElevator()}).
 */
@CompileStatic
interface FloorState {
    /** Persisted identity of this mode ("ELEVATOR" | "CORRIDOR"); see {@link Floor#getMutationState()}. */
    String getId()

    /** Directive menu for {@code floor} in this mode. Caller has already populated children. */
    Map<String, Closure> getOptions(Floor floor, Game game)

    /** Right-pane content for {@code floor} in this mode. Caller has already populated children. */
    List<String> getExtraContent(Floor floor, Player player, int width)
}
