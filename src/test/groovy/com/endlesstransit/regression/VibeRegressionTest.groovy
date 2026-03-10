package com.endlesstransit.regression

import com.endlesstransit.model.*
import com.endlesstransit.procgen.*
import com.endlesstransit.ui.*
import com.endlesstransit.core.*
import groovy.test.GroovyTestCase

class VibeRegressionTest extends GroovyTestCase {

    /**
     * Regression Test for Repetition Bug.
     * Ensures that objects in a room are diverse and not identical.
     */
    void testObjectDiversity() {
        LocusSeed seed = new LocusSeed(123456789L)
        // Generate a room with many objects
        def room = ProceduralFactory.instance.createRoom(null, "monolith", "ancient", seed, "Standard")
        
        // Populate it multiple times with the same seed - it should be deterministic but internally diverse
        List<String> objects = room.objects
        
        // Count frequencies of each object
        Map<String, Integer> counts = objects.countBy { it }
        
        counts.each { obj, count ->
            assertTrue("Object '$obj' repeated $count times! Expected diversity.", count <= 1)
        }
    }

    /**
     * Regression Test for ANSI-Aware Padding.
     * Ensures that padRight correctly calculates visual width.
     */
    void testAnsiAwarePadding() {
        String boldText = Terminal.bold("TEST") // "[1mTEST[0m" -> 4 visual chars, ~13 raw chars
        int targetWidth = 20
        
        String padded = ModelOutput.fmt.padRight(boldText, targetWidth)
        int visualWidth = Terminal.getVisualWidth(padded)
        
        assertEquals("Padded string should have visual width of $targetWidth", targetWidth, visualWidth)
        assertTrue("Padded string must contain original text", padded.contains("TEST"))
    }

    /**
     * Regression Test for HUD Frequency Collision.
     * Ensures that the action seed advances with player steps.
     */
    void testActionFrequencyDiversity() {
        LocusSeed seed = new LocusSeed(444555L)
        Room room = (Room)ProceduralFactory.instance.createRoom(null, "monolith", "ancient", seed, "Standard")
        Player player = new Player()
        
        player.stepCount = 1
        room.processAction(player)
        int freq1 = player.inventory.last().frequency
        
        player.stepCount = 2
        room.processAction(player)
        int freq2 = player.inventory.last().frequency
        
        assertNotSame("Frequencies should differ across steps", freq1, freq2)
    }
}
