package com.endlesstransit.ui

import com.endlesstransit.model.ModelOutput
import com.endlesstransit.model.OutputFormatter
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import static org.junit.jupiter.api.Assertions.*

class DisplayAdapterTest {
    private MemorySink sink

    @BeforeEach
    void setUp() {
        sink = new MemorySink()
        Terminal.sink = sink
    }

    @Test
    void testStandardAdapterInvariants() {
        OutputFormatter adapter = new StandardTerminalAdapter()
        ModelOutput.fmt = adapter

        String label = "LOCUS_INDEX"
        int width = 20
        String padded = adapter.padRight(label, width)
        
        // Invariant: Visual width must match target width
        assertEquals(width, Terminal.getVisualWidth(padded))
        
        // Invariant: ANSI codes don't affect visual width
        String colored = adapter.colorize(label, "CYAN")
        String coloredPadded = adapter.padRight(colored, width)
        assertEquals(width, Terminal.getVisualWidth(coloredPadded))
    }

    @Test
    void testGlitchedAdapterLayoutIntegrity() {
        OutputFormatter standard = new StandardTerminalAdapter()
        // Use a high glitch chance to ensure the logic is exercised
        OutputFormatter glitched = new GlitchedTerminalAdapter(standard, 1.0) 
        
        String label = "NEURAL_LINK_STABILITY_CRITICAL"
        int targetWidth = 50
        
        // Invariant: Even if glitched, the visual width MUST be preserved
        String padded = glitched.padRight(label, targetWidth)
        assertEquals(targetWidth, Terminal.getVisualWidth(padded), "Glitched adapter must maintain alignment")
    }

    @Test
    void testGlitchedOutputVariation() {
        OutputFormatter standard = new StandardTerminalAdapter()
        OutputFormatter glitched = new GlitchedTerminalAdapter(standard, 1.0)
        
        String input = "DEEP_LATTICE_TRACE_SYNCHRONIZED"
        
        // Setup capture
        sink.clear()
        glitched.println(input)
        
        String output = sink.getBuffer().first()
        String cleanOutput = Terminal.stripAnsi(output).trim()
        
        // Assertion: Output should be different from input due to glitching
        assertNotSame(input, cleanOutput, "Glitched output should modify the text")
        assertTrue(input != cleanOutput, "Output should be different")
        assertEquals(input.length(), cleanOutput.length(), "Length should remain stable")
    }
}
