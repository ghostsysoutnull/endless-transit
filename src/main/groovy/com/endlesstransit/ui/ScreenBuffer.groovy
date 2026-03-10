package com.endlesstransit.ui

import com.endlesstransit.procgen.LocusSeed
import groovy.transform.CompileStatic
import groovy.transform.Immutable

/**
 * ScreenBuffer: Holds an immutable snapshot of the terminal's state.
 */
@CompileStatic
@Immutable
class ScreenBuffer {
    List<String> lines
    long timestamp
    String locationPath
    LocusSeed masterLocus
    List<String> inputHistory
    String version = "1.0.0-VINCULUM"

    /**
     * Generates a metadata header for the screenshot file.
     */
    String getMetadataHeader() {
        return """[VINCULUM_SNAPSHOT_METADATA]
TIMESTAMP: ${new Date(timestamp).toString()}
LOCATION: $locationPath
SEED: ${masterLocus?.value}
HISTORY: ${inputHistory.join(", ")}
VERSION: $version
--------------------------------------------------"""
    }
}
