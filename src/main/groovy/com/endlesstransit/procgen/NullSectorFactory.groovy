package com.endlesstransit.procgen

import com.endlesstransit.model.*
import groovy.transform.CompileStatic

/**
 * Phase 9: creation and population of {@link NullSector}. Bodies moved verbatim from
 * {@code ProceduralFactory}; shared services and sibling factories are reached through the registry.
 */
@CompileStatic
final class NullSectorFactory implements LocationFactory<NullSector> {

    private final ProceduralFactory registry

    NullSectorFactory(ProceduralFactory registry) {
        this.registry = registry
    }

    @Override
    Class<NullSector> getType() { NullSector }

    NullSector create(Container parent, LocusSeed locus) {
        String nullName = "Null Reach ${Integer.toHexString(locus.nextInt(0xFFF)).toUpperCase()}"
        NullSector s = new NullSector(nullName, locus)
        s.setParent(parent)
        s.fmt = registry.fmt
        return s
    }

    void populate(NullSector s) {
        int numSystems = s.locus.nextInt(1, 2)
        for (int i = 0; i < numSystems; i++) {
            LocusSeed childLocus = s.locus.branch(i)
            s.addLocation(registry.createSolarSystem(s, childLocus))
        }
    }
}
