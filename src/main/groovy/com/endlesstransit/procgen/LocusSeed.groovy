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

    /**
     * Derives a new LocusSeed from a String key (e.g., "WALLS", "CULTURE").
     * Uses the hash of the key to ensure a stable, deterministic branch.
     */
    LocusSeed branch(String key) {
        return new LocusSeed(value + key.hashCode())
    }

    /**
     * Derives a new LocusSeed from an index (e.g., child index 4).
     */
    LocusSeed branch(int index) {
        return new LocusSeed(value + index + 1000)
    }

    /**
     * Returns a new Random instance initialized with this locus value.
     */
    Random nextRandom() {
        return new Random(value)
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

    long nextLong() {
        return nextRandom().nextLong()
    }

    @Override
    String toString() {
        return Long.toHexString(value).toUpperCase()
    }
}
