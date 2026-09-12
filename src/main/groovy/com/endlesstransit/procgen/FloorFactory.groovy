package com.endlesstransit.procgen

import com.endlesstransit.model.*
import groovy.transform.CompileStatic

/**
 * Phase 9: creation and population of {@link Floor}. Bodies moved verbatim from
 * {@code ProceduralFactory}; shared services and sibling factories are reached through the registry.
 */
@CompileStatic
final class FloorFactory implements LocationFactory<Floor> {

    private final ProceduralFactory registry

    FloorFactory(ProceduralFactory registry) {
        this.registry = registry
    }

    @Override
    Class<Floor> getType() { Floor }

    Floor create(Container parent, int number, int apartmentsPerFloor, String culture, String timeline, LocusSeed locus) {
        Floor f = new Floor(number, apartmentsPerFloor, culture, timeline, locus)
        f.setParent(parent)
        f.fmt = registry.fmt
        return f
    }

    void populate(Floor f) {
        f.corridor = registry.createCorridor(f, f.apartmentsPerFloor, f.culture, f.timeline, f.locus.branch("CORRIDOR"))
        f.addLocation(f.corridor)
    }

    /**
     * Deterministically counts the total number of sub-locations (Corridor, Apartments, Rooms)
     * for a given floor without instantiating the full object tree.
     */
    int countSubLocations(Floor f) {
        int total = 1 // The Corridor itself
        int numApartments = f.apartmentsPerFloor
        total += numApartments
        
        LocusSeed corridorLocus = f.locus.branch("CORRIDOR")
        for (int i = 0; i < numApartments; i++) {
            LocusSeed aptLocus = corridorLocus.branch(i)
            int numRooms = aptLocus.nextInt(1, 10)
            total += numRooms
        }
        return total
    }
}
