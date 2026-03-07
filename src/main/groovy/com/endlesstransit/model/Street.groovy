package com.endlesstransit.model
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager
import com.endlesstransit.ui.Terminal
import com.endlesstransit.ui.ThemeManager
import groovy.transform.CompileStatic
import groovy.transform.PackageScope

@CompileStatic
class Street extends Container {
    @PackageScope List<Building> buildings = []
    String name

    List<Building> getBuildings() {
        ensureChildrenPopulated()
        return buildings
    }

    Street(String name, long seed = 0) {
        this.name = name
        this.seed = seed
    }

    @Override
    void populateChildren() {
        Random scrambler = seed != 0 ? new Random(seed) : new Random()
        int numPairs = scrambler.nextInt(9) + 2 // 2 to 10 pairs
        
        VibeCapsule v = getVibe()
        String culture = v != null ? v.primaryCulture : "monolith"
        String timeline = v != null ? v.timeline : "ancient"
        int depth = getDepth()
        boolean isNull = findAncestor(NullSector.class) != null
        boolean isAbyssal = isAbyssal()

        for (int i = 0; i < numPairs * 2; i++) {
            long childSeed = scrambler.nextLong()
            addLocation(new Building(culture, timeline, childSeed, depth, isNull, isAbyssal))
        }
    }

    @Override
    void enter(Player player) {
        markVisited()
        ensureChildrenPopulated()
    }

    @Override
    List<String> getExtraContent(Player player) {
        ensureChildrenPopulated()
        List<String> lines = []
        
        int colWidth = 40 // Adjusted for 88-char left pane
        String separator = "-" * (colWidth * 2 + 3)
        
        lines << Terminal.dim("Buildings on this street:")
        lines << Terminal.dim(separator)
        List<Building> bldgs = getBuildings()
        for (int i = 0; i < bldgs.size(); i += 2) {
            Building bL = bldgs[i]
            Building bR = (i + 1 < bldgs.size()) ? bldgs[i+1] : (Building)null
            
            int numL = i + 1
            int numR = i + 2
            
            String nameL = bL.name.length() > 25 ? bL.name.substring(0, 22) + "..." : bL.name
            if (bL.isLandmark) nameL = Terminal.colorize(Terminal.bold(nameL), Terminal.CYAN)
            String visL = bL.isVisited() ? Terminal.colorize(" [V]", Terminal.GREEN) : ""
            String labelL = "${numL}. ${nameL}${visL}"
            String leftPart = labelL + (" " * Math.max(0, colWidth - Terminal.getVisualWidth(labelL)))
            
            String labelR = ""
            if (bR != null) {
                String nameR = bR.name.length() > 25 ? bR.name.substring(0, 22) + "..." : bR.name
                if (bR.isLandmark) nameR = Terminal.colorize(Terminal.bold(nameR), Terminal.CYAN)
                String visR = bR.isVisited() ? Terminal.colorize(" [V]", Terminal.GREEN) : ""
                labelR = "${numR}. ${nameR}${visR}"
            }
            String rightPart = labelR + (" " * Math.max(0, colWidth - Terminal.getVisualWidth(labelR)))
            
            lines << "${leftPart} | ${rightPart}".toString()
        }
        lines << Terminal.dim(separator)
        return lines
    }

    @Override
    void addLocation(Location location) {
        super.addLocation(location)
        if (location instanceof Building) {
            this.buildings.add((Building)location)
        }
    }

    @Override
    String getDescription() {
        VibeCapsule v = getVibe()
        String vInfo = v != null ? " | ${Terminal.dim("[TECH_ERA:")} ${Terminal.colorize(v.timeline.toUpperCase(), Terminal.YELLOW)}${Terminal.dim("]")} ${Terminal.dim("[RESONANCE:")} ${Terminal.colorize(v.primaryCulture.toUpperCase(), v.atmosphericColor)}${Terminal.dim("]")}" : ""
        return "Street: $name$vInfo"
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        ensureChildrenPopulated()
        Map<String, Closure> options = getBaseOptions(game)
        
        List<Building> bldgs = getBuildings()
        Logger.info("Generating options for Street: $name. Building count: ${bldgs.size()}")
        for (int i = 0; i < bldgs.size(); i++) {
            Building building = bldgs[i]
            String id = String.format("%02d", i + 1)
            String label = "${id}. Enter Building: ${building.name}"
            if (building.isVisited()) label += " [Visited]"
            options[label] = { game.enterLocation(building) }
            Logger.info("  >> Added menu key: '$label'")
        }
        return options
    }
}
