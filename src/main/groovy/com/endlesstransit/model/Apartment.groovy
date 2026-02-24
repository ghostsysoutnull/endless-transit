package com.endlesstransit.model
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager
import com.endlesstransit.ui.Terminal
import com.endlesstransit.ui.ThemeManager

import java.util.Random

class Apartment extends Container {
    List<Room> rooms = []
    String doorDescription
    String timeline
    String culture

    List<Room> getRooms() {
        ensureChildrenPopulated()
        return rooms
    }

    @Override
    String getDescription() {
        "Apartment: $doorDescription. [TEMPORAL_MARKER: ${Terminal.colorize(timeline.toUpperCase(), Terminal.YELLOW)}]"
    }

    @Override
    void enter(Player player) {
        markVisited()
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        ensureChildrenPopulated()
        return getBaseOptions(game)
    }

    Apartment(String doorDescription = "A plain door", String culture = "rust") {
        this.doorDescription = doorDescription
        this.culture = culture
        this.timeline = ThemeManager.getRandomTimeline()
    }

    @Override
    void populateChildren() {
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
