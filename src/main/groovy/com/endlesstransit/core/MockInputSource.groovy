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
        
        // Safety sequence for headless termination:
        // 1. "quit" to initiate exit
        // 2. "y" to confirm quit
        // 3. "n" to skip sync for speed
        // 4. Then return "quit" indefinitely (though loop should break by then)
        int offset = currentIndex - script.size()
        currentIndex++
        
        switch (offset) {
            case 0: return "quit"
            case 1: return "y"
            case 2: return "n"
            default: return "quit"
        }
    }

    @Override
    void waitForEnter() {
        // No-op in headless mode
    }

    @Override
    boolean isInteractive() {
        return false
    }
}
