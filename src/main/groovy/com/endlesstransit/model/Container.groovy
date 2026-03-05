package com.endlesstransit.model
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager
import com.endlesstransit.ui.Terminal

abstract class Container implements Location {
    List<Location> children = []
    Location parent
    VibeCapsule localVibe
    boolean visited = false
    boolean childrenPopulated = false
    long seed

    @Override
    long getSeed() {
        return seed
    }

    @Override
    void setSeed(long seed) {
        this.seed = seed
    }

    /**
     * Generates a Locus Index Path (LIP) for the current location.
     * Format: 0.1.4.2... (Root is always 0 for Universe)
     */
    @Override
    String getLIP() {
        if (parent == null) return "0"
        int myIndex = getIndexInParent() - 1 // 0-based index for LIP
        return "${parent.getLIP()}.$myIndex"
    }

    @Override
    String getMapSymbol() {
        if (isAbyssal()) return "☠"
        
        if (this instanceof Universe) return Terminal.ICON_UNI
        if (this instanceof CosmicFilament) return Terminal.ICON_FIL
        if (this instanceof GalacticSector) return Terminal.ICON_SEC
        if (this instanceof SolarSystem) return Terminal.ICON_SYS
        if (this instanceof Planet) return Terminal.ICON_PLT
        if (this instanceof Country) return Terminal.ICON_CTR
        if (this instanceof City) return Terminal.ICON_CTY
        if (this instanceof Street) return Terminal.ICON_STR
        if (this instanceof Building) return Terminal.ICON_BLD
        if (this instanceof Floor) return Terminal.ICON_FLR
        if (this instanceof Corridor) return Terminal.ICON_COR
        if (this instanceof Apartment) return Terminal.ICON_APT
        
        return "■"
    }

    @Override
    String getMapColor() {
        if (isAbyssal()) return Terminal.RED
        
        def v = getVibe()
        if (v != null) return v.atmosphericColor
        return Terminal.WHITE
    }

    /**
     * Projects child locations into a 2D coordinate space for the map.
     */
    Map<List<Integer>, Location> getLocalLatticeMap(int width, int height) {
        ensureChildrenPopulated()
        Map<List<Integer>, Location> projection = [:]
        
        children.each { child ->
            // Use name + parent name hash for stable coordinates within this container
            Random r = new Random(child.getName().hashCode() + this.getName().hashCode())
            int x = r.nextInt(width)
            int y = r.nextInt(height)
            
            // Handle collisions by simple linear probing (finding next free spot)
            int attempts = 0
            while (projection.containsKey([x, y]) && attempts < 10) {
                x = (x + 1) % width
                if (x == 0) y = (y + 1) % height
                attempts++
            }
            
            projection[[x, y]] = child
        }
        
        return projection
    }

    @Override
    Map<String, Object> getMutationState() {
        return [:]
    }

    @Override
    void applyMutationState(Map<String, Object> state) {
        // Default: nothing to apply
    }

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
    boolean isAbyssal() {
        if (this instanceof Floor) return ((Floor)this).number < 0
        return parent?.isAbyssal() ?: false
    }

    @Override
    Location findAncestor(Class type) {
        if (type.isInstance(this)) return this
        return parent?.findAncestor(type)
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
    String getTypeName() {
        return this.getClass().simpleName
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
