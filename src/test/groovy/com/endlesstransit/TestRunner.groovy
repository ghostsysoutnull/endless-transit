package com.endlesstransit

import org.junit.platform.launcher.core.LauncherFactory
import org.junit.platform.launcher.core.LauncherDiscoveryRequestBuilder
import org.junit.platform.launcher.listeners.SummaryGeneratingListener
import org.junit.platform.launcher.TestExecutionListener
import org.junit.platform.launcher.TestIdentifier
import org.junit.platform.engine.TestExecutionResult
import static org.junit.platform.engine.discovery.DiscoverySelectors.*
import com.endlesstransit.ui.Terminal
import com.endlesstransit.core.InputHandler
import com.endlesstransit.core.MockInputSource

/**
 * Modern Test Runner for Endless Transit.
 * Uses JUnit Platform Launcher to discover and execute all JUnit 5 tests.
 */
class TestRunner {
    static void main(String[] args) {
        long globalStartTime = System.currentTimeMillis()
        // 1. Global Clinical Initialization
        // We default to true, true, true (Clinical Mode) to prevent context saturation.
        Terminal.initialize(true, true, true)
        InputHandler.defaultSource = new MockInputSource(["\n", "n", "quit", "y"])

        // 2. Setup Launcher & Discovery
        def summaryListener = new SummaryGeneratingListener()
        
        boolean quiet = args.contains("--quiet") || args.contains("-q")
        def startTimes = [:]
        def slowTests = []
        def testCount = 0

        // Custom listener for clinical progress
        def progressListener = new TestExecutionListener() {
            @Override
            void executionStarted(TestIdentifier testIdentifier) {
                if (testIdentifier.isTest()) {
                    startTimes[testIdentifier.uniqueId] = System.currentTimeMillis()
                    testCount++
                    
                    boolean wasClinical = Terminal.clinicalMode
                    Terminal.setClinical(false)
                    if (!quiet) {
                        Terminal.print(Terminal.colorize("  [VINC:TESTING] ", Terminal.CYAN))
                        Terminal.println(getCleanName(testIdentifier))
                    } else {
                        // Print the name on the same line using \r to show current progress
                        Terminal.print("\r  [VINC:RUNNING] ${getCleanName(testIdentifier)}".padRight(80))
                    }
                    if (wasClinical) Terminal.setClinical(true)
                }
            }
            
            @Override
            void executionFinished(TestIdentifier testIdentifier, TestExecutionResult testExecutionResult) {
                if (testIdentifier.isTest()) {
                    long duration = System.currentTimeMillis() - (startTimes[testIdentifier.uniqueId] ?: System.currentTimeMillis())
                    String name = getCleanName(testIdentifier)

                    if (duration > 500) {
                        slowTests << [name: name, duration: duration, id: testIdentifier.uniqueId]
                        
                        boolean wasClinical = Terminal.clinicalMode
                        Terminal.setClinical(false)
                        Terminal.print("\r") // Clear current line
                        Terminal.println(Terminal.colorize("  [VINC:SLOW] ", Terminal.CYAN) + "${name} (${duration} ms)")
                        if (wasClinical) Terminal.setClinical(true)
                    }

                    if (testExecutionResult.status == TestExecutionResult.Status.FAILED) {
                        boolean wasClinical = Terminal.clinicalMode
                        Terminal.setClinical(false)
                        Terminal.print("\r") // Clear current line
                        Terminal.println(Terminal.colorize("  [VINC:FAILURE] ${name}", Terminal.RED))
                        if (testExecutionResult.throwable.isPresent()) {
                            Terminal.println(Terminal.colorize("    >> ${testExecutionResult.throwable.get().message}", Terminal.RED))
                        }
                        if (wasClinical) Terminal.setClinical(true)
                    }
                }
            }

            private String getCleanName(TestIdentifier testIdentifier) {
                String name = testIdentifier.displayName
                if (name == "execute()" || name == "execute") {
                     def classMatch = (testIdentifier.uniqueId =~ /class:([^\]]+)/)
                     if (classMatch) {
                         String fullClass = classMatch[0][1]
                         name = "${fullClass.tokenize('.').last()} > ${name}"
                     }
                }
                return name
            }
        }

        def requestBuilder = LauncherDiscoveryRequestBuilder.request()

        // Filter out flags from args for target selection
        def targets = args.findAll { !it.startsWith("-") }

        if (!targets.isEmpty()) {
            Terminal.setClinical(false)
            Terminal.println Terminal.colorize("\n[VINCULUM_TARGETED_TEST_RUN: ${targets[0]}]", Terminal.CYAN)
            Terminal.setClinical(true)

            // Check if it's a class or package
            String target = targets[0]
            if (target.contains(".")) {
                requestBuilder.selectors(selectClass(target))
            } else {
                // Try selecting by class name in the default package or subpackages
                requestBuilder.selectors(selectPackage("com.endlesstransit"))
                requestBuilder.filters(includeClassNamePatterns(".*${target}.*"))
            }
        } else {
            if (!quiet) {
                Terminal.setClinical(false)
                Terminal.println Terminal.colorize("\n[VINCULUM_FULL_SUITE_INITIATED]", Terminal.CYAN)
                Terminal.setClinical(true)
            }
            requestBuilder.selectors(selectPackage("com.endlesstransit"))
        }

        def request = requestBuilder.build()
        def launcher = LauncherFactory.create()
        launcher.registerTestExecutionListeners(summaryListener, progressListener)

        // 3. Execute
        launcher.execute(request)

        // 4. Report Summary
        // Reactivate standard output for the report
        Terminal.setClinical(false)

        def summary = summaryListener.getSummary()

        long total = summary.getTestsSucceededCount() + summary.getTestsFailedCount()
        long totalDuration = System.currentTimeMillis() - globalStartTime
        
        Terminal.println ""
        Terminal.println "--------------------------------------------------------------------------------"
        Terminal.println "TEST EXECUTION SUMMARY"
        Terminal.println "--------------------------------------------------------------------------------"
        Terminal.println "TOTAL TESTS DISCOVERED : ${summary.getTestsFoundCount()}"
        Terminal.println "TESTS SUCCEEDED        : ${summary.getTestsSucceededCount()}"
        Terminal.println "TESTS FAILED           : ${summary.getTestsFailedCount()}"
        Terminal.println "TOTAL DURATION         : ${totalDuration} ms"
        Terminal.println "--------------------------------------------------------------------------------"

        if (!slowTests.isEmpty()) {
            Terminal.println Terminal.colorize("SLOW TESTS (> 500ms):", Terminal.CYAN)
            slowTests.sort { -it.duration }.each { slow ->
                Terminal.println "  - ${slow.name}: ${slow.duration} ms"
            }
            Terminal.println "--------------------------------------------------------------------------------"
        }

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
