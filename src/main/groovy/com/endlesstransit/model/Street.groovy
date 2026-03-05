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
        Random random = seed != 0 ? new Random(seed) : new Random()
        int numPairs = random.nextInt(9) + 2 // 2 to 10 pairs
        for (int i = 0; i < numPairs * 2; i++) {
            addLocation(new Building("", seed != 0 ? seed + i + 1 : 0))
        }
    }

    @Override
    void enter(Player player) {
        markVisited()
        ensureChildrenPopulated()
        
        println Terminal.dim("Buildings on this street:")
        println Terminal.dim("---------------------------------------------")
        for (int i = 0; i < buildings.size(); i += 2) {
            def bL = buildings[i]
            def bR = (i + 1 < buildings.size()) ? buildings[i+1] : null
            
            int numL = i + 1
            int numR = i + 2
            
            String nameL = bL.name.length() > 15 ? bL.name.substring(0, 12) + "..." : bL.name
            String visL = bL.isVisited() ? Terminal.colorize(" [V]", Terminal.GREEN) : ""
            String labelL = "${numL}. ${nameL}${visL}"
            
            String labelR = ""
            if (bR) {
                String nameR = bR.name.length() > 15 ? bR.name.substring(0, 12) + "..." : bR.name
                String visR = bR.isVisited() ? Terminal.colorize(" [V]", Terminal.GREEN) : ""
                labelR = "${numR}. ${nameR}${visR}"
            }
            
            printf("%-25s | %-25s\n", labelL, labelR)
        }
        println Terminal.dim("---------------------------------------------")
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
            options["${i + 1}. Enter Building: ${building.name}"] = { game.enterLocation(building) }
        }
        return options
    }
}
