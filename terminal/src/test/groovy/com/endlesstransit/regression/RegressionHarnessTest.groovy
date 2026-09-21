package com.endlesstransit.regression

import com.endlesstransit.core.HeadlessRunner
import com.endlesstransit.procgen.LocusSeed
import com.endlesstransit.ui.VisualAssertionEngine
import com.endlesstransit.ui.ScreenBuffer
import groovy.json.JsonSlurper
import org.junit.jupiter.api.DynamicTest
import org.junit.jupiter.api.TestFactory
import static org.junit.jupiter.api.Assertions.*
import static org.junit.jupiter.api.DynamicTest.dynamicTest

class RegressionHarnessTest {

    @TestFactory
    List<DynamicTest> regressionSuite() {
        File snapshotDir = new File("src/test/groovy/com/endlesstransit/regression/snapshots")
        File[] snapshots = snapshotDir.listFiles { File f -> f.name.endsWith(".json") } ?: new File[0]

        return snapshots.collect { File file ->
            dynamicTest(file.name.replace(".json", "")) {
                def data = new JsonSlurper().parse(file)
                LocusSeed locus = new LocusSeed(data.seed as Long)
                List<String> history = data.history as List<String>

                ScreenBuffer result = HeadlessRunner.run(locus, history)
                assertNotNull(result, "Simulation failed for snapshot: ${file.name}")
                VisualAssertionEngine.verify(result) { isBoxedCorrectly() }
            }
        }
    }
}
