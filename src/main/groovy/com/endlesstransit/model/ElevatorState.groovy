package com.endlesstransit.model

import com.endlesstransit.core.Game
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Player
import groovy.transform.CompileStatic

/**
 * Elevator mode: vertical navigation (u/d, bedrock breach/descend), corridor access, and the
 * floor diagnostic suite. Bodies moved verbatim from {@code Floor} (Phase 8a).
 */
@CompileStatic
class ElevatorState implements FloorState {
    static final String ID = "ELEVATOR"
    static final ElevatorState INSTANCE = new ElevatorState()

    private ElevatorState() {}

    @Override
    String getId() { ID }

    @Override
    Map<String, Closure> getOptions(Floor floor, Game game) {
        Map<String, Closure> options = floor.getBaseOptions(game)

        if (floor.parent instanceof Building) {
            Building bldg = (Building) floor.parent
            if (floor.number < bldg.maxFloors - 1) {
                options["u. Go Up"] = { game.enterLocation(bldg.getFloor(floor.number + 1)) }
            } else if (!bldg.isBreached && bldg.isPrimed()) {
                InventoryItem keystone = game.player.inventory.find { it.isKeystone && it.name.contains(bldg.name) }
                if (keystone != null) {
                    options["j. Breach the Bedrock"] = {
                        game.player.inventory.remove(keystone)
                        bldg.breach()
                        game.instantRender = true
                    }
                }
            }
            if (floor.number != 0) {
                options["d. Go Down"] = { game.enterLocation(bldg.getFloor(floor.number - 1)) }
            } else if (bldg.isBreached && floor.number == 0) {
                options["d. Descend into the Substrate"] = {
                    game.enterLocation(bldg.getFloor(-1))
                }
            }
        }

        options["c. Enter Corridor"] = {
            floor.enterCorridor()
            game.instantRender = true
        }
        return options
    }

    @Override
    List<String> getExtraContent(Floor floor, Player player, int width) {
        List<String> lines = []
        lines << floor.fmt.colorize(" [FLOOR_DIAGNOSTIC_SUITE] ", "L_CYAN")
        lines << floor.fmt.dim("Analyzing local strata resonance...")
        lines << floor.fmt.dim("-" * width)

        // Metadata
        lines << "${floor.fmt.padRight("IDENTIFIER", 15)}: ${floor.getName()}".toString()
        lines << "${floor.fmt.padRight("TECH_ERA", 15)}: ${floor.fmt.colorize(floor.timeline.toUpperCase(), "YELLOW")}".toString()
        lines << "${floor.fmt.padRight("RESONANCE", 15)}: ${floor.fmt.colorize(floor.culture.toUpperCase(), "CYAN")}".toString()

        // Visited Status
        String visStatus = floor.isVisited() ? floor.fmt.colorize("TRUE", "GREEN") : floor.fmt.dim("FALSE")
        if (floor.parent instanceof Building) {
            def progress = ((Building) floor.parent).getFloorProgress(floor, player)
            if (progress.total > 0) {
                visStatus += floor.fmt.dim(" [PROBE: ${progress.visited}/${progress.total}]")
            }
        }
        lines << "${floor.fmt.padRight("VISITED", 15)}: ${visStatus}".toString()

        // Vibe Capsule Diagnostics
        VibeCapsule vibe = floor.getVibe()
        if (vibe != null) {
            lines << "${floor.fmt.padRight("STABILITY", 15)}: ${String.format("%.2f%%", vibe.stabilityFactor * 100)}".toString()
            lines << "${floor.fmt.padRight("ATMOS_SHIFT", 15)}: ${vibe.latticeMutation.toUpperCase()}".toString()
        }

        lines << floor.fmt.dim("-" * width)
        lines << floor.fmt.dim("Local signal is ${floor.fmt.colorize("STABLE", "GREEN")}. Corridor access authorized.")

        return lines
    }

    @Override
    Location getScanTarget(Floor floor) {
        return floor.parent
    }
}
