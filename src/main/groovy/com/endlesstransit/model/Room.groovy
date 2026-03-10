package com.endlesstransit.model
import com.endlesstransit.core.*
import com.endlesstransit.procgen.Gematria
import com.endlesstransit.procgen.LocusSeed
import groovy.transform.CompileStatic

import java.util.Random

@CompileStatic
class Room implements Location {
    String color
    List<String> furniture = []
    String walls
    String structureDesc
    String lightingDesc
    String roomName
    String roomType
    Map<String, String> atmoTraits = [:]
    List<String> objects = []
    Location parent
    boolean visited = false
    String culture
    String timeline
    boolean isAnomaly = false
    LocusSeed locus

    @Override
    LocusSeed getLocus() { return locus }

    @Override
    void setLocus(LocusSeed locus) { this.locus = locus }

    @Override
    String getLIP() {
        int myIndex = getIndexInParent() - 1 
        return "${parent.getLIP()}.$myIndex"
    }

    @Override
    boolean isVisited() { return visited }

    @Override
    void markVisited() { this.visited = true }

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
    void setParent(Location parent) { this.parent = parent }

    @Override
    Location getParent() { return parent }

    @Override
    void processAction(Player player) {
        Random random = new Random()
        if (random.nextInt(10) < 3) { 
            int randomNum = random.nextInt(9000000) + 1000000 
            InventoryItem item = new InventoryItem("Hidden Frequency", randomNum)
            player.inventory.add(item)
            JournalManager.logCapture(item, this)
            ModelOutput.fmt.println ModelOutput.fmt.colorize(">>> SPECTRAL_DEVIATION: Extracted Frequency ${randomNum} <<<", "YELLOW")
        }
    }

    @Override
    String getPath() {
        if (parent != null) {
            return "${parent.getPath()} > $roomName"
        }
        return roomName
    }

    @Override
    int getDepth() {
        return (parent != null) ? parent.getDepth() + 1 : 0
    }

    @Override
    String getCoordinates() {
        Random r = new Random(this.hashCode() as long)
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
    List<String> getExtraContent(Player player) {
        List<String> lines = []
        int width = 100
        String accent = isAbyssal() ? "RED" : "L_CYAN"
        
        lines << ModelOutput.fmt.colorize(" LOCAL_CELL_DIAGNOSTIC: ${getLIP()} ", accent)
        lines << ModelOutput.fmt.dim("-" * width)
        
        String identPart = "IDENT: ${ModelOutput.fmt.bold(roomName)}"
        String traitsPart = "ATMO_TRAITS: [OXY: ${atmoTraits["OXYGEN"]}] | [TEMP: ${atmoTraits["TEMP"]}]"
        lines << String.format("%-45s ║ %s", identPart, traitsPart)
        
        String typePart = "TYPE:  ${ModelOutput.fmt.colorize(roomType, "YELLOW")}"
        String signalPart = "SIGNAL: ${atmoTraits["SIGNAL"]} | RESONANCE: ${isAnomaly ? ModelOutput.fmt.colorize("[DEGRADED]", "RED") : ModelOutput.fmt.colorize("[STABLE]", "GREEN")}"
        lines << String.format("%-45s ║ %s", typePart, signalPart)
        
        lines << ModelOutput.fmt.dim("-" * width)
        return lines
    }

    @Override
    VibeCapsule getVibe() { return parent?.getVibe() }

    @Override
    Location findAncestor(Class type) {
        if (type.isInstance(this)) return this
        return parent?.findAncestor(type)
    }

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
                    int freq = Gematria.calculateFrequency(name, getDepth(), isResonant)
                    InventoryItem item = new InventoryItem(name, freq)
                    game.player.inventory.add(item)
                    JournalManager.logCapture(item, this)
                    
                    if (isResonant) {
                        game.player.resonantTracesCount++
                        ModelOutput.fmt.println ModelOutput.fmt.colorize("\n>>> HARMONIC_RESONANCE_DETECTED: Frequency amplified (+10%)", "GREEN")
                    }
                    ModelOutput.fmt.println ModelOutput.fmt.colorize("\n>>> AUTOMATIC_SCAN: ${name} captured. Frequency: ${freq}Hz", "CYAN")
                    objects.remove(0)
                    game.instantRender = true
                    return
                }

                ModelOutput.fmt.println "\n" + ModelOutput.fmt.colorize(" [LOCAL_CELL_OBJECT_INTERACTION] ", "L_CYAN")
                if (!objects.isEmpty()) {
                    ModelOutput.fmt.println ModelOutput.fmt.dim("Local objects:")
                    objects.eachWithIndex { String obj, int i ->
                        ModelOutput.fmt.println "${ModelOutput.fmt.colorize((i + 1).toString(), "YELLOW")}. Scan $obj"
                    }
                }
                
                if (!game.player.inventory.isEmpty()) {
                    ModelOutput.fmt.println ModelOutput.fmt.dim("\nBuffer fragments (to drop):")
                    game.player.inventory.eachWithIndex { InventoryItem item, int i ->
                        ModelOutput.fmt.println "${ModelOutput.fmt.colorize("d" + (i + 1), "YELLOW")}. Drop ${item.name}"
                    }
                }
                ModelOutput.fmt.println "${ModelOutput.fmt.colorize("c", "YELLOW")}. Cancel"
                
                ModelOutput.fmt.print "\nINTERACT >> "
                String input = game.inputHandler.readLine().toLowerCase()
                
                if (input == "c" || input == "") {
                    ModelOutput.fmt.println "Operation aborted."
                } else if (input.startsWith("d")) {
                    try {
                        int idx = input.substring(1).toInteger() - 1
                        if (idx >= 0 && idx < game.player.inventory.size()) {
                            InventoryItem item = game.player.inventory.remove(idx)
                            objects << item.name
                            ModelOutput.fmt.println ModelOutput.fmt.colorize(">>> Fragment ${item.name} dropped into local cell.", "YELLOW")
                            game.instantRender = true
                        }
                    } catch (Exception e) {
                        ModelOutput.fmt.println "Invalid drop command."
                    }
                } else {
                    try {
                        int idx = input.toInteger() - 1
                        if (idx >= 0 && idx < objects.size()) {
                            String name = objects[idx]
                            VibeCapsule vibe = getVibe()
                            boolean isResonant = vibe != null && this.culture == vibe.primaryCulture
                            int freq = Gematria.calculateFrequency(name, getDepth(), isResonant)
                            InventoryItem item = new InventoryItem(name, freq)
                            game.player.inventory.add(item)
                            JournalManager.logCapture(item, this)
                            
                            if (isResonant) {
                                game.player.resonantTracesCount++
                                ModelOutput.fmt.println ModelOutput.fmt.colorize("\n>>> HARMONIC_RESONANCE_DETECTED: Frequency amplified (+10%)", "GREEN")
                            }
                            ModelOutput.fmt.println ModelOutput.fmt.colorize(">>> Scanned ${name}. Frequency: ${freq}Hz", "CYAN")
                            objects.remove(idx)
                            game.instantRender = true
                        } else {
                            ModelOutput.fmt.println "Invalid selection."
                        }
                    } catch (Exception e) {
                        ModelOutput.fmt.println "Invalid input."
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
            s = ModelOutput.fmt.glitchText(s, 0.2)
            w = ModelOutput.fmt.glitchText(w, 0.1)
            l = ModelOutput.fmt.glitchText(l, 0.3)
        }

        description.append(ModelOutput.fmt.colorize(" [NEURAL_LINK_INTERPRETATION]:", ModelOutput.fmt.L_MAGENTA)).append("\n")
        description.append("You are in $s. The walls are ${ModelOutput.fmt.colorize(color, "WHITE")} $w.\n")
        description.append("The space is illuminated by ${ModelOutput.fmt.colorize(l, "YELLOW")}.\n")
        
        int wrapWidth = 80
        String furnitureStr = furniture.join(', ')
        List<String> wrappedFurniture = ModelOutput.fmt.wrapText(furnitureStr, wrapWidth)
        description.append("${ModelOutput.fmt.dim("FURNITURE:")} ")
        wrappedFurniture.eachWithIndex { String line, int i ->
            if (i > 0) description.append("           ") 
            description.append(line).append("\n")
        }
        
        if (!objects.isEmpty()) {
            String objStr = objects.join(', ')
            List<String> wrappedObjs = ModelOutput.fmt.wrapText(objStr, wrapWidth)
            description.append("${ModelOutput.fmt.colorize("OBJECTS_DETECTED:", "CYAN")} ")
            wrappedObjs.eachWithIndex { String line, int i ->
                if (i > 0) description.append("                  ") 
                description.append(line).append("\n")
            }
        }
        return description.toString()
    }

    Room() {}
}
