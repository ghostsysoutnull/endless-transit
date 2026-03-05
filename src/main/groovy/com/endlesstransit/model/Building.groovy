package com.endlesstransit.model
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager
import com.endlesstransit.procgen.Gematria
import com.endlesstransit.procgen.NameGenerator
import com.endlesstransit.ui.Terminal
import com.endlesstransit.ui.ThemeManager

class Building extends Container {
    List<Floor> floors = []
    String name
    int maxFloors
    int apartmentsPerFloor

    // Ritual State
    boolean isBreached = false
    int infusionCount = 0
    Set<Integer> sampledFloors = new LinkedHashSet<>()

    void notifySampled(int floorNumber) {
        if (floorNumber >= 0 && floorNumber < maxFloors) {
            sampledFloors.add(floorNumber)
        }
    }

    boolean isPrimed() {
        return sampledFloors.size() >= maxFloors && infusionCount >= 7
    }

    void breach() {
        this.isBreached = true
        Logger.info("BUILDING_BREACHED: $name")
        
        println ""
        println Terminal.colorize(" [HARMONIC_INVERSION_PROTOCOL_ENGAGED] ", Terminal.RED)
        println Terminal.glitchText(">>> BREACHING_THE_BEDROCK_SUBSTRATE...", 0.3)
        Thread.sleep(1000)
        println Terminal.colorize(">>> LATTICE_WEIGHT_NORMALIZED. APERTURE_OPENING_AT_ROOT.", Terminal.YELLOW)
        Thread.sleep(1000)
        println ""
    }

    @Override
    Map<String, Object> getMutationState() {
        return [
            "isBreached": isBreached,
            "infusionCount": infusionCount,
            "sampledFloors": sampledFloors.toList()
        ]
    }

    @Override
    void applyMutationState(Map<String, Object> state) {
        if (state.containsKey("isBreached")) this.isBreached = (boolean) state.isBreached
        if (state.containsKey("infusionCount")) this.infusionCount = (int) state.infusionCount
        if (state.containsKey("sampledFloors")) {
            this.sampledFloors.clear()
            this.sampledFloors.addAll((List<Integer>) state.sampledFloors)
        }
    }

    Building(String namePrefix = "", long seed = 0) {
        this.seed = seed
        this.name = NameGenerator.generateBuildingName(namePrefix, seed)
        Random random = seed != 0 ? new Random(seed) : new Random()
        this.maxFloors = random.nextInt(26) + 5 
        this.apartmentsPerFloor = random.nextInt(13) + 3 // 3 to 15 apartments per floor
    }

    @Override
    void addLocation(Location location) {
        super.addLocation(location)
        if (location instanceof Floor) {
            floors.add(location)
        }
    }

    Floor getFloor(int number) {
        if (number >= maxFloors) {
            Logger.info("Floor request out of bounds: $number (max: $maxFloors)")
            return null
        }
        
        def floor = floors.find { it.number == number }
        if (floor == null) {
            Logger.info("Instantiating new Floor $number in Building $name")
            floor = new Floor(number, apartmentsPerFloor, seed != 0 ? seed + number : 0)
            addLocation(floor)
        }
        return floor
    }

    @Override
    String getDescription() {
        def v = getVibe()
        String vInfo = v ? "\n${Terminal.dim("[TECH_ERA:")} ${Terminal.colorize(v.timeline.toUpperCase(), Terminal.YELLOW)}${Terminal.dim("]")} ${Terminal.dim("[RESONANCE:")} ${Terminal.colorize(v.primaryCulture.toUpperCase(), v.atmosphericColor)}${Terminal.dim("]")}" : ""
        return "Building: $name (Total Floors: $maxFloors)$vInfo"
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        def options = getBaseOptions(game)
        for (int i = 0; i < maxFloors; i++) {
            final int floorNum = i
            def floor = getFloor(floorNum)
            String label = "${i}. Enter: Floor ${floorNum}"
            if (floor.isVisited()) label += " [Visited]"
            options[label] = { game.enterLocation(floor) }
        }
        return options
    }
}
