package com.endlesstransit

class Country extends Container {
    List<City> cities = []
    String name

    List<City> getCities() {
        ensureChildrenPopulated()
        return cities
    }

    Country(String name) {
        this.name = name
    }

    @Override
    void populateChildren() {
        Random random = new Random()
        int numCities = random.nextInt(9) + 2
        for (int i = 0; i < numCities; i++) {
            addLocation(new City(NameGenerator.generateCityName()))
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
        ensureChildrenPopulated()
        def options = getBaseOptions(game)
        cities.eachWithIndex { city, i ->
            String label = "${i + 1}. Travel to ${city.name}"
            if (city.isVisited()) label += " [Visited]"
            options[label] = { game.enterLocation(city) }
        }
        return options
    }
}
