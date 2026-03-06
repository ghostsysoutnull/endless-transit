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
    boolean isLandmark = false
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
            "isLandmark": isLandmark,
            "infusionCount": infusionCount,
            "sampledFloors": sampledFloors.toList()
        ]
    }

    @Override
    void applyMutationState(Map<String, Object> state) {
        if (state.containsKey("isBreached")) this.isBreached = (boolean) state.isBreached
        if (state.containsKey("isLandmark")) this.isLandmark = (boolean) state.isLandmark
        if (state.containsKey("infusionCount")) this.infusionCount = (int) state.infusionCount
        if (state.containsKey("sampledFloors")) {
            this.sampledFloors.clear()
            this.sampledFloors.addAll((List<Integer>) state.sampledFloors)
        }
    }

    String getFloorZone(int floorNum) {
        if (floorNum < 0) return "ABYSSAL_SUBSTRATE"
        if (floorNum == 0) return "TRANSIT_LOBBY"
        if (floorNum == maxFloors - 1) return "PEAK_OBSERVATORY"
        
        Random r = new Random(seed + floorNum)
        if (floorNum < 5) {
            return ["MECHANICAL_SUMP", "STORAGE_CELL", "POWER_RELAY", "FILTRATION_INTAKE"][r.nextInt(4)]
        } else if (floorNum > maxFloors - 5) {
            return ["EXECUTIVE_SUITE", "NEURAL_UPLINK", "DATA_VAULT", "VIP_QUARTERS"][r.nextInt(4)]
        } else {
            return ["LIVING_UNIT", "RESEARCH_LAB", "HYDROPONIC_BAY", "BIO_SERVER"][r.nextInt(4)]
        }
    }

    String getFloorIntegrity(int floorNum) {
        if (floorNum < 0) {
            int pressure = Math.min(100, Math.abs(floorNum) * 10)
            return "P: ${pressure}%"
        }
        
        // Base integrity 100%, drops near Floor 0 if breached
        int base = 100
        if (isBreached && floorNum < 10) {
            base -= (10 - floorNum) * 8
        }
        return "${Math.max(0, base)}%"
    }

    Building(String culture = "monolith", long seed = 0, int depth = 0, boolean isNullZone = false, boolean isAbyssal = false) {
        this.seed = seed
        Random random = seed != 0 ? new Random(seed) : new Random()
        this.maxFloors = random.nextInt(26) + 5 
        this.apartmentsPerFloor = random.nextInt(13) + 3 // 3 to 15 apartments per floor

        def result = NameGenerator.generateBuildingName(culture, maxFloors, seed, depth, isNullZone, isAbyssal)
        this.name = (String) result.name
        this.isLandmark = (boolean) result.isLandmark
    }

    @Override
    void enter(Player player) {
        if (isLandmark && !isVisited()) {
            println "\n" + Terminal.colorize(" [UNIQUE_LOCUS_DETECTION] ", Terminal.YELLOW)
            println Terminal.bold(">>> MAJOR_LANDMARK_DISCOVERED: $name")
            println Terminal.dim("Harmonic signature is abnormally stable. Data-harvest potential: HIGH.")
            Thread.sleep(1000)
        }
        markVisited()
        ensureChildrenPopulated()

        println "\n" + Terminal.colorize(" [BUILDING_STRATA_DIAGNOSTICS] ", Terminal.L_CYAN)
        println Terminal.dim("Analyzing vertical lattice structure...")
        
        int width = 130
        println Terminal.dim("-" * width)
        
        // Header
        String hId = "[ID]"
        String hRad = "[RADAR]"
        String hDes = "[STRATA_DESIGNATION]"
        String hZon = "[FUNCTIONAL_ZONE]"
        String hInt = "[STATUS]"
        String hRes = "[SCAN_RESIDUE]"
        
        println Terminal.bold(
            String.format("%-6s %-10s %-30s %-25s %-15s %-20s", hId, hRad, hDes, hZon, hInt, hRes)
        )
        println Terminal.dim("-" * width)

        // Find current floor index for the radar
        int currentFloorNum = -999
        Location p = player.currentLocation // We'll need to ensure player has this
        if (p instanceof Floor) currentFloorNum = p.number
        else if (p?.parent instanceof Floor) currentFloorNum = p.parent.number

        // Iterate floors from top to bottom (Peak to Substrate)
        int minFloor = isBreached ? -5 : 0 // Show some substrate if breached
        for (int i = maxFloors - 1; i >= minFloor; i--) {
            String id = String.format("%02d.", i)
            
            // Radar Logic: [>X<] for current, [ █ ] for regular, [ ! ] for abyssal
            String radar = "[ █ ]"
            if (i == currentFloorNum) {
                radar = Terminal.colorize("[>X<]", Terminal.YELLOW)
            } else if (i < 0) {
                radar = Terminal.colorize("[ ! ]", Terminal.RED)
            }

            String designation = i == 0 ? "Surface / Lobby" : (i == maxFloors - 1 ? "Peak / Observatory" : "Floor $i")
            if (i < 0) designation = "Layer -0x" + Integer.toHexString(Math.abs(i)).toUpperCase()
            
            String zone = getFloorZone(i)
            String integrity = getFloorIntegrity(i)
            
            // Resonance logic (simulated for building view)
            Random r = new Random(seed + i)
            int freq = 1000 + r.nextInt(2000)
            String resonance = "${freq}Hz " + (i < 0 ? Terminal.colorize("######", Terminal.RED) : Terminal.colorize("~~~~~~", Terminal.CYAN))

            String visited = ""
            def floorObj = floors.find { it.number == i }
            if (floorObj?.isVisited()) visited = Terminal.colorize(" [V]", Terminal.GREEN)

            // Visual-Aware Padding for all columns
            String colDes = designation + visited
            colDes += " " * Math.max(0, 30 - Terminal.getVisualWidth(colDes))
            
            String colZon = "[${zone}]"
            colZon += " " * Math.max(0, 25 - Terminal.getVisualWidth(colZon))
            
            String colInt = "[${integrity}]"
            colInt += " " * Math.max(0, 15 - Terminal.getVisualWidth(colInt))
            
            String colRad = radar + (" " * Math.max(0, 10 - Terminal.getVisualWidth(radar)))

            println "${id.padRight(6)}${colRad}${colDes}${colZon}${colInt}${resonance}"
        }
        println Terminal.dim("-" * width)
    }

    @Override
    void populateChildren() {
        // Ensure at least Floor 0 exists
        getFloor(0)
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
        
        int minFloor = isBreached ? -5 : 0
        for (int i = maxFloors - 1; i >= minFloor; i--) {
            final int floorNum = i
            def floor = getFloor(floorNum)
            String zone = getFloorZone(i)
            String id = String.format("%02d", i)
            if (i < 0) id = "-" + Math.abs(i)

            String label = "${id}. Access: ${zone}"
            if (floor.isVisited()) label += " [Visited]"
            options[label] = { game.enterLocation(floor) }
        }
        return options
    }
}
