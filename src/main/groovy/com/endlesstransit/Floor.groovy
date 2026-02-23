package com.endlesstransit

class Floor extends Container {
    int number
    Corridor corridor

    @Override
    String getDescription() {
        "Floor ${number}."
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        return ["Enter Corridor": { game.enterLocation(corridor) }]
    }

    Floor(int number) {
        this.number = number
        corridor = new Corridor()
        addLocation(corridor)
    }
}
