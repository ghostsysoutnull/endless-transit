package com.endlesstransit.procgen

import groovy.transform.CompileStatic

/**
 * EntropyMixer: The interface for procedural divergence logic.
 * Responsible for taking a base seed and an input to derive a new, high-entropy result.
 */
@CompileStatic
interface EntropyMixer {
    /**
     * Scrambles the base seed with the given input.
     * @param base The current seed value.
     * @param input The numeric key (index or hash) to mix.
     * @return A new scrambled 64-bit seed.
     */
    long mix(long base, long input)
}
