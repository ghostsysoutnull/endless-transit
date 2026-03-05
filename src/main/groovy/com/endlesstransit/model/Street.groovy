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
        for (int i = 0; i < numPairs * 2; i++) {
            long childSeed = scrambler.nextLong()
            addLocation(new Building("", childSeed))
        }
    }

    @Override
    void enter(Player player) {
        markVisited()
        ensureChildrenPopulated()
        
        int colWidth = 45
        String separator = "-" * (colWidth * 2 + 3)
        
        println Terminal.dim("Buildings on this street:")
        println Terminal.dim(separator)
        for (int i = 0; i < buildings.size(); i += 2) {
            def bL = buildings[i]
            def bR = (i + 1 < buildings.size()) ? buildings[i+1] : null
            
            int numL = i + 1
            int numR = i + 2
            
            // Allow longer names now that we have space
            String nameL = bL.name.length() > 30 ? bL.name.substring(0, 27) + "..." : bL.name
            String visL = bL.isVisited() ? Terminal.colorize(" [V]", Terminal.GREEN) : ""
            String labelL = "${numL}. ${nameL}${visL}"
            
            // Manual padding based on visual width to handle ANSI codes correctly
            String leftPart = labelL + (" " * Math.max(0, colWidth - Terminal.getVisualWidth(labelL)))
            
            String labelR = ""
            if (bR) {
                String nameR = bR.name.length() > 30 ? bR.name.substring(0, 27) + "..." : bR.name
                String visR = bR.isVisited() ? Terminal.colorize(" [V]", Terminal.GREEN) : ""
                labelR = "${numR}. ${nameR}${visR}"
            }
            String rightPart = labelR + (" " * Math.max(0, colWidth - Terminal.getVisualWidth(labelR)))
            
            println "${leftPart} | ${rightPart}"
        }
        println Terminal.dim(separator)
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
