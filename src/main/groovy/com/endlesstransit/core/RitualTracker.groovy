package com.endlesstransit.core

import com.endlesstransit.model.Building
import com.endlesstransit.model.Floor
import groovy.transform.CompileStatic

/**
 * RitualTracker: advances the Abyssal ritual on a Building in response to domain
 * events (Phase 10). Bodies moved verbatim from JournalManager.logCapture /
 * logSynthesis, where a game rule had been living inside the journal.
 *
 * One typed subscription per event; the tracker never inspects an event's class.
 */
@CompileStatic
class RitualTracker {

    void attach(EventBus bus) {
        bus.subscribe(ItemCaptured) { ItemCaptured e -> onCaptured(e) }
        bus.subscribe(SynthesisPerformed) { SynthesisPerformed e -> onSynthesized(e) }
    }

    void onCaptured(ItemCaptured e) {
        if (e.location != null) {
            Building bldg = (Building) e.location.findAncestor(Building.class)
            Floor floor = (Floor) e.location.findAncestor(Floor.class)
            if (bldg != null && floor != null) {
                bldg.notifySampled(floor.number)
            }
        }
    }

    void onSynthesized(SynthesisPerformed e) {
        if (e.location != null) {
            Building bldg = (Building) e.location.findAncestor(Building.class)
            if (bldg != null) {
                bldg.infusionCount++
            }
        }
    }
}
