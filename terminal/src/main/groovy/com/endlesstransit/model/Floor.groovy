package com.endlesstransit.model
import com.endlesstransit.core.Game
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Player
import com.endlesstransit.core.Logger
import com.endlesstransit.procgen.LocusSeed
import groovy.transform.CompileStatic
import groovy.transform.PackageScope

@CompileStatic
class Floor extends Container {
    int number
    @PackageScope Corridor corridor
    String culture
    String timeline
    FloorState currentState = ElevatorState.INSTANCE
    /** HK-016 step 2: the sentence the factory dealt this floor (themes/descriptions/floor.txt, {culture} filled); null = the built-in one. */
    String descriptionVariant

    /** Persisted mode id → state; a new mode is one more entry here. */
    private static final Map<String, FloorState> STATES_BY_ID = [
        (ElevatorState.ID): (FloorState) ElevatorState.INSTANCE,
        (CorridorState.ID): (FloorState) CorridorState.INSTANCE
    ].asImmutable()

    @Override
    Map<String, Object> getMutationState() {
        return [
            "state": currentState.id
        ]
    }

    @Override
    void applyMutationState(Map<String, Object> state) {
        if (state.containsKey("state")) {
            this.currentState = STATES_BY_ID.getOrDefault((String) state.state, ElevatorState.INSTANCE)
        }
    }

    Corridor getCorridor() {
        ensureChildrenPopulated()
        return corridor
    }

    /** Spatial pivot, elevator → corridor. The only way into {@link CorridorState}. */
    void enterCorridor() {
        this.currentState = CorridorState.INSTANCE
    }

    /** Spatial pivot, corridor → elevator. The only way back to {@link ElevatorState}. */
    void returnToElevator() {
        this.currentState = ElevatorState.INSTANCE
    }

    /**
     * HK-019: corridor mode means "standing in the corridor". Walking out of the floor from there hands it back to the
     * elevator, so the next visit opens on the elevator menu.
     */
    void leave(Game game) {
        returnToElevator()
        game.exitLocation()
    }

    /**
     * HK-018: the Bedrock breach is a fact about the floor, not about the mode the player happens to be in.
     * Both states call this; it adds the option on the Peak of a primed, unbreached building whose Keystone is held.
     */
    void addBreachOption(Map<String, Closure> options, Game game) {
        if (!(parent instanceof Building)) return
        Building bldg = (Building) parent
        if (number < bldg.maxFloors - 1 || bldg.isBreached || !bldg.isPrimed()) return
        InventoryItem keystone = bldg.keystoneIn(game.player.inventory)
        if (keystone != null) {
            options["j. Breach the Bedrock"] = {
                game.player.inventory.remove(keystone)
                bldg.breach()
                game.instantRender = true
            }
        }
    }

    /** What a lattice scan on this floor inspects; decided by the current mode, not by the caller. */
    Location getScanTarget() {
        return currentState.getScanTarget(this)
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
        String cultureTag = fmt.colorize(culture.toUpperCase(), "CYAN")
        String sentence = descriptionVariant != null ? descriptionVariant.replace("{culture}", cultureTag) : "The air hums with the resonance of ${cultureTag} geometry."
        return "Floor ${number}. ${sentence}"
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        ensureChildrenPopulated()
        return currentState.getOptions(this, game)
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
        return currentState.getExtraContent(this, player, width)
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
    String getMapSymbol() {
        if (isAbyssal()) return "☠"
        return "▤"
    }
}
