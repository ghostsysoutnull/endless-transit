package com.endlesstransit.procgen

import com.endlesstransit.model.*
import groovy.transform.CompileStatic

/**
 * Phase 9: creation and population of {@link Street}. Bodies moved verbatim from
 * {@code ProceduralFactory}; shared services and sibling factories are reached through the registry.
 */
@CompileStatic
final class StreetFactory implements LocationFactory<Street> {

    private final ProceduralFactory registry

    StreetFactory(ProceduralFactory registry) {
        this.registry = registry
    }

    @Override
    Class<Street> getType() { Street }

    Street create(Container parent, LocusSeed locus) {
        Street s = new Street(NameGenerator.generateStreetName(locus), locus)
        s.setParent(parent)
        s.fmt = registry.fmt
        return s
    }

    void populate(Street s) {
        int numPairs = s.locus.nextInt(2, 10)
        VibeCapsule v = s.getVibe()
        String culture = v != null ? v.primaryCulture : "monolith"
        String timeline = v != null ? v.timeline : "ancient"
        int depth = s.getDepth()
        boolean isNull = s.findAncestor(NullSector.class) != null
        boolean isAbyssal = s.isAbyssal()
        for (int i = 0; i < numPairs * 2; i++) {
            s.addLocation(registry.createBuilding(s, culture, timeline, s.locus.branch(i), depth, isNull, isAbyssal))
        }
    }
}
