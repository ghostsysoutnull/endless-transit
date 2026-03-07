package com.endlesstransit.model
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager
import com.endlesstransit.procgen.Gematria
import com.endlesstransit.procgen.NameGenerator

class CosmicFilament extends Container {
    String name
    String conduitID

    CosmicFilament(String name, long seed = 0) {
        this.name = name
        this.seed = seed
        Random r = seed != 0 ? new Random(seed) : new Random()
        this.conduitID = "0x" + Integer.toHexString(r.nextInt(0xFFFF))
    }

    @Override
    void populateChildren() {
        Random scrambler = seed != 0 ? new Random(seed) : new Random()
        // Contains 4 to 8 nodes (either Sectors or Null Zones)
        int numNodes = scrambler.nextInt(5) + 4
        for (int i = 0; i < numNodes; i++) {
            long childSeed = scrambler.nextLong()
            if (scrambler.nextInt(10) < 3) { // 30% chance of a Null Sector
                String nullName = "Null Reach ${Integer.toHexString(scrambler.nextInt(0xFFF)).toUpperCase()}"
                addLocation(new NullSector(nullName, childSeed))
            } else {
                addLocation(new GalacticSector(NameGenerator.generateSectorName(childSeed), childSeed))
            }
        }
    }

    @Override
    String getDescription() {
        "A massive neural conduit pulsing with bio-digital energy. [CONDUIT_ID: ${conduitID}]"
    }

    @Override
    List<String> getExtraContent(Player player) {
        ensureChildrenPopulated()
        List<String> lines = []
        lines << "Galactic sectors within this conduit:"
        lines << "-" * 40
        
        for (int i = 0; i < children.size(); i += 2) {
            def sL = children[i]
            def sR = (i + 1 < children.size()) ? children[i+1] : null
            
            String labelL = String.format("%02d. %s", i + 1, sL.name)
            if (sL.isVisited()) labelL += " [V]"
            
            String labelR = ""
            if (sR) {
                labelR = String.format("%02d. %s", i + 2, sR.name)
                if (sR.isVisited()) labelR += " [V]"
            }
            
            lines << String.format("%-40s | %-40s", labelL, labelR)
        }
        lines << "-" * 40
        return lines
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        ensureChildrenPopulated()
        def options = getBaseOptions(game)
        children.eachWithIndex { node, i ->
            String nodeType = node instanceof NullSector ? "VOID_REACH" : "MATTER_CLUSTER"
            String id = String.format("%02d", i + 1)
            String label = "${id}. Pulse to ${nodeType}: ${node.name}"
            options[label] = { game.enterLocation(node) }
        }
        return options
    }
}
