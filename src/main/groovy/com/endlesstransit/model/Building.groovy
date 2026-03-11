package com.endlesstransit.model
import com.endlesstransit.procgen.LocusSeed
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager
import com.endlesstransit.procgen.Gematria
import com.endlesstransit.procgen.NameGenerator
import com.endlesstransit.procgen.ProceduralFactory
import groovy.transform.CompileStatic
import groovy.transform.PackageScope

@CompileStatic
class Building extends Container {
    @PackageScope List<Floor> floors = new LazyLocusList<Floor>(this)
    String name
    int maxFloors
    int apartmentsPerFloor
    String culture
    String timeline

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
        
        ModelOutput.fmt.println ""
        ModelOutput.fmt.println ModelOutput.fmt.colorize(" [HARMONIC_INVERSION_PROTOCOL_ENGAGED] ", "RED")
        ModelOutput.fmt.println ModelOutput.fmt.glitchText(">>> BREACHING_THE_BEDROCK_SUBSTRATE...", 0.3)
        Thread.sleep(1000)
        ModelOutput.fmt.println ModelOutput.fmt.colorize(">>> LATTICE_WEIGHT_NORMALIZED. APERTURE_OPENING_AT_ROOT.", "YELLOW")
        Thread.sleep(1000)
        ModelOutput.fmt.println ""
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
        
        Random r = locus.branch(floorNum).nextRandom()
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

    @Override
    String getIndexLabel() {
        return "STRATA"
    }

    @Override
    String getStatusSummary() {
        if (isBreached) return "BEDROCK_BREACHED"
        if (infusionCount > 0) return "INFUSION_ACTIVE: $infusionCount"
        return "STRUCTURAL_STABLE"
    }

    @Override
    String getLatticeMeta() {
        if (isBreached) return ModelOutput.fmt.colorize(" [BREACHED]", "RED")
        return ModelOutput.fmt.dim(" [FLOORS: $maxFloors]")
    }

    /**
     * Calculates the visited/total progress for a specific floor's sub-locations.
     */
    Map<String, Integer> getFloorProgress(Floor floor, Player player) {
        String floorPrefix = floor.getLIP() + "."
        int visitedCount = (int) player.visitedLIPs.count { it.startsWith(floorPrefix) }
        int totalCount = ProceduralFactory.instance.countSubLocations(floor)
        return [visited: visitedCount, total: totalCount]
    }

    Building(LocusSeed locus = new LocusSeed(0L)) {
        this.locus = locus
    }

    @Override
    String getDescription() {
        return "Building: $name. [THEME: ${culture.toUpperCase()}] [STATUS: ${getStatusSummary()}]"
    }

    @Override
    void enter(Player player) {
        if (isLandmark && !isVisited()) {
            ModelOutput.fmt.println "\n" + ModelOutput.fmt.colorize(" [UNIQUE_LOCUS_DETECTION] ", "YELLOW")
            ModelOutput.fmt.println ModelOutput.fmt.bold(">>> MAJOR_LANDMARK_DISCOVERED: $name")
            ModelOutput.fmt.println ModelOutput.fmt.dim("Harmonic signature is abnormally stable. Data-harvest potential: HIGH.")
            Thread.sleep(1000)
        }
        markVisited()
    }

    @Override
    List<String> getExtraContent(Player player, int width) {
        List<String> lines = []
        lines << ModelOutput.fmt.colorize(" [BUILDING_STRATA_DIAGNOSTICS] ", "L_CYAN")
        lines << ModelOutput.fmt.dim("Analyzing vertical lattice structure...")
        
        lines << ModelOutput.fmt.dim("-" * width)
        
        // Define Column Widths
        int wId = 5
        int wRad = 9
        int wDes = 26
        int wZon = 26
        int wInt = 11
        
        // Header
        String hId = ModelOutput.fmt.padRight("[ID]", wId)
        String hRad = ModelOutput.fmt.padRight("[RAD]", wRad)
        String hDes = ModelOutput.fmt.padRight("[STRATA_DESIGNATION]", wDes)
        String hZon = ModelOutput.fmt.padRight("[FUNCTIONAL_ZONE]", wZon)
        String hInt = ModelOutput.fmt.padRight("[ST]", wInt)
        String hRes = "[RES]"
        
        lines << ModelOutput.fmt.bold("${hId}${hRad}${hDes}${hZon}${hInt}${hRes}")
        lines << ModelOutput.fmt.dim("-" * width)

        // Find current floor index for the radar
        int currentFloorNum = -999
        if (player.currentLocation instanceof Floor) {
            currentFloorNum = ((Floor)player.currentLocation).number
        } else if (player.currentLocation?.parent instanceof Floor) {
            currentFloorNum = ((Floor)player.currentLocation.parent).number
        }

        // Iterate floors from top to bottom (Peak to Substrate)
        int minFloor = isBreached ? -5 : 0 // Show some substrate if breached
        for (int i = maxFloors - 1; i >= minFloor; i--) {
            String idStr = String.format("%02d.", i)
            
            // Radar Logic: [>X<] for current, [ █ ] for regular, [ ! ] for abyssal
            String radar = "[ █ ]"
            if (i == currentFloorNum) {
                radar = ModelOutput.fmt.colorize("[>X<]", "YELLOW")
            } else if (i < 0) {
                radar = ModelOutput.fmt.colorize("[ ! ]", "RED")
            }

            String designation = i == 0 ? "Surface/Lobby" : (i == maxFloors - 1 ? "Peak/Observatory" : "Floor $i")
            if (i < 0) designation = "-0x" + Integer.toHexString(Math.abs(i)).toUpperCase()
            
            String zone = getFloorZone(i)
            String integrity = getFloorIntegrity(i)
            
            // Resonance logic (simulated for building view)
            Random r = locus.branch(i).nextRandom()
            int freq = 1000 + r.nextInt(2000)
            String resonance = "${freq}Hz"

            String progressLabel = ""
            Floor floorObj = getFloor(i)
            if (floorObj != null) {
                def progress = getFloorProgress(floorObj, player)
                if (progress.visited >= progress.total) {
                    progressLabel = ModelOutput.fmt.colorize("[CLEARED]", "GREEN")
                } else if (progress.visited > 0) {
                    progressLabel = ModelOutput.fmt.colorize("[PROBED: ${progress.visited}/${progress.total}]", "CYAN")
                }
            }

            String line = "${ModelOutput.fmt.dim(idStr)}${radar}${ModelOutput.fmt.padRight(designation, wDes)}${ModelOutput.fmt.padRight(zone, wZon)}${ModelOutput.fmt.padRight(integrity, wInt)}${resonance} ${progressLabel}"
            lines << line
        }
        lines << ModelOutput.fmt.dim("-" * width)
        return lines
    }

    @Override
    void addLocation(Location location) {
        super.addLocation(location)
        if (location instanceof Floor) {
            this.floors.add((Floor)location)
        }
    }

    @Override
    void populateChildren() {
        ProceduralFactory.instance.populateBuilding(this)
    }

    Floor getFloor(int number) {
        // floors access will trigger populateChildren() via LazyLocusList
        Floor f = floors.find { it.number == number }
        
        // Handle abyssal floors if not in the initial list (e.g. during a breach)
        if (f == null && number < 0 && isBreached) {
            f = ProceduralFactory.instance.createFloor(this, number, apartmentsPerFloor, culture, timeline, locus.branch(number))
            this.addLocation(f)
        }
        
        return f
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        Map<String, Closure> options = getBaseOptions(game)
        
        // Floors access will trigger populateChildren() via LazyLocusList
        for (Floor floor : floors) {
            String id = String.format("%02d", floors.indexOf(floor) + 1)
            String label = "${id}. Access: ${getFloorZone(floor.number)}"
            options[label] = { game.enterLocation(floor) }
        }
        return options
    }

    @Override
    String getMapSymbol() {
        if (isAbyssal()) return "☠"
        return "⌂"
    }
}
