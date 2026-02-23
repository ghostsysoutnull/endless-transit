package com.endlesstransit

import java.util.Random

class Corridor extends Container {
    List<Door> doors
    List<Apartment> apartments

    @Override
    String getDescription() {
        "A long corridor with ${doors.size()} doors."
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        def options = getBaseOptions(game)
        
        // Floor navigation
        if (parent instanceof Floor) {
            Floor currentFloor = (Floor) parent
            if (currentFloor.parent instanceof Building) {
                Building bldg = (Building) currentFloor.parent
                
                if (currentFloor.number < bldg.maxFloors - 1) {
                    options["u. Go Up"] = {
                        def nextFloor = bldg.getFloor(currentFloor.number + 1)
                        game.enterLocation(nextFloor.corridor)
                    }
                }
                
                if (currentFloor.number > 0) {
                    options["d. Go Down"] = {
                        def prevFloor = bldg.getFloor(currentFloor.number - 1)
                        game.enterLocation(prevFloor.corridor)
                    }
                }
            }
        }
        
        for (int i = 0; i < apartments.size(); i++) {
            def apt = apartments[i]
            if (!apt.rooms.isEmpty()) {
                String label = "${i + 1}. Enter: ${apt.doorDescription}"
                if (apt.rooms.any { it.isVisited() }) {
                    label += " [Visited]"
                }
                options[label] = { 
                    game.enterLocation(apt.rooms[0]) 
                }
            }
        }
        return options
    }

    Corridor(int numApartments) {
        doors = new ArrayList<Door>()
        apartments = new ArrayList<Apartment>()

        for (int i = 0; i < numApartments; i++) {
            def door = new Door()
            doors.add(door)
            def apartment = new Apartment(door.getDescription())
            apartments.add(apartment)
            addLocation(apartment)
        }
    }
}
