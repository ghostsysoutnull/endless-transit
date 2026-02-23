package com.endlesstransit

class Building extends Container {
    List<Floor> floors = []
    String name
    int maxFloors
    int apartmentsPerFloor

    Building(String namePrefix = "") {
        this.name = generateName(namePrefix)
        Random random = new Random()
        this.maxFloors = random.nextInt(10) + 5 
        this.apartmentsPerFloor = random.nextInt(5) + 3 // 3 to 7 apartments per floor
    }

    private String generateName(String prefix) {
        def prefixes = ["Neon", "Crystal", "Obsidian", "Rusty", "Chrome", "Emerald", "Vapor", "Aether"]
        def suffixes = ["Tower", "Plaza", "Heights", "Complex", "Spire", "Block", "Apex", "Nexus"]
        Random r = new Random()
        String generated = "${prefixes[r.nextInt(prefixes.size())]} ${suffixes[r.nextInt(suffixes.size())]}"
        return prefix ? "$prefix $generated" : generated
    }

    @Override
    void addLocation(Location location) {
        super.addLocation(location)
        if (location instanceof Floor) {
            floors.add(location)
        }
    }

    Floor getFloor(int number) {
        if (number < 0 || number >= maxFloors) return null
        
        def floor = floors.find { it.number == number }
        if (floor == null) {
            floor = new Floor(number, apartmentsPerFloor)
            addLocation(floor)
        }
        return floor
    }

    @Override
    String getDescription() {
        return "Building: $name (Total Floors: $maxFloors)"
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        def options = getBaseOptions(game)
        int baseIdx = options.size() + 1
        for (int i = 0; i < maxFloors; i++) {
            final int floorNum = i
            def floor = getFloor(floorNum)
            String label = "${baseIdx + i}. Enter: Floor ${floorNum}"
            if (floor.isVisited()) label += " [Visited]"
            options[label] = { game.enterLocation(floor) }
        }
        return options
    }
}
