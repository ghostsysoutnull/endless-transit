package com.endlesstransit.ui

import groovy.transform.CompileStatic
import groovy.transform.Immutable

/**
 * An immutable snapshot of the terminal's state at a specific point in time.
 */
@CompileStatic
@Immutable
class ScreenBuffer {
    List<String> lines
    long timestamp
    String locationPath
    long masterSeed
    List<String> inputHistory
    String version = "1.0.0-VINCULUM"

    /**
     * Generates a metadata header for the screenshot file.
     */
    String getMetadataHeader() {
        return """----------------------------------------------------------------------
[VINCULUM_SNAPSHOT_METADATA]
TIMESTAMP: ${new Date(timestamp)}
LIP: $locationPath
SEED: $masterSeed
HISTORY: ${inputHistory.join(", ")}
VERSION: $version
----------------------------------------------------------------------"""
    }
}
