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

    GalacticSector(String name) {
        this.name = name
    }

    @Override
    void populateChildren() {
        Random random = new Random()
        // Contains 3 to 7 Solar Systems
        int numSystems = random.nextInt(5) + 3
        for (int i = 0; i < numSystems; i++) {
            addLocation(new SolarSystem(NameGenerator.generateSolarSystemName()))
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
            options["${i + 1}. Transition to System: ${system.name}"] = { game.enterLocation(system) }
        }
        return options
    }
}
