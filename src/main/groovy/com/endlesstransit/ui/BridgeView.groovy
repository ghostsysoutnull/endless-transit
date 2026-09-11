package com.endlesstransit.ui
import com.endlesstransit.ui.Terminal

import com.endlesstransit.model.*
import com.endlesstransit.core.*
import com.endlesstransit.procgen.*
import groovy.transform.CompileStatic

@CompileStatic
class BridgeView implements ScreenshotProvider {
    private Location lastLocation
    private LocusSeed lastLocus
    private List<String> lastHudFrame = []
    private final HUDHeaderComponent hudHeader = new HUDHeaderComponent()
    private final CompassComponent compass = new CompassComponent()
    private final LatticeTraceComponent latticeTrace = new LatticeTraceComponent()

    BridgeView() {
        ScreenshotRegistry.register(this)
    }

    @Override
    String getProviderName() { "BridgeView" }

    @Override
    ScreenBuffer capture(List<String> inputHistory) {
        return new ScreenBuffer(
            lines: new ArrayList<>(lastHudFrame),
            timestamp: System.currentTimeMillis(),
            locationPath: lastLocation ? lastLocation.getLIP() : "UNKNOWN",
            masterLocus: lastLocus,
            inputHistory: new ArrayList<>(inputHistory)
        )
    }

    void renderInventoryOverlay(Player player) {
        Terminal.println ""
        String title = Terminal.colorize(" [QUANTUM_TRACE_BUFFER_SYNC...] ", Terminal.L_CYAN)
        Terminal.println title
        
        if (player.inventory.isEmpty()) {
            Terminal.println Terminal.dim("  (No spectral traces detected in local buffer) ")
        } else {
            // Show all items now that we can scroll
            player.inventory.each { InventoryItem item ->
                String freqStr = String.format("%04d", item.frequency.value)

                int signalStrength = (int)((item.frequency.value % 100) / 10 + 1)
                String signalBar = ("█" * signalStrength) + ("░" * (10 - signalStrength))
                String phase = (item.frequency.value % 2 == 0) ? "STABLE" : "SHIFTING"
                String signalColor = (phase == "STABLE") ? Terminal.CYAN : Terminal.MAGENTA
                
                Terminal.print "  ${Terminal.dim(freqStr)}Hz "
                Terminal.print Terminal.colorize(signalBar, signalColor)
                Terminal.print " ${Terminal.dim("[" + phase + "]")}"
                Terminal.println " >> ${Terminal.bold(item.name)}"
            }
        }
        Terminal.println Terminal.dim(" ----------------------------------------------------------------------")
        Terminal.println Terminal.dim(" SYNC_STATUS: " + Terminal.colorize("NOMINAL", Terminal.GREEN))
        Terminal.println ""
        Terminal.flush()
    }

    void render(Location currentLocation, Player player, Map<String, Closure> options, LocusSeed masterLocus) {
        this.lastLocation = currentLocation
        this.lastLocus = masterLocus
        renderBridgeHUD(currentLocation, player)
        renderAdaptiveBridge(currentLocation, player, masterLocus)
        renderMenu(currentLocation, options)
        renderGlobalControls()

        // Capture the HUD frame from the virtual buffer
        if (Terminal.virtualBuffer != null) {
            this.lastHudFrame = Terminal.virtualBuffer.getBuffer()
        }
    }

    void renderMenu(Location currentLocation, Map<String, Closure> options) {
        renderCompass(currentLocation, options)
        Terminal.println("${Terminal.dim("EXECUTE_DIRECTIVE:")}")
        
        List<String> navOptions = []
        options.each { String label, Closure action ->
            String key = label.contains(".") ? label.split("\\.")[0].trim() : label
            
            // Skip items already shown in tables or summarized in Scan (Split Pane Composition)
            if (label.contains("Enter Building:")) return
            if (label.contains("Access:")) return
            if (label.contains("Go to ")) return
            if (label.contains("Travel to ")) return
            if (label.contains("Visit ")) return
            if (label.contains("Land on ")) return
            if (label.contains("Transition to ")) return
            if (label.contains("Detect faint signal:")) return
            if (label.contains("Pulse to ")) return
            if (label.contains("Synchronize with ")) return
            
            // If it's a single-char nav command, collect it for the bottom line
            if (key.length() == 1 && "udfblts".contains(key)) {
                navOptions << "[${Terminal.colorize(key, Terminal.YELLOW)}] ${label.split("\\. ")[1]}".toString()
                return
            }
            
            Terminal.println(label)
        }

        if (!navOptions.isEmpty()) {
            Terminal.println navOptions.join(Terminal.dim(" | "))
        }
    }

    void renderGlobalControls() {
        String buffer = "[${Terminal.colorize("i", Terminal.YELLOW)}] Buffer"
        String sync = "[${Terminal.colorize("sync", Terminal.CYAN)}] Save"
        String scan = "[${Terminal.colorize("s", Terminal.L_CYAN)}] Scan"
        String map = "[${Terminal.colorize("m", Terminal.WHITE)}] Map"
        String tree = "[${Terminal.colorize("ll", Terminal.WHITE)}] Tree"
        String snap = "[${Terminal.colorize("p", Terminal.GREEN)}] Snap"
        String quit = "[${Terminal.colorize("quit", Terminal.RED)}] Quit"
        
        Terminal.println "${buffer} | ${sync} | ${scan} | ${map} | ${tree} | ${snap} | ${quit}"
    }

    void renderBridgeHUD(Location currentLocation, Player player) {
        RenderContext ctx = new RenderContext(currentLocation, player, null, null)
        hudHeader.render(ctx, 130).each { String line -> Terminal.println(line) }
    }

    void renderAdaptiveBridge(Location currentLocation, Player player, LocusSeed masterLocus) {
        int splitColumn = 90
        int totalWidth = 130
        int leftWidth = splitColumn - 2
        int rightWidth = (totalWidth - splitColumn) - 2

        // 1. Get Left Content
        String fullDesc = currentLocation.getDescription()
        if (player.coherence < 40) fullDesc = Terminal.glitchText(fullDesc, 0.1)
        
        List<String> leftLines = []
        fullDesc.split("\n").each { leftLines.addAll(Terminal.wrapText(it, leftWidth)) }

        List<String> extra = currentLocation.getExtraContent(player, leftWidth)
        if (!extra.isEmpty()) {            leftLines << "" 
            leftLines.addAll(extra)
        }

        // 2. Get Right Content
        List<String> rightLines = generateRightPaneContent(currentLocation, player, rightWidth, masterLocus)
        
        // 3. Apply Abyssal Static
        if (currentLocation.isAbyssal()) {
            rightLines = applyAbyssalStatic(rightLines)
        }

        // 4. Render
        int maxLines = Math.max(leftLines.size(), rightLines.size())
        VibeCapsule vibe = currentLocation.getVibe()
        String accent = currentLocation.isAbyssal() ? Terminal.GREY : (vibe?.atmosphericColor ?: Terminal.WHITE)

        for (int i = 0; i < maxLines; i++) {
            String left = i < leftLines.size() ? leftLines[i] : ""
            String right = i < rightLines.size() ? rightLines[i] : ""
            Terminal.drawSplitBoxedLine(left, right, splitColumn, totalWidth, accent)
        }
        
        Terminal.drawBoxBottom(totalWidth, accent)
    }

    private List<String> applyAbyssalStatic(List<String> lines) {
        Random r = new Random()
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

    private List<String> generateRightPaneContent(Location currentLocation, Player player, int width, LocusSeed masterLocus) {
        int depth = currentLocation.getDepth()
        if (depth <= 7) {
            return generateMacroMap(currentLocation, width, masterLocus)
        } else {
            return generateSystemTelemetry(currentLocation, player, width)
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

    private List<String> generateSystemTelemetry(Location currentLocation, Player player, int width) {
        List<String> lines = []
        lines << " " + Terminal.colorize("[SYSTEM_TELEMETRY]", Terminal.L_CYAN)
        lines << " " + Terminal.dim("LATTICE_SYNC: [NOMINAL]")
        lines << ""
        lines << " " + Terminal.dim("[QUANTUM_SPECTROGRAM]")
        
        Random r = new Random((System.currentTimeMillis() / 1000) as long)
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

    void renderCompass(Location currentLocation, Map options) {
        RenderContext ctx = new RenderContext(currentLocation, null, (Map<String, Closure>) options, null)
        compass.render(ctx, 130).each { String line -> Terminal.println(line) }
    }

    void renderLatticeTrace(Location currentLocation) {
        RenderContext ctx = new RenderContext(currentLocation, null, null, null)
        latticeTrace.render(ctx, 130).each { String line -> Terminal.println(line) }
    }

    void printLatticeTrace(String title, Location currentLocation, double glitchIntensity = 0.0) {
        RenderContext ctx = new RenderContext(currentLocation, null, null, null)
        latticeTrace.renderTrace(ctx, title, glitchIntensity).each { String line -> Terminal.println(line) }
    }

    void renderLatticeMap(Location currentLocation, Player player) {
        if (!(currentLocation instanceof Container)) {
            Terminal.println Terminal.colorize("\n>>> SCAN_ERROR: Current location does not support spatial projection.", Terminal.RED)
            return
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
            Random r = new Random()
            int glitchCount = (int)((30 - player.coherence) / 2)
            for (int i = 0; i < glitchCount; i++) {
                buffer.plot(r.nextInt(mapWidth), r.nextInt(mapHeight), Terminal.glitchText("X", 1.0), Terminal.MAGENTA)
            }
        }
        
        Terminal.println "\n" + Terminal.colorize(" [NEURAL_LATTICE_PROJECTION] ", Terminal.L_CYAN)
        Terminal.println ""
        
        VibeCapsule vibe = currentLocation.getVibe()
        String accent = currentLocation.isAbyssal() ? Terminal.GREY : (vibe?.atmosphericColor ?: Terminal.WHITE)
        
        Terminal.drawBoxTop(mapWidth + 2, accent)
        buffer.render().each { line ->
            Terminal.println Terminal.colorize(Terminal.BOX_V, accent) + line + Terminal.colorize(Terminal.BOX_V, accent)
        }
        Terminal.drawBoxBottom(mapWidth + 2, accent)
        
        Terminal.println "\n" + Terminal.dim("SCAN_ORIGIN: ") + Terminal.bold(currentLocation.getName())
        Terminal.println Terminal.dim("LEGEND: ") + Terminal.dim("Visited: Bright | Unvisited: Dim | ") + Terminal.colorize("▲ You", Terminal.CYAN)
        Terminal.println ""
    }
}
