package com.endlesstransit.procgen.probes

import com.endlesstransit.model.Location
import com.endlesstransit.model.Building
import com.endlesstransit.model.Floor
import com.endlesstransit.model.Corridor
import com.endlesstransit.model.Apartment
import com.endlesstransit.procgen.WorldProbe
import groovy.transform.CompileStatic

/**
 * Probes for locations with a specific culture.
 */
@CompileStatic
class CultureProbe implements WorldProbe {
    private final String culture

    CultureProbe(String culture) {
        this.culture = culture
    }

    @Override
    boolean matches(Location location) {
        if (location instanceof Building) {
            return ((Building) location).culture == culture
        }
        return false
    }

    @Override
    boolean shouldEnter(Location container) {
        return !(container instanceof Building || container instanceof Floor || container instanceof Corridor || container instanceof Apartment)
    }

    @Override
    String getName() {
        return "CultureProbe($culture)"
    }
}
