package com.endlesstransit

import java.util.Scanner

class Game {
    Location currentLocation
    Player player
    String lastChoice
    Scanner scanner
    Map<String, String> currentActionMap = [:]
    Map<String, String> previousActionMap = [:] 
    boolean instantRender = false

    Game() {
        player = new Player()
        scanner = new Scanner(System.in)
        initializeWorld()
    }

    void initializeWorld() {
        def universe = new Universe()
        
        // Start deep: Universe > Filament > Sector > System > Planet > Country > City > Street
        def filament = universe.filaments[0]
        def node = filament.children[0]
        
        // Find a SolarSystem within the node (GalacticSector or NullSector)
        def system = node.children[0]
        
        def planet = system.planets[0]
        def country = planet.countries[0]
        def city = country.cities[0]
        currentLocation = city.streets[0]
    }

    void renderInventoryOverlay() {
        println ""
        String title = Terminal.colorize(" [QUANTUM_TRACE_BUFFER_SYNC...] ", Terminal.L_CYAN)
        println title
        
        if (player.inventory.isEmpty()) {
            println Terminal.dim("  (No spectral traces detected in local buffer) ")
        } else {
            // Show all items now that we can scroll
            player.inventory.each { item ->
                String freqStr = String.format("%04d", item.frequency)
                
                int signalStrength = (item.frequency % 100) / 10 + 1
                String signalBar = "█" * signalStrength + "░" * (10 - signalStrength)
                String phase = (item.frequency % 2 == 0) ? "STABLE" : "SHIFTING"
                String signalColor = (phase == "STABLE") ? Terminal.CYAN : Terminal.MAGENTA
                
                print "  ${Terminal.dim(freqStr)}Hz "
                print Terminal.colorize(signalBar, signalColor)
                print " ${Terminal.dim("[" + phase + "]")}"
                println " >> ${Terminal.bold(item.name)}"
            }
        }
        println Terminal.dim(" ----------------------------------------------------------------------")
        println Terminal.dim(" SYNC_STATUS: " + Terminal.colorize("NOMINAL", Terminal.GREEN))
        println ""
        System.out.flush()
    }

    void start() {
        println(Terminal.colorize("Welcome to Endless Transit!", Terminal.L_CYAN))
        Logger.info("Game started.")
        JournalManager.startSession(player)
        
        try {
            while (true) {
                Logger.info("Entering main loop. Location: ${currentLocation.getPath()}")
                
                // Adjust coherence based on depth
                player.adjustCoherence(-1) // Constant drain per step
                
                if (player.coherence <= 0) {
                    Terminal.clearScreen()
                    println Terminal.colorize("!!! CRITICAL_COHERENCE_FAILURE !!!", Terminal.RED)
                    println Terminal.colorize(">>> NEURAL LINK SEVERED. REBOOTING FROM UNIMATRIX ROOT...", Terminal.YELLOW)
                    Thread.sleep(2000)
                    player.coherence = 100
                    initializeWorld()
                    continue
                }

                int idx = currentLocation.getIndexInParent()
                int total = currentLocation.getTotalInParent()
                
                // Dynamic Separator
                String sep = "----------------------------------------------------------------------"
                if (currentLocation instanceof CosmicFilament) sep = ">> >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> >>"
                if (currentLocation instanceof NullSector) sep = " . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . "
                if (currentLocation instanceof GalacticSector) sep = "::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::"
                if (currentLocation instanceof SolarSystem) sep = "* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *"
                if (currentLocation instanceof Street || currentLocation instanceof City) sep = "_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_"
                if (currentLocation instanceof Room) sep = "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -"

                println "\n${Terminal.dim(sep)}"
                
                // BORG HUD (Terminology Evolution)
                println renderCoherenceBar()
                printf("${Terminal.dim("[")}${Terminal.colorize("SCANNING_LOCAL_TOPOLOGY...", Terminal.CYAN)}${Terminal.dim("]")}\n")
                printf("${Terminal.dim("[")}LATTICE_IDENT: ${Terminal.bold(currentLocation.getClass().simpleName)}${Terminal.dim("]")} ${Terminal.dim(">>")} ${Terminal.colorize(currentLocation.getName(), Terminal.YELLOW)}\n")
                printf("${Terminal.dim("[")}LOCUS_HASH: %s${Terminal.dim("]")} ${Terminal.dim("[")}HOP_DENSITY: %d${Terminal.dim("]")}\n", currentLocation.getCoordinates(), currentLocation.getDepth())
                printf("${Terminal.dim("[")}PULSE_TRAVERSAL: %d${Terminal.dim("]")} ${Terminal.dim("[")}TRACE_BUFFER: %d/16 FRAGMENTS", player.stepCount, player.inventory.size())
                
                if (!player.inventory.isEmpty()) {
                    def last3 = player.inventory.takeRight(3).reverse()
                    def freqs = last3.collect { it.frequency }
                    print(" | ${Terminal.dim("RECENT:")} ${Terminal.colorize(freqs.join(', '), Terminal.L_CYAN)}")
                }
                println "${Terminal.dim("]")}"
                
                println "${Terminal.dim("[UP-LINK_TRACE]:")} ${Terminal.colorize(currentLocation.getPath(), Terminal.GREY)}"
                
                // Structural Alignment info
                if (total > 0) {
                    String alignLabel = "ALIGNMENT"
                    if (currentLocation instanceof Floor) alignLabel = "Z-AXIS_ALIGN"
                    if (currentLocation instanceof Room) alignLabel = "CELL_INDEX"
                    printf("${Terminal.dim("[")}$alignLabel: %d / %d${Terminal.dim("]")}\n", idx, total)
                }
                
                println ""
                
                // Typewriter effect for location description
                String desc = currentLocation.getDescription()
                if (player.coherence < 40) desc = Terminal.glitchText(desc, 0.1)
                
                if (instantRender) {
                    println desc
                    instantRender = false // Reset
                } else {
                    Terminal.typewrite(desc, 5)
                }
                
                currentLocation.enter(player)
                currentLocation.processAction(player)
                
                def options = currentLocation.getOptions(this)
                
                // --- Repetition Logic for "Leave" actions ---
                if (lastChoice != null) {
                    String prevLabel = currentActionMap[lastChoice]?.toLowerCase()
                    if (prevLabel != null && (prevLabel.contains("leave") || prevLabel.contains("exit") || prevLabel.contains("go back"))) {
                        // Find the new "leave" key in this location
                        def newLeaveKey = options.find { k, v -> 
                            String l = k.toLowerCase()
                            l.contains("leave") || l.contains("exit") || l.contains("go back")
                        }?.key
                        
                        if (newLeaveKey) {
                            String key = newLeaveKey.contains(".") ? newLeaveKey.split("\\.")[0].trim() : newLeaveKey
                            lastChoice = key
                            Logger.info("Auto-mapped repetition key to new leave action: $key")
                        }
                    }
                }

                previousActionMap = currentActionMap
                currentActionMap = [:]
                
                // Map options to menu choices
                def menu = [:]
                
                options.each { label, action ->
                    String key = label.contains(".") ? label.split("\\.")[0].trim() : label
                    menu[key] = action
                    currentActionMap[key] = label
                }
                
                // Add global options
                currentActionMap["i"] = "List inventory"
                currentActionMap["quit"] = "Quit"

                // Display Menu and Compass
                println ""
                renderCompass(options)
                println("${Terminal.dim("EXECUTE_DIRECTIVE:")}")
                menu.each { menuKey, action ->
                    String label = currentActionMap[menuKey]
                    if (currentLocation instanceof Street && label.contains("Enter Building:")) {
                        return
                    }
                    println(label)
                }
                println("${Terminal.colorize("i", Terminal.YELLOW)}. Open Trace Buffer")
                println("${Terminal.colorize("quit", Terminal.RED)}. Terminate Link")

                String choice
            while (true) {
                String rawInput = getRawUserInput()
                
                // Boundary-based auto-reversal logic
                if (rawInput == "" && lastChoice != null) {
                    def reversalPairs = [
                        "f": "b",
                        "b": "f",
                        "u": "d",
                        "d": "u"
                    ]
                    
                    String lastKey = lastChoice
                    String oppositeKey = reversalPairs[lastKey]
                    
                    if (oppositeKey) {
                        boolean currentStillAvailable = options.keySet().any { it.startsWith(lastKey + ". ") }
                        
                        if (!currentStillAvailable) {
                            if (options.keySet().any { it.startsWith(oppositeKey + ". ") }) {
                                println "Boundary reached. Reversing direction."
                                lastChoice = oppositeKey
                                choice = oppositeKey
                                break
                            }
                        }
                    }
                }
                
                choice = processInput(rawInput)

                if (choice == "i") {
                    lastChoice = "i"
                    inventoryMenu()
                    // Break inner loop to re-render location immediately
                    choice = null
                    break
                }
                
                if (choice == "-2") {
                    // Just loop again for new input
                    continue
                }
                
                break // Break inner loop for any other choice
            }

            if (choice == null) continue // Re-rendered from inventory

            if (choice == "quit") {
                print Terminal.colorize("Are you sure you want to quit? [y/N]: ", Terminal.YELLOW)
                String confirm = scanner.nextLine().trim().toLowerCase()
                if (confirm == "y") {
                    JournalManager.saveSession(player)
                    println(Terminal.colorize("Goodbye!", Terminal.L_CYAN))
                    break
                }
                continue
            }

            Logger.info("Executing choice: $choice")
            // Find matching menu entry
            def matchingKey = menu.keySet().find { key ->
                return key.equalsIgnoreCase(choice)
            }

            if (matchingKey) {
                player.stepCount++
                lastChoice = matchingKey
                menu[matchingKey].call()
            } else if (choice != "-2") {
                println("Invalid choice. Please try again.")
            }
        }
    } catch (Throwable t) {
        Logger.error("CRITICAL_FAILURE: Game loop crashed.", t)
        println(Terminal.colorize("\n!!! CRITICAL SYSTEM FAILURE DETECTED !!!", Terminal.RED))
        println(Terminal.dim("Error has been logged to transit.log"))
        System.exit(1)
    }
}

    void inventoryMenu() {
        while (true) {
            println "\n" + Terminal.colorize(" [QUANTUM_TRACE_BUFFER_INTERACE] ", Terminal.L_CYAN)
            player.listInventory()
            println Terminal.dim("-------------------------------------------")
            println "${Terminal.colorize("d [num]", Terminal.YELLOW)}: Drop item  |  ${Terminal.colorize("m [n1] [n2]", Terminal.YELLOW)}: Merge items"
            println "${Terminal.colorize("b", Terminal.YELLOW)}: Back to reality"
            
            print "\nBUFFER_CMD >> "
            String input = scanner.nextLine().trim().toLowerCase()
            
            if (input == "b" || input == "") {
                // Clear session labels before returning to reality
                player.inventory.each { it.sessionMergeCount = 0 }
                break
            }
            
            def parts = input.split(" ")
            String cmd = parts[0]
            
            try {
                if (cmd == "d" && parts.size() > 1) {
                    int idx = parts[1].toInteger() - 1
                    player.dropItem(idx)
                } else if (cmd == "m" && parts.size() > 2) {
                    int idx1 = parts[1].toInteger() - 1
                    int idx2 = parts[2].toInteger() - 1
                    player.mergeItems(idx1, idx2)
                    // Synthesis restores coherence
                    player.adjustCoherence(15)
                } else {
                    println "Invalid buffer command."
                }
            } catch (Exception e) {
                println "Invalid input format."
            }
        }
    }

    String renderCoherenceBar() {
        int length = 10
        int filled = (player.coherence * length / 100).toInteger()
        String bar = "█" * filled + "░" * (length - filled)
        String color = Terminal.GREEN
        if (player.coherence < 30) color = Terminal.RED
        else if (player.coherence < 70) color = Terminal.YELLOW
        
        return "${Terminal.dim("[")}COHERENCE: ${Terminal.colorize(bar, color)} ${player.coherence}%${Terminal.dim("]")}"
    }

    void renderCompass(Map options) {
        String u = options.keySet().any { it.toLowerCase().contains("up") } ? Terminal.colorize("U", Terminal.YELLOW) : Terminal.dim("·")
        String d = options.keySet().any { it.toLowerCase().contains("down") } ? Terminal.colorize("D", Terminal.YELLOW) : Terminal.dim("·")
        String f = options.keySet().any { it.toLowerCase().contains("forward") } ? Terminal.colorize("F", Terminal.YELLOW) : Terminal.dim("·")
        String b = options.keySet().any { it.toLowerCase().contains("back") } ? Terminal.colorize("B", Terminal.YELLOW) : Terminal.dim("·")
        String l = options.keySet().any { it.toLowerCase().contains("leave") || it.toLowerCase().contains("exit") } ? Terminal.colorize("L", Terminal.YELLOW) : Terminal.dim("·")

        println Terminal.dim("    [$u]")
        println Terminal.dim(" [$l] [${Terminal.colorize("+", Terminal.CYAN)}] [$f]")
        println Terminal.dim("    [$d]  ($b)")
    }

    void enterLocation(Location location) {
        Logger.info("Changing location from ${currentLocation?.getPath()} to ${location?.getPath()}")
        this.currentLocation = location
        
        // Record path if it's macro-scale (up until Building)
        if (location != null) {
            boolean isMacro = !(location instanceof Floor || location instanceof Corridor || 
                                location instanceof Apartment || location instanceof Room)
            String path = location.getPath()
            if (isMacro) {
                if (!player.visitedPaths.contains(path)) {
                    player.visitedPaths.add(path)
                    JournalManager.logDiscovery(path)
                }
            } else {
                // If we enter a building's internal structure, ensure the Building itself is recorded
                // This handles cases where we might jump directly or for consistency
                Location p = location.parent
                while (p != null) {
                    if (p instanceof Building) {
                        String bPath = p.getPath()
                        if (!player.visitedPaths.contains(bPath)) {
                            player.visitedPaths.add(bPath)
                            JournalManager.logDiscovery(bPath)
                        }
                        break
                    }
                    p = p.parent
                }
            }
        }
    }
    
    // Temporary helper to exit current location (go to parent)
    void exitLocation() {
        if (currentLocation.getParent() != null) {
            currentLocation = currentLocation.getParent()
        } else {
            println "You can't go out from here."
        }
    }

    String getRawUserInput() {
        String fullLabel = previousActionMap[lastChoice] ?: lastChoice ?: ""
        String actionName = fullLabel
        if (fullLabel.contains(". ")) {
            actionName = fullLabel.substring(fullLabel.indexOf(". ") + 2)
        }
        String hudLastAction = lastChoice != null ? " [Last: $actionName]" : ""
        
        print Terminal.dim("---=====================================>>")
        print Terminal.colorize(hudLastAction, Terminal.CYAN)
        print " Enter choice: "
        
        String input
        if (System.console()) {
            input = System.console().readLine()
        } else if (scanner.hasNextLine()) {
            input = scanner.nextLine()
        } else {
            return null // EOF
        }
        return input != null ? input.trim() : null
    }

    String processInput(String input) {
        if (input == null) return "quit"

        if (input.isEmpty()) {
            if (lastChoice != null) {
                println "Repeating: $lastChoice"
                return lastChoice
            }
            return "-2"
        }

        if (input.equalsIgnoreCase("i")) {
            return "i"
        }
        
        if (input.equalsIgnoreCase("quit")) {
            return "quit"
        }

        return input
    }
}
