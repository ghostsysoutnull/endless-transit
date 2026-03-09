package com.endlesstransit.ui

import groovy.transform.CompileStatic

@CompileStatic
class ConsoleSink implements RenderSink {
    @Override
    void print(String message) {
        System.out.print(message)
        System.out.flush()
    }

    @Override
    void println(String message) {
        System.out.println(message)
    }
}
