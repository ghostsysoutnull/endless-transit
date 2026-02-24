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

    CosmicFilament(String name) {
        this.name = name
        this.conduitID = "0x" + Integer.toHexString(new Random().nextInt(0xFFFF))
    }

    @Override
    void populateChildren() {
        Random random = new Random()
        // Contains 4 to 8 nodes (either Sectors or Null Zones)
        int numNodes = random.nextInt(5) + 4
        for (int i = 0; i < numNodes; i++) {
            if (random.nextInt(10) < 3) { // 30% chance of a Null Sector
                addLocation(new NullSector("Null Reach ${Integer.toHexString(random.nextInt(0xFFF)).toUpperCase()}"))
            } else {
                addLocation(new GalacticSector(NameGenerator.generateSectorName()))
            }
        }
    }

    @Override
    String getDescription() {
        "A massive neural conduit pulsing with bio-digital energy. [CONDUIT_ID: ${conduitID}]"
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        ensureChildrenPopulated()
        def options = getBaseOptions(game)
        children.eachWithIndex { node, i ->
            String nodeType = node instanceof NullSector ? "VOID_REACH" : "MATTER_CLUSTER"
            options["${i + 1}. Pulse to ${nodeType}: ${node.name}"] = { game.enterLocation(node) }
        }
        return options
    }
}
