package com.endlesstransit.model
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager
import com.endlesstransit.ui.Terminal
import com.endlesstransit.ui.ThemeManager

class Street extends Container {
    List<Building> buildings = []
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
        
        String culture = getVibe()?.primaryCulture ?: "monolith"
        int depth = getDepth()
        boolean isNull = findAncestor(NullSector.class) != null
        boolean isAbyssal = isAbyssal()

        for (int i = 0; i < numPairs * 2; i++) {
            long childSeed = scrambler.nextLong()
            addLocation(new Building(culture, childSeed, depth, isNull, isAbyssal))
        }
    }

    @Override
    void enter(Player player) {
        markVisited()
        ensureChildrenPopulated()
    }

    @Override
    List<String> getExtraContent() {
        ensureChildrenPopulated()
        List<String> lines = []
        
        int colWidth = 40 // Adjusted for 88-char left pane
        String separator = "-" * (colWidth * 2 + 3)
        
        lines << Terminal.dim("Buildings on this street:")
        lines << Terminal.dim(separator)
        for (int i = 0; i < buildings.size(); i += 2) {
            def bL = buildings[i]
            def bR = (i + 1 < buildings.size()) ? buildings[i+1] : null
            
            int numL = i + 1
            int numR = i + 2
            
            String nameL = bL.name.length() > 25 ? bL.name.substring(0, 22) + "..." : bL.name
            if (bL.isLandmark) nameL = Terminal.colorize(Terminal.bold(nameL), Terminal.CYAN)
            String visL = bL.isVisited() ? Terminal.colorize(" [V]", Terminal.GREEN) : ""
            String labelL = "${numL}. ${nameL}${visL}"
            
            String leftPart = labelL + (" " * Math.max(0, colWidth - Terminal.getVisualWidth(labelL)))
            
            String labelR = ""
            if (bR) {
                String nameR = bR.name.length() > 25 ? bR.name.substring(0, 22) + "..." : bR.name
                if (bR.isLandmark) nameR = Terminal.colorize(Terminal.bold(nameR), Terminal.CYAN)
                String visR = bR.isVisited() ? Terminal.colorize(" [V]", Terminal.GREEN) : ""
                labelR = "${numR}. ${nameR}${visR}"
            }
            String rightPart = labelR + (" " * Math.max(0, colWidth - Terminal.getVisualWidth(labelR)))
            
            lines << "${leftPart} | ${rightPart}"
        }
        lines << Terminal.dim(separator)
        return lines
    }

    @Override
    void addLocation(Location location) {
        super.addLocation(location)
        if (location instanceof Building) {
            buildings.add(location)
        }
    }

    @Override
    String getDescription() {
        def v = getVibe()
        String vInfo = v ? "\n${Terminal.dim("[TECH_ERA:")} ${Terminal.colorize(v.timeline.toUpperCase(), Terminal.YELLOW)}${Terminal.dim("]")} ${Terminal.dim("[RESONANCE:")} ${Terminal.colorize(v.primaryCulture.toUpperCase(), v.atmosphericColor)}${Terminal.dim("]")}" : ""
        return "Street: $name$vInfo"
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        ensureChildrenPopulated()
        def options = getBaseOptions(game)
        
        for (int i = 0; i < buildings.size(); i++) {
            def building = buildings[i]
            String label = "${i + 1}. Enter Building: ${building.name}"
            if (building.isVisited()) label += " [Visited]"
            options[label] = { game.enterLocation(building) }
        }
        return options
    }
}
