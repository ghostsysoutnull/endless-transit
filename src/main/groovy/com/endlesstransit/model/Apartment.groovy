package com.endlesstransit.model
import com.endlesstransit.procgen.LocusSeed
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager
import com.endlesstransit.procgen.Gematria
import com.endlesstransit.ui.Terminal
import com.endlesstransit.ui.ThemeManager
import com.endlesstransit.procgen.ProceduralFactory
import groovy.transform.CompileStatic
import groovy.transform.PackageScope

import java.util.Random

@CompileStatic
class Apartment extends Container {
    @PackageScope List<Room> rooms = []
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
    String getTypeLabel() {
        return (getTypeName() == "Crypt") ? "CRYPT" : "APARTMENT"
    }

    @Override
    String getTypeName() {
        if (parent instanceof Corridor) {
            if (((Corridor)parent).getTypeName() == "Artery") return "Crypt"
        }
        return "Apartment"
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
        Map<String, Closure> options = getBaseOptions(game)
        
        List<Room> rms = getRooms()
        for (int i = 0; i < rms.size(); i++) {
            Room room = rms[i]
            String id = String.format("%02d", i + 1)
            String label = "${id}. Enter Room: ${room.name}"
            if (room.isVisited()) label += " [Visited]"
            options[label] = { game.enterLocation(room) }
        }

        // Standard shortcut for first room
        if (!rms.isEmpty()) {
            options["f. Go forward"] = { game.enterLocation(rms[0]) }
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
        
        Closure<String> pad = { String text, int targetWidth ->
            return text + (" " * Math.max(0, targetWidth - Terminal.getVisualWidth(text)))
        }

        lines << Terminal.bold("${pad("[ID]", wId)}${pad("[TYPE]", wTyp)}${pad("[IDENTIFIER]", wName)}${pad("[STATUS]", wStat)}[RES]")
        lines << Terminal.dim("-" * width)

        List<Room> rms = getRooms()
        for (int i = 0; i < rms.size(); i++) {
            Room room = rms[i]
            String id = String.format("%02d.", i + 1)
            String type = room.roomType
            String name = room.roomName
            String status = room.isVisited() ? Terminal.colorize("[VISITED]", Terminal.GREEN) : Terminal.dim("[UNSTABLE]")
            
            // Resonance (simulated for overview)
            int freq = Gematria.calculateFrequency(name, room.getDepth())
            String res = "${freq}Hz"

            lines << "${pad(id, wId)}${pad(type, wTyp)}${pad(name, wName)}${pad(status, wStat)}${res}".toString()
        }
        lines << Terminal.dim("-" * width)
        return lines
    }

    @Override
    String getIndexLabel() {
        return "UNIT"
    }

    @Override
    String getStatusSummary() {
        return isAnomaly ? "ATMOS: [UNSTABLE]" : "ATMOS: [NOMINAL]"
    }

    Apartment(String doorDescription = "A plain door", String culture = "rust", String timeline = "ancient", LocusSeed locus = new LocusSeed(0L)) {
        this.doorDescription = doorDescription
        this.culture = culture
        this.timeline = timeline
        this.locus = locus
    }

    @Override
    void populateChildren() {
        ProceduralFactory.populateApartment(this)
    }
    }
