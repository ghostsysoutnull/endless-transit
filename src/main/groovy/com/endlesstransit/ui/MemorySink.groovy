package com.endlesstransit.ui

import groovy.transform.CompileStatic
import java.util.concurrent.CopyOnWriteArrayList

/**
 * A sink that stores rendered lines in memory.
 * Acts as the 'VirtualBuffer' for screenshots and diagnostics.
 */
@CompileStatic
class MemorySink implements RenderSink {
    private final List<String> buffer = new CopyOnWriteArrayList<>()
    private StringBuilder currentLine = new StringBuilder()

    @Override
    void print(String message) {
        if (message.contains("\n")) {
            String[] lines = message.split("\n", -1)
            for (int i = 0; i < lines.length - 1; i++) {
                currentLine.append(lines[i])
                flushCurrentLine()
            }
            currentLine.append(lines[lines.length - 1])
        } else {
            currentLine.append(message)
        }
    }

    @Override
    void println(String message) {
        print(message)
        flushCurrentLine()
    }

    @Override
    void flush() {
        // No-op for now. Line structure must be preserved.
    }

    private void flushCurrentLine() {
        buffer.add(currentLine.toString())
        currentLine = new StringBuilder()
        // Maintain a reasonable buffer size (e.g., last 1000 lines)
        if (buffer.size() > 1000) {
            buffer.remove(0)
        }
    }

    List<String> getBuffer() {
        return new ArrayList<>(buffer)
    }

    void clear() {
        buffer.clear()
        currentLine = new StringBuilder()
    }
}
