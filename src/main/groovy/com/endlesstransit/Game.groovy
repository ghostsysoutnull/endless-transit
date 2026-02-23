package com.endlesstransit

import java.util.Scanner

class Game {
    Location currentLocation
    Player player
    Integer lastChoice
    Scanner scanner
    Map<Object, String> currentActionMap = [:]

    Game() {
        player = new Player()
        scanner = new Scanner(System.in)
        initializeWorld()
    }

    void initializeWorld() {
        // Create a sample hierarchy for testing
        def solarSystem = new SolarSystem("Sol")
        def planet = new Planet("Earth")
        solarSystem.addLocation(planet)
        
        def country = new Country("Neo-Tokyo")
        planet.addLocation(country)
        
        def city = new City("Sector 7")
        country.addLocation(city)
        
        def street = new Street("Main Avenue")
        city.addLocation(street)
        
        def building = new Building("Apartment Complex Alpha")
        street.addLocation(building)
        
        def floor = new Floor(0)
        building.addLocation(floor)
        
        // Start at the floor level for backward compatibility/testing
        currentLocation = floor
    }

    void start() {
        println("Welcome to Endless Transit!")
        
        while (true) {
            currentLocation.enter(player)
            
            def options = currentLocation.getOptions(this)
            currentActionMap = [:]
            
            // Map options to menu choices
            def menu = [:]
            int index = 1
            options.each { label, action ->
                menu[index] = action
                currentActionMap[index] = label
                index++
            }
            
            // Add global options
            currentActionMap[(-1)] = "List inventory"
            currentActionMap[0] = "Quit"

            // Display Menu
            println("Choose an action:")
            menu.each { idx, action ->
                println("${idx}. ${currentActionMap[idx]}")
            }
            println("i. List inventory")
            println("x. Quit")

            String rawInput = getRawUserInput()
            // Here we could add the auto-reversal logic back if it fits the generic model,
            // or rely on the specific Location implementations to handle smart defaults.
            // For now, simple repetition.
            
            int choice = processInput(rawInput)

            if (choice == 0) {
                println("Goodbye!")
                break
            }

            if (choice == -1) {
                player.listInventory()
                continue
            }

            if (menu.containsKey(choice)) {
                menu[choice].call()
            } else {
                println("Invalid choice. Please try again.")
            }
        }
    }

    void enterLocation(Location location) {
        this.currentLocation = location
    }
    
    // Helper to move up/down floors, used by Corridor/Floor
    void goUp() {
       // Logic to find next floor would need to be in Building or managed by Floor knowing its parent
       println "Going up logic not fully refactored yet."
    }

    void goDown() {
        println "Going down logic not fully refactored yet."
    }
    
    // Temporary helper to exit current location (go to parent)
    void exitLocation() {
        if (currentLocation instanceof Container && ((Container)currentLocation).parent != null) {
            currentLocation = ((Container)currentLocation).parent
        } else {
            println "You can't go out from here."
        }
    }

    String getRawUserInput() {
        String actionName = currentActionMap[lastChoice] ?: lastChoice?.toString() ?: ""
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

    int processInput(String input) {
        if (input == null) return 0

        if (input.isEmpty()) {
            if (lastChoice != null) {
                println "Repeating: $lastChoice"
                return lastChoice
            }
            return -2
        }

        if (input.equalsIgnoreCase("i")) {
            lastChoice = -1
            return -1
        }
        
        if (input.equalsIgnoreCase("x")) {
            return 0
        }

        try {
            lastChoice = input.toInteger()
            return lastChoice
        } catch (Exception e) {
            return -2 // Invalid input
        }
    }
}
