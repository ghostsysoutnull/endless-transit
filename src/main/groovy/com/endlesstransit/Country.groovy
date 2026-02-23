package com.endlesstransit

class Country extends Container {
    List<City> cities = []
    String name

    Country(String name) {
        this.name = name
    }

    @Override
    String getDescription() {
        return "Country: $name"
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        def options = [:]
        cities.each { city ->
            options["Travel to ${city.name}"] = { game.enterLocation(city) }
        }
        return options
    }
}
