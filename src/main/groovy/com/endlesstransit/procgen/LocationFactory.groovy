package com.endlesstransit.procgen

import com.endlesstransit.model.Container
import groovy.transform.CompileStatic

/**
 * One factory per location type (Phase 9). Creation keeps a typed, per-type
 * {@code create(...)} on each implementation because the argument lists differ;
 * population is the uniform contract, so a registry can dispatch on the exact class.
 *
 * Implementations are stateless apart from a back-reference to the
 * {@link ProceduralFactory} registry, through which they reach the shared
 * {@code fmt}, the {@code ThemeService}, and sibling factories.
 */
@CompileStatic
interface LocationFactory<T extends Container> {

    /** Registry key: the exact model class this factory populates. */
    Class<T> getType()

    /** Generates and attaches the children of {@code location}. */
    void populate(T location)
}
