package com.endlesstransit.procgen

import com.endlesstransit.model.*
import groovy.transform.CompileStatic

/**
 * Phase 9: creation and population of {@link SolarSystem}. Bodies moved verbatim from
 * {@code ProceduralFactory}; shared services and sibling factories are reached through the registry.
 */
@CompileStatic
final class SolarSystemFactory implements LocationFactory<SolarSystem> {

    private final ProceduralFactory registry

    SolarSystemFactory(ProceduralFactory registry) {
        this.registry = registry
    }

    @Override
    Class<SolarSystem> getType() { SolarSystem }

    SolarSystem create(Container parent, LocusSeed locus) {
        SolarSystem s = new SolarSystem(NameGenerator.generateSolarSystemName(locus), locus)
        s.setParent(parent)
        s.fmt = registry.fmt
        return s
    }

    void populate(SolarSystem s) {
        int numPlanets = s.locus.nextInt(2, 10)
        for (int i = 0; i < numPlanets; i++) {
            s.addLocation(registry.createPlanet(s, s.locus.branch(i)))
        }
    }
}
