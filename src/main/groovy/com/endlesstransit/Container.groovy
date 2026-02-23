package com.endlesstransit

abstract class Container implements Location {
    List<Location> children = []
    Location parent

    @Override
    Location getParent() {
        return parent
    }

    @Override
    void setParent(Location parent) {
        this.parent = parent
    }

    void addLocation(Location location) {
        children.add(location)
        location.setParent(this)
    }

    @Override
    void enter(Player player) {
        println getDescription()
    }
}
