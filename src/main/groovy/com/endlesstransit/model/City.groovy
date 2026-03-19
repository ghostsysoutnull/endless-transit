package com.endlesstransit.model
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager
import com.endlesstransit.procgen.Gematria
import com.endlesstransit.procgen.NameGenerator
import com.endlesstransit.procgen.ProceduralFactory
import com.endlesstransit.procgen.LocusSeed
import groovy.transform.CompileStatic
import groovy.transform.PackageScope

@CompileStatic
class City extends Container {
    @PackageScope List<Street> streets = []
    String name
    boolean isRebelDistrict = false

    List<Street> getStreets() {
        ensureChildrenPopulated()
        return streets
    }

    @Override
    String getIndexLabel() {
        return "DISTRICT"
    }

    @Override
    String getStatusSummary() {
        return isRebelDistrict ? "STABILITY: [VOLATILE]" : "STABILITY: [STABLE]"
    }

    @Override
    String getLatticeMeta() {
        return isRebelDistrict ? effectiveFmt.colorize(" [UNAUTHORIZED_ZONE]", "RED") : ""
    }

    City(String name, LocusSeed locus = new LocusSeed(0L)) {
        this.name = name
        this.locus = locus
    }

    @Override
    void populateChildren() {
        ProceduralFactory.instance.populateCity(this)
    }

    @Override
    void addLocation(Location location) {
        super.addLocation(location)
        if (location instanceof Street) {
            this.streets.add((Street)location)
        }
    }

    @Override
    String getDescription() {
        String info = isRebelDistrict ? " [UNAUTHORIZED_RESONANCE_DETECTED]" : ""
        return "City: $name$info\n" + (isRebelDistrict ? "The air is thick with illegal data-streams and shifting static." : "A stable regional node connected to the planetary lattice.")
    }

    @Override
    List<String> getExtraContent(Player player, int width) {
        ensureChildrenPopulated()
        List<String> lines = []
        lines << "Streets detected in this city:"
        lines << "-" * width
        
        int colWidth = (width - 3).intdiv(2)
        List<Street> strs = getStreets()
        for (int i = 0; i < strs.size(); i += 2) {
            Street sL = strs[i]
            Street sR = (i + 1 < strs.size()) ? strs[i+1] : (Street)null
            
            String labelL = String.format("%02d. %s", i + 1, sL.getName())
            if (sL.isVisited()) labelL += " [V]"
            
            String labelR = ""
            if (sR != null) {
                labelR = String.format("%02d. %s", i + 2, sR.getName())
                if (sR.isVisited()) labelR += " [V]"
            }
            
            lines << (effectiveFmt.padRight(labelL, colWidth) + " | " + effectiveFmt.padRight(labelR, colWidth))
        }
        lines << "-" * width
        return lines
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        ensureChildrenPopulated()
        Map<String, Closure> options = getBaseOptions(game)
        List<Street> strs = getStreets()
        for (int i = 0; i < strs.size(); i++) {
            Street street = strs[i]
            String id = String.format("%02d", i + 1)
            String label = "${id}. Go to ${street.name}"
            options[label] = { game.enterLocation(street) }
        }
        return options
    }

    @Override
    String getMapSymbol() {
        if (isAbyssal()) return "☠"
        return "🏙"
    }
}
