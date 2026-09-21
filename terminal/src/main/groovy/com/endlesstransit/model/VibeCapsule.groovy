package com.endlesstransit.model

import com.endlesstransit.procgen.LocusSeed
import groovy.transform.CompileStatic

@CompileStatic
class VibeCapsule {
    String timeline
    String primaryCulture
    String secondaryCulture
    /** HK-016 step 2: the era a minority of apartments drift to, as secondaryCulture is for culture. */
    String secondaryTimeline
    double stabilityFactor = 0.85
    String latticeMutation = "Standard"
    String atmosphericColor = "WHITE" // Default White

    VibeCapsule(String timeline, String primary, String secondary, String secondaryTimeline = timeline) {
        this.timeline = timeline
        this.primaryCulture = primary
        this.secondaryCulture = secondary
        this.secondaryTimeline = secondaryTimeline
    }

    /**
     * Creates a mutated copy of this capsule for regional divergence.
     */
    VibeCapsule mutate(String mutation, double stabilityShift = 0.0) {
        VibeCapsule next = new VibeCapsule(timeline, primaryCulture, secondaryCulture, secondaryTimeline)
        next.stabilityFactor = Math.max(0.1, Math.min(0.9, this.stabilityFactor + stabilityShift))
        next.latticeMutation = mutation
        next.atmosphericColor = this.atmosphericColor
        return next
    }

    /**
     * Picks a culture based on the current stability factor.
     */
    String pickCulture(LocusSeed locus) {
        return locus.nextDouble() < stabilityFactor ? primaryCulture : secondaryCulture
    }

    /** Picks the era with the same stability roll as the culture (HK-016 step 2). */
    String pickTimeline(LocusSeed locus) {
        return locus.nextDouble() < stabilityFactor ? timeline : secondaryTimeline
    }

    @Override
    String toString() {
        "Capsule($timeline, $primaryCulture/$secondaryCulture, $latticeMutation)"
    }
}
