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
