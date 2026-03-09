package com.endlesstransit.procgen

import com.endlesstransit.model.Location
import groovy.transform.CompileStatic

/**
 * Specification Pattern for discovering specific world scenarios.
 */
@CompileStatic
interface WorldProbe {
    /**
     * @return true if the location matches the criteria.
     */
    boolean matches(Location location)
    
    /**
     * Optimization: Decide whether to descend into a container.
     * @return true if the scanner should explore children of this location.
     */
    boolean shouldEnter(Location container)

    /**
     * @return a descriptive name for the probe.
     */
    String getName()
}
