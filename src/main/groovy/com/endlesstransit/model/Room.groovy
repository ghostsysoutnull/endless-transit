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
import groovy.transform.CompileStatic

import java.util.Random

@CompileStatic
class Room implements Location {
    String color
    List<String> furniture
    String lighting
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
    long seed

    @Override
    long getSeed() {
        return seed
    }

    @Override
    void setSeed(long seed) {
        this.seed = seed
    }

    /**
     * Generates a Locus Index Path (LIP) for the current location.
     */
    @Override
    String getLIP() {
        int myIndex = getIndexInParent() - 1 // 0-based index for LIP
        return "${parent.getLIP()}.$myIndex"
    }

    @Override
    boolean isVisited() {
        return visited
    }

    @Override
    void markVisited() {
        this.visited = true
    }

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
    Location getParent() {
        return parent
    }

    @Override
    void processAction(Player player) {
        Random random = new Random()
        if (random.nextInt(10) < 3) { // 30% chance
            int randomNum = random.nextInt(9000000) + 1000000 
            InventoryItem item = new InventoryItem("Hidden Frequency", randomNum)
            player.inventory.add(item)
            JournalManager.logCapture(item, this)
            println Terminal.colorize(">>> SPECTRAL_DEVIATION: Extracted Frequency ${randomNum} <<<", Terminal.YELLOW)
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
    String getTypeName() {
        return roomType
    }

    @Override
    String getName() {
        return roomName
    }

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
        String accent = isAbyssal() ? Terminal.RED : Terminal.L_CYAN
        
        lines << Terminal.colorize(" LOCAL_CELL_DIAGNOSTIC: ${getLIP()} ", accent)
        lines << Terminal.dim("-" * width)
        
        String identPart = "IDENT: ${Terminal.bold(roomName)}"
        String traitsPart = "ATMO_TRAITS: [OXY: ${atmoTraits["OXYGEN"]}] | [TEMP: ${atmoTraits["TEMP"]}]"
        lines << String.format("%-45s ║ %s", identPart, traitsPart)
        
        String typePart = "TYPE:  ${Terminal.colorize(roomType, Terminal.YELLOW)}"
        String signalPart = "SIGNAL: ${atmoTraits["SIGNAL"]} | RESONANCE: ${isAnomaly ? Terminal.colorize("[DEGRADED]", Terminal.RED) : Terminal.colorize("[STABLE]", Terminal.GREEN)}"
        lines << String.format("%-45s ║ %s", typePart, signalPart)
        
        lines << Terminal.dim("-" * width)
        return lines
    }

    @Override
    VibeCapsule getVibe() {
        return parent?.getVibe()
    }

    @Override
    Location findAncestor(Class type) {
        if (type.isInstance(this)) return this
        return parent?.findAncestor(type)
    }

    @Override
    boolean isAbyssal() {
        return parent?.isAbyssal() ?: false
    }

    @Override
    String getMapSymbol() {
        if (isAbyssal()) return "☠"
        return Terminal.ICON_ROM
    }

    @Override
    String getMapColor() {
        if (isAbyssal()) return Terminal.RED
        VibeCapsule v = getVibe()
        return v != null ? v.atmosphericColor : Terminal.WHITE
    }

    void setParent(Location parent) {
        this.parent = parent
        
        if (parent instanceof Apartment) {
            this.isAnomaly = ((Apartment)parent).isAnomaly
        }

        // Functional Naming based on Country Trait
        Country country = (Country) findAncestor(Country.class)
        String trait = country != null ? country.functionalTrait : "Standard"
        Map<String, String> nameData = NameGenerator.generateRoomName(this.culture, trait, this.seed)
        this.roomName = nameData["name"]
        this.roomType = nameData["type"]

        // Refine atmosphere based on parent vibe (regional mutation)
        VibeCapsule vibe = getVibe()
        if (vibe != null) {
            Map<String, String> atmos = ThemeManager.generateAtmosphere(this.culture, this.timeline, vibe.latticeMutation, this.isAnomaly, this.seed)
            this.walls = atmos["walls"]
            this.lightingDesc = atmos["lighting"]
            this.structureDesc = atmos["structure"]
        }
    }

    // Room specific location logic
    @Override
    void enter(Player player) {
        markVisited()
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        Map<String, Closure> options = [:]
        
        if (!objects.isEmpty() || !game.player.inventory.isEmpty()) {
            options["t. Interact with objects"] = {
                // Shortcut: If only 1 object and empty inventory, just take it
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
                        println Terminal.colorize("\n>>> HARMONIC_RESONANCE_DETECTED: Frequency amplified (+10%)", Terminal.GREEN)
                    }
                    println Terminal.colorize("\n>>> AUTOMATIC_SCAN: ${name} captured. Frequency: ${freq}Hz", Terminal.CYAN)
                    objects.remove(0)
                    game.instantRender = true
                    return
                }

                println "\n" + Terminal.colorize(" [LOCAL_CELL_OBJECT_INTERACTION] ", Terminal.L_CYAN)
                if (!objects.isEmpty()) {
                    println Terminal.dim("Local objects:")
                    objects.eachWithIndex { obj, i ->
                        println "${Terminal.colorize((i + 1).toString(), Terminal.YELLOW)}. Scan $obj"
                    }
                }
                
                if (!game.player.inventory.isEmpty()) {
                    println Terminal.dim("\nBuffer fragments (to drop):")
                    game.player.inventory.eachWithIndex { item, i ->
                        println "${Terminal.colorize("d" + (i + 1), Terminal.YELLOW)}. Drop ${item.name}"
                    }
                }
                println "${Terminal.colorize("c", Terminal.YELLOW)}. Cancel"
                
                print "\nINTERACT >> "
                String input = game.scanner.nextLine().trim().toLowerCase()
                
                if (input == "c" || input == "") {
                    println "Operation aborted."
                } else if (input.startsWith("d")) {
                    try {
                        int idx = input.substring(1).toInteger() - 1
                        if (idx >= 0 && idx < game.player.inventory.size()) {
                            InventoryItem item = game.player.inventory.remove(idx)
                            objects << item.name
                            println Terminal.colorize(">>> Fragment ${item.name} dropped into local cell.", Terminal.YELLOW)
                            game.instantRender = true
                        }
                    } catch (Exception e) {
                        println "Invalid drop command."
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
                                println Terminal.colorize("\n>>> HARMONIC_RESONANCE_DETECTED: Frequency amplified (+10%)", Terminal.GREEN)
                            }
                            println Terminal.colorize(">>> Scanned ${name}. Frequency: ${freq}Hz", Terminal.CYAN)
                            objects.remove(idx)
                            game.instantRender = true
                        } else {
                            println "Invalid selection."
                        }
                    } catch (Exception e) {
                        println "Invalid input."
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
                // Room 0: Go back exits to Apartment container or its parent
                options["l. Exit Apartment"] = { game.enterLocation(apt.parent) }
            }
            
            if (myIndex < rms.size() - 1) {
                options["f. Go forward"] = { game.enterLocation(rms[myIndex + 1]) }
            }
        }
        
        return options
    }

    Room(String culture = "rust", String timeline = "ancient", long seed = 0) {
        this.culture = culture
        this.timeline = timeline
        this.seed = seed
        
        Random random = seed != 0 ? new Random(seed) : new Random()
        String[] colors = ["white", "blue", "pink", "gray", "purple", "orange", "green", "red"]
        color = colors[random.nextInt(colors.length)]
        
        // Initial atmosphere (will be refined when parent is set)
        Map<String, String> atmos = ThemeManager.generateAtmosphere(culture, timeline, "Standard", false, seed)
        this.walls = atmos["walls"]
        this.lightingDesc = atmos["lighting"]
        this.structureDesc = atmos["structure"]

        // Initial Atmo-Traits
        this.atmoTraits["OXYGEN"] = "${random.nextInt(10) + 12}%"
        this.atmoTraits["TEMP"] = "${random.nextInt(20) + 5}°C"
        this.atmoTraits["SIGNAL"] = random.nextBoolean() ? "[SHIELDED]" : "[CLEAR]"
        
        // Generate themed furniture
        int numFurniture = random.nextInt(3) + 1
        furniture = []
        for (int i = 0; i < numFurniture; i++) {
            // Derived seed for furniture
            furniture << ThemeManager.generateHybridObject(culture, timeline, seed != 0 ? seed + i + 100 : 0)
        }
    }

    String getDescription() {
        StringBuilder description = new StringBuilder()
        
        String structure = structureDesc
        String wallText = walls
        String lightText = lightingDesc

        if (isAnomaly) {
            structure = Terminal.glitchText(structure, 0.2)
            wallText = Terminal.glitchText(wallText, 0.1)
            lightText = Terminal.glitchText(lightText, 0.3)
        }

        // --- Sensory Prose ---
        description.append(Terminal.colorize(" [NEURAL_LINK_INTERPRETATION]:", Terminal.L_MAGENTA)).append("\n")
        description.append("You are in $structure. The walls are ${Terminal.colorize(color, Terminal.WHITE)} $wallText.\n")
        description.append("The space is illuminated by ${Terminal.colorize(lightText, Terminal.YELLOW)}.\n")
        
        int wrapWidth = 80
        
        String furnitureStr = furniture.join(', ')
        List<String> wrappedFurniture = Terminal.wrapText(furnitureStr, wrapWidth)
        description.append("${Terminal.dim("FURNITURE:")} ")
        wrappedFurniture.eachWithIndex { line, i ->
            if (i > (int)0) description.append("           ") // Indent for multi-line
            description.append(line).append("\n")
        }
        
        if (!objects.isEmpty()) {
            String objStr = objects.join(', ')
            List<String> wrappedObjs = Terminal.wrapText(objStr, wrapWidth)
            description.append("${Terminal.colorize("OBJECTS_DETECTED:", Terminal.CYAN)} ")
            wrappedObjs.eachWithIndex { line, i ->
                if (i > (int)0) description.append("                  ") // Indent for multi-line
                description.append(line).append("\n")
            }
        }
        return description.toString()
    }
}
