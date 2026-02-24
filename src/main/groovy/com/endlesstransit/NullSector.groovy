package com.endlesstransit

class NullSector extends Container {
    String name

    NullSector(String name) {
        this.name = name
    }

    @Override
    void populateChildren() {
        Random random = new Random()
        // Very sparse: only 1 or 2 systems adrift in the void
        int numSystems = random.nextInt(2) + 1
        for (int i = 0; i < numSystems; i++) {
            addLocation(new SolarSystem("Lost ${NameGenerator.generateSolarSystemName()}"))
        }
    }

    @Override
    String getDescription() {
        "A pocket of absolute silence. Only the echoes of distant, dead civilizations remain."
    }

    @Override
    void processAction(Player player) {
        // High chance of finding spectral data in the void
        Random random = new Random()
        if (random.nextInt(10) < 5) {
            int freq = random.nextInt(9999)
            def item = new InventoryItem("Spectral Echo", freq)
            player.inventory.add(item)
            JournalManager.logCapture(item)
            println Terminal.colorize(">>> VOID_RESONANCE: Captured Spectral Echo (${freq}Hz) <<<", Terminal.MAGENTA)
        }
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        ensureChildrenPopulated()
        def options = getBaseOptions(game)
        children.eachWithIndex { system, i ->
            options["${i + 1}. Detect faint signal: ${system.name}"] = { game.enterLocation(system) }
        }
        return options
    }
}
