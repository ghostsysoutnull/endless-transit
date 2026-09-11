package com.endlesstransit.ui

import com.endlesstransit.core.*
import com.endlesstransit.model.*
import groovy.transform.CompileStatic

/**
 * HUDHeaderComponent: the boxed header at the top of every Bridge frame — lattice sparkline
 * and traversal, locus path, ident/status, hash/coherence bar, radar and event ticker,
 * trace-buffer preview — followed by the SCANNING_LOCAL_TOPOLOGY trailer.
 *
 * Extracted verbatim from BridgeView.renderBridgeHUD() in OOA Phase 7b. Builds lines;
 * never prints. BridgeView composes and prints.
 */
@CompileStatic
class HUDHeaderComponent implements ViewComponent {

    @Override
    List<String> render(RenderContext ctx, int width) {
        Location currentLocation = ctx.location
        Player player = ctx.player
        List<String> lines = []
        VibeCapsule vibe = currentLocation.getVibe()
        boolean abyssal = currentLocation.isAbyssal()
        String accent = abyssal ? Terminal.GREY : (vibe?.atmosphericColor ?: Terminal.WHITE)
        
        lines << Terminal.boxTop(width, accent)
        
        // 1. Sparkline & Traversal
        String sparkline = getLatticeSparkline(currentLocation)
        String cohLabel = abyssal ? "INTEGRITY" : "COHERENCE"
        String globalStats = "PULSE_TRAVERSAL: ${player.stepCount} | $cohLabel: ${player.coherence}%"
        
        int statsWidth = Terminal.getVisualWidth(sparkline) + Terminal.getVisualWidth(globalStats) + 3
        String topPadding = " " * ((width - statsWidth) / 2).toInteger()
        String topRow = "${topPadding}${sparkline} | ${globalStats}"
        lines << Terminal.boxedLine(topRow, width, accent)
        
        // 2. Navigation Path
        String path = currentLocation.getPath()
        String prefix = abyssal ? "VOID_TRACE: " : "LOCUS_TRACE: "
        int maxPathWidth = width - 6
        if (Terminal.getVisualWidth(path) + prefix.length() > maxPathWidth) {
            path = "..." + path.substring(path.length() - (maxPathWidth - prefix.length() - 3))
        }
        lines << Terminal.boxedLine("$prefix$path", width, accent)
        
        lines << Terminal.boxSeparator(width, accent, "light")
        
        // 3. Local Diagnostic & System Status
        String identLabel = abyssal ? HUDLabels.VOID_IDENT : HUDLabels.LATTICE_IDENT
        String ident = "$identLabel: ${currentLocation.getTypeName()} >> ${currentLocation.getName()}"
        String sysDiag = currentLocation.getStatusSummary()
        lines << Terminal.splitBoxedLine(ident, sysDiag, FrameGeometry.SPLIT_POINT, width, accent)
        
        String hashLabel = abyssal ? HUDLabels.VOID_HASH : HUDLabels.LOCUS_HASH
        String depthLabel = abyssal ? HUDLabels.ABYSSAL_DEPTH : HUDLabels.HOP_DENSITY
        String coords = "$hashLabel: ${currentLocation.getCoordinates()} | $depthLabel: ${currentLocation.getDepth()}"
        String cohBar = cohLabel + ": " + renderCoherenceBar(player.coherence)
        lines << Terminal.splitBoxedLine(coords, cohBar, FrameGeometry.SPLIT_POINT, width, accent)
        
        // Structural Alignment & Radar
        int idx = currentLocation.getIndexInParent()
        int total = currentLocation.getTotalInParent()
        String leftBottom = ""
        if (total > 0) {
            String alignLabel = currentLocation.getIndexLabel()
            
            int radarLimit = 20
            String radar = Terminal.renderRadar(idx, Math.min(total, radarLimit), accent)
            if (total > radarLimit) radar += Terminal.dim(" ...")
            leftBottom = "$alignLabel: $idx / $total | $radar"
        }
        
        List<String> recentEvents = JournalManager.getRecentEvents(3).reverse()
        String tickerTitle = abyssal ? "EVENT_TICKER: [PRESSURE_HIGH]" : "EVENT_TICKER: [SYNC_STABLE]"
        lines << Terminal.splitBoxedLine(leftBottom, tickerTitle, FrameGeometry.SPLIT_POINT, width, accent)
        
        List<String> tickerLines = []
        recentEvents.each { tickerLines << it }
        Random r = FrameEntropy.forFrame(ctx)
        if (abyssal && r.nextInt(10) < 3) {
            String[] voices = ["It is cold down here.", "We see you.", "Return to the surface.", "Bedrock approaching."]
            tickerLines.add(0, "[VOID] " + voices[r.nextInt(voices.length)])
        }

        for (int i = 0; i < 2; i++) {
            String event = i < tickerLines.size() ? tickerLines[i] : ""
            event = event.replace("[DISCOVERY] ", "LOC: ").replace("[CAPTURE] ", "OBJ: ").replace("[SYNTHESIS] ", "SYN: ")
            lines << Terminal.splitBoxedLine("", Terminal.dim(event), FrameGeometry.SPLIT_POINT, width, accent)
        }

        lines << Terminal.boxSeparator(width, accent, "light")
        
        // 4. Trace Buffer Preview
        String bufferInfo = "TRACE_BUFFER: ${player.inventory.size()}/16 FRAGMENTS"
        if (!player.inventory.isEmpty()) {
            List<InventoryItem> last3 = player.inventory.takeRight(3).reverse()
            List<Integer> freqs = last3.collect { it.frequency.value }
            bufferInfo += " | RECENT: ${freqs.join(', ')}Hz"
        }
        lines << Terminal.boxedLine(bufferInfo, width, accent)
        lines << Terminal.boxBottom(width, accent)
        
        lines << (" " + Terminal.colorize("»» SCANNING_LOCAL_TOPOLOGY...", accent))
        return lines
    }

    String getLatticeSparkline(Location currentLocation) {
        VibeCapsule vibe = currentLocation.getVibe()
        boolean abyssal = currentLocation.isAbyssal()
        String accent = abyssal ? Terminal.GREY : (vibe?.atmosphericColor ?: Terminal.L_CYAN)

        List<String> line = []
        Location p = currentLocation
        while (p != null) {
            String label = p.getSparklineLabel()
            if (p == currentLocation) {
                line << Terminal.colorize("[$label]", accent)
            } else {
                line << Terminal.dim(label)
            }
            p = p.parent
        }
        
        int maxLatticeWidth = 50
        while (line.size() > 2 && Terminal.getVisualWidth("LATTICE: " + line.reverse().join(" ") + " ...") > maxLatticeWidth) {
            line.removeAt(0)
        }
        
        String sparkline = line.reverse().join(" ")
        if (Terminal.getVisualWidth("LATTICE: " + sparkline) > maxLatticeWidth) {
             return "LATTICE: ... " + sparkline
        }
        
        return "LATTICE: " + sparkline
    }

    String renderCoherenceBar(int coherence) {
        int length = 10
        int filled = (coherence * length / 100).toInteger()
        String bar = "█" * filled + "░" * (length - filled)
        String color = Terminal.GREEN
        if (coherence < 30) color = Terminal.RED
        else if (coherence < 70) color = Terminal.YELLOW
        
        return Terminal.colorize(bar, color)
    }
}
