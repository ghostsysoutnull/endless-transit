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

@CompileStatic
class GalacticSector extends Container {
    String name

    @Override
    String getIndexLabel() {
        return "SECTOR"
    }

    @Override
    String getStatusSummary() {
        return "GRID: [LATTICE_SYNC_OK]"
    }

    GalacticSector(String name, LocusSeed locus = new LocusSeed(0)) {
        this.name = name
        this.locus = locus
    }

    @Override
    void populateChildren() {
        ProceduralFactory.instance.populateSector(this)
    }

    @Override
    String getDescription() {
        return "Sector: $name\nA dense cluster of celestial bodies within the neural web."
    }

    @Override
    List<String> getExtraContent(Player player, int width) {
        ensureChildrenPopulated()
        List<String> lines = []
        lines << "Solar systems within proximity:"
        lines << "-" * width
        
        List<Location> ch = getChildren()
        int colWidth = (int)(width / 2) - 3
        for (int i = 0; i < ch.size(); i += 2) {
            Location sL = ch[i]
            Location sR = (i + 1 < ch.size()) ? ch[i+1] : (Location)null
            
            String labelL = String.format("%02d. %s", i + 1, sL.getName())
            if (sL.isVisited()) labelL += " [V]"
            
            String labelR = ""
            if (sR != null) {
                labelR = String.format("%02d. %s", i + 2, sR.getName())
                if (sR.isVisited()) labelR += " [V]"
            }
            
            lines << ModelOutput.fmt.padRight(labelL, colWidth) + " | " + labelR
        }
        lines << "-" * width
        return lines
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        ensureChildrenPopulated()
        Map<String, Closure> options = getBaseOptions(game)
        List<Location> ch = getChildren()
        for (int i = 0; i < ch.size(); i++) {
            Location system = ch[i]
            String id = String.format("%02d", i + 1)
            String label = "${id}. Transition to System: ${system.getName()}"
            options[label] = { game.enterLocation(system) }
        }
        return options
    }

    @Override
    String getMapSymbol() {
        if (isAbyssal()) return "☠"
        return "○"
    }
}
