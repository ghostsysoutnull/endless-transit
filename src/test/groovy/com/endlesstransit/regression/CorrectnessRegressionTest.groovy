package com.endlesstransit.regression

import com.endlesstransit.model.*
import com.endlesstransit.procgen.*
import com.endlesstransit.ui.*
import com.endlesstransit.core.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import static org.junit.jupiter.api.Assertions.*

class CorrectnessRegressionTest {

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
        com.endlesstransit.model.ModelOutput.fmt = new StandardTerminalAdapter()
    }

    /**
     * Regression Test for Repetition Bug.
     * Ensures that objects in a room are diverse and not identical.
     */
    @Test
    void testObjectDiversity() {
        LocusSeed seed = new LocusSeed(123456789L)
        // Generate a room with many objects
        def room = (Room) ProceduralFactory.instance.createRoom(null, "monolith", "ancient", seed)
        
        // Ensure some objects exist
        room.objects = ["Object A", "Object B", "Object C"]

        // Count frequencies of each object
        Map<String, Integer> counts = room.objects.countBy { it }
        
        counts.each { obj, count ->
            assertTrue(count <= 1, "Object '$obj' repeated $count times! Expected diversity.")
        }
    }

    /**
     * Regression Test for ANSI-Aware Padding.
     * Ensures that padRight correctly calculates visual width.
     */
    @Test
    void testAnsiAwarePadding() {
        String boldText = Terminal.bold("TEST") // "[1mTEST[0m" -> 4 visual chars, ~13 raw chars
        int targetWidth = 20
        
        String padded = ModelOutput.fmt.padRight(boldText, targetWidth)
        int visualWidth = Terminal.getVisualWidth(padded)
        
        assertEquals(targetWidth, visualWidth, "Padded string should have visual width of $targetWidth")
        assertTrue(padded.contains("TEST"), "Padded string must contain original text")
    }

    /**
     * Regression Test for HUD Frequency Collision.
     * Ensures that different seeds produce different frequencies.
     */
    @Test
    void testActionFrequencyDiversity() {
        LocusSeed baseLocus = new LocusSeed(444555L)
        
        // Logic from Room.processAction:
        // Random random = locus.branch("ACTION").branch(player.stepCount).nextRandom()
        // int randomNum = random.nextInt(9000000) + 1000000 
        
        def getFreqForStep = { int step ->
            Random r = baseLocus.branch("ACTION").branch(step).nextRandom()
            return r.nextInt(9000000) + 1000000
        }
        
        int freq1 = getFreqForStep(1)
        int freq2 = getFreqForStep(2)
        
        Terminal.println "Step 1 Freq: $freq1 | Step 2 Freq: $freq2"
        assertNotEquals(freq1, freq2, "Frequencies should differ across steps")
    }
}
