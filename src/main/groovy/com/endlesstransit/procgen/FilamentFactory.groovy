package com.endlesstransit.procgen

import com.endlesstransit.model.*
import groovy.transform.CompileStatic

/**
 * Phase 9: creation and population of {@link CosmicFilament}. Bodies moved verbatim from
 * {@code ProceduralFactory}; shared services and sibling factories are reached through the registry.
 */
@CompileStatic
final class FilamentFactory implements LocationFactory<CosmicFilament> {

    private final ProceduralFactory registry

    FilamentFactory(ProceduralFactory registry) {
        this.registry = registry
    }

    @Override
    Class<CosmicFilament> getType() { CosmicFilament }

    CosmicFilament create(Container parent, LocusSeed locus) {
        CosmicFilament f = new CosmicFilament(NameGenerator.generateFilamentName(locus), locus)
        f.setParent(parent)
        f.fmt = registry.fmt
        return f
    }

    void populate(CosmicFilament f) {
        int numNodes = f.locus.nextInt(4, 8)
        for (int i = 0; i < numNodes; i++) {
            LocusSeed childLocus = f.locus.branch(i)
            if (f.locus.nextInt(100) < 30) {
                f.addLocation(registry.createNullSector(f, childLocus))
            } else {
                f.addLocation(registry.createSector(f, childLocus))
            }
        }
    }
}
