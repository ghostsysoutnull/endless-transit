package com.endlesstransit

class SolarSystem extends Container {
    List<Planet> planets = []
    String name

    SolarSystem(String name) {
        this.name = name
        Random random = new Random()
        int numPlanets = random.nextInt(5) + 3
        for (int i = 0; i < numPlanets; i++) {
            addLocation(new Planet("Planet ${i + 1}"))
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
        def options = getBaseOptions(game)
        int baseIdx = options.size() + 1
        planets.eachWithIndex { planet, i ->
            String label = "${baseIdx + i}. Land on ${planet.name}"
            if (planet.isVisited()) label += " [Visited]"
            options[label] = { game.enterLocation(planet) }
        }
        return options
    }
}
