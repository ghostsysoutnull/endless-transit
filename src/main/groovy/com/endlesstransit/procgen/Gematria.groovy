package com.endlesstransit.procgen
import com.endlesstransit.core.SpectralFrequency
import com.endlesstransit.ui.Terminal

import groovy.transform.CompileStatic

@CompileStatic
class Gematria {
    private static final String VOWELS = "aeiouAEIOU"

    static int calculateFrequency(String name, int depth, boolean isResonant = false) {
        int sum = 0
        name.each { String charStr ->
            char c = charStr.charAt(0)
            if (Character.isLetter(c) && !VOWELS.contains(charStr)) {
                // English Ordinal: A=1, B=2...
                int val = Character.toUpperCase(c) - ('A' as char) + 1
                sum += val
            }
        }

        // Master Number Resonance (11, 22, 33)
        if (new SpectralFrequency(sum).isMasterNumber()) {
            Terminal.println "!!! RESONANCE DETECTED in '$name' !!!"
            sum *= 2
        }

        int freq = sum * depth
        if (isResonant) {
            freq = (freq * 1.1) as int
        }
        return freq
    }
}
