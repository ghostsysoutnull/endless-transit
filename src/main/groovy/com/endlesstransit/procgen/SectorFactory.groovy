package com.endlesstransit.procgen

import com.endlesstransit.model.*
import groovy.transform.CompileStatic

/**
 * Phase 9: creation and population of {@link GalacticSector}. Bodies moved verbatim from
 * {@code ProceduralFactory}; shared services and sibling factories are reached through the registry.
 */
@CompileStatic
final class SectorFactory implements LocationFactory<GalacticSector> {

    private final ProceduralFactory registry

    SectorFactory(ProceduralFactory registry) {
        this.registry = registry
    }

    @Override
    Class<GalacticSector> getType() { GalacticSector }

    GalacticSector create(Container parent, LocusSeed locus) {
        GalacticSector s = new GalacticSector(registry.nameGenerator.generateSectorName(locus), locus)
        s.setParent(parent)
        s.fmt = registry.fmt
        return s
    }

    void populate(GalacticSector s) {
        int numSystems = s.locus.nextInt(3, 7)
        for (int i = 0; i < numSystems; i++) {
            s.addLocation(registry.createSolarSystem(s, s.locus.branch(i)))
        }
    }
}
