package com.endlesstransit.model
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager
import com.endlesstransit.procgen.Gematria
import com.endlesstransit.procgen.NameGenerator
import groovy.transform.CompileStatic

@CompileStatic
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
                String childrenNames = container.children.collect { it.getName() }.join(", ")
                Logger.error("LIP_RESOLUTION_FAILED: Index out of bounds $childIndex at part $i of LIP $lip")
                Logger.error("  >> Container: ${container.getName()} (${container.getClass().simpleName})")
                Logger.error("  >> Available Children: [$childrenNames] (Size: ${container.children.size()})")
                return null
            }
            current = container.children[childIndex]
        }
        return current
    }

    @Override
    void populateChildren() {
        Random scrambler = new Random(seed)
        int numFilaments = scrambler.nextInt(5) + 3
        for (int i = 0; i < numFilaments; i++) {
            // Use scrambler to generate a high-entropy seed for the child
            long childSeed = scrambler.nextLong()
            addLocation(new CosmicFilament(NameGenerator.generateFilamentName(childSeed), childSeed))
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
    List<String> getExtraContent(Player player) {
        ensureChildrenPopulated()
        List<String> lines = []
        lines << "Primary filaments radiating from root:"
        lines << "-" * 40
        
        for (int i = 0; i < filaments.size(); i += 2) {
            def fL = filaments[i]
            def fR = (i + 1 < filaments.size()) ? filaments[i+1] : null
            
            String labelL = String.format("%02d. %s", i + 1, fL.name)
            if (fL.isVisited()) labelL += " [V]"
            
            String labelR = ""
            if (fR) {
                labelR = String.format("%02d. %s", i + 2, fR.name)
                if (fR.isVisited()) labelR += " [V]"
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
        filaments.eachWithIndex { filament, i ->
            String id = String.format("%02d", i + 1)
            String label = "${id}. Synchronize with ${filament.name}"
            options[label] = { game.enterLocation(filament) }
        }
        return options
    }
}
