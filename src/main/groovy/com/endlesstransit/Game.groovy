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
        
        int linesUp = 14
        Terminal.moveUp(linesUp)
        
        String borderChar = Terminal.dim("╎")
        String title = Terminal.colorize(" [QUANTUM_TRACE_BUFFER] ", Terminal.L_CYAN)
        
        Terminal.moveRight(50)
        println "${borderChar}${title}"
        
        if (player.inventory.isEmpty()) {
            Terminal.moveRight(50)
            println "${borderChar} " + Terminal.dim(" (No spectral traces detected) ")
        } else {
            player.inventory.each { item ->
                Terminal.moveRight(50)
                String freqStr = String.format("%04d", item.frequency)
                
                // Liminal Metadata
                int signalStrength = (item.frequency % 100) / 10 + 1
                String signalBar = "█" * signalStrength + "░" * (10 - signalStrength)
                String phase = (item.frequency % 2 == 0) ? "STABLE" : "SHIFTING"
                
                String signalColor = (phase == "STABLE") ? Terminal.CYAN : Terminal.MAGENTA
                
                print "${borderChar} ${Terminal.dim(freqStr)}Hz "
                print Terminal.colorize(signalBar, signalColor)
                println " ${Terminal.bold(item.name)} ${Terminal.dim("[" + phase + "]")}"
            }
        }
        
        Terminal.moveRight(50)
        println "${borderChar} " + Terminal.dim("-------------------------------------------")
        Terminal.moveRight(50)
        println "${borderChar} " + Terminal.dim("SYNC_STATUS: " + Terminal.colorize("NOMINAL", Terminal.GREEN))
        
        Terminal.restore()
        System.out.flush()
    }

    void start() {
        println(Terminal.colorize("Welcome to Endless Transit!", Terminal.L_CYAN))
        
        while (true) {
            player.stepCount++
            int idx = currentLocation.getIndexInParent()
            int total = currentLocation.getTotalInParent()
            
            // Dynamic Separator based on scale
            String sep = "----------------------------------------------------------------------"
            if (currentLocation instanceof SolarSystem) sep = "* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *"
            if (currentLocation instanceof Street || currentLocation instanceof City) sep = "_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_"
            if (currentLocation instanceof Room) sep = "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -"

            println "\n${Terminal.dim(sep)}"
            // Cyber-Terminal Metadata
            printf("${Terminal.dim("[")}${Terminal.colorize("SCANNING...", Terminal.CYAN)}${Terminal.dim("]")} Area: ${Terminal.bold(currentLocation.getClass().simpleName)}\n")
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
                    renderInventoryOverlay()
                    // Don't break, just loop to get input again
                    continue
                }
                
                break // Break inner loop for any other choice
            }

            if (choice == "q") {
                println("Goodbye!")
                break
            }

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
    }

    void enterLocation(Location location) {
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
        print("\n---=====================================>>$hudLastAction ")
        print("Enter your choice: ")
        
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
