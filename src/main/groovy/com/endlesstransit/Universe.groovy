package com.endlesstransit

class Universe extends Container {
    List<CosmicFilament> filaments = []
    String name = "Universe"

    Universe() {
        Random random = new Random()
        int numFilaments = random.nextInt(5) + 3
        for (int i = 0; i < numFilaments; i++) {
            addLocation(new CosmicFilament(NameGenerator.generateBuildingName("Filament-")))
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
