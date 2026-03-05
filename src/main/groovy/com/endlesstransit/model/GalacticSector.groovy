package com.endlesstransit.model
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager
import com.endlesstransit.procgen.Gematria
import com.endlesstransit.procgen.NameGenerator

class GalacticSector extends Container {
    String name

    GalacticSector(String name, long seed = 0) {
        this.name = name
        this.seed = seed
    }

    @Override
    void populateChildren() {
        Random scrambler = seed != 0 ? new Random(seed) : new Random()
        // Contains 3 to 7 Solar Systems
        int numSystems = scrambler.nextInt(5) + 3
        for (int i = 0; i < numSystems; i++) {
            long childSeed = scrambler.nextLong()
            addLocation(new SolarSystem(NameGenerator.generateSolarSystemName(childSeed), childSeed))
        }
    }

    @Override
    String getDescription() {
        "A dense cluster of celestial bodies within the neural web."
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        ensureChildrenPopulated()
        def options = getBaseOptions(game)
        children.eachWithIndex { system, i ->
            String label = "${i + 1}. Transition to System: ${system.name}"
            if (system.isVisited()) label += " [Visited]"
            options[label] = { game.enterLocation(system) }
        }
        return options
    }
}
