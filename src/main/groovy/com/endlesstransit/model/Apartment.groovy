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
    boolean isAnomaly = false

    List<Room> getRooms() {
        ensureChildrenPopulated()
        return rooms
    }

    @Override
    String getTypeName() {
        return (parent instanceof Corridor && parent.getTypeName() == "Artery") ? "Crypt" : "Apartment"
    }

    @Override
    String getDescription() {
        if (getTypeName() == "Crypt") {
            return "Crypt: $doorDescription. [ABYSSAL_RESONANCE_DETECTED]"
        }
        String info = isAnomaly ? " [!] TEMPORAL_ANOMALY_DETECTED [!]" : "[TEMPORAL_MARKER: ${Terminal.colorize(timeline.toUpperCase(), Terminal.YELLOW)}]"
        return "Apartment: $doorDescription. $info"
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

    Apartment(String doorDescription = "A plain door", String culture = "rust", String timeline = "ancient", long seed = 0) {
        this.doorDescription = doorDescription
        this.culture = culture
        this.timeline = timeline
        this.seed = seed
    }

    @Override
    void populateChildren() {
        Random scrambler = seed != 0 ? new Random(seed) : new Random()
        
        // Use Vibe from parent unless anomaly
        def vibe = getVibe()
        if (vibe != null && scrambler.nextDouble() > 0.01) {
            // Inheritance is handled by constructor now, but we sync with vibe if present
            this.timeline = vibe.timeline
            this.culture = vibe.pickCulture(scrambler.nextLong())
        } else if (vibe != null) {
            this.isAnomaly = true
            // Keep original random culture/timeline from constructor
        }

        int numRooms = scrambler.nextInt(10) + 1
        this.@rooms.clear()

        // Generate a pool of objects for the entire apartment
        int totalObjects = scrambler.nextInt(15) + 5 // 5 to 20 objects per apartment
        List<String> objectPool = []
        for (int i = 0; i < totalObjects; i++) {
            // Derived seed for object pool
            objectPool << ThemeManager.generateHybridObject(culture, timeline, scrambler.nextLong())
        }

        for (int i = 0; i < numRooms; i++) {
            long roomSeed = scrambler.nextLong()
            def room = new Room(culture, timeline, roomSeed)
            this.@rooms.add(room)
            addLocation(room) // Sets parent
        }
        
        // Distribute objects from pool to rooms deterministically
        while (!objectPool.isEmpty()) {
            int roomIdx = scrambler.nextInt(this.@rooms.size())
            def room = this.@rooms[roomIdx]
            room.objects << objectPool.remove(0)
        }
    }
}
