package com.endlesstransit

class Planet extends Container {
    List<Country> countries = []
    String name

    Planet(String name) {
        this.name = name
        Random random = new Random()
        int numCountries = random.nextInt(3) + 2
        for (int i = 0; i < numCountries; i++) {
            addLocation(new Country("Region ${i + 1}"))
        }
    }

    @Override
    void addLocation(Location location) {
        super.addLocation(location)
        if (location instanceof Country) {
            countries.add(location)
        }
    }

    @Override
    String getDescription() {
        return "Planet: $name"
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        def options = getBaseOptions(game)
        int baseIdx = options.size() + 1
        countries.eachWithIndex { country, i ->
            String label = "${baseIdx + i}. Visit ${country.name}"
            if (country.isVisited()) label += " [Visited]"
            options[label] = { game.enterLocation(country) }
        }
        return options
    }
}
