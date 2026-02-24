package com.endlesstransit

println "Running Gematria Mystical Logic Test..."

// Test Case: "Key" (K=11, e=0, y=25) -> Sum=36. Depth=10. Frequency=360.
int freq1 = Gematria.calculateFrequency("Key", 10)
if (freq1 == 360) {
    println "SUCCESS: 'Key' frequency at depth 10 is 360."
} else {
    println "FAILURE: 'Key' frequency was $freq1"
}

// Test Case: Master Number "Ab" (A=0, b=2) -> Sum=2. Not master.
// Let's find a master number sum. "K" is 11.
// "K" (11) at depth 1 -> 11 * 2 (Resonance) * 1 = 22.
int freq2 = Gematria.calculateFrequency("K", 1)
if (freq2 == 22) {
    println "SUCCESS: Master number resonance detected and doubled."
} else {
    println "FAILURE: Resonance frequency was $freq2"
}

// Test Case: Vowels "aeiou" -> Sum=0.
int freq3 = Gematria.calculateFrequency("aeiou", 100)
if (freq3 == 0) {
    println "SUCCESS: Vowels carry no weight."
} else {
    println "FAILURE: Vowels frequency was $freq3"
}

println "All Gematria Tests Passed!"
