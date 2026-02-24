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

    Universe() {
    }

    @Override
    void populateChildren() {
        Random random = new Random()
        int numFilaments = random.nextInt(5) + 3
        for (int i = 0; i < numFilaments; i++) {
            addLocation(new CosmicFilament(NameGenerator.generateFilamentName()))
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
