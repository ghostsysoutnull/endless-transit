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

import java.util.Random

class Room implements Location {
    String color
    List<String> furniture
    String lighting
    String walls
    String structureDesc
    String lightingDesc
    List<String> objects = []
    Location parent
    boolean visited = false
    String culture
    String timeline

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
            return ((Apartment)parent).rooms.indexOf(this) + 1
        }
        return 0
    }

    @Override
    int getTotalInParent() {
        if (parent instanceof Apartment) {
            return ((Apartment)parent).rooms.size()
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
            def item = new InventoryItem("Hidden Frequency", randomNum)
            player.inventory.add(item)
            JournalManager.logCapture(item)
            println Terminal.colorize(">>> SPECTRAL_DEVIATION: Extracted Frequency ${randomNum} <<<", Terminal.YELLOW)
        }
    }

    @Override
    String getPath() {
        int myIndex = (parent instanceof Apartment) ? ((Apartment)parent).rooms.indexOf(this) + 1 : 0
        if (parent != null) {
            return "${parent.getPath()} > Room ${myIndex}"
        }
        return "Room ${myIndex}"
    }

    @Override
    int getDepth() {
        return (parent != null) ? parent.getDepth() + 1 : 0
    }

    @Override
    String getCoordinates() {
        Random r = new Random(this.hashCode())
        return String.format("%.3f / %.3f", r.nextDouble() * 100, r.nextDouble() * 100)
    }

    @Override
    String getName() {
        int myIndex = getIndexInParent()
        return "Room ${myIndex}"
    }

    @Override
    VibeCapsule getVibe() {
        return parent?.getVibe()
    }

    void setParent(Location parent) {
        this.parent = parent
        
        // Refine atmosphere based on parent vibe (regional mutation)
        def vibe = getVibe()
        if (vibe != null) {
            def atmos = ThemeManager.generateAtmosphere(this.culture, this.timeline, vibe.latticeMutation)
            this.walls = atmos.walls
            this.lightingDesc = atmos.lighting
            this.structureDesc = atmos.structure
        }
    }

    // Room specific location logic
    @Override
    void enter(Player player) {
        markVisited()
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        def options = [:]
        
        if (!objects.isEmpty() || !game.player.inventory.isEmpty()) {
            options["t. Interact with objects"] = {
                // Shortcut: If only 1 object and empty inventory, just take it
                if (objects.size() == 1 && game.player.inventory.isEmpty()) {
                    String name = objects[0]
                    def vibe = getVibe()
                    boolean isResonant = vibe != null && this.culture == vibe.primaryCulture
                    int freq = Gematria.calculateFrequency(name, getDepth(), isResonant)
                    def item = new InventoryItem(name, freq)
                    game.player.inventory.add(item)
                    JournalManager.logCapture(item)
                    
                    if (isResonant) {
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
                            def item = game.player.inventory.remove(idx)
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
                            def vibe = getVibe()
                            boolean isResonant = vibe != null && this.culture == vibe.primaryCulture
                            int freq = Gematria.calculateFrequency(name, getDepth(), isResonant)
                            def item = new InventoryItem(name, freq)
                            game.player.inventory.add(item)
                            JournalManager.logCapture(item)
                            
                            if (isResonant) {
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
            int myIndex = apt.rooms.indexOf(this)
            
            if (myIndex > 0) {
                options["b. Go back"] = { game.enterLocation(apt.rooms[myIndex - 1]) }
            } else {
                // Room 0: Go back exits to Apartment container or its parent
                options["l. Exit Apartment"] = { game.enterLocation(apt.parent) }
            }
            
            if (myIndex < apt.rooms.size() - 1) {
                options["f. Go forward"] = { game.enterLocation(apt.rooms[myIndex + 1]) }
            }
        }
        
        return options
    }

    Room(String culture = "rust", String timeline = "ancient") {
        this.culture = culture
        this.timeline = timeline
        
        Random random = new Random()
        String[] colors = ["white", "blue", "pink", "gray", "purple", "orange", "green", "red"]
        color = colors[random.nextInt(colors.length)]
        
        // Initial atmosphere (will be refined when parent is set)
        def atmos = ThemeManager.generateAtmosphere(culture, timeline)
        this.walls = atmos.walls
        this.lightingDesc = atmos.lighting
        this.structureDesc = atmos.structure
        
        // Generate themed furniture
        int numFurniture = random.nextInt(3) + 1
        furniture = []
        for (int i = 0; i < numFurniture; i++) {
            furniture << ThemeManager.generateHybridObject(culture, timeline)
        }
    }

    String getDescription() {
        def vibe = getVibe()
        StringBuilder description = new StringBuilder()
        
        description.append("You are in ${Terminal.bold(structureDesc)}.\n")
        description.append("The walls are ${Terminal.colorize(color, Terminal.WHITE)} ${Terminal.bold(walls)}.\n")
        description.append("The space is illuminated by ${Terminal.colorize(lightingDesc, Terminal.YELLOW)}.\n")
        description.append("\n")
        
        int wrapWidth = 45
        
        String furnitureStr = furniture.join(', ')
        List<String> wrappedFurniture = Terminal.wrapText(furnitureStr, wrapWidth)
        description.append("${Terminal.dim("FURNITURE:")} ")
        wrappedFurniture.eachWithIndex { line, i ->
            if (i > 0) description.append("           ") // Indent for multi-line
            description.append(line).append("\n")
        }
        
        if (!objects.isEmpty()) {
            String objStr = objects.join(', ')
            List<String> wrappedObjs = Terminal.wrapText(objStr, wrapWidth)
            description.append("${Terminal.colorize("OBJECTS_DETECTED:", Terminal.CYAN)} ")
            wrappedObjs.eachWithIndex { line, i ->
                if (i > 0) description.append("                  ") // Indent for multi-line
                description.append(line).append("\n")
            }
        }
        return description.toString()
    }
}
