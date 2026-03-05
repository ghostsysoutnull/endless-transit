package com.endlesstransit.model
import com.endlesstransit.ui.Terminal

class VibeCapsule {
    String timeline
    String primaryCulture
    String secondaryCulture
    double stabilityFactor = 0.85
    String latticeMutation = "Standard"
    String atmosphericColor = Terminal.WHITE // Default White

    VibeCapsule(String timeline, String primary, String secondary) {
        this.timeline = timeline
        this.primaryCulture = primary
        this.secondaryCulture = secondary
    }

    /**
     * Creates a mutated copy of this capsule for regional divergence.
     */
    VibeCapsule mutate(String mutation, double stabilityShift = 0.0) {
        def next = new VibeCapsule(timeline, primaryCulture, secondaryCulture)
        next.stabilityFactor = Math.max(0.1, Math.min(0.9, this.stabilityFactor + stabilityShift))
        next.latticeMutation = mutation
        next.atmosphericColor = this.atmosphericColor
        return next
    }

    /**
     * Picks a culture based on the current stability factor.
     */
    String pickCulture(long seed = 0) {
        Random r = seed != 0 ? new Random(seed) : new Random()
        return r.nextDouble() < stabilityFactor ? primaryCulture : secondaryCulture
    }

    @Override
    String toString() {
        "Capsule($timeline, $primaryCulture/$secondaryCulture, $latticeMutation)"
    }
}
