package com.endlesstransit

class GalacticSector extends Container {
    String name

    GalacticSector(String name) {
        this.name = name
        Random random = new Random()
        // Contains 3 to 7 Solar Systems
        int numSystems = random.nextInt(5) + 3
        for (int i = 0; i < numSystems; i++) {
            addLocation(new SolarSystem(NameGenerator.generateBuildingName("System-")))
        }
    }

    @Override
    String getDescription() {
        "A dense cluster of celestial bodies within the neural web."
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        def options = getBaseOptions(game)
        children.eachWithIndex { system, i ->
            options["${i + 1}. Transition to System: ${system.name}"] = { game.enterLocation(system) }
        }
        return options
    }
}
