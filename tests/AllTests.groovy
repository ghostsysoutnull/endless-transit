package com.endlesstransit

import junit.framework.TestSuite
import junit.textui.TestRunner

// Disable typewriter delays for tests
Terminal.skipSleep = true

def suite = new TestSuite()
def loader = new GroovyClassLoader(this.class.classLoader)

println "--- Loading JUnit Tests ---"
[
    'FloorCrashTest',
    'JournalTest',
    'StartupTest'
].each { name ->
    def testClass = loader.parseClass(new File("tests/${name}.groovy"))
    suite.addTestSuite(testClass)
}

println "--- Running JUnit Suite ---"
TestRunner.run(suite)

println "\n--- Running Script Tests ---"
def shell = new GroovyShell(loader)
[
    'CyberTerminalTest',
    'GematriaTest',
    'InventoryObjectTest',
    'MergeLabelTest',
    'MnemonicReversalTest',
    'SingleObjectTakeTest',
    'StreetTest',
    'StructuralConsistencyTest',
    'SystemNameTest'
].each { name ->
    println ">>> $name"
    try {
        shell.evaluate(new File("tests/${name}.groovy"))
    } catch (Exception e) {
        println "FAILURE in $name: ${e.message}"
        e.printStackTrace()
        System.exit(1)
    }
}

println "\nALL TESTS COMPLETED SUCCESSFULLY"
