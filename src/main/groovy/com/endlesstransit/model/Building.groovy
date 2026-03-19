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
    int lastVisitedFloor = 0

    void notifySampled(int floorNumber) {
        if (floorNumber >= 0 && floorNumber < maxFloors) {
            sampledFloors.add(floorNumber)
            lastVisitedFloor = floorNumber
        }
    }

    boolean isPrimed() {
        return sampledFloors.size() >= maxFloors && infusionCount >= 7
    }

    void breach() {
        this.isBreached = true
        Logger.info("BUILDING_BREACHED: $name")
        
        effectiveFmt.println ""
        effectiveFmt.println effectiveFmt.colorize(" [HARMONIC_INVERSION_PROTOCOL_ENGAGED] ", "RED")
        effectiveFmt.println effectiveFmt.glitchText(">>> BREACHING_THE_BEDROCK_SUBSTRATE...", 0.3)
        com.endlesstransit.ui.Terminal.clock.sleep(1000)
        effectiveFmt.println effectiveFmt.colorize(">>> LATTICE_WEIGHT_NORMALIZED. APERTURE_OPENING_AT_ROOT.", "YELLOW")
        com.endlesstransit.ui.Terminal.clock.sleep(1000)
        effectiveFmt.println ""
    }

    @Override
    Map<String, Object> getMutationState() {
        return [
            "isBreached": isBreached,
            "isLandmark": isLandmark,
            "infusionCount": infusionCount,
            "sampledFloors": sampledFloors.toList(),
            "lastVisitedFloor": lastVisitedFloor
        ]
    }

    @Override
    void applyMutationState(Map<String, Object> state) {
        if (state.containsKey("isBreached")) this.isBreached = (boolean) state.isBreached
        if (state.containsKey("isLandmark")) this.isLandmark = (boolean) state.isLandmark
        if (state.containsKey("infusionCount")) this.infusionCount = (int) state.infusionCount
        if (state.containsKey("lastVisitedFloor")) this.lastVisitedFloor = (int) state.lastVisitedFloor
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
        if (isBreached) return effectiveFmt.colorize(" [BREACHED]", "RED")
        return effectiveFmt.dim(" [FLOORS: $maxFloors]")
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
            effectiveFmt.println "\n" + effectiveFmt.colorize(" [UNIQUE_LOCUS_DETECTION] ", "YELLOW")
            effectiveFmt.println effectiveFmt.bold(">>> MAJOR_LANDMARK_DISCOVERED: $name")
            effectiveFmt.println effectiveFmt.dim("Harmonic signature is abnormally stable. Data-harvest potential: HIGH.")
            com.endlesstransit.ui.Terminal.clock.sleep(1000)
        }
        markVisited()
    }

    @Override
    List<String> getExtraContent(Player player, int width) {
        List<String> lines = []
        lines << effectiveFmt.colorize(" [BUILDING_STRATA_DIAGNOSTICS] ", "L_CYAN")
        lines << effectiveFmt.dim("Analyzing vertical lattice structure...")
        
        lines << effectiveFmt.dim("-" * width)
        
        // Define Column Widths - Optimized for 88 chars left pane
        int wId = 4
        int wRad = 7
        int wDes = 18
        int wZon = 18
        int wInt = 8
        
        // Header
        String hId = effectiveFmt.padRight("[ID]", wId)
        String hRad = effectiveFmt.padRight("[RAD]", wRad)
        String hDes = effectiveFmt.padRight("[STRATA]", wDes)
        String hZon = effectiveFmt.padRight("[FUNCTION]", wZon)
        String hInt = effectiveFmt.padRight("[ST]", wInt)
        String hRes = "[RES]"
        
        lines << effectiveFmt.bold("${hId}${hRad}${hDes}${hZon}${hInt}${hRes}")
        lines << effectiveFmt.dim("-" * width)

        // Find current floor index for the radar
        int currentFloorNum = -999
        if (player.currentLocation instanceof Floor) {
            currentFloorNum = ((Floor)player.currentLocation).number
        } else if (player.currentLocation?.parent instanceof Floor) {
            currentFloorNum = ((Floor)player.currentLocation.parent).number
        } else if (player.currentLocation == this) {
            // SPATIAL ANCHOR: Use the last visited floor if we are at the building root
            currentFloorNum = lastVisitedFloor
        }

        // Iterate floors from top to bottom (Peak to Substrate)
        int minFloor = isBreached ? -5 : 0 // Show some substrate if breached
        for (int i = maxFloors - 1; i >= minFloor; i--) {
            String idStr = String.format("%02d.", i)
            Floor floorObj = getFloor(i)
            
            // Radar Logic: [>X<] for current, [ X ] for visited, [   ] for regular
            String radar = "[   ]"
            if (i == currentFloorNum) {
                radar = effectiveFmt.colorize("[>X<]", "YELLOW")
            } else if (floorObj != null && floorObj.isVisited()) {
                radar = "[ X ]"
            } else if (i < 0) {
                radar = effectiveFmt.colorize("[ ! ]", "RED")
            }

            String designation = i == 0 ? "Lobby" : (i == maxFloors - 1 ? "Peak" : "Floor $i")
            if (i < 0) designation = "-0x" + Integer.toHexString(Math.abs(i)).toUpperCase()
            
            String zone = getFloorZone(i)
            String integrity = getFloorIntegrity(i)
            
            // Resonance logic (simulated for building view)
            Random r = locus.branch(i).nextRandom()
            int freq = 1000 + r.nextInt(2000)
            String resonance = "${freq}Hz"

            String progressLabel = ""
            if (floorObj != null) {
                def progress = getFloorProgress(floorObj, player)
                String visMarker = floorObj.isVisited() ? effectiveFmt.colorize("[V]", "GREEN") : ""
                
                if (progress.visited >= progress.total && progress.total > 0) {
                    progressLabel = "$visMarker " + effectiveFmt.colorize("[CLEARED]", "GREEN")
                } else if (progress.visited > 0) {
                    progressLabel = "$visMarker " + effectiveFmt.colorize("[${progress.visited}/${progress.total}]", "CYAN")
                } else if (floorObj.isVisited()) {
                    progressLabel = visMarker
                }
            }

            String line = "${effectiveFmt.dim(effectiveFmt.padRight(idStr, wId))}${effectiveFmt.padRight(radar, wRad)}${effectiveFmt.padRight(designation, wDes)}${effectiveFmt.padRight(zone, wZon)}${effectiveFmt.padRight(integrity, wInt)}${resonance} ${progressLabel}"
            lines << line
        }
        lines << effectiveFmt.dim("-" * width)
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
        
        // Match the range shown in getExtraContent
        int minFloor = isBreached ? -5 : 0
        for (int i = maxFloors - 1; i >= minFloor; i--) {
            Floor floor = getFloor(i)
            if (floor != null) {
                // Use a local variable to avoid closure capture bug
                final Floor targetFloor = floor
                String id = String.format("%02d", i)
                String label = "${id}. Access: ${getFloorZone(i)}"
                options[label] = { game.enterLocation(targetFloor) }
            }
        }
        return options
    }

    @Override
    String getMapSymbol() {
        if (isAbyssal()) return "☠"
        return "⌂"
    }
}
