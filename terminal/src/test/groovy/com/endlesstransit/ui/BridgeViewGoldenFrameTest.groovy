package com.endlesstransit.ui

import org.junit.jupiter.api.DynamicTest
import org.junit.jupiter.api.TestFactory
import static org.junit.jupiter.api.Assertions.*
import static org.junit.jupiter.api.DynamicTest.dynamicTest

/**
 * Phase 7-0 safety net for the BridgeView decomposition.
 *
 * Every frame produced by HudFrameHarness.captureAll() must match its committed golden file
 * line for line (raw — every source of HUD noise is seeded since HK-001). Any change to what
 * BridgeView emits — a shifted column, a dropped separator, a re-ordered row — fails here
 * with the first differing line.
 *
 * This test never writes to src/. To regenerate goldens after an intentional visual change,
 * run the generator script (see docs/analysis/OOA_REFACTOR_PLAN.md, Phase 7-0) and commit.
 */
class BridgeViewGoldenFrameTest {

    @TestFactory
    List<DynamicTest> goldenFrames() {
        Map<String, List<String>> actual = HudFrameHarness.captureAll().via
        assertFalse(actual.isEmpty(), "Harness produced no frames")

        return actual.collect { String name, List<String> lines ->
            dynamicTest(name) {
                File golden = HudFrameHarness.goldenFile(name)
                assertTrue(golden.exists(),
                    "Missing golden file ${golden.path} — generate it with the Phase 7-0 script and commit it.")

                List<String> expected = HudFrameHarness.readGolden(golden)
                List<String> got = lines

                int limit = Math.min(expected.size(), got.size())
                for (int i = 0; i < limit; i++) {
                    if (expected[i] != got[i]) {
                        fail("""Frame '${name}' differs at line ${i} (0-based).
  expected (plain): |${Terminal.stripAnsi(expected[i])}|
  actual   (plain): |${Terminal.stripAnsi(got[i])}|
  expected (raw):   ${expected[i].inspect()}
  actual   (raw):   ${got[i].inspect()}""")
                    }
                }
                assertEquals(expected.size(), got.size(),
                    "Frame '${name}' line count differs (expected ${expected.size()}, got ${got.size()})")
            }
        }
    }
}
