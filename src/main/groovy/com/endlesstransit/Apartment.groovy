package com.endlesstransit

import java.util.Random

class Apartment extends Container {
    List<Room> rooms
    String doorDescription
    String timeline
    String culture

    @Override
    String getDescription() {
        "Apartment: $doorDescription. [TEMPORAL_MARKER: ${Terminal.colorize(timeline.toUpperCase(), Terminal.YELLOW)}]"
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

    Apartment(String doorDescription = "A plain door", String culture = "rust") {
        this.doorDescription = doorDescription
        this.culture = culture
        this.timeline = ThemeManager.getRandomTimeline()
        
        Random random = new Random()
        int numRooms = random.nextInt(10) + 1
        rooms = new ArrayList<Room>()

        // Generate a pool of objects for the entire apartment
        int totalObjects = random.nextInt(15) + 5 // 5 to 20 objects per apartment
        List<String> objectPool = []
        for (int i = 0; i < totalObjects; i++) {
            objectPool << ThemeManager.generateHybridObject(culture, timeline)
        }

        for (int i = 0; i < numRooms; i++) {
            def room = new Room(culture, timeline)
            rooms.add(room)
            addLocation(room) // Sets parent
        }
        
        // Distribute objects from pool to rooms
        while (!objectPool.isEmpty()) {
            def room = rooms[random.nextInt(rooms.size())]
            room.objects << objectPool.remove(0)
        }
    }
}
