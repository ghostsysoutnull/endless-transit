package com.endlesstransit.procgen

import groovy.transform.CompileStatic
import groovy.transform.Immutable

/**
 * LocusSeed: The genetic code of a location.
 * Encapsulates deterministic branching and semantic entropy generation
 * to avoid "primitive obsession" with raw long seeds.
 */
@CompileStatic
@Immutable
class LocusSeed {
    long value
    
    // The default oscillator for the Vinculum entropy substrate.
    private static final EntropyMixer mixer = new StandardMixer()

    /**
     * Derives a new LocusSeed from a String key (e.g., "WALLS", "CULTURE").
     * Uses the hash of the key passed through the mixer to ensure a stable, 
     * high-entropy branch.
     */
    LocusSeed branch(String key) {
        return new LocusSeed(mixer.mix(value, (long)key.hashCode()))
    }

    /**
     * Derives a new LocusSeed from an index (e.g., child index 4).
     */
    LocusSeed branch(int index) {
        return new LocusSeed(mixer.mix(value, (long)index))
    }

    /**
     * Derives a new LocusSeed from a raw long input.
     * Useful for deep-substrate mixing or combining seeds.
     */
    LocusSeed branch(long input) {
        return new LocusSeed(mixer.mix(value, input))
    }

    /**
     * Returns a new Random instance initialized with this locus value.
     */
    Random nextRandom() {
        return new Random(value)
    }

    /**
     * Derives a new LocusSeed by advancing the internal seed.
     * Useful for horizontal entropy (e.g., getting multiple unique seeds in a loop).
     */
    LocusSeed next() {
        return new LocusSeed(nextRandom().nextLong())
    }

    /**
     * Semantic: returns true if a random roll is below the threshold (0.0 to 1.0).
     */
    boolean checkProbability(double threshold) {
        return nextRandom().nextDouble() < threshold
    }

    /**
     * Semantic: picks a random item from a list.
     */
    def <T> T pickFrom(List<T> list) {
        if (!list) return null
        return list[nextRandom().nextInt(list.size())]
    }

    /**
     * Semantic: returns a random integer between 0 (inclusive) and bound (exclusive).
     */
    int nextInt(int bound) {
        return nextRandom().nextInt(bound)
    }

    /**
     * Semantic: returns a random double between 0.0 and 1.0.
     */
    double nextDouble() {
        return nextRandom().nextDouble()
    }

    /**
     * Semantic: returns a random integer between min (inclusive) and max (inclusive).
     */
    int nextInt(int min, int max) {
        if (min == max) return min
        return nextRandom().nextInt(max - min + 1) + min
    }

    /**
     * Semantic: picks a random key from a map.
     */
    String pickFromKeys(Map<String, ?> map) {
        if (!map) return null
        List<String> keys = new ArrayList<>(map.keySet())
        return pickFrom(keys)
    }

    /**
     * Semantic: returns true if a boolean roll succeeds.
     */
    boolean nextBoolean() {
        return nextRandom().nextBoolean()
    }

    long nextLong() {
        return nextRandom().nextLong()
    }

    @Override
    String toString() {
        return Long.toHexString(value).toUpperCase()
    }
}
