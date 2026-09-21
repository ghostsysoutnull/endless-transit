package com.endlesstransit.ui

import groovy.transform.CompileStatic

/**
 * A sink that discards all output.
 */
@CompileStatic
class NullSink implements RenderSink {
    @Override
    void print(String message) {
        // Discard
    }

    @Override
    void println(String message) {
        // Discard
    }

    @Override
    void flush() {
        // Discard
    }
}
