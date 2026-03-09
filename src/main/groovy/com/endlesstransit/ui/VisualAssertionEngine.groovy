package com.endlesstransit.ui

import groovy.transform.CompileStatic

/**
 * A DSL-based engine for performing visual assertions against a ScreenBuffer.
 */
@CompileStatic
class VisualAssertionEngine {
    private final ScreenBuffer buffer

    VisualAssertionEngine(ScreenBuffer buffer) {
        this.buffer = buffer
    }

    static VisualAssertionEngine expect(ScreenBuffer buffer) {
        return new VisualAssertionEngine(buffer)
    }

    void contains(String text) {
        boolean found = buffer.lines.any { it.contains(text) || Terminal.stripAnsi(it).contains(text) }
        if (!found) {
            throw new AssertionError("Visual check failed: Expected text '$text' not found in buffer.")
        }
    }

    void containsPattern(String regex) {
        boolean found = buffer.lines.any { it =~ regex || Terminal.stripAnsi(it) =~ regex }
        if (!found) {
            throw new AssertionError("Visual check failed: Expected pattern '$regex' not matched in buffer.")
        }
    }

    void isBoxedCorrectly() {
        int boxLines = 0
        buffer.lines.each { line ->
            String clean = Terminal.stripAnsi(line).trim()
            if (clean.startsWith(Terminal.BOX_V) && clean.endsWith(Terminal.BOX_V)) {
                boxLines++
            }
        }
        
        if (boxLines < 5) {
            Terminal.println "DEBUG: boxLines=$boxLines"
            buffer.lines.take(10).each { Terminal.println "DEBUG_LINE: |${Terminal.stripAnsi(it).trim()}|" }
            throw new AssertionError("Visual check failed: UI does not appear to be boxed correctly (only $boxLines boxed lines found).")
        }
    }

    void hasLayout(String identifier) {
        contains(identifier)
    }
}
