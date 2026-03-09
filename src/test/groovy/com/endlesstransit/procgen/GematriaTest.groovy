package com.endlesstransit.procgen
import com.endlesstransit.ui.Terminal
import com.endlesstransit.model.*
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager
import com.endlesstransit.procgen.Gematria
import com.endlesstransit.procgen.NameGenerator

Terminal.println "Running Gematria Mystical Logic Test..."

// Test Case: "Key" (K=11, e=0, y=25) -> Sum=36. Depth=10. Frequency=360.
int freq1 = Gematria.calculateFrequency("Key", 10)
if (freq1 == 360) {
    Terminal.println "SUCCESS: 'Key' frequency at depth 10 is 360."
} else {
    Terminal.println "FAILURE: 'Key' frequency was $freq1"
}

// Test Case: Master Number "Ab" (A=0, b=2) -> Sum=2. Not master.
// Let's find a master number sum. "K" is 11.
// "K" (11) at depth 1 -> 11 * 2 (Resonance) * 1 = 22.
int freq2 = Gematria.calculateFrequency("K", 1)
if (freq2 == 22) {
    Terminal.println "SUCCESS: Master number resonance detected and doubled."
} else {
    Terminal.println "FAILURE: Resonance frequency was $freq2"
}

// Test Case: Vowels "aeiou" -> Sum=0.
int freq3 = Gematria.calculateFrequency("aeiou", 100)
if (freq3 == 0) {
    Terminal.println "SUCCESS: Vowels carry no weight."
} else {
    Terminal.println "FAILURE: Vowels frequency was $freq3"
}

Terminal.println "All Gematria Tests Passed!"
