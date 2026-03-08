package com.endlesstransit.model
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager
import com.endlesstransit.procgen.Gematria
import com.endlesstransit.ui.Terminal
import com.endlesstransit.ui.ThemeManager
import com.endlesstransit.procgen.ProceduralFactory
import com.endlesstransit.procgen.LocusSeed
import groovy.transform.CompileStatic
import groovy.transform.PackageScope

@CompileStatic
class Corridor extends Container {
    @PackageScope List<Door> doors = []
    @PackageScope List<Apartment> apartments = []
    int numApartments
    String culture
    String timeline

    List<Door> getDoors() {
        ensureChildrenPopulated()
        return doors
    }

    List<Apartment> getApartments() {
        ensureChildrenPopulated()
        return apartments
    }

    @Override
    String getTypeLabel() {
        return (getTypeName() == "Artery") ? "ARTERY" : "CORRIDOR"
    }

    @Override
    String getTypeName() {
        if (parent instanceof Floor) {
            if (((Floor)parent).number < 0) return "Artery"
        }
        return "Corridor"
    }

    @Override
    String getName() {
        return getTypeName()
    }

    @Override
    String getDescription() {
        String base = (getTypeName() == "Artery") ? "A pulsing, organic artery of data" : "A long corridor with multiple doors"
        return "$base. [THEME: ${culture.toUpperCase()}]"
    }

    @Override
    void enter(Player player) {
        markVisited()
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        ensureChildrenPopulated()
        Map<String, Closure> options = getBaseOptions(game)
        
        List<Apartment> apts = getApartments()
        List<Door> drs = getDoors()

        for (int i = 0; i < apts.size(); i++) {
            Apartment apt = apts[i]
            Door door = drs[i]
            String id = String.format("%02d.", i + 1)
            
            String roomName = "?? UNKNOWN ??"
            String status = Terminal.dim("[ENC]")
            String signature = "????Hz"
            String wave = "---"
            String resLabel = ""
            
            List<Room> rms = apt.getRooms()
            if (!rms.isEmpty()) {
                Room firstRoom = rms[0]
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

            boolean isVisited = rms.any { it.isVisited() }
            String visited = isVisited ? Terminal.colorize(" [V]", Terminal.GREEN) : ""
            String visual = "${door.getDescription()}${visited}"
            
            String colVisText = Terminal.ansiSafeTruncate(visual, 20)
            String colVis = colVisText + (" " * Math.max(0, 22 - Terminal.getVisualWidth(colVisText)))
            
            String colResText = resLabel
            String colRes = colResText + (" " * Math.max(0, 15 - Terminal.getVisualWidth(colResText)))

            String label = "${id} ${colVis} | ${status} | ${colRes} >> ${roomName}"
            options[label] = { game.enterLocation(apt) }
        }
        return options
    }

    @Override
    String getIndexLabel() {
        return "CONDUIT"
    }

    @Override
    String getStatusSummary() {
        return "TRAFFIC: [STABLE] | THEME: [${culture.toUpperCase()}]"
    }

    Corridor(int numApartments, String culture, String timeline = "ancient", LocusSeed locus = new LocusSeed(0L)) {
        this.culture = culture
        this.timeline = timeline
        this.numApartments = numApartments
        this.locus = locus
    }

    @Override
    VibeCapsule getVibe() {
        if (localVibe != null) return localVibe
        VibeCapsule v = parent?.getVibe()
        if (parent instanceof Floor) {
            if (((Floor)parent).number < 0) {
                // Abyssal Override
                return new VibeCapsule("atomic", "abyssal", "abyssal")
            }
        }
        return v
    }

    @Override
    void populateChildren() {
        ProceduralFactory.populateCorridor(this)
    }
}
