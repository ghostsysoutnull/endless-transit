package com.endlesstransit

class Building extends Container {
    List<Floor> floors = []
    String name

    Building(String name) {
        this.name = name
    }

    @Override
    String getDescription() {
        return "Building: $name"
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        return ["Enter": { game.enterLocation(floors[0]) }]
    }
}
