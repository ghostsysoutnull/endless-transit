package com.endlesstransit.ui

import groovy.transform.CompileStatic

/** The one physical sink. Everything else prints through a RenderSink, never System.out. */
@SuppressWarnings('SystemOutPrint')
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

    @Override
    void flush() {
        System.out.flush()
    }
}
