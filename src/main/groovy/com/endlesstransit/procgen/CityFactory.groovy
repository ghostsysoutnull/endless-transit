package com.endlesstransit.procgen

import com.endlesstransit.model.*
import groovy.transform.CompileStatic

/**
 * Phase 9: creation and population of {@link City}. Bodies moved verbatim from
 * {@code ProceduralFactory}; shared services and sibling factories are reached through the registry.
 */
@CompileStatic
final class CityFactory implements LocationFactory<City> {

    private final ProceduralFactory registry

    CityFactory(ProceduralFactory registry) {
        this.registry = registry
    }

    @Override
    Class<City> getType() { City }

    City create(Container parent, LocusSeed locus) {
        City c = new City(NameGenerator.generateCityName(locus), locus)
        c.setParent(parent)
        c.fmt = registry.fmt
        return c
    }

    void populate(City c) {
        if (c.localVibe == null) {
            VibeCapsule parentVibe = c.getVibe()
            if (parentVibe != null) {
                // 10% chance to be a "rebel" district and flip resonances
                if (c.locus.checkProbability(0.1)) {
                    c.isRebelDistrict = true
                    c.localVibe = new VibeCapsule(parentVibe.timeline, parentVibe.secondaryCulture, parentVibe.primaryCulture)
                    c.localVibe.latticeMutation = parentVibe.latticeMutation
                    c.localVibe.stabilityFactor = parentVibe.stabilityFactor
                    c.localVibe.atmosphericColor = parentVibe.atmosphericColor
                }
            }
        }

        int numStreets = c.locus.nextInt(3, 15)
        for (int i = 0; i < numStreets; i++) {
            c.addLocation(registry.createStreet(c, c.locus.branch(i)))
        }
    }
}
