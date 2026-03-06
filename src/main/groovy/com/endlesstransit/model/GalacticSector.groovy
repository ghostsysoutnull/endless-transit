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
        "Sector: $name\nA dense cluster of celestial bodies within the neural web."
    }

    @Override
    List<String> getExtraContent() {
        ensureChildrenPopulated()
        List<String> lines = []
        lines << "Solar systems within proximity:"
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
        children.eachWithIndex { system, i ->
            String id = String.format("%02d", i + 1)
            String label = "${id}. Transition to System: ${system.name}"
            options[label] = { game.enterLocation(system) }
        }
        return options
    }
}
