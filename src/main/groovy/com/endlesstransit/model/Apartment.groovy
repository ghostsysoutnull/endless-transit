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
    @PackageScope List<Room> rooms = new LazyLocusList<Room>(this)
    String doorDescription
    String timeline
    String culture
    boolean isAnomaly = false

    List<Room> getRooms() {
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
        String info = isAnomaly ? " [!] TEMPORAL_ANOMALY_DETECTED [!]" : "[TEMPORAL_MARKER: ${fmt.colorize(timeline.toUpperCase(), "YELLOW")}]"
        return "Apartment: $doorDescription. $info"
    }

    @Override
    void enter(Player player) {
        markVisited()
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        Map<String, Closure> options = getBaseOptions(game)
        
        List<Room> rms = getRooms()
        rms.eachWithIndex { Room room, int i ->
            final Room targetRoom = room
            String id = String.format("%02d", i + 1)
            String label = "${id}. Enter Room: ${room.name}"
            if (room.isVisited()) label += " [Visited]"
            options[label] = { game.enterLocation(targetRoom) }
        }
        
        return options
    }

    @Override
    List<String> getExtraContent(Player player, int width) {
        List<String> lines = []
        lines << fmt.colorize(" [APARTMENT_UNIT_ACCESS] ", "L_CYAN")
        lines << fmt.dim("Local unit entry-point. Internal cells detected: ${rooms.size()}")
        lines << fmt.dim("-" * width)
        
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
    void addLocation(Location location) {
        super.addLocation(location)
        if (location instanceof Room) {
            this.rooms.add((Room)location)
        }
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
