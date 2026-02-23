package com.endlesstransit

class Country extends Container {
    List<City> cities = []
    String name

    Country(String name) {
        this.name = name
        Random random = new Random()
        int numCities = random.nextInt(3) + 2
        for (int i = 0; i < numCities; i++) {
            addLocation(new City("Metropolis ${i + 1}"))
        }
    }

    @Override
    void addLocation(Location location) {
        super.addLocation(location)
        if (location instanceof City) {
            cities.add(location)
        }
    }

    @Override
    String getDescription() {
        return "Country: $name"
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        def options = getBaseOptions(game)
        cities.eachWithIndex { city, i ->
            String label = "${i + 1}. Travel to ${city.name}"
            if (city.isVisited()) label += " [Visited]"
            options[label] = { game.enterLocation(city) }
        }
        return options
    }
}
