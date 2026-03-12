package com.endlesstransit.ui

import groovy.transform.CompileStatic

@CompileStatic
interface RenderSink {
    void print(String message)
    void println(String message)
    void flush()
}
