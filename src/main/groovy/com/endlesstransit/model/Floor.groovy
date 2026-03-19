package com.endlesstransit.model
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager
import com.endlesstransit.procgen.ProceduralFactory
import com.endlesstransit.procgen.LocusSeed
import groovy.transform.CompileStatic
import groovy.transform.PackageScope

@CompileStatic
class Floor extends Container {
    int number
    @PackageScope Corridor corridor
    String culture
    String timeline
    boolean isCorridorActive = false

    @Override
    Map<String, Object> getMutationState() {
        return [
            "isCorridorActive": isCorridorActive
        ]
    }

    @Override
    void applyMutationState(Map<String, Object> state) {
        if (state.containsKey("isCorridorActive")) {
            this.isCorridorActive = (boolean) state.isCorridorActive
        }
    }

    Corridor getCorridor() {
        ensureChildrenPopulated()
        return corridor
    }

    @Override
    String getSparklineLabel() {
        if (number < 0) return "${"▤"}-${Math.abs(number)}"
        return "▤"
    }

    @Override
    String getIndexLabel() {
        return isAbyssal() ? HUDLabels.STRATA : HUDLabels.Z_AXIS
    }

    @Override
    String getTypeLabel() {
        return number < 0 ? "LAYER" : "FLOOR"
    }

    @Override
    String getTypeName() {
        return number < 0 ? "Layer" : "Floor"
    }

    @Override
    String getName() {
        if (number < 0) {
            return "Layer -0x" + Integer.toHexString(Math.abs(number)).toUpperCase()
        }
        return "Floor $number"
    }

    @Override
    String getDescription() {
        if (number < 0) {
            return "${getName()}. The air is thick with oily static and the hum of abyssal substrate."
        }
        return "Floor ${number}. The air hums with the resonance of ${fmt.colorize(culture.toUpperCase(), "CYAN")} geometry."
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        ensureChildrenPopulated()
        if (isCorridorActive) {
            return getCorridorOptions(game)
        } else {
            return getElevatorOptions(game)
        }
    }

    private Map<String, Closure> getElevatorOptions(Game game) {
        Map<String, Closure> options = getBaseOptions(game)
        
        if (parent instanceof Building) {
            Building bldg = (Building) parent
            if (number < bldg.maxFloors - 1) {
                options["u. Go Up"] = { game.enterLocation(bldg.getFloor(number + 1)) }
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
            if (number != 0) {
                options["d. Go Down"] = { game.enterLocation(bldg.getFloor(number - 1)) }
            } else if (bldg.isBreached && number == 0) {
                options["d. Descend into the Substrate"] = {
                    game.enterLocation(bldg.getFloor(-1))
                }
            }
        }
        
        options["c. Enter Corridor"] = { 
            this.isCorridorActive = true 
            game.instantRender = true
        }
        return options
    }

    private Map<String, Closure> getCorridorOptions(Game game) {
        Map<String, Closure> options = [:]
        
        // Back to Elevator shortcut
        options["b. Back to Elevator"] = { 
            this.isCorridorActive = false 
            game.instantRender = true
        }

        // Door options from sub-corridor
        options.putAll(getCorridor().getOptions(game))
        
        return options
    }

    @Override
    void addLocation(Location location) {
        super.addLocation(location)
        if (location instanceof Corridor) {
            this.corridor = (Corridor) location
        }
    }

    @Override
    void enter(Player player) {
        Logger.info("Entering Floor $number")
        if (parent instanceof Building) {
            ((Building) parent).lastVisitedFloor = this.number
        }
        markVisited()
    }

    @Override
    List<String> getExtraContent(Player player, int width) {
        ensureChildrenPopulated()
        if (isCorridorActive) {
            return getCorridor().getExtraContent(player, width)
        } else {
            return getElevatorDiagnostics(player, width)
        }
    }

    private List<String> getElevatorDiagnostics(Player player, int width) {
        List<String> lines = []
        lines << fmt.colorize(" [FLOOR_DIAGNOSTIC_SUITE] ", "L_CYAN")
        lines << fmt.dim("Analyzing local strata resonance...")
        lines << fmt.dim("-" * width)
        
        // Metadata
        lines << "${fmt.padRight("IDENTIFIER", 15)}: ${getName()}".toString()
        lines << "${fmt.padRight("TECH_ERA", 15)}: ${fmt.colorize(timeline.toUpperCase(), "YELLOW")}".toString()
        lines << "${fmt.padRight("RESONANCE", 15)}: ${fmt.colorize(culture.toUpperCase(), "CYAN")}".toString()
        
        // Visited Status
        String visStatus = isVisited() ? fmt.colorize("TRUE", "GREEN") : fmt.dim("FALSE")
        if (parent instanceof Building) {
            def progress = ((Building) parent).getFloorProgress(this, player)
            if (progress.total > 0) {
                visStatus += fmt.dim(" [PROBE: ${progress.visited}/${progress.total}]")
            }
        }
        lines << "${fmt.padRight("VISITED", 15)}: ${visStatus}".toString()
        
        // Vibe Capsule Diagnostics
        VibeCapsule vibe = getVibe()
        if (vibe != null) {
            lines << "${fmt.padRight("STABILITY", 15)}: ${String.format("%.2f%%", vibe.stabilityFactor * 100)}".toString()
            lines << "${fmt.padRight("ATMOS_SHIFT", 15)}: ${vibe.latticeMutation.toUpperCase()}".toString()
        }

        lines << fmt.dim("-" * width)
        lines << fmt.dim("Local signal is ${fmt.colorize("STABLE", "GREEN")}. Corridor access authorized.")
        
        return lines
    }

    Floor(int number, int apartmentsPerFloor, String culture = "rust", String timeline = "ancient", LocusSeed locus = new LocusSeed(0L)) {
        this.number = number
        this.locus = locus
        this.culture = number < 0 ? "abyssal" : culture
        this.timeline = timeline
        this.apartmentsPerFloor = apartmentsPerFloor
    }
    
    int apartmentsPerFloor

    @Override
    void populateChildren() {
        ProceduralFactory.instance.populateFloor(this)
    }

    @Override
    String getMapSymbol() {
        if (isAbyssal()) return "☠"
        return "▤"
    }
}
