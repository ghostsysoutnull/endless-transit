package com.endlesstransit.procgen

import com.endlesstransit.model.*
import groovy.transform.CompileStatic

/**
 * Phase 9: creation and population of {@link Country}. Bodies moved verbatim from
 * {@code ProceduralFactory}; shared services and sibling factories are reached through the registry.
 */
@CompileStatic
final class CountryFactory implements LocationFactory<Country> {

    private final ProceduralFactory registry

    CountryFactory(ProceduralFactory registry) {
        this.registry = registry
    }

    @Override
    Class<Country> getType() { Country }

    Country create(Container parent, LocusSeed locus) {
        Country c = new Country(NameGenerator.generateCountryName(locus), locus)
        c.setParent(parent)
        
        List<String> traits = ["Ceremonial", "Military", "Industrial", "Agricultural", "Research", "Commercial"]
        c.functionalTrait = (String) locus.pickFrom(traits)
        c.fmt = registry.fmt
        return c
    }

    void populate(Country c) {
        // Ensure we have a local mutated vibe for this country based on the planet
        if (c.localVibe == null) {
            VibeCapsule parentVibe = c.getVibe()
            if (parentVibe != null) {
                c.localVibe = parentVibe.mutate(c.functionalTrait, c.locus.nextDouble() * 0.2 - 0.1)
            }
        }

        int numCities = c.locus.nextInt(2, 10)
        for (int i = 0; i < numCities; i++) {
            c.addLocation(registry.createCity(c, c.locus.branch(i)))
        }
    }
}
