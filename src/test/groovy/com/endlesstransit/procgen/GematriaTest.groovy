package com.endlesstransit.procgen
import com.endlesstransit.ui.Terminal
import com.endlesstransit.model.*
import com.endlesstransit.core.*
import com.endlesstransit.procgen.Gematria
import com.endlesstransit.procgen.NameGenerator
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import static org.junit.jupiter.api.Assertions.*

class GematriaTest {

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
    }

    @Test
    void execute() {
        Terminal.println "Running Gematria Mystical Logic Test..."

        // Test Case: "Key" (K=11, e=0, y=25) -> Sum=36. Depth=10. Frequency=360.
        int freq1 = Gematria.calculateFrequency("Key", 10)
        assertEquals(360, freq1, "'Key' frequency at depth 10 is 360.")

        // Test Case: Master Number "Ab" (A=0, b=2) -> Sum=2. Not master.
        // Let's find a master number sum. "K" is 11.
        // "K" (11) at depth 1 -> 11 * 2 (Resonance) * 1 = 22.
        int freq2 = Gematria.calculateFrequency("K", 1)
        assertEquals(22, freq2, "Master number resonance detected and doubled.")

        // Test Case: Vowels "aeiou" -> Sum=0.
        int freq3 = Gematria.calculateFrequency("aeiou", 100)
        assertEquals(0, freq3, "Vowels carry no weight.")

        Terminal.println "All Gematria Tests Passed!"
    }
}
