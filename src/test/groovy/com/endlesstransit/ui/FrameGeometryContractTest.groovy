package com.endlesstransit.ui

import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*

/**
 * HK-017 pin: a line exactly as wide as the pane the compositor allots must fit the split box
 * without being truncated. Before the fix LEFT_PANE_WIDTH was 88 while Terminal.splitBoxedLine
 * holds 86 on the left, so a wrapped narrative line of 87-88 columns lost its last word to "...".
 */
class FrameGeometryContractTest {

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
    }

    private static String strip(String s) {
        return s.replaceAll("\\[[0-9;]*[A-Za-z]", "")
    }

    @Test
    void leftPaneWidth_fitsSplitBoxWithoutTruncation() {
        String line = "x" * FrameGeometry.LEFT_PANE_WIDTH
        String boxed = strip(Terminal.splitBoxedLine(line, "", FrameGeometry.SPLIT_POINT, FrameGeometry.FRAME_WIDTH))
        assertFalse(boxed.contains("..."), "a ${FrameGeometry.LEFT_PANE_WIDTH}-column left line was truncated: ${boxed}")
        assertTrue(boxed.contains(line), "the full left line must survive the box")
    }

    // No right-pane twin: RIGHT_PANE_WIDTH (38) is one wider than splitBoxedLine keeps on the right (37),
    // but the telemetry pane never wraps and sizes its content at width - 4, so the limit is unreachable
    // there. Recorded in HK-017's closing note, not pinned.

    @Test
    void wrappedNarrativeLine_neverTruncated() {
        // One-letter words wrap to the widest line the pane allows (2n - 1 columns), so the first
        // wrapped line lands exactly on the limit: at LEFT_PANE_WIDTH 88 that was 87 columns → "...".
        String desc = ("x " * 120).trim()
        List<String> wrapped = Terminal.wrapText(desc, FrameGeometry.LEFT_PANE_WIDTH)
        assertTrue(Terminal.getVisualWidth(wrapped[0]) >= FrameGeometry.LEFT_PANE_WIDTH - 1, "first line must reach the limit")
        wrapped.each { String l ->
            String boxed = strip(Terminal.splitBoxedLine(l, "", FrameGeometry.SPLIT_POINT, FrameGeometry.FRAME_WIDTH))
            assertFalse(boxed.contains("..."), "wrapped line of ${Terminal.getVisualWidth(l)} columns was truncated: ${boxed}")
        }
    }
}
