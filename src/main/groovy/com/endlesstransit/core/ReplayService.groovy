package com.endlesstransit.core

import groovy.transform.CompileStatic
import com.endlesstransit.procgen.LocusSeed
import java.io.File
import java.util.regex.Matcher
import java.util.regex.Pattern

/**
 * ReplayService: Promotes captured screenshots into automated regression tests.
 * Parses VINCULUM_SNAPSHOT_METADATA to generate deterministic simulations.
 */
@CompileStatic
class ReplayService {
    private static final String SNAPSHOT_PATH = "src/test/groovy/com/endlesstransit/regression/snapshots"

    static class ReplayData {
        LocusSeed locus
        List<String> history
        String lip
    }

    /**
     * Parses the metadata header from a screenshot file.
     */
    static ReplayData parseMetadata(File screenshotFile) {
        String content = screenshotFile.text
        Pattern pattern = Pattern.compile("(?s)\\[VINCULUM_SNAPSHOT_METADATA\\].*?SEED: (\\d+).*?HISTORY: (.*?)\\nVERSION", Pattern.DOTALL)
        Matcher matcher = pattern.matcher(content)

        if (matcher.find()) {
            ReplayData data = new ReplayData()
            data.locus = new LocusSeed(matcher.group(1).toLong())
            String historyStr = matcher.group(2).trim()
            data.history = historyStr ? historyStr.split(", ").toList() : []
            return data
        }
        return null
    }

    /**
     * Promotes a screenshot file to a regression snapshot (JSON).
     * The snapshot is picked up automatically by RegressionHarnessTest.
     */
    static String promoteToTest(File screenshotFile, String testName = null) {
        ReplayData data = parseMetadata(screenshotFile)
        if (!data) return "ERROR: Could not parse metadata from ${screenshotFile.name}"

        String finalTestName = testName ?: "Regression_${screenshotFile.name.replaceAll("[^a-zA-Z0-9]", "_")}"

        File dir = new File(SNAPSHOT_PATH)
        if (!dir.exists()) dir.mkdirs()

        String historyJson = data.history.collect { "\"$it\"" }.join(", ")
        File snapshotFile = new File(dir, "${finalTestName}.json")
        snapshotFile.text = """{
  "name": "${finalTestName}",
  "seed": ${data.locus.value},
  "history": [${historyJson}]
}
"""
        return "SUCCESS: Generated snapshot at ${snapshotFile.absolutePath}"
    }
}
