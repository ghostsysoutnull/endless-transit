package com.endlesstransit.model
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager
import com.endlesstransit.ui.Terminal
import com.endlesstransit.procgen.Gematria

import java.util.Random

class Corridor extends Container {
    List<Door> doors = []
    List<Apartment> apartments = []
    String culture
    int numApartments

    List<Apartment> getApartments() {
        ensureChildrenPopulated()
        return apartments
    }

    @Override
    String getTypeName() {
        return (parent instanceof Floor && ((Floor)parent).number < 0) ? "Artery" : "Corridor"
    }

    @Override
    String getDescription() {
        ensureChildrenPopulated()
        if (getTypeName() == "Artery") {
            return "A vaulted transit artery with ${doors.size()} access crypts. Cultural resonance: [CORRUPTED]."
        }
        return "A long corridor with ${doors.size()} doors. Cultural resonance: ${culture}."
    }

    @Override
    void enter(Player player) {
        markVisited()
        ensureChildrenPopulated()
    }

    @Override
    List<String> getExtraContent(Player player) {
        ensureChildrenPopulated()
        List<String> lines = []
        lines << Terminal.colorize(" [APERTURE_SCAN_INITIALIZED] ", Terminal.L_CYAN)
        lines << Terminal.dim("Scanning adjacent cells for spectral resonance...")
        
        int width = 88
        lines << Terminal.dim("-" * width)
        
        // High-Density Telemetry Header (88-char wide)
        // [ID] 4 | [VISUAL] 22 | [DESIGNATION] 28 | [WAVE] 12 | [RESONANCE] 18
        String hId = "[ID]"
        String hVis = "[VISUAL_TELEMETRY]"
        String hDes = "[SCANNED_DESIGNATION]"
        String hWav = "[WAVEFORM]"
        String hRes = "[RESONANCE]"
        
        lines << Terminal.bold(
            String.format("%-4s %-22s %-28s %-12s %-18s", hId, hVis, hDes, hWav, hRes)
        )
        lines << Terminal.dim("-" * width)

        for (int i = 0; i < apartments.size(); i++) {
            def apt = apartments[i]
            def door = doors[i]
            
            String id = String.format("%02d.", i + 1)
            
            String roomName = "?? UNKNOWN ??"
            String status = Terminal.dim("[ENC]")
            String signature = "????Hz"
            String wave = "---"
            String resLabel = ""
            
            if (!apt.rooms.isEmpty()) {
                def firstRoom = apt.rooms[0]
                roomName = firstRoom.roomName
                status = firstRoom.isAnomaly ? Terminal.colorize("[DEG]", Terminal.RED) : Terminal.colorize("[STB]", Terminal.GREEN)
                int freq = Gematria.calculateFrequency(roomName, firstRoom.getDepth())
                signature = String.format("%04dHz", freq)
                
                if (firstRoom.isAnomaly) wave = Terminal.colorize("###", Terminal.RED)
                else if (freq % 11 == 0) wave = Terminal.colorize("≈≈≈", Terminal.GREEN)
                else wave = Terminal.colorize("~~~", Terminal.CYAN)
                
                resLabel = "${signature} ${wave}"
            } else {
                resLabel = "${signature} ${wave}"
            }

            boolean isVisited = apt.rooms.any { it.isVisited() }
            String visited = isVisited ? Terminal.colorize(" [V]", Terminal.GREEN) : ""
            String visual = "${door.getDescription()}${visited}"
            
            String colVisText = Terminal.ansiSafeTruncate(visual, 20)
            String colVis = colVisText + (" " * Math.max(0, 22 - Terminal.getVisualWidth(colVisText)))
            
            String colNameText = Terminal.colorize(Terminal.ansiSafeTruncate(roomName, 26), Terminal.YELLOW)
            String colName = colNameText + (" " * Math.max(0, 28 - Terminal.getVisualWidth(colNameText)))
            
            String colStatus = status + (" " * Math.max(0, 12 - Terminal.getVisualWidth(status)))
            String colRes = resLabel + (" " * Math.max(0, 18 - Terminal.getVisualWidth(resLabel)))

            lines << "${id.padRight(4)}${colVis}${colName}${colStatus}${colRes}"
        }
        lines << Terminal.dim("-" * width)
        return lines
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        ensureChildrenPopulated()
        Logger.info("Getting options for Corridor. Parent: ${parent?.getClass()?.simpleName}")
        def options = getBaseOptions(game)
        
        // Floor navigation
        if (parent instanceof Floor) {
            Floor currentFloor = (Floor) parent
            if (currentFloor.parent instanceof Building) {
                Building bldg = (Building) currentFloor.parent
                
                if (currentFloor.number < bldg.maxFloors - 1) {
                    options["u. Go Up"] = {
                        def nextFloor = bldg.getFloor(currentFloor.number + 1)
                        if (nextFloor != null) {
                            game.enterLocation(nextFloor.corridor)
                        } else {
                            Logger.error("Failed to retrieve next floor ${currentFloor.number + 1}")
                        }
                    }
                }
                
                if (currentFloor.number > 0) {
                    options["d. Go Down"] = {
                        def prevFloor = bldg.getFloor(currentFloor.number - 1)
                        if (prevFloor != null) {
                            game.enterLocation(prevFloor.corridor)
                        } else {
                            Logger.error("Failed to retrieve previous floor ${currentFloor.number - 1}")
                        }
                    }
                }
            }
        }
        
        for (int i = 0; i < apartments.size(); i++) {
            def apt = apartments[i]
            if (!apt.rooms.isEmpty()) {
                String id = String.format("%02d", i + 1)
                String label = "${id}. Access: ${apt.rooms[0].roomName}"
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

    Corridor(int numApartments, String culture, long seed = 0) {
        this.culture = culture
        this.numApartments = numApartments
        this.seed = seed
    }

    @Override
    VibeCapsule getVibe() {
        if (localVibe != null) return localVibe
        def v = parent?.getVibe()
        if (parent instanceof Floor && ((Floor)parent).number < 0) {
            // Abyssal Override
            return new VibeCapsule("atomic", "abyssal", "abyssal")
        }
        return v
    }

    @Override
    void populateChildren() {
        this.@doors.clear()
        this.@apartments.clear()

        for (int i = 0; i < numApartments; i++) {
            long childSeed = seed != 0 ? seed + i + 1 : 0
            def door = new Door(childSeed)
            this.@doors.add(door)
            def apartment = new Apartment(door.getDescription(), culture, childSeed)
            this.@apartments.add(apartment)
            addLocation(apartment)
        }
    }
}
