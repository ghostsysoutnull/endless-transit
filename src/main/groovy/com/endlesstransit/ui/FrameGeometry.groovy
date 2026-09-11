package com.endlesstransit.ui

import groovy.transform.CompileStatic

/**
 * FrameGeometry: the Bridge frame's fixed layout, shared by the compositor (BridgeView) and
 * the components that draw split rows (HUDHeaderComponent). One definition; previously the
 * literals 130 and 90 were repeated at eight sites.
 *
 * Introduced in OOA Phase 7g. Constants only.
 */
@CompileStatic
final class FrameGeometry {

    /** Total frame width in terminal columns. */
    static final int FRAME_WIDTH = 130

    /** Column (1-indexed, for CHA) where the right pane of a split row begins. */
    static final int SPLIT_POINT = 90

    /** Content width of the left (narrative) pane of the adaptive bridge. */
    static final int LEFT_PANE_WIDTH = SPLIT_POINT - 2

    /** Content width of the right (telemetry) pane of the adaptive bridge. */
    static final int RIGHT_PANE_WIDTH = (FRAME_WIDTH - SPLIT_POINT) - 2

    private FrameGeometry() {}
}
