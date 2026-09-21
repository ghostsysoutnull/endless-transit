package com.endlesstransit.ui

import org.junit.jupiter.api.DynamicTest
import org.junit.jupiter.api.TestFactory
import static org.junit.jupiter.api.Assertions.*
import static org.junit.jupiter.api.DynamicTest.dynamicTest

/**
 * Phase 7g-iii: every ViewComponent is independently testable.
 *
 * For each single-component golden frame, the component is rendered on its own (no
 * BridgeView) with the same RenderContext the compositor would build, and must
 *   (a) honour the ViewComponent contract — no element contains an embedded newline — and
 *   (b) match the committed golden line for line.
 * Composite frames (full renders, adaptive bridge, menu with compass) have no single
 * component and are covered by BridgeViewGoldenFrameTest instead.
 */
class ViewComponentGoldenTest {

    @TestFactory
    List<DynamicTest> componentsRenderStandalone() {
        HudFrameHarness.Frames frames = HudFrameHarness.captureAll()
        assertFalse(frames.direct.isEmpty(), "Harness produced no direct component frames")

        return frames.direct.collect { String name, List<String> lines ->
            dynamicTest("standalone:" + name) {
                lines.eachWithIndex { String line, int i ->
                    assertFalse(line.contains("\n"),
                        "Frame '${name}' element ${i} contains an embedded newline — ViewComponent contract violated")
                }
                File golden = HudFrameHarness.goldenFile(name)
                assertTrue(golden.exists(), "Missing golden file ${golden.path}")
                List<String> expected = HudFrameHarness.readGolden(golden)
                List<String> got = lines
                assertEquals(expected, got, "Frame '${name}' rendered standalone differs from its golden")
            }
        }
    }
}
