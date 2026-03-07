package com.endlesstransit.model
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager
import com.endlesstransit.procgen.Gematria
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
    String getName() {
        return doorDescription
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
        def options = getBaseOptions(game)
        
        for (int i = 0; i < rooms.size(); i++) {
            def room = rooms[i]
            String id = String.format("%02d", i + 1)
            String label = "${id}. Enter Room: ${room.name}"
            if (room.isVisited()) label += " [Visited]"
            options[label] = { game.enterLocation(room) }
        }

        // Standard shortcut for first room
        if (!rooms.isEmpty()) {
            options["f. Go forward"] = { game.enterLocation(rooms[0]) }
        }
        
        return options
    }

    @Override
    List<String> getExtraContent(Player player) {
        ensureChildrenPopulated()
        List<String> lines = []
        lines << Terminal.colorize(" [APARTMENT_UNIT_DIAGNOSTICS] ", Terminal.L_CYAN)
        lines << Terminal.dim("Scanning internal cell structure...")
        
        int width = 88
        lines << Terminal.dim("-" * width)
        
        // Header
        int wId = 5
        int wTyp = 20
        int wName = 30
        int wStat = 15
        
        def pad = { String text, int targetWidth ->
            return text + (" " * Math.max(0, targetWidth - Terminal.getVisualWidth(text)))
        }

        lines << Terminal.bold("${pad("[ID]", wId)}${pad("[TYPE]", wTyp)}${pad("[IDENTIFIER]", wName)}${pad("[STATUS]", wStat)}[RES]")
        lines << Terminal.dim("-" * width)

        for (int i = 0; i < rooms.size(); i++) {
            def room = rooms[i]
            String id = String.format("%02d.", i + 1)
            String type = room.roomType
            String name = room.roomName
            String status = room.isVisited() ? Terminal.colorize("[VISITED]", Terminal.GREEN) : Terminal.dim("[UNSTABLE]")
            
            // Resonance (simulated for overview)
            int freq = Gematria.calculateFrequency(name, room.getDepth())
            String res = "${freq}Hz"

            lines << "${pad(id, wId)}${pad(type, wTyp)}${pad(name, wName)}${pad(status, wStat)}${res}"
        }
        lines << Terminal.dim("-" * width)
        return lines
    }

    Apartment(String doorDescription = "A plain door", String culture = "rust", String timeline = "ancient", long seed = 0) {
        this.doorDescription = doorDescription
        this.culture = culture
        this.timeline = timeline
        this.seed = seed
    }

    @Override
    void populateChildren() {
        Logger.info("Populating Apartment: $doorDescription (Seed: $seed)")
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
        Logger.info("  >> Generated $numRooms rooms for Apartment.")
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
