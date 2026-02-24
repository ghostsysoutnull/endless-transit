package com.endlesstransit

class Building extends Container {
    List<Floor> floors = []
    String name
    int maxFloors
    int apartmentsPerFloor

    Building(String namePrefix = "") {
        this.name = NameGenerator.generateBuildingName(namePrefix)
        Random random = new Random()
        this.maxFloors = random.nextInt(26) + 5 
        this.apartmentsPerFloor = random.nextInt(13) + 3 // 3 to 15 apartments per floor
    }

    @Override
    void addLocation(Location location) {
        super.addLocation(location)
        if (location instanceof Floor) {
            floors.add(location)
        }
    }

    Floor getFloor(int number) {
        if (number < 0 || number >= maxFloors) {
            Logger.info("Floor request out of bounds: $number (max: $maxFloors)")
            return null
        }
        
        def floor = floors.find { it.number == number }
        if (floor == null) {
            Logger.info("Instantiating new Floor $number in Building $name")
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
        for (int i = 0; i < maxFloors; i++) {
            final int floorNum = i
            def floor = getFloor(floorNum)
            String label = "${i}. Enter: Floor ${floorNum}"
            if (floor.isVisited()) label += " [Visited]"
            options[label] = { game.enterLocation(floor) }
        }
        return options
    }
}
