package com.endlesstransit.core

import groovy.transform.CompileStatic

/**
 * A mock input source that provides pre-defined commands from a script.
 */
@CompileStatic
class MockInputSource implements InputSource {
    private final List<String> script
    private int currentIndex = 0

    MockInputSource(List<String> script) {
        this.script = script
    }

    @Override
    String readLine() {
        if (currentIndex < script.size()) {
            return script[currentIndex++]
        }
        return "quit" // Auto-quit when script ends
    }

    @Override
    void waitForEnter() {
        // No-op in headless mode
    }
}
