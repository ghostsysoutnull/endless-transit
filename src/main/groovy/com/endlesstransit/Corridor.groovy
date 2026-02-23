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
        def options = [
            "Go up": { game.goUp() },
            "Go down": { game.goDown() }
        ]
        
        for (int i = 0; i < apartments.size(); i++) {
            def apt = apartments[i]
            if (!apt.rooms.isEmpty()) {
                options["Enter Apartment ${i+1}"] = { 
                    game.enterLocation(apt.rooms[0]) 
                }
            }
        }
        return options
    }

    Corridor() {
        Random random = new Random()
        int numDoors = random.nextInt(11) + 10 // Random number between 10 and 20
        doors = new ArrayList<Door>()
        apartments = new ArrayList<Apartment>()

        for (int i = 0; i < numDoors; i++) {
            doors.add(new Door())
        }

        for (int i = 0; i < numDoors; i++) {
            def apartment = new Apartment()
            apartments.add(apartment)
            addLocation(apartment)
        }
    }
}
