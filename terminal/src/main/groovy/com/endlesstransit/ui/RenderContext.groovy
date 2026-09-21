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
 * Introduced in OOA Phase 7a-i. recentEvents (HK-011): the journal's latest lines, oldest
 * first, for the header ticker — the compositor supplies them so no component reads the journal.
 */
@CompileStatic
class RenderContext {
    final Location location
    final Player player
    final Map<String, Closure> options
    final LocusSeed masterLocus
    final List<String> recentEvents

    RenderContext(Location location, Player player, Map<String, Closure> options, LocusSeed masterLocus,
                  List<String> recentEvents = []) {
        this.location = location
        this.player = player
        this.options = Collections.unmodifiableMap(options != null ? options : new LinkedHashMap<String, Closure>())
        this.masterLocus = masterLocus
        this.recentEvents = Collections.unmodifiableList(recentEvents != null ? recentEvents : new ArrayList<String>())
    }
}
