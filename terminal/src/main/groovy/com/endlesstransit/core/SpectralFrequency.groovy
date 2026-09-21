package com.endlesstransit.core

import groovy.transform.CompileStatic

/**
 * SpectralFrequency: Typed value object wrapping an int frequency value.
 * Encapsulates resonance and master-number semantics that were previously
 * scattered as bare-primitive logic across Player, Gematria, and BridgeView.
 */
@CompileStatic
class SpectralFrequency {
    final int value

    SpectralFrequency(int value) { this.value = value }

    boolean isResonant()     { value % 11 == 0 }
    boolean isMasterNumber() { value == 11 || value == 22 || value == 33 }
    int getValue()           { value }

    @Override
    String toString() { String.valueOf(value) }
}
