package com.endlesstransit.ui

import groovy.transform.CompileStatic

/**
 * Decorator that distributes rendering to multiple sinks.
 */
@CompileStatic
class TeeSink implements RenderSink {
    private final List<RenderSink> sinks

    TeeSink(List<RenderSink> sinks) {
        this.sinks = sinks
    }

    @Override
    void print(String message) {
        sinks.each { it.print(message) }
    }

    @Override
    void println(String message) {
        sinks.each { it.println(message) }
    }
}
