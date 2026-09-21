package com.endlesstransit.ui

import groovy.transform.CompileStatic

/**
 * Formatter that preserves raw ANSI escape sequences for terminal-perfect playback.
 */
@CompileStatic
class AnsiFormatter implements FormatStrategy {
    @Override
    String format(ScreenBuffer buffer) {
        StringBuilder sb = new StringBuilder()
        sb.append(buffer.getMetadataHeader()).append("\n\n")
        buffer.lines.each { sb.append(it).append("\n") }
        return sb.toString()
    }

    @Override
    String getExtension() { "ansi" }
}
