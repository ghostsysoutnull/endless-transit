package com.endlesstransit.procgen

import groovy.transform.CompileStatic

/**
 * StandardMixer: The primary entropy engine for the Vinculum.
 * Employs a Linear Congruential step with a large prime-like multiplier
 * to ensure that small changes in input (indices or hashes) result in 
 * massive bit-flips (The Avalanche Effect).
 */
@CompileStatic
class StandardMixer implements EntropyMixer {
    // 64-bit Prime-like Multiplier and Increment (LCG Standard)
    private static final long MULT = 2862933555777941757L
    private static final long INC = 3037000493L

    @Override
    long mix(long base, long input) {
        // 1. Scramble the input via LCG step
        long scrambled = input * MULT + INC
        
        // 2. Mix with the base via bitwise XOR
        // This ensures the new seed is non-linearly unrelated to the parent.
        return base ^ scrambled
    }
}
