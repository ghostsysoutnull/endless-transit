package com.endlesstransit.ui

import com.endlesstransit.core.*
import com.endlesstransit.model.*
import groovy.transform.CompileStatic

/**
 * LatticeMapComponent: the `m` screen — a 30×15 MapBuffer projection of the current
 * container's children in a box, with origin and legend; or a SCAN_ERROR line when the
 * location is a leaf. Below 30% coherence it plots glitch marks seeded by FrameEntropy.
 *
 * Extracted verbatim from BridgeView.renderLatticeMap() in OOA Phase 7d-ii. Builds lines;
 * never prints. The width argument is unused (fixed 30×15).
 */
@CompileStatic
class LatticeMapComponent implements ViewComponent {

    @Override
    List<String> render(RenderContext ctx, int width) {
        Location currentLocation = ctx.location
        Player player = ctx.player
        List<String> lines = []
        if (!(currentLocation instanceof Container)) {
            // Byte-preserving split of colorize("\n>>> ...", RED): the colour code preceded the
            // newline in the original output, and golden 27 pins that byte order.
            lines << Terminal.RED
            lines << (">>> SCAN_ERROR: Current location does not support spatial projection." + Terminal.RESET)
            return lines
        }
        
        Container container = (Container) currentLocation
        int mapWidth = 30
        int mapHeight = 15
        Terminal.MapBuffer buffer = new Terminal.MapBuffer(mapWidth, mapHeight)
        
        Map<List<Integer>, Location> latticeMap = container.getLocalLatticeMap(mapWidth, mapHeight)
        latticeMap.each { List<Integer> pos, Location loc ->
            String symbol = loc.getMapSymbol()
            String color = loc.isVisited() ? loc.getMapColor() : Terminal.dim(loc.getMapColor())
            buffer.plot(pos[0], pos[1], symbol, color)
        }
        
        if (player.coherence < 30) {
            Random r = FrameEntropy.forFrame(ctx)
            int glitchCount = (int)((30 - player.coherence) / 2)
            for (int i = 0; i < glitchCount; i++) {
                buffer.plot(r.nextInt(mapWidth), r.nextInt(mapHeight), Terminal.glitchText("X", 1.0, r), Terminal.MAGENTA)
            }
        }
        
        lines << ""
        lines << Terminal.colorize(" [NEURAL_LATTICE_PROJECTION] ", Terminal.L_CYAN)
        lines << ("").toString()
        
        VibeCapsule vibe = currentLocation.getVibe()
        String accent = currentLocation.isAbyssal() ? Terminal.GREY : (vibe?.atmosphericColor ?: Terminal.WHITE)
        
        lines << Terminal.boxTop(mapWidth + 2, accent)
        buffer.render().each { line ->
            lines << (Terminal.colorize(Terminal.BOX_V, accent) + line + Terminal.colorize(Terminal.BOX_V, accent)).toString()
        }
        lines << Terminal.boxBottom(mapWidth + 2, accent)
        
        lines << ""
        lines << (Terminal.dim("SCAN_ORIGIN: ") + Terminal.bold(currentLocation.getName()))
        lines << (Terminal.dim("LEGEND: ") + Terminal.dim("Visited: Bright | Unvisited: Dim | ") + Terminal.colorize("▲ You", Terminal.CYAN)).toString()
        lines << ("").toString()
        return lines
    }
}
