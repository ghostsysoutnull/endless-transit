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
        // 1. Scramble both the base and the input via LCG steps
        // This ensures that even small changes in either parameter result 
        // in massive bit-flips in the output (The Avalanche Effect).
        long scrambledBase = (base * MULT) + INC
        long scrambledInput = (input * MULT) + INC
        
        // 2. Mix via bitwise XOR
        return scrambledBase ^ scrambledInput
    }
}
