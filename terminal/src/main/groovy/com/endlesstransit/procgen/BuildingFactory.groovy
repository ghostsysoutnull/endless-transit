package com.endlesstransit.procgen

import com.endlesstransit.model.*
import groovy.transform.CompileStatic

/**
 * Phase 9: creation and population of {@link Building}. Bodies moved verbatim from
 * {@code ProceduralFactory}; shared services and sibling factories are reached through the registry.
 */
@CompileStatic
final class BuildingFactory implements LocationFactory<Building> {

    private final ProceduralFactory registry

    BuildingFactory(ProceduralFactory registry) {
        this.registry = registry
    }

    @Override
    Class<Building> getType() { Building }

    Building create(Container parent, String culture, String timeline, LocusSeed locus, int depth, boolean isNull, boolean isAbyssal) {
        Building b = new Building(locus)
        b.culture = culture
        b.timeline = timeline
        b.setParent(parent)
        
        // 1. Determine Scale
        int sizeRoll = locus.nextInt(100)
        String sizeCat = "small"
        if (sizeRoll > 90) sizeCat = "massive"
        else if (sizeRoll > 70) sizeCat = "large"
        else if (sizeRoll > 40) sizeCat = "medium"
        
        // 2. Set Constraints
        switch (sizeCat) {
            case "massive":
                b.maxFloors = locus.nextInt(50, 100)
                b.apartmentsPerFloor = locus.nextInt(10, 20)
                break
            case "large":
                b.maxFloors = locus.nextInt(30, 50)
                b.apartmentsPerFloor = locus.nextInt(8, 16)
                break
            case "medium":
                b.maxFloors = locus.nextInt(10, 25)
                b.apartmentsPerFloor = locus.nextInt(4, 10)
                break
            default:
                b.maxFloors = locus.nextInt(3, 10)
                b.apartmentsPerFloor = locus.nextInt(2, 6)
        }

        // 3. Generate Name
        Map<String, Object> nameData = registry.nameGenerator.generateBuildingName(culture, b.maxFloors, locus, depth, isNull, isAbyssal)
        b.name = (String) nameData["name"]
        b.isLandmark = (boolean) nameData["isLandmark"]
        b.fmt = registry.fmt
        return b
    }

    void populate(Building b) {
        for (int i = 0; i < b.maxFloors; i++) {
            b.addLocation(registry.createFloor(b, i, b.apartmentsPerFloor, b.culture, b.timeline, b.locus.branch(i)))
        }
    }
}
