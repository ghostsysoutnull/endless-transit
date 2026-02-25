package com.endlesstransit.model
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager

abstract class Container implements Location {
    List<Location> children = []
    Location parent
    VibeCapsule localVibe
    boolean visited = false
    boolean childrenPopulated = false

    @Override
    VibeCapsule getVibe() {
        if (localVibe != null) return localVibe
        return parent?.getVibe()
    }

    void setVibe(VibeCapsule vibe) {
        this.localVibe = vibe
    }

    void ensureChildrenPopulated() {
        if (!childrenPopulated) {
            childrenPopulated = true
            populateChildren()
        }
    }

    void populateChildren() {
        // To be overridden by subclasses for lazy loading
    }

    List<Location> getChildren() {
        ensureChildrenPopulated()
        return children
    }

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
            Container cp = (Container) parent
            cp.ensureChildrenPopulated()
            return cp.children.indexOf(this) + 1
        }
        return 0
    }

    @Override
    int getTotalInParent() {
        if (parent instanceof Container) {
            Container cp = (Container) parent
            cp.ensureChildrenPopulated()
            return cp.children.size()
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
    }

    @Override
    void processAction(Player player) {
        // Most containers don't have automatic actions
    }

    @Override
    String getPath() {
        String myName = getName()
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
        def nameForHash = getName()
        Random r = new Random(nameForHash.hashCode())
        return String.format("%.3f / %.3f", r.nextDouble() * 100, r.nextDouble() * 100)
    }

    @Override
    String getName() {
        // Use more direct checks to avoid hasProperty recursion
        if (this instanceof SolarSystem) return ((SolarSystem)this).name
        if (this instanceof Planet) return ((Planet)this).name
        if (this instanceof Country) return ((Country)this).name
        if (this instanceof City) return ((City)this).name
        if (this instanceof Street) return ((Street)this).name
        if (this instanceof Building) return ((Building)this).name
        if (this instanceof Floor) return "Floor ${((Floor)this).number}"
        
        return this.getClass().simpleName
    }

    Map<String, Closure> getBaseOptions(Game game) {
        def options = [:]
        if (parent != null) {
            options["l. Leave ${this.getClass().simpleName}"] = { game.exitLocation() }
        }
        return options
    }
}
