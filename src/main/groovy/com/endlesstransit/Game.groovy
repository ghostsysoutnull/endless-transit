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
        def solarSystem = new SolarSystem("Sol")
        // Drill down to the first street
        def planet = solarSystem.planets[0]
        def country = planet.countries[0]
        def city = country.cities[0]
        currentLocation = city.streets[0]
    }

    void start() {
        println("Welcome to Endless Transit!")
        
        while (true) {
            int idx = currentLocation.getIndexInParent()
            int total = currentLocation.getTotalInParent()
            
            println "\n============================================================"
            if (total > 0) {
                printf(">>> %s %d of %d <<<\n", currentLocation.getClass().simpleName, idx, total)
            }
            
            currentLocation.enter(player)
            
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
            currentActionMap["-1"] = "List inventory"
            currentActionMap["0"] = "Quit"

            // Display Menu
            println("Choose an action:")
            menu.each { menuKey, action ->
                String label = currentActionMap[menuKey]
                // For streets, we only show non-building options in the vertical menu
                // because the buildings were shown in the visual grid
                if (currentLocation instanceof Street && label.contains("Enter Building:")) {
                    return
                }
                println("${label}")
            }
            println("i. List inventory")
            println("q. Quit")

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
                    // Check if current action is still available in the NEW context
                    boolean currentStillAvailable = currentActionMap.containsKey(lastKey)
                    
                    if (!currentStillAvailable) {
                        if (currentActionMap.containsKey(oppositeKey)) {
                            println "Boundary reached. Reversing direction."
                            lastChoice = oppositeKey
                        }
                    }
                }
            }
            
            String choice = processInput(rawInput)

            if (choice == "0") {
                println("Goodbye!")
                break
            }

            if (choice == "-1") {
                lastChoice = "-1"
                player.listInventory()
                continue
            }

            // Find matching menu entry
            def matchingKey = menu.keySet().find { key ->
                return key.equalsIgnoreCase(choice)
            }

            if (matchingKey) {
                lastChoice = matchingKey
                menu[matchingKey].call()
            } else {
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
        if (input == null) return "0"

        if (input.isEmpty()) {
            if (lastChoice != null) {
                println "Repeating: $lastChoice"
                return lastChoice
            }
            return "-2"
        }

        if (input.equalsIgnoreCase("i")) {
            return "-1"
        }
        
        if (input.equalsIgnoreCase("q")) {
            return "0"
        }

        return input
    }
}
