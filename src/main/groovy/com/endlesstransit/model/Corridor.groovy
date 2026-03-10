package com.endlesstransit.model
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager
import com.endlesstransit.procgen.Gematria
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
    List<String> getExtraContent(Player player, int width) {
        ensureChildrenPopulated()
        List<String> lines = []
        lines << ModelOutput.fmt.colorize(" [LOCAL_ACCESS_LIST] ", "L_CYAN")
        lines << ModelOutput.fmt.dim("Analyzing local horizontal artery...")
        lines << ModelOutput.fmt.dim("-" * width)
        
        List<Apartment> apts = getApartments()
        List<Door> drs = getDoors()

        for (int i = 0; i < apts.size(); i++) {
            Apartment apt = apts[i]
            Door door = drs[i]
            String id = String.format("%02d.", i + 1)
            
            String aptPrefix = apt.getLIP() + "."
            boolean isVisited = apt.isVisited() || player.visitedLIPs.any { it.startsWith(aptPrefix) }
            String visitedMarker = isVisited ? ModelOutput.fmt.colorize(" [V]", "GREEN") : ""
            
            String doorColor = door.getTerminalColor()
            String doorDesc = ModelOutput.fmt.colorize(door.getDescription(), doorColor)
            lines << "${ModelOutput.fmt.dim(id)} ${doorDesc}${visitedMarker}".toString()
        }
        lines << ModelOutput.fmt.dim("-" * width)
        return lines
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        ensureChildrenPopulated()
        Map<String, Closure> options = getBaseOptions(game)
        
        List<Apartment> apts = getApartments()
        for (int i = 0; i < apts.size(); i++) {
            Apartment apt = apts[i]
            String id = String.format("%02d", i + 1)
            String label = "${id}. Access: ${apt.getName()}"
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
        ProceduralFactory.instance.populateCorridor(this)
    }

    @Override
    String getMapSymbol() {
        if (isAbyssal()) return "☠"
        return "▅"
    }
}
