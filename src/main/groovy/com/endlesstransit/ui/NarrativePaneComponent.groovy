package com.endlesstransit.ui

import com.endlesstransit.core.*
import com.endlesstransit.model.*
import groovy.transform.CompileStatic

/**
 * NarrativePaneComponent: the left pane of the adaptive bridge — the location description
 * (glitched below 40% coherence, seeded by FrameEntropy) wrapped to the pane width, then a blank line and the
 * location's extra content.
 *
 * Extracted verbatim from the first half of BridgeView.renderAdaptiveBridge() in OOA Phase
 * 7f-ii. Builds lines; never prints. The width argument is the pane width allotted by the
 * compositor (88 at a 130/90 split).
 */
@CompileStatic
class NarrativePaneComponent implements ViewComponent {

    @Override
    List<String> render(RenderContext ctx, int width) {
        Location currentLocation = ctx.location
        Player player = ctx.player
        int leftWidth = width
        String fullDesc = currentLocation.getDescription()
        if (player.coherence < 40) fullDesc = Terminal.glitchText(fullDesc, 0.1, FrameEntropy.forFrame(ctx))
        
        List<String> leftLines = []
        fullDesc.split("\n").each { leftLines.addAll(Terminal.wrapText(it, leftWidth)) }

        List<String> extra = currentLocation.getExtraContent(player, leftWidth)
        if (!extra.isEmpty()) {            leftLines << "" 
            leftLines.addAll(extra)
        }
        return leftLines
    }
}
