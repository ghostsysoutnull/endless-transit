package com.endlesstransit.ui

import com.endlesstransit.procgen.LocusSeed
import groovy.transform.CompileStatic
import groovy.transform.Immutable
import java.time.Instant
import java.time.LocalDateTime
import java.time.ZoneId
import java.time.ZonedDateTime
import java.time.format.DateTimeFormatter

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

    private static final DateTimeFormatter METADATA_FORMATTER = DateTimeFormatter.ofPattern("EEE MMM dd HH:mm:ss zzz yyyy")

    /**
     * Generates a metadata header for the screenshot file.
     */
    String getMetadataHeader() {
        String formattedTimestamp = ZonedDateTime.ofInstant(Instant.ofEpochMilli(timestamp), ZoneId.systemDefault())
                                    .format(METADATA_FORMATTER)
        return """[VINCULUM_SNAPSHOT_METADATA]
TIMESTAMP: $formattedTimestamp
LOCATION: $locationPath
SEED: ${masterLocus?.value}
HISTORY: ${inputHistory.join(", ")}
VERSION: $version
--------------------------------------------------"""
    }
}
