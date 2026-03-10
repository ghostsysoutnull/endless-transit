package com.endlesstransit
import com.endlesstransit.model.*
import com.endlesstransit.core.*
import com.endlesstransit.procgen.*
import com.endlesstransit.ui.Terminal

import junit.framework.TestSuite
import junit.textui.TestRunner

// Disable typewriter delays and enable virtual buffer for tests
Terminal.initialize(true, true)

def suite = new TestSuite()
def loader = new GroovyClassLoader(this.class.classLoader)
String testBase = "src/test/groovy/com/endlesstransit"

Terminal.println "--- Loading JUnit Tests ---"
def junitTests = [
    "core/NewGameTest",
    "model/DeepLatticeCrawlTest",
    "model/FloorCrashTest",
    "core/JournalTest",
    "core/StartupTest",
    "core/GameMementoTest",
    "procgen/ProcgenVariabilityTest",
    "procgen/SeedScannerTest",
    "ReplayServiceTest"
]

junitTests.each { path ->
    def testClass = loader.parseClass(new File("${testBase}/${path}.groovy"))
    suite.addTestSuite(testClass)
}

Terminal.println "--- Running JUnit Suite ---"
def result = TestRunner.run(suite)
if (!result.wasSuccessful()) {
    Terminal.println "\nJUNIT SUITE FAILED"
    System.exit(1)
}

Terminal.println "\n--- Running Script Tests ---"
def shell = new GroovyShell(loader)
def scriptTests = [
    "ui/CyberTerminalTest",
    "procgen/GematriaTest",
    "core/InventoryObjectTest",
    "core/MergeLabelTest",
    "model/MnemonicReversalTest",
    "core/SingleObjectTakeTest",
    "core/TracePersistenceTest",
    "model/DeterministicUniverseTest",
    "model/StreetTest",
    "model/StructuralConsistencyTest",
    "procgen/SystemNameTest",
    "ui/InitialScreenTest",
    "regression/VisitedProgressTest"
]

scriptTests.each { path ->
    Terminal.println ">>> ${path.split('/').last()}"
    try {
        shell.evaluate(new File("${testBase}/${path}.groovy"))
    } catch (Exception e) {
        Terminal.println "FAILURE in $path: ${e.message}"
        e.printStackTrace()
        System.exit(1)
    }
}

Terminal.println "\nALL TESTS COMPLETED SUCCESSFULLY"
