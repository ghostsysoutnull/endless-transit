package com.endlesstransit.model
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager
import com.endlesstransit.procgen.Gematria
import com.endlesstransit.procgen.NameGenerator

class SolarSystem extends Container {
    List<Planet> planets = []
    String name

    List<Planet> getPlanets() {
        ensureChildrenPopulated()
        return planets
    }

    SolarSystem(String name, long seed = 0) {
        this.name = name
        this.seed = seed
    }

    @Override
    void populateChildren() {
        Random scrambler = seed != 0 ? new Random(seed) : new Random()
        int numPlanets = scrambler.nextInt(9) + 2
        for (int i = 0; i < numPlanets; i++) {
            long childSeed = scrambler.nextLong()
            addLocation(new Planet(NameGenerator.generatePlanetName(childSeed), childSeed))
        }
    }

    @Override
    void addLocation(Location location) {
        super.addLocation(location)
        if (location instanceof Planet) {
            planets.add(location)
        }
    }

    @Override
    String getDescription() {
        return "Solar System: $name"
    }

    @Override
    List<String> getExtraContent() {
        ensureChildrenPopulated()
        List<String> lines = []
        lines << "Orbital bodies within range:"
        lines << "-" * 40
        
        for (int i = 0; i < planets.size(); i += 2) {
            def pL = planets[i]
            def pR = (i + 1 < planets.size()) ? planets[i+1] : null
            
            String labelL = String.format("%02d. %s", i + 1, pL.name)
            if (pL.isVisited()) labelL += " [V]"
            
            String labelR = ""
            if (pR) {
                labelR = String.format("%02d. %s", i + 2, pR.name)
                if (pR.isVisited()) labelR += " [V]"
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
        planets.eachWithIndex { planet, i ->
            String id = String.format("%02d", i + 1)
            String label = "${id}. Land on ${planet.name}"
            options[label] = { game.enterLocation(planet) }
        }
        return options
    }
}
