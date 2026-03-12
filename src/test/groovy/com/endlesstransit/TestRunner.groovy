package com.endlesstransit

import org.junit.platform.launcher.core.LauncherFactory
import org.junit.platform.launcher.core.LauncherDiscoveryRequestBuilder
import org.junit.platform.launcher.listeners.SummaryGeneratingListener
import static org.junit.platform.engine.discovery.DiscoverySelectors.selectPackage
import com.endlesstransit.ui.Terminal
import com.endlesstransit.core.InputHandler
import com.endlesstransit.core.MockInputSource

/**
 * Modern Test Runner for Endless Transit.
 * Uses JUnit Platform Launcher to discover and execute all JUnit 5 tests.
 */
class TestRunner {
    static void main(String[] args) {
        // 1. Global Clinical Initialization
        Terminal.initialize(true, true)
        InputHandler.defaultSource = new MockInputSource(["\n", "n", "quit", "y"])

        Terminal.println Terminal.colorize("\n[VINCULUM_TEST_RUNNER_INITIATED]", Terminal.CYAN)

        // 2. Setup Launcher & Discovery
        def listener = new SummaryGeneratingListener()
        def request = LauncherDiscoveryRequestBuilder.request()
            .selectors(selectPackage("com.endlesstransit"))
            .build()

        def launcher = LauncherFactory.create()
        launcher.registerTestExecutionListeners(listener)

        // 3. Execute
        launcher.execute(request)

        // 4. Report Summary
        def summary = listener.getSummary()
        long total = summary.getTestsSucceededCount() + summary.getTestsFailedCount()
        
        Terminal.println ""
        Terminal.println "--------------------------------------------------------------------------------"
        Terminal.println "TEST EXECUTION SUMMARY"
        Terminal.println "--------------------------------------------------------------------------------"
        Terminal.println "TOTAL TESTS DISCOVERED : ${summary.getTestsFoundCount()}"
        Terminal.println "TESTS STARTED          : ${summary.getTestsStartedCount()}"
        Terminal.println "TESTS SUCCEEDED        : ${summary.getTestsSucceededCount()}"
        Terminal.println "TESTS FAILED           : ${summary.getTestsFailedCount()}"
        Terminal.println "TESTS ABORTED          : ${summary.getTestsAbortedCount()}"
        Terminal.println "--------------------------------------------------------------------------------"

        if (summary.getTestsFailedCount() > 0) {
            Terminal.println Terminal.colorize("\n[VINCULUM_TEST_SUITE_FAILED]", Terminal.RED)
            summary.failures.each { failure ->
                Terminal.println Terminal.colorize("  >> ${failure.testIdentifier.displayName}: ${failure.exception.message}", Terminal.RED)
            }
            System.exit(1)
        } else {
            Terminal.println Terminal.colorize("\n[VINCULUM_TEST_SUITE_SYNCHRONIZED_SUCCESSFULLY]", Terminal.GREEN)
        }
    }
}
