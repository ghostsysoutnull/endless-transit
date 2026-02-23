package com.endlesstransit

class SolarSystem extends Container {
    List<Planet> planets = []
    String name

    SolarSystem(String name) {
        this.name = name
    }

    @Override
    String getDescription() {
        return "Solar System: $name"
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        def options = [:]
        planets.each { planet ->
            options["Land on ${planet.name}"] = { game.enterLocation(planet) }
        }
        return options
    }
}
