package com.endlesstransit.procgen.probes

import com.endlesstransit.model.Location
import com.endlesstransit.model.Building
import com.endlesstransit.model.Floor
import com.endlesstransit.model.Corridor
import com.endlesstransit.model.Apartment
import com.endlesstransit.procgen.WorldProbe
import groovy.transform.CompileStatic

/**
 * Probes for buildings with a minimum number of floors.
 */
@CompileStatic
class BuildingFloorCountProbe implements WorldProbe {
    private final int minFloors

    BuildingFloorCountProbe(int minFloors) {
        this.minFloors = minFloors
    }

    @Override
    boolean matches(Location location) {
        if (location instanceof Building) {
            return ((Building) location).maxFloors >= minFloors
        }
        return false
    }

    @Override
    boolean shouldEnter(Location container) {
        // We only care about locations above Building level
        // Do not enter Building nodes to look for more buildings (not recursive)
        return !(container instanceof Building || container instanceof Floor || container instanceof Corridor || container instanceof Apartment)
    }

    @Override
    String getName() {
        return "BuildingFloorCount(>= $minFloors)"
    }
}
