package com.endlesstransit.model
import com.endlesstransit.core.*
import com.endlesstransit.procgen.Gematria
import com.endlesstransit.procgen.LocusSeed
import groovy.transform.CompileStatic

import java.util.Random

@CompileStatic
class Room extends AbstractLeafLocation {
    String color
    List<String> furniture = []
    String walls
    String structureDesc
    String lightingDesc
    String roomName
    String roomType
    Map<String, String> atmoTraits = [:]
    List<String> objects = []
    String culture
    String timeline
    boolean isAnomaly = false

    @Override
    int getIndexInParent() {
        if (parent instanceof Apartment) {
            return ((Apartment)parent).getRooms().indexOf(this) + 1
        }
        return 0
    }

    @Override
    int getTotalInParent() {
        if (parent instanceof Apartment) {
            return ((Apartment)parent).getRooms().size()
        }
        return 0
    }

    @Override
    String getIndexLabel() {
        return isAbyssal() ? HUDLabels.SHARD : HUDLabels.CELL
    }

    @Override
    String getStatusSummary() {
        return "ATMOS: ${atmoTraits['OXYGEN']} | TEMP: ${atmoTraits['TEMP']}"
    }

    @Override
    String getTypeLabel() {
        return isAbyssal() ? "SHARD" : "ROOM"
    }

    @Override
    String getLatticeMeta() {
        return ""
    }

    @Override
    String getMapType() {
        return "none"
    }

    @Override
    String getSparklineLabel() {
        return isAbyssal() ? "☠" : "□"
    }

    @Override
    void processAction(Player player) {
        Random random = locus.branch("ACTION").branch(player.stepCount).nextRandom()
        if (random.nextInt(10) < 3) { 
            int randomNum = random.nextInt(9000000) + 1000000 
            InventoryItem item = new InventoryItem("Hidden Frequency", randomNum)
            player.inventory.add(item)
            JournalManager.logCapture(item, this)
            fmt.println fmt.colorize(">>> SPECTRAL_DEVIATION: Extracted Frequency ${randomNum} <<<", "YELLOW")
        }
    }

    @Override
    String getCoordinates() {
        Random r = locus.branch("COORDS").nextRandom()
        return String.format("%.3f / %.3f", r.nextDouble() * 100, r.nextDouble() * 100)
    }

    @Override
    String getTypeName() { return roomType }

    @Override
    String getName() { return roomName }

    @Override
    Map<String, Object> getMutationState() {
        return [
            "objects": objects,
            "roomName": roomName,
            "roomType": roomType,
            "atmoTraits": atmoTraits
        ]
    }

    @Override
    void applyMutationState(Map<String, Object> state) {
        if (state.containsKey("objects")) {
            this.objects.clear()
            this.objects.addAll((List<String>) state.objects)
        }
        if (state.containsKey("roomName")) this.roomName = (String) state.roomName
        if (state.containsKey("roomType")) this.roomType = (String) state.roomType
        if (state.containsKey("atmoTraits")) {
            this.atmoTraits.clear()
            this.atmoTraits.putAll((Map<String, String>) state.atmoTraits)
        }
    }

    @Override
    List<String> getExtraContent(Player player, int width) {
        List<String> lines = []
        String accent = isAbyssal() ? "RED" : "L_CYAN"
        
        lines << fmt.colorize(" LOCAL_CELL_DIAGNOSTIC: ${getLIP()} ", accent)
        lines << fmt.dim("-" * width)
        
        String identPart = "IDENT: ${fmt.bold(roomName)}"
        String traitsPart = "ATMO_TRAITS: [OXY: ${atmoTraits["OXYGEN"]}] | [TEMP: ${atmoTraits["TEMP"]}]"
        lines << fmt.padRight(identPart, width.intdiv(2)) + " ║ " + traitsPart
        
        String typePart = "TYPE:  ${fmt.colorize(roomType, "YELLOW")}"
        String signalPart = "SIGNAL: ${atmoTraits["SIGNAL"]} | RESONANCE: ${isAnomaly ? fmt.colorize("[DEGRADED]", "RED") : fmt.colorize("[STABLE]", "GREEN")}"
        lines << fmt.padRight(typePart, width.intdiv(2)) + " ║ " + signalPart
        
        lines << fmt.dim("-" * width)
        return lines
    }

    @Override
    VibeCapsule getVibe() { return parent?.getVibe() }

    @Override
    boolean isAbyssal() { return parent?.isAbyssal() ?: false }

    @Override
    String getMapSymbol() {
        if (isAbyssal()) return "☠"
        return "□"
    }

    @Override
    String getMapColor() {
        if (isAbyssal()) return "RED"
        VibeCapsule v = getVibe()
        return v != null ? v.atmosphericColor : "WHITE"
    }

    @Override
    void enter(Player player) { markVisited() }

    @Override
    Map<String, Closure> getOptions(Game game) {
        Map<String, Closure> options = [:]
        
        if (!objects.isEmpty() || !game.player.inventory.isEmpty()) {
            options["t. Interact with objects"] = {
                if (objects.size() == 1 && game.player.inventory.isEmpty()) {
                    String name = objects[0]
                    VibeCapsule vibe = getVibe()
                    boolean isResonant = vibe != null && this.culture == vibe.primaryCulture
                    SpectralFrequency freq = Gematria.calculateFrequency(name, getDepth(), isResonant)
                    InventoryItem item = new InventoryItem(name, freq.value)
                    game.player.inventory.add(item)
                    JournalManager.logCapture(item, this)
                    
                    if (isResonant) {
                        game.player.resonantTracesCount++
                        fmt.println fmt.colorize("\n>>> HARMONIC_RESONANCE_DETECTED: Frequency amplified (+10%)", "GREEN")
                    }
                    fmt.println fmt.colorize("\n>>> AUTOMATIC_SCAN: ${name} captured. Frequency: ${freq}Hz", "CYAN")
                    objects.remove(0)
                    game.instantRender = true
                    return
                }

                fmt.println "\n" + fmt.colorize(" [LOCAL_CELL_OBJECT_INTERACTION] ", "L_CYAN")
                if (!objects.isEmpty()) {
                    fmt.println fmt.dim("Local objects:")
                    objects.eachWithIndex { String obj, int i ->
                        fmt.println "${fmt.colorize((i + 1).toString(), "YELLOW")}. Scan $obj"
                    }
                }
                
                if (!game.player.inventory.isEmpty()) {
                    fmt.println fmt.dim("\nBuffer fragments (to drop):")
                    game.player.inventory.eachWithIndex { InventoryItem item, int i ->
                        fmt.println "${fmt.colorize("d" + (i + 1), "YELLOW")}. Drop ${item.name}"
                    }
                }
                fmt.println "${fmt.colorize("c", "YELLOW")}. Cancel"
                
                fmt.print "\nINTERACT >> "
                String input = game.inputHandler.readLine().toLowerCase()
                
                if (input == "c" || input == "") {
                    fmt.println "Operation aborted."
                } else if (input.startsWith("d")) {
                    try {
                        int idx = input.substring(1).toInteger() - 1
                        if (idx >= 0 && idx < game.player.inventory.size()) {
                            InventoryItem item = game.player.inventory.remove(idx)
                            objects << item.name
                            fmt.println fmt.colorize(">>> Fragment ${item.name} dropped into local cell.", "YELLOW")
                            game.instantRender = true
                        }
                    } catch (Exception e) {
                        fmt.println "Invalid drop command."
                    }
                } else {
                    try {
                        int idx = input.toInteger() - 1
                        if (idx >= 0 && idx < objects.size()) {
                            String name = objects[idx]
                            VibeCapsule vibe = getVibe()
                            boolean isResonant = vibe != null && this.culture == vibe.primaryCulture
                            SpectralFrequency freq = Gematria.calculateFrequency(name, getDepth(), isResonant)
                            InventoryItem item = new InventoryItem(name, freq.value)
                            game.player.inventory.add(item)
                            JournalManager.logCapture(item, this)
                            
                            if (isResonant) {
                                game.player.resonantTracesCount++
                                fmt.println fmt.colorize("\n>>> HARMONIC_RESONANCE_DETECTED: Frequency amplified (+10%)", "GREEN")
                            }
                            fmt.println fmt.colorize(">>> Scanned ${name}. Frequency: ${freq}Hz", "CYAN")
                            objects.remove(idx)
                            game.instantRender = true
                        } else {
                            fmt.println "Invalid selection."
                        }
                    } catch (Exception e) {
                        fmt.println "Invalid input."
                    }
                }
            }
        }

        if (parent instanceof Apartment) {
            Apartment apt = (Apartment) parent
            List<Room> rms = apt.getRooms()
            int myIndex = rms.indexOf(this)
            
            if (myIndex > 0) {
                options["b. Go back"] = { game.enterLocation(rms[myIndex - 1]) }
            } else {
                options["l. Exit Apartment"] = { game.enterLocation(apt.parent) }
            }
            
            if (myIndex < rms.size() - 1) {
                options["f. Go forward"] = { game.enterLocation(rms[myIndex + 1]) }
            }
        }
        
        return options
    }

    String getDescription() {
        StringBuilder description = new StringBuilder()
        String s = structureDesc
        String w = walls
        String l = lightingDesc

        if (isAnomaly) {
            s = fmt.glitchText(s, 0.2)
            w = fmt.glitchText(w, 0.1)
            l = fmt.glitchText(l, 0.3)
        }

        description.append(fmt.colorize(" [NEURAL_LINK_INTERPRETATION]:", fmt.L_MAGENTA)).append("\n")
        description.append("You are in $s. The walls are ${fmt.colorize(color, "WHITE")} $w.\n")
        description.append("The space is illuminated by ${fmt.colorize(l, "YELLOW")}.\n")
        
        int wrapWidth = 80
        String furnitureStr = furniture.join(', ')
        List<String> wrappedFurniture = fmt.wrapText(furnitureStr, wrapWidth)
        description.append("${fmt.dim("FURNITURE:")} ")
        wrappedFurniture.eachWithIndex { String line, int i ->
            if (i > 0) description.append("           ") 
            description.append(line).append("\n")
        }
        
        if (!objects.isEmpty()) {
            String objStr = objects.join(', ')
            List<String> wrappedObjs = fmt.wrapText(objStr, wrapWidth)
            description.append("${fmt.colorize("OBJECTS_DETECTED:", "CYAN")} ")
            wrappedObjs.eachWithIndex { String line, int i ->
                if (i > 0) description.append("                  ") 
                description.append(line).append("\n")
            }
        }
        return description.toString()
    }

    Room() {}
}
