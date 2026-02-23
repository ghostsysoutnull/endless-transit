package com.endlesstransit

class City extends Container {
    List<Street> streets = []
    String name

    City(String name) {
        this.name = name
    }

    @Override
    String getDescription() {
        return "City: $name"
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        def options = [:]
        streets.each { street ->
            options["Go to ${street.name}"] = { game.enterLocation(street) }
        }
        return options
    }
}
