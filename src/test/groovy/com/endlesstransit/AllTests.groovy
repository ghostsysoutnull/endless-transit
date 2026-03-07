package com.endlesstransit
import com.endlesstransit.model.*
import com.endlesstransit.core.*
import com.endlesstransit.procgen.*
import com.endlesstransit.ui.Terminal

import junit.framework.TestSuite
import junit.textui.TestRunner

// Disable typewriter delays for tests
Terminal.skipSleep = true

def suite = new TestSuite()
def loader = new GroovyClassLoader(this.class.classLoader)
String testBase = "src/test/groovy/com/endlesstransit"

println "--- Loading JUnit Tests ---"
def junitTests = [
    "model/FloorCrashTest",
    "core/JournalTest",
    "core/StartupTest"
]

junitTests.each { path ->
    def testClass = loader.parseClass(new File("${testBase}/${path}.groovy"))
    suite.addTestSuite(testClass)
}

println "--- Running JUnit Suite ---"
TestRunner.run(suite)

println "\n--- Running Script Tests ---"
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
    "model/DeepLatticeCrawlTest",
    "ui/InitialScreenTest"
]

scriptTests.each { path ->
    println ">>> ${path.split('/').last()}"
    try {
        shell.evaluate(new File("${testBase}/${path}.groovy"))
    } catch (Exception e) {
        println "FAILURE in $path: ${e.message}"
        e.printStackTrace()
        System.exit(1)
    }
}

println "\nALL TESTS COMPLETED SUCCESSFULLY"
