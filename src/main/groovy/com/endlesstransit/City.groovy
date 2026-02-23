package com.endlesstransit

class City extends Container {
    List<Street> streets = []
    String name

    City(String name) {
        this.name = name
        Random random = new Random()
        int numStreets = random.nextInt(5) + 3
        for (int i = 0; i < numStreets; i++) {
            addLocation(new Street("Avenue ${i + 1}"))
        }
    }

    @Override
    void addLocation(Location location) {
        super.addLocation(location)
        if (location instanceof Street) {
            streets.add(location)
        }
    }

    @Override
    String getDescription() {
        return "City: $name"
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        def options = getBaseOptions(game)
        int baseIdx = options.size() + 1
        streets.eachWithIndex { street, i ->
            String label = "${baseIdx + i}. Go to ${street.name}"
            if (street.isVisited()) label += " [Visited]"
            options[label] = { game.enterLocation(street) }
        }
        return options
    }
}
