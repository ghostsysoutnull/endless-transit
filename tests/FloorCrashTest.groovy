package com.endlesstransit

import groovy.test.GroovyTestCase

class FloorCrashTest extends GroovyTestCase {
    void testEnterAllFloors() {
        def game = new Game()
        def street = game.currentLocation
        def building = street.buildings[0]
        
        println "Testing Building: ${building.name} with ${building.maxFloors} floors"
        
        for (int i = 0; i < building.maxFloors; i++) {
            def floor = building.getFloor(i)
            assertNotNull("Floor $i should not be null", floor)
            
            // This mimics the game loop
            game.enterLocation(floor)
            floor.enter(game.player)
            
            def options = floor.getOptions(game)
            assertNotNull("Options for Floor $i should not be null", options)
            
            // Test entering corridor
            if (options["c. Enter Corridor"]) {
                options["c. Enter Corridor"].call()
                def corridor = game.currentLocation
                assertNotNull("Corridor should not be null", corridor)
                corridor.enter(game.player)
                def corridorOptions = corridor.getOptions(game)
                
                // Test entering first apartment if any
                def firstAptKey = corridorOptions.keySet().find { it.contains("Enter:") }
                if (firstAptKey) {
                    println "  Testing Apartment entry: $firstAptKey"
                    corridorOptions[firstAptKey].call()
                    assertNotNull("Should be in a Room", game.currentLocation)
                    game.currentLocation.enter(game.player)
                }

                // Go back to floor for next iteration
                game.enterLocation(floor)
            }
        }
        println "SUCCESS: Entered all floors and corridors without crashing."
    }
}
