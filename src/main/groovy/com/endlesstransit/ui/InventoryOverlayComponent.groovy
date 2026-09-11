package com.endlesstransit.ui

import com.endlesstransit.core.*
import groovy.transform.CompileStatic

/**
 * InventoryOverlayComponent: the [QUANTUM_TRACE_BUFFER_SYNC...] list of captured fragments —
 * number, frequency, signal bar, phase, name and synthesis label per item — with the
 * SYNC_STATUS footer.
 *
 * Extracted verbatim from BridgeView.renderInventoryOverlay() in OOA Phase 7f. Builds lines;
 * never prints (the delegator flushes after printing, as the original did). Each item line
 * was four print fragments plus a println; here it is one element with the same bytes.
 * The single renderer of the trace buffer: the `i` command (QuantumBufferController) shows it
 * above the drop/merge commands; item numbers are the ones those commands take (HK-004).
 */
@CompileStatic
class InventoryOverlayComponent implements ViewComponent {

    @Override
    List<String> render(RenderContext ctx, int width) {
        Player player = ctx.player
        List<String> lines = []
        lines << ("").toString()
        String title = Terminal.colorize(" [QUANTUM_TRACE_BUFFER_SYNC...] ", Terminal.L_CYAN)
        lines << (title).toString()
        
        if (player.inventory.isEmpty()) {
            lines << (Terminal.dim("  (No spectral traces detected in local buffer) ")).toString()
        } else {
            // Show all items now that we can scroll
            player.inventory.eachWithIndex { InventoryItem item, int i ->
                String freqStr = String.format("%04d", item.frequency.value)

                int signalStrength = (int)((item.frequency.value % 100) / 10 + 1)
                String signalBar = ("█" * signalStrength) + ("░" * (10 - signalStrength))
                String phase = (item.frequency.value % 2 == 0) ? "STABLE" : "SHIFTING"
                String signalColor = (phase == "STABLE") ? Terminal.CYAN : Terminal.MAGENTA
                
                String mergeLabel = ""
                if (item.sessionMergeCount > 0) {
                    String label = item.sessionMergeCount > 1 ? "SYNTHESIS_x${item.sessionMergeCount}" : "NEW_SYNTHESIS"
                    mergeLabel = " " + Terminal.colorize("[" + label + "]", Terminal.GREEN)
                }
                lines << ("${Terminal.colorize((i + 1).toString(), Terminal.YELLOW)}. " + "${Terminal.dim(freqStr)}Hz " + Terminal.colorize(signalBar, signalColor) + "${Terminal.dim("[" + phase + "]")}" + " >> ${Terminal.bold(item.name)}$mergeLabel").toString()
            }
        }
        lines << (Terminal.dim(" ----------------------------------------------------------------------")).toString()
        lines << (Terminal.dim(" SYNC_STATUS: " + Terminal.colorize("NOMINAL", Terminal.GREEN))).toString()
        lines << ("").toString()
        return lines
    }
}
