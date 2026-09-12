package com.endlesstransit.procgen

import com.endlesstransit.model.*
import groovy.transform.CompileStatic

/**
 * Phase 9: creation and population of {@link Universe}. Bodies moved verbatim from
 * {@code ProceduralFactory}; shared services and sibling factories are reached through the registry.
 */
@CompileStatic
final class UniverseFactory implements LocationFactory<Universe> {

    private final ProceduralFactory registry

    UniverseFactory(ProceduralFactory registry) {
        this.registry = registry
    }

    @Override
    Class<Universe> getType() { Universe }

    Universe create(LocusSeed locus) {
        Universe u = new Universe()
        u.setLocus(locus)
        u.fmt = registry.fmt
        return u
    }

    void populate(Universe u) {
        int numFilaments = u.locus.nextInt(3, 7)
        for (int i = 0; i < numFilaments; i++) {
            u.addLocation(registry.createFilament(u, u.locus.branch(i)))
        }
    }
}
