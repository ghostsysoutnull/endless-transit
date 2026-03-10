package com.endlesstransit.model

import com.endlesstransit.procgen.LocusSeed
import groovy.transform.CompileStatic

@CompileStatic
class VibeCapsule {
    String timeline
    String primaryCulture
    String secondaryCulture
    double stabilityFactor = 0.85
    String latticeMutation = "Standard"
    String atmosphericColor = "WHITE" // Default White

    VibeCapsule(String timeline, String primary, String secondary) {
        this.timeline = timeline
        this.primaryCulture = primary
        this.secondaryCulture = secondary
    }

    /**
     * Creates a mutated copy of this capsule for regional divergence.
     */
    VibeCapsule mutate(String mutation, double stabilityShift = 0.0) {
        VibeCapsule next = new VibeCapsule(timeline, primaryCulture, secondaryCulture)
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

    @Override
    String toString() {
        "Capsule($timeline, $primaryCulture/$secondaryCulture, $latticeMutation)"
    }
}
