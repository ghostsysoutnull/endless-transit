package com.endlesstransit

import java.util.Random

class Corridor {
    List<Door> doors
    List<Apartment> apartments

    Corridor() {
        Random random = new Random()
        int numDoors = random.nextInt(11) + 10 // Random number between 10 and 20
        doors = new ArrayList<Door>()
        apartments = new ArrayList<Apartment>()

        for (int i = 0; i < numDoors; i++) {
            doors.add(new Door())
        }

        for (int i = 0; i < numDoors; i++) {
            apartments.add(new Apartment())
        }
    }
}
