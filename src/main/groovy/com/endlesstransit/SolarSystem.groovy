package com.endlesstransit

class SolarSystem extends Container {
    List<Planet> planets = []
    String name

    List<Planet> getPlanets() {
        ensureChildrenPopulated()
        return planets
    }

    SolarSystem(String name) {
        this.name = name
    }

    @Override
    void populateChildren() {
        Random random = new Random()
        int numPlanets = random.nextInt(9) + 2
        for (int i = 0; i < numPlanets; i++) {
            addLocation(new Planet(NameGenerator.generatePlanetName()))
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
