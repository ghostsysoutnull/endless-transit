package com.endlesstransit

import java.util.Scanner

class Game {
    Location currentLocation
    Player player
    String lastChoice
    Scanner scanner
    Map<String, String> currentActionMap = [:]
    Map<String, String> previousActionMap = [:]

    Game() {
        player = new Player()
        scanner = new Scanner(System.in)
        initializeWorld()
    }

    void initializeWorld() {
        def universe = new Universe()
        
        // Start at the first street of the first city of the first country of the first planet of the first system
        def firstSystem = universe.solarSystems[0]
        def planet = firstSystem.planets[0]
        def country = planet.countries[0]
        def city = country.cities[0]
        currentLocation = city.streets[0]
    }

    void renderInventoryOverlay() {
        Terminal.save()
        
        // Use fixed row for the holographic sidebar (absolute viewport positioning)
        int startRow = 2
        int sidebarCol = 50
        int wrapWidth = 35 // width available for text within sidebar
        
        // Clear the sidebar area first (20 lines to be safe)
        Terminal.clearArea(startRow, sidebarCol, 20, 50)
        
        String borderChar = Terminal.dim("╎")
        String title = Terminal.colorize(" [QUANTUM_TRACE_BUFFER] ", Terminal.L_CYAN)
        
        Terminal.moveTo(startRow, sidebarCol)
        println "${borderChar}${title}"
        
        if (player.inventory.isEmpty()) {
            Terminal.moveTo(startRow + 1, sidebarCol)
            println "${borderChar} " + Terminal.dim(" (No spectral traces detected) ")
        } else {
            // Show up to 4 items with multi-line support to avoid overflow
            def displayInv = player.inventory.takeRight(4)
            int currentRow = startRow + 1
            
            displayInv.each { item ->
                String freqStr = String.format("%04d", item.frequency)
                List<String> wrappedName = Terminal.wrapText(item.name, wrapWidth - 10)
                
                // Line 1: Freq and Start of Name
                Terminal.moveTo(currentRow++, sidebarCol)
                print "${borderChar} ${Terminal.dim(freqStr)}Hz "
                if (!wrappedName.isEmpty()) {
                    print Terminal.bold(wrappedName[0])
                }
                println ""
                
                // Extra lines for Name if wrapped
                for (int j = 1; j < wrappedName.size(); j++) {
                    Terminal.moveTo(currentRow++, sidebarCol)
                    println "${borderChar}         ${Terminal.bold(wrappedName[j])}"
                }
                
                // Status Line: Signal and Phase
                Terminal.moveTo(currentRow++, sidebarCol)
                int signalStrength = (item.frequency % 100) / 10 + 1
                String signalBar = "█" * signalStrength + "░" * (10 - signalStrength)
                String phase = (item.frequency % 2 == 0) ? "STABLE" : "SHIFTING"
                String signalColor = (phase == "STABLE") ? Terminal.CYAN : Terminal.MAGENTA
                
                print "${borderChar}      " // align under freq
                print Terminal.colorize(signalBar, signalColor)
                println " ${Terminal.dim("[" + phase + "]")}"
                
                // Small gap between items
                currentRow++ 
            }
        }
        
        // Ensure footer doesn't collide by using current currentRow or a safe minimum
        int footerRow = startRow + 18
        Terminal.moveTo(footerRow, sidebarCol)
        println "${borderChar} " + Terminal.dim("-------------------------------------------")
        Terminal.moveTo(footerRow + 1, sidebarCol)
        println "${borderChar} " + Terminal.dim("SYNC_STATUS: " + Terminal.colorize("NOMINAL", Terminal.GREEN))
        
        Terminal.restore()
        System.out.flush()
    }

    void start() {
        println(Terminal.colorize("Welcome to Endless Transit!", Terminal.L_CYAN))
        Logger.info("Game started.")
        
        try {
            while (true) {
                player.stepCount++
                Logger.info("Entering main loop. Step: ${player.stepCount}, Location: ${currentLocation.getPath()}")
                int idx = currentLocation.getIndexInParent()
            int total = currentLocation.getTotalInParent()
            
            // Dynamic Separator based on scale
            String sep = "----------------------------------------------------------------------"
            if (currentLocation instanceof SolarSystem) sep = "* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *"
            if (currentLocation instanceof Street || currentLocation instanceof City) sep = "_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_"
            if (currentLocation instanceof Room) sep = "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -"

            println "\n${Terminal.dim(sep)}"
            // Cyber-Terminal Metadata
            printf("${Terminal.dim("[")}${Terminal.colorize("SCANNING...", Terminal.CYAN)}${Terminal.dim("]")} Area: ${Terminal.bold(currentLocation.getClass().simpleName)} ${Terminal.dim(">>")} ${Terminal.colorize(currentLocation.getName(), Terminal.YELLOW)}\n")
            printf("${Terminal.dim("[")}COORDS: %s${Terminal.dim("]")} ${Terminal.dim("[")}DEPTH: %d${Terminal.dim("]")}\n", currentLocation.getCoordinates(), currentLocation.getDepth())
            printf("${Terminal.dim("[")}STEPS: %d${Terminal.dim("]")} ${Terminal.dim("[")}INV: %d items", player.stepCount, player.inventory.size())
            if (!player.inventory.isEmpty()) {
                def last3 = player.inventory.takeRight(3).reverse()
                def freqs = last3.collect { it.frequency }
                print(" | Recent: ${Terminal.colorize(freqs.join(', '), Terminal.L_CYAN)}")
            }
            println "${Terminal.dim("]")}"
            
            println "${Terminal.dim("PATH:")} ${Terminal.colorize(currentLocation.getPath(), Terminal.GREY)}"
            if (total > 0) {
                printf(">>> %s %d of %d <<<\n", currentLocation.getClass().simpleName, idx, total)
            }
            
            currentLocation.enter(player)
            currentLocation.processAction(player)
            
            def options = currentLocation.getOptions(this)
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
            currentActionMap["q"] = "Quit"

            // Display Menu
            println("${Terminal.dim("Choose an action:")}")
            menu.each { menuKey, action ->
                String label = currentActionMap[menuKey]
                if (currentLocation instanceof Street && label.contains("Enter Building:")) {
                    return
                }
                println(label)
            }
            println("${Terminal.colorize("i", Terminal.YELLOW)}. List inventory")
            println("${Terminal.colorize("q", Terminal.RED)}. Quit")

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
                    renderInventoryOverlay()
                    // Don't break, just loop to get input again
                    continue
                }
                
                if (choice == "-2") {
                    // Just loop again for new input
                    continue
                }
                
                break // Break inner loop for any other choice
            }

            if (choice == "q") {
                println("Goodbye!")
                break
            }

            Logger.info("Executing choice: $choice")
            // Find matching menu entry
            def matchingKey = menu.keySet().find { key ->
                return key.equalsIgnoreCase(choice)
            }

            if (matchingKey) {
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

    void enterLocation(Location location) {
        Logger.info("Changing location from ${currentLocation?.getPath()} to ${location?.getPath()}")
        this.currentLocation = location
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
        
        // Use Terminal to clear the line before printing the prompt
        // This prevents artifacts if the prompt line was previously used by sidebar
        print "\r"
        Terminal.clearLine()
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
        if (input == null) return "q"

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
        
        if (input.equalsIgnoreCase("q")) {
            return "q"
        }

        return input
    }
}
