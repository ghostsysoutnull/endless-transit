package com.endlesstransit

class Floor extends Container {
    int number
    Corridor corridor

    @Override
    String getDescription() {
        "Floor ${number}."
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        def options = getBaseOptions(game)
        int nextIdx = options.size() + 1
        
        if (parent instanceof Building) {
            Building bldg = (Building) parent
            if (number < bldg.maxFloors - 1) {
                options["${nextIdx}. Go Up"] = { game.enterLocation(bldg.getFloor(number + 1)) }
                nextIdx++
            }
            if (number > 0) {
                options["${nextIdx}. Go Down"] = { game.enterLocation(bldg.getFloor(number - 1)) }
                nextIdx++
            }
        }
        
        options["${nextIdx}. Enter Corridor"] = { game.enterLocation(corridor) }
        return options
    }

    @Override
    int getIndexInParent() {
        if (parent instanceof Building) {
            return number + 1
        }
        return super.getIndexInParent()
    }

    @Override
    int getTotalInParent() {
        if (parent instanceof Building) {
            return ((Building)parent).maxFloors
        }
        return super.getTotalInParent()
    }

    @Override
    void addLocation(Location location) {
        super.addLocation(location)
        if (location instanceof Corridor) {
            this.corridor = (Corridor) location
        }
    }

    Floor(int number, int apartmentsPerFloor) {
        this.number = number
        corridor = new Corridor(apartmentsPerFloor)
        addLocation(corridor)
    }
}
