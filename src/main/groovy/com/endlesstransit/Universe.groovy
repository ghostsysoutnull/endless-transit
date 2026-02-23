package com.endlesstransit

class Universe extends Container {
    List<SolarSystem> solarSystems = []

    Universe() {
        Random random = new Random()
        int numSystems = random.nextInt(10) + 1
        for (int i = 0; i < numSystems; i++) {
            addLocation(new SolarSystem(NameGenerator.generateSolarSystemName()))
        }
    }

    @Override
    void addLocation(Location location) {
        super.addLocation(location)
        if (location instanceof SolarSystem) {
            solarSystems.add(location)
        }
    }

    @Override
    String getDescription() {
        return "The Endless Universe"
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        def options = getBaseOptions(game)
        solarSystems.eachWithIndex { system, i ->
            String label = "${i + 1}. Jump to ${system.name}"
            if (system.isVisited()) label += " [Visited]"
            options[label] = { game.enterLocation(system) }
        }
        return options
    }
}
