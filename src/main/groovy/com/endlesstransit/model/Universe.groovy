package com.endlesstransit.model
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager
import com.endlesstransit.procgen.Gematria
import com.endlesstransit.procgen.NameGenerator

class Universe extends Container {
    List<CosmicFilament> filaments = []
    String name = "Universe"

    List<CosmicFilament> getFilaments() {
        ensureChildrenPopulated()
        return filaments
    }

    Universe(long seed = System.currentTimeMillis()) {
        this.seed = seed
    }

    /**
     * Resolves a Locus Index Path (LIP) to a specific Location object.
     * Walks the tree from the root Universe.
     */
    Location resolveLIP(String lip) {
        if (lip == "0") return this
        
        def parts = lip.split("\\.")
        if (parts[0] != "0") {
            Logger.error("INVALID_LIP_ROOT: $lip")
            return null
        }
        
        Location current = this
        // Skip parts[0] as it's the root Universe
        for (int i = 1; i < parts.length; i++) {
            if (!(current instanceof Container)) {
                Logger.error("LIP_RESOLUTION_FAILED: Node is not a container at $i ($lip)")
                return null
            }
            Container container = (Container) current
            container.ensureChildrenPopulated()
            int childIndex = parts[i].toInteger()
            
            if (childIndex < 0 || childIndex >= container.children.size()) {
                Logger.error("LIP_RESOLUTION_FAILED: Index out of bounds $childIndex (size: ${container.children.size()}) at part $i")
                return null
            }
            current = container.children[childIndex]
        }
        return current
    }

    @Override
    void populateChildren() {
        Random random = new Random(seed)
        int numFilaments = random.nextInt(5) + 3
        for (int i = 0; i < numFilaments; i++) {
            // Derived seed for child
            addLocation(new CosmicFilament(NameGenerator.generateFilamentName(), seed + i + 1))
        }
    }

    @Override
    void addLocation(Location location) {
        super.addLocation(location)
        if (location instanceof CosmicFilament) {
            filaments.add(location)
        }
    }

    @Override
    String getDescription() {
        return "The Endless Universe - A Neural Web of Infinite Complexity"
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        def options = getBaseOptions(game)
        filaments.eachWithIndex { filament, i ->
            String label = "${i + 1}. Synchronize with ${filament.name}"
            if (filament.isVisited()) label += " [Visited]"
            options[label] = { game.enterLocation(filament) }
        }
        return options
    }
}
