package com.endlesstransit

class Street extends Container {
    List<Building> buildings = []
    String name

    Street(String name) {
        this.name = name
    }

    @Override
    String getDescription() {
        return "Street: $name"
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        def options = [:]
        buildings.each { building ->
            options["Enter ${building.name}"] = { game.enterLocation(building) }
        }
        return options
    }
}
