package com.endlesstransit

abstract class Container implements Location {
    List<Location> children = []
    Location parent
    boolean visited = false

    @Override
    boolean isVisited() {
        return visited
    }

    @Override
    void markVisited() {
        this.visited = true
    }

    @Override
    int getIndexInParent() {
        if (parent instanceof Container) {
            return ((Container)parent).children.indexOf(this) + 1
        }
        return 0
    }

    @Override
    int getTotalInParent() {
        if (parent instanceof Container) {
            return ((Container)parent).children.size()
        }
        return 0
    }

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
        markVisited()
        println getDescription()
    }

    @Override
    void processAction(Player player) {
        // Most containers don't have automatic actions
    }

    Map<String, Closure> getBaseOptions(Game game) {
        def options = [:]
        if (parent != null) {
            options["l. Leave ${this.getClass().simpleName}"] = { game.exitLocation() }
        }
        return options
    }
}
