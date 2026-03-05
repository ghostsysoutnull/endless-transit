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
        Random random = seed != 0 ? new Random(seed) : new Random()
        // Contains 4 to 8 nodes (either Sectors or Null Zones)
        int numNodes = random.nextInt(5) + 4
        for (int i = 0; i < numNodes; i++) {
            long childSeed = seed != 0 ? seed + i + 1 : 0
            if (random.nextInt(10) < 3) { // 30% chance of a Null Sector
                String nullName = "Null Reach ${Integer.toHexString(random.nextInt(0xFFF)).toUpperCase()}"
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
