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

    @Override
    String getPath() {
        String myName = (this instanceof SolarSystem || this instanceof Planet || this instanceof Country || this instanceof City || this instanceof Street || this instanceof Building) ? this.name : this.getClass().simpleName
        if (this instanceof Floor) myName = "Floor ${this.number}"
        
        if (parent != null) {
            return "${parent.getPath()} > $myName"
        }
        return myName
    }

    @Override
    int getDepth() {
        return (parent != null) ? parent.getDepth() + 1 : 0
    }

    @Override
    String getCoordinates() {
        def hashBase = this.getClass().simpleName.hashCode()
        if (this.hasProperty('name') && this.name) hashBase = this.name.hashCode()
        else if (this.hasProperty('number')) hashBase = this.number.hashCode()
        
        Random r = new Random(hashBase)
        return String.format("%.3f / %.3f", r.nextDouble() * 100, r.nextDouble() * 100)
    }

    Map<String, Closure> getBaseOptions(Game game) {
        def options = [:]
        if (parent != null) {
            options["l. Leave ${this.getClass().simpleName}"] = { game.exitLocation() }
        }
        return options
    }
}
