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
    Map<String, Closure> getOptions(Game game) {
        ensureChildrenPopulated()
        def options = getBaseOptions(game)
        planets.eachWithIndex { planet, i ->
            String label = "${i + 1}. Land on ${planet.name}"
            if (planet.isVisited()) label += " [Visited]"
            options[label] = { game.enterLocation(planet) }
        }
        return options
    }
}
