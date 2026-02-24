package com.endlesstransit.procgen

class Gematria {
    private static final String VOWELS = "aeiouAEIOU"

    static int calculateFrequency(String name, int depth) {
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
        if (sum == 11 || sum == 22 || sum == 33) {
            println "!!! RESONANCE DETECTED in '$name' !!!"
            sum *= 2
        }

        return sum * depth
    }
}
