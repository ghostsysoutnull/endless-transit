package com.endlesstransit.ui

import com.endlesstransit.core.*
import com.endlesstransit.model.*
import com.endlesstransit.procgen.*
import groovy.transform.CompileStatic

/**
 * TelemetryComponent: the right pane of the adaptive bridge. Routed by depth — up to 7 a
 * map (local MapBuffer projection, or the universe / filament variants by getMapType()),
 * from 8 the system telemetry block (spectrogram + decode logs). Abyssal locations get
 * static applied over the result. Spectrogram and static are seeded by FrameEntropy.
 *
 * The six generators moved verbatim from BridgeView in OOA Phase 7e. Builds lines; never
 * prints. The width argument is the pane width allotted by the compositor (38 at a
 * 130/90 split), not the frame width.
 */
@CompileStatic
class TelemetryComponent implements ViewComponent {

    @Override
    List<String> render(RenderContext ctx, int width) {
        Random r = FrameEntropy.forFrame(ctx)
        List<String> lines = generateRightPaneContent(ctx.location, ctx.player, width, ctx.masterLocus, r)
        if (ctx.location.isAbyssal()) {
            lines = applyAbyssalStatic(lines, r)
        }
        return lines
    }

    private List<String> applyAbyssalStatic(List<String> lines, Random r) {
        String[] staticChars = ["?", "!", "☠", "░", "▒", "▓", "X", "#"]
        return lines.collect { line ->
            if (line.contains("[NEURAL_MAP") || line.contains("[SYSTEM_TELEMETRY")) return line
            
            StringBuilder sb = new StringBuilder()
            line.each { String c ->
                if (c != ' ' && r.nextDouble() < 0.08) {
                    sb.append(Terminal.colorize(staticChars[r.nextInt(staticChars.size())], Terminal.RED))
                } else {
                    sb.append(c)
                }
            }
            return sb.toString()
        }
    }

    private List<String> generateRightPaneContent(Location currentLocation, Player player, int width, LocusSeed masterLocus, Random r) {
        int depth = currentLocation.getDepth()
        if (depth <= 7) {
            return generateMacroMap(currentLocation, width, masterLocus)
        } else {
            return generateSystemTelemetry(currentLocation, player, width, r)
        }
    }

    private List<String> generateMacroMap(Location currentLocation, int width, LocusSeed masterLocus) {
        String mapType = currentLocation.getMapType()
        if (mapType == "none" || !(currentLocation instanceof Container)) return [Terminal.dim("[MAP_OFFLINE]")]
        
        int mapWidth = width - 4
        int mapHeight = 12
        
        if (mapType == "universe") {
            return generateUniverseMap(mapWidth, mapHeight, masterLocus)
        } else if (mapType == "filament") {
            return generateFilamentMap(currentLocation, mapWidth, mapHeight)
        }

        Container container = (Container) currentLocation
        Terminal.MapBuffer buffer = new Terminal.MapBuffer(mapWidth, mapHeight)
        Map<List<Integer>, Location> latticeMap = container.getLocalLatticeMap(mapWidth, mapHeight)
        
        latticeMap.each { List<Integer> pos, Location loc ->
            String symbol = loc.getMapSymbol()
            String color = loc.isVisited() ? loc.getMapColor() : Terminal.dim(loc.getMapColor())
            buffer.plot(pos[0], pos[1], symbol, color)
        }
        
        List<String> lines = [" " + Terminal.colorize("[NEURAL_MAP: ${currentLocation.getClass().simpleName.toUpperCase()}]", Terminal.L_CYAN)]
        lines.addAll(buffer.render())
        lines << " " + Terminal.dim("▲ You | ■ Node | ░ Void")
        return lines
    }

    private List<String> generateUniverseMap(int w, int h, LocusSeed masterLocus) {
        Terminal.MapBuffer buffer = new Terminal.MapBuffer(w, h)
        int cx = (int)(w / 2)
        int cy = (int)(h / 2)
        buffer.plot(cx, cy, "∞", Terminal.CYAN)
        
        Random r = masterLocus.nextRandom()
        int numLines = 6
        for (int i = 0; i < numLines; i++) {
            double angle = (Math.PI * 2 / numLines) * i
            for (int d = 1; d < 5; d++) {
                int px = cx + (int)(Math.cos(angle) * d * 2)
                int py = cy + (int)(Math.sin(angle) * d)
                buffer.plot(px, py, "»", Terminal.dim(Terminal.WHITE))
            }
        }
        
        List<String> lines = [" " + Terminal.colorize("[UNIMATRIX_ROOT_TOPOLOGY]", Terminal.L_CYAN)]
        lines.addAll(buffer.render())
        lines << " " + Terminal.dim("∞ Core | » Cosmic Filament")
        return lines
    }

    private List<String> generateFilamentMap(Location currentLocation, int w, int h) {
        Terminal.MapBuffer buffer = new Terminal.MapBuffer(w, h)
        int y = (int)(h / 2)
        
        for (int x = 4; x < w - 4; x += 4) {
            buffer.plot(x, y, "○", Terminal.dim(Terminal.WHITE))
            if (x < w - 8) {
                buffer.plot(x+1, y, "·", Terminal.GREY)
                buffer.plot(x+2, y, "·", Terminal.GREY)
            }
        }
        buffer.plot(w - 8, y, "▲", Terminal.CYAN)
        
        List<String> lines = [" " + Terminal.colorize("[CONDUIT_TRACE: ${currentLocation.getName()}]", Terminal.L_CYAN)]
        lines.addAll(buffer.render())
        lines << " " + Terminal.dim("▲ You | ○ Sector | · Conduit")
        return lines
    }

    private List<String> generateSystemTelemetry(Location currentLocation, Player player, int width, Random r) {
        List<String> lines = []
        lines << " " + Terminal.colorize("[SYSTEM_TELEMETRY]", Terminal.L_CYAN)
        lines << " " + Terminal.dim("LATTICE_SYNC: [NOMINAL]")
        lines << ""
        lines << " " + Terminal.dim("[QUANTUM_SPECTROGRAM]")
        
        for (int i = 0; i < 5; i++) {
            int h = r.nextInt((int)(width / 4)) + 1
            lines << " " + Terminal.colorize("█" * h, Terminal.CYAN)
        }
        
        lines << ""
        lines << " " + Terminal.dim("[DECODE_LOGS]")
        lines << " > Trace: ${currentLocation.getLIP()}".toString()
        lines << " > Stable: ${player.resonantTracesCount} items".toString()
        return lines
    }
}
