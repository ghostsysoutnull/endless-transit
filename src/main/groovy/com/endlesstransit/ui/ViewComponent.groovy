package com.endlesstransit.ui

import groovy.transform.CompileStatic

/**
 * ViewComponent: one rendering concern of the Bridge HUD.
 *
 * A component builds the lines for its region of the frame and returns them; it never
 * prints. BridgeView, as the compositor, decides order and sends the lines to the
 * Terminal. Keeping components side-effect free is what makes each one testable on its
 * own against a golden frame.
 *
 * Introduced in OOA Phase 7a-i. Implementations are extracted one concern per sub-phase
 * from 7b onwards.
 */
@CompileStatic
interface ViewComponent {

    /**
     * @param context the inputs for this frame — current location, player, navigation
     *                options, and the master locus
     * @param width   the frame width in terminal columns (BridgeView renders at 130)
     * @return the rendered lines, ANSI sequences included, one entry per terminal line
     */
    List<String> render(RenderContext context, int width)
}
