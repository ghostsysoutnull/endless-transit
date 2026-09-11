package com.endlesstransit.ui

import com.endlesstransit.model.*
import groovy.transform.CompileStatic

/**
 * CompassComponent: the five-line navigation rose — [U] label, ║, [L]/[B] left ═══[╬]═══ [F] right,
 * ║, [D] label — with reciprocal X markers when only one vertical direction is open.
 *
 * Extracted verbatim from BridgeView.renderCompass() / getCompassLabel() in OOA Phase 7c.
 * Builds lines; never prints. Reads only the location's vibe and the option keys; the
 * width argument is unused (the rose is fixed at columns 25/26).
 */
@CompileStatic
class CompassComponent implements ViewComponent {

    @Override
    List<String> render(RenderContext ctx, int width) {
        Location currentLocation = ctx.location
        Map options = ctx.options
        List<String> lines = []
        VibeCapsule vibe = currentLocation.getVibe()
        String accent = vibe?.atmosphericColor ?: Terminal.WHITE
        
        String lblU = getCompassLabel("u.", options)
        String lblD = getCompassLabel("d.", options)
        String lblF = getCompassLabel("f.", options)
        String lblB = getCompassLabel("b.", options)
        String lblL = getCompassLabel("l.", options)

        // Use a more robust way to get lastChoice: from the player's last move if possible
        // For now, we use a simple heuristic: if we can go Down, but not Up, we likely came from Up.
        String uMarker = "·"
        String dMarker = "·"
        
        if (lblU) uMarker = Terminal.bold("U")
        else if (lblD) uMarker = Terminal.colorize("X", Terminal.dim(Terminal.GREY)) // Reciprocal
        
        if (lblD) dMarker = Terminal.bold("D")
        else if (lblU) dMarker = Terminal.colorize("X", Terminal.dim(Terminal.GREY)) // Reciprocal

        String f = lblF ? Terminal.bold("F") : "·"
        String b = lblB ? Terminal.bold("B") : "·"
        String l = lblL ? Terminal.bold("L") : "·"

        lines << (" " * 25 + "[$uMarker] ${Terminal.dim(lblU)}").toString()
        lines << (" " * 26 + Terminal.colorize("║", accent)).toString()
        
        String leftLabel = lblL ?: lblB
        String leftIcon = lblL ? l : b
        String leftSide = leftLabel ? "[$leftIcon] ${Terminal.dim(leftLabel)} " : ""
        String center = "═══[╬]═══"
        String rightSide = " [$f] ${Terminal.dim(lblF)}"
        
        int leftLen = Terminal.getVisualWidth(leftSide)
        String leftPadding = " " * Math.max(0, 26 - leftLen - 4)
        lines << ("${leftPadding}${Terminal.colorize(leftSide, accent)}${Terminal.colorize(center, accent)}${Terminal.colorize(rightSide, accent)}").toString()
        
        lines << (" " * 26 + Terminal.colorize("║", accent)).toString()
        lines << (" " * 25 + "[$dMarker] ${Terminal.dim(lblD)}").toString()
        return lines
    }

    String getCompassLabel(String keyPrefix, Map options) {
        String entryKey = (String) options.keySet().find { Object kObj -> 
            String k = (String) kObj
            k.toLowerCase().startsWith(keyPrefix.toLowerCase()) 
        }
        if (entryKey == null) return ""
        
        String label = entryKey
        if (label.contains(": ")) {
            label = label.substring(label.indexOf(": ") + 2)
        } else if (label.contains(". ")) {
            label = label.substring(label.indexOf(". ") + 2)
        }
        
        if (label.length() > 15) label = label.substring(0, 12) + "..."
        return label
    }
}
