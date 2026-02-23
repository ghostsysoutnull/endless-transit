package com.endlesstransit

import java.util.Random

class Apartment {
    List<Room> rooms

    Apartment() {
        Random random = new Random()
        int numRooms = random.nextInt(10) + 1
        rooms = new ArrayList<Room>()

        for (int i = 0; i < numRooms; i++) {
            rooms.add(new Room())
        }
    }
}
