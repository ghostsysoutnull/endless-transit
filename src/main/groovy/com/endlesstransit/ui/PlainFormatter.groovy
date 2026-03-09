package com.endlesstransit.ui

import groovy.transform.CompileStatic

/**
 * Formatter that strips all ANSI codes for human-readable bug reports and documentation.
 */
@CompileStatic
class PlainFormatter implements FormatStrategy {
    @Override
    String format(ScreenBuffer buffer) {
        StringBuilder sb = new StringBuilder()
        // Metadata header should be clean text already, but let's be safe
        sb.append(Terminal.stripAnsi(buffer.getMetadataHeader())).append("\n\n")
        buffer.lines.each { 
            sb.append(Terminal.stripAnsi(it)).append("\n") 
        }
        return sb.toString()
    }

    @Override
    String getExtension() { "txt" }
}
