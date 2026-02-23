package com.endlesstransit

class Planet extends Container {
    List<Country> countries = []
    String name

    Planet(String name) {
        this.name = name
    }

    @Override
    String getDescription() {
        return "Planet: $name"
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        def options = [:]
        countries.each { country ->
            options["Visit ${country.name}"] = { game.enterLocation(country) }
        }
        return options
    }
}
