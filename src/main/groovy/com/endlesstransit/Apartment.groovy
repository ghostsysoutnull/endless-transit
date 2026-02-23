package com.endlesstransit

import java.util.Random

class Apartment extends Container {
    List<Room> rooms
    String doorDescription

    @Override
    String getDescription() {
        "Apartment: $doorDescription"
    }

    @Override
    void enter(Player player) {
        markVisited()
        println ">---------------------------<"
        println("> You entered an apartment.")
        // Current logic enters room 0 directly
        rooms[0].enter(player)
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        return getBaseOptions(game)
    }

    Apartment(String doorDescription = "A plain door") {
        this.doorDescription = doorDescription
        Random random = new Random()
        int numRooms = random.nextInt(10) + 1
        rooms = new ArrayList<Room>()

        for (int i = 0; i < numRooms; i++) {
            def room = new Room()
            rooms.add(room)
            addLocation(room) // Sets parent
        }
    }
}
