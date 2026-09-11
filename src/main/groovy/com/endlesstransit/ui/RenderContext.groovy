package com.endlesstransit.ui

import com.endlesstransit.core.Player
import com.endlesstransit.model.Location
import com.endlesstransit.procgen.LocusSeed
import groovy.transform.CompileStatic

/**
 * RenderContext: the inputs a ViewComponent needs for one frame.
 *
 * Mirrors the parameter list of BridgeView.render(). The context itself is read-only —
 * its fields are final and the options map is wrapped unmodifiable — but the Location
 * and Player it references are live model objects, so @Immutable is deliberately not used.
 *
 * Introduced in OOA Phase 7a-i.
 */
@CompileStatic
class RenderContext {
    final Location location
    final Player player
    final Map<String, Closure> options
    final LocusSeed masterLocus

    RenderContext(Location location, Player player, Map<String, Closure> options, LocusSeed masterLocus) {
        this.location = location
        this.player = player
        this.options = Collections.unmodifiableMap(options != null ? options : new LinkedHashMap<String, Closure>())
        this.masterLocus = masterLocus
    }
}
