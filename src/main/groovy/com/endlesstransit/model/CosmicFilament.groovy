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
class CosmicFilament extends Container {
    String name
    String conduitID

    @Override
    String getIndexLabel() {
        return "CONDUIT"
    }

    @Override
    String getStatusSummary() {
        return "SYNC: [NODE_RELIABILITY_HIGH]"
    }

    @Override
    String getMapType() {
        return "filament"
    }

    CosmicFilament(String name, LocusSeed locus = new LocusSeed(0L)) {
        this.name = name
        this.locus = locus
        Random r = locus.nextRandom()
        this.conduitID = "0x" + Integer.toHexString(r.nextInt(0xFFFF))
    }

    @Override
    void populateChildren() {
        ProceduralFactory.instance.populateFilament(this)
    }

    @Override
    String getDescription() {
        return "A massive neural conduit pulsing with bio-digital energy. [CONDUIT_ID: ${conduitID}]"
    }

    @Override
    List<String> getExtraContent(Player player, int width) {
        ensureChildrenPopulated()
        List<String> lines = []
        lines << "Galactic sectors within this conduit:"
        lines << "-" * width
        
        int colWidth = (width - 3).intdiv(2)
        List<Location> ch = getChildren()
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
            
            lines << (fmt.padRight(labelL, colWidth) + " | " + fmt.padRight(labelR, colWidth))
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
            Location node = ch[i]
            String nodeType = node instanceof NullSector ? "VOID_REACH" : "MATTER_CLUSTER"
            String id = String.format("%02d", i + 1)
            String label = "${id}. Pulse to ${nodeType}: ${node.getName()}"
            options[label] = { game.enterLocation(node) }
        }
        return options
    }

    @Override
    String getMapSymbol() {
        if (isAbyssal()) return "☠"
        return "»"
    }
}
