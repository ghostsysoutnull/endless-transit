package com.endlesstransit.model
import com.endlesstransit.procgen.LocusSeed
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager
import com.endlesstransit.procgen.Gematria
import com.endlesstransit.procgen.ProceduralFactory
import groovy.transform.CompileStatic
import groovy.transform.PackageScope

import java.util.Random

@CompileStatic
class Apartment extends Container {
    @PackageScope List<Room> rooms = []
    String doorDescription
    String doorColor = "WHITE"
    String timeline
    String culture
    boolean isAnomaly = false

    List<Room> getRooms() {
        ensureChildrenPopulated()
        return rooms
    }

    @Override
    String getName() {
        return ModelOutput.fmt.colorize(doorDescription, doorColor)
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
        String coloredDoor = ModelOutput.fmt.colorize(doorDescription, doorColor)
        if (getTypeName() == "Crypt") {
            return "Crypt: $coloredDoor. [ABYSSAL_RESONANCE_DETECTED]"
        }
        String info = isAnomaly ? " [!] TEMPORAL_ANOMALY_DETECTED [!]" : "[TEMPORAL_MARKER: ${ModelOutput.fmt.colorize(timeline.toUpperCase(), "YELLOW")}]"
        return "Apartment: $coloredDoor. $info"
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
        
        return options
    }

    @Override
    List<String> getExtraContent(Player player, int width) {
        ensureChildrenPopulated()
        List<String> lines = []
        lines << ModelOutput.fmt.colorize(" [APARTMENT_UNIT_ACCESS] ", "L_CYAN")
        lines << ModelOutput.fmt.dim("Local unit entry-point. Internal cells detected: ${rooms.size()}")
        lines << ModelOutput.fmt.dim("-" * width)
        
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

    Apartment(String doorDescription = "A plain door", String doorColor = "WHITE", String culture = "rust", String timeline = "ancient", LocusSeed locus = new LocusSeed(0L)) {
        this.doorDescription = doorDescription
        this.doorColor = doorColor
        this.culture = culture
        this.timeline = timeline
        this.locus = locus
    }

    @Override
    void populateChildren() {
        ProceduralFactory.instance.populateApartment(this)
    }
    
    @Override
    String getMapSymbol() {
        if (isAbyssal()) return "☠"
        return "🚪"
    }
}
