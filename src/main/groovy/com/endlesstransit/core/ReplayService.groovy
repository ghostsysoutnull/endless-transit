package com.endlesstransit.core

import groovy.transform.CompileStatic
import java.io.File
import java.util.regex.Matcher
import java.util.regex.Pattern

/**
 * ReplayService: Promotes captured screenshots into automated regression tests.
 * Parses VINCULUM_SNAPSHOT_METADATA to generate deterministic simulations.
 */
@CompileStatic
class ReplayService {
    private static final String REGRESSION_PATH = "src/test/groovy/com/endlesstransit/regression"

    static class ReplayData {
        long seed
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
            data.seed = matcher.group(1).toLong()
            String historyStr = matcher.group(2).trim()
            data.history = historyStr ? historyStr.split(", ").toList() : []
            return data
        }
        return null
    }

    /**
     * Promotes a screenshot file to a permanent regression test.
     */
    static String promoteToTest(File screenshotFile, String testName = null) {
        ReplayData data = parseMetadata(screenshotFile)
        if (!data) return "ERROR: Could not parse metadata from ${screenshotFile.name}"

        String finalTestName = testName ?: "Regression_${screenshotFile.name.replaceAll("[^a-zA-Z0-9]", "_")}"
        String testContent = generateTestContent(finalTestName, data.seed, data.history)

        File dir = new File(REGRESSION_PATH)
        if (!dir.exists()) dir.mkdirs()

        File testFile = new File(dir, "${finalTestName}.groovy")
        testFile.text = testContent

        return "SUCCESS: Generated test at ${testFile.absolutePath}"
    }

    private static String generateTestContent(String testName, long seed, List<String> history) {
        String formattedHistory = history.collect { "\"$it\"" }.join(", ")
        
        return """package com.endlesstransit.regression

import com.endlesstransit.core.HeadlessRunner
import com.endlesstransit.ui.VisualAssertionEngine
import com.endlesstransit.ui.ScreenBuffer
import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*

/**
 * Automated regression test generated from VINCULUM snapshot.
 * Target Seed: $seed
 */
class $testName {

    @Test
    void execute() {
        long seed = ${seed}L
        List<String> script = [$formattedHistory]
        
        // Execute the simulation
        ScreenBuffer result = HeadlessRunner.run(seed, script)
        
        // Assertions
        assertNotNull(result, "Simulation failed to return a screen buffer")
        
        VisualAssertionEngine.verify(result) {
            isBoxedCorrectly()
            // Add custom assertions here based on the bug report
        }
    }
}
"""
    }
}
