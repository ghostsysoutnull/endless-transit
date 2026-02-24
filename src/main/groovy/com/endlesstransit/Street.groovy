package com.endlesstransit

class Street extends Container {
    List<Building> buildings = []
    String name

    Street(String name) {
        this.name = name
        Random random = new Random()
        int numPairs = random.nextInt(9) + 2 // 2 to 10 pairs
        for (int i = 0; i < numPairs * 2; i++) {
            addLocation(new Building())
        }
    }

    @Override
    void enter(Player player) {
        markVisited()
        println Terminal.bold(getDescription())
        
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
        return "Street: $name"
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        def options = getBaseOptions(game)
        
        for (int i = 0; i < buildings.size(); i++) {
            def building = buildings[i]
            options["${i + 1}. Enter Building: ${building.name}"] = { game.enterLocation(building) }
        }
        return options
    }
}
