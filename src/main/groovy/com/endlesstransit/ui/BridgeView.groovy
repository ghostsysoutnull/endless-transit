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
                String freqStr = String.format("%04d", item.frequency)
                
                int signalStrength = (int)((item.frequency % 100) / 10 + 1)
                String signalBar = ("█" * signalStrength) + ("░" * (10 - signalStrength))
                String phase = (item.frequency % 2 == 0) ? "STABLE" : "SHIFTING"
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
        int width = 130
        int splitPoint = 90
        VibeCapsule vibe = currentLocation.getVibe()
        boolean abyssal = currentLocation.isAbyssal()
        String accent = abyssal ? Terminal.GREY : (vibe?.atmosphericColor ?: Terminal.WHITE)
        
        Terminal.drawBoxTop(width, accent)
        
        // 1. Sparkline & Traversal
        String sparkline = getLatticeSparkline(currentLocation)
        String cohLabel = abyssal ? "INTEGRITY" : "COHERENCE"
        String globalStats = "PULSE_TRAVERSAL: ${player.stepCount} | $cohLabel: ${player.coherence}%"
        
        int statsWidth = Terminal.getVisualWidth(sparkline) + Terminal.getVisualWidth(globalStats) + 3
        String topPadding = " " * ((width - statsWidth) / 2).toInteger()
        String topRow = "${topPadding}${sparkline} | ${globalStats}"
        Terminal.drawBoxedLine(topRow, width, accent)
        
        // 2. Navigation Path
        String path = currentLocation.getPath()
        String prefix = abyssal ? "VOID_TRACE: " : "LOCUS_TRACE: "
        int maxPathWidth = width - 6
        if (Terminal.getVisualWidth(path) + prefix.length() > maxPathWidth) {
            path = "..." + path.substring(path.length() - (maxPathWidth - prefix.length() - 3))
        }
        Terminal.drawBoxedLine("$prefix$path", width, accent)
        
        Terminal.drawBoxSeparator(width, accent, "light")
        
        // 3. Local Diagnostic & System Status
        String identLabel = abyssal ? HUDLabels.VOID_IDENT : HUDLabels.LATTICE_IDENT
        String ident = "$identLabel: ${currentLocation.getTypeName()} >> ${currentLocation.getName()}"
        String sysDiag = currentLocation.getStatusSummary()
        Terminal.drawSplitBoxedLine(ident, sysDiag, splitPoint, width, accent)
        
        String hashLabel = abyssal ? HUDLabels.VOID_HASH : HUDLabels.LOCUS_HASH
        String depthLabel = abyssal ? HUDLabels.ABYSSAL_DEPTH : HUDLabels.HOP_DENSITY
        String coords = "$hashLabel: ${currentLocation.getCoordinates()} | $depthLabel: ${currentLocation.getDepth()}"
        String cohBar = cohLabel + ": " + renderCoherenceBar(player.coherence)
        Terminal.drawSplitBoxedLine(coords, cohBar, splitPoint, width, accent)
        
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
        Terminal.drawSplitBoxedLine(leftBottom, tickerTitle, splitPoint, width, accent)
        
        List<String> tickerLines = []
        recentEvents.each { tickerLines << it }
        if (abyssal && new Random().nextInt(10) < 3) {
            String[] voices = ["It is cold down here.", "We see you.", "Return to the surface.", "Bedrock approaching."]
            tickerLines.add(0, "[VOID] " + voices[new Random().nextInt(voices.length)])
        }

        for (int i = 0; i < 2; i++) {
            String event = i < tickerLines.size() ? tickerLines[i] : ""
            event = event.replace("[DISCOVERY] ", "LOC: ").replace("[CAPTURE] ", "OBJ: ").replace("[SYNTHESIS] ", "SYN: ")
            Terminal.drawSplitBoxedLine("", Terminal.dim(event), splitPoint, width, accent)
        }

        Terminal.drawBoxSeparator(width, accent, "light")
        
        // 4. Trace Buffer Preview
        String bufferInfo = "TRACE_BUFFER: ${player.inventory.size()}/16 FRAGMENTS"
        if (!player.inventory.isEmpty()) {
            List<InventoryItem> last3 = player.inventory.takeRight(3).reverse()
            List<Integer> freqs = last3.collect { it.frequency }
            bufferInfo += " | RECENT: ${freqs.join(', ')}Hz"
        }
        Terminal.drawBoxedLine(bufferInfo, width, accent)
        Terminal.drawBoxBottom(width, accent)
        
        Terminal.println " " + Terminal.colorize("»» SCANNING_LOCAL_TOPOLOGY...", accent)
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

    private String getCompassLabel(String keyPrefix, Map options) {
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

    void renderCompass(Location currentLocation, Map options) {
        VibeCapsule vibe = currentLocation.getVibe()
        String accent = vibe?.atmosphericColor ?: Terminal.WHITE
        
        String lblU = getCompassLabel("u.", options)
        String lblD = getCompassLabel("d.", options)
        String lblF = getCompassLabel("f.", options)
        String lblB = getCompassLabel("b.", options)
        String lblL = getCompassLabel("l.", options)

        // Get Last Choice for Reciprocal Trace (The "X" Marker)
        String last = Terminal.virtualBuffer != null ? "none" : "none" // Safe default
        // We can't easily get GameState here, but we can look at the history
        List<String> history = Terminal.virtualBuffer != null ? lastHudFrame : []
        
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

        Terminal.println " " * 25 + "[$uMarker] ${Terminal.dim(lblU)}"
        Terminal.println " " * 26 + Terminal.colorize("║", accent)
        
        String leftLabel = lblL ?: lblB
        String leftIcon = lblL ? l : b
        String leftSide = leftLabel ? "[$leftIcon] ${Terminal.dim(leftLabel)} " : ""
        String center = "═══[╬]═══"
        String rightSide = " [$f] ${Terminal.dim(lblF)}"
        
        int leftLen = Terminal.getVisualWidth(leftSide)
        String leftPadding = " " * Math.max(0, 26 - leftLen - 4)
        Terminal.println "${leftPadding}${Terminal.colorize(leftSide, accent)}${Terminal.colorize(center, accent)}${Terminal.colorize(rightSide, accent)}"
        
        Terminal.println " " * 26 + Terminal.colorize("║", accent)
        Terminal.println " " * 25 + "[$dMarker] ${Terminal.dim(lblD)}"
    }

    void renderLatticeTrace(Location currentLocation) {
        printLatticeTrace("[NEURAL_LATTICE_TRACE_INITIATED]", currentLocation, 0.0)
        Terminal.println ""
    }

    void printLatticeTrace(String title, Location currentLocation, double glitchIntensity = 0.0) {
        Map<String, String> icons = [
            "Universe": Terminal.ICON_UNI,
            "CosmicFilament": Terminal.ICON_FIL,
            "GalacticSector": Terminal.ICON_SEC,
            "NullSector": Terminal.ICON_SEC,
            "SolarSystem": Terminal.ICON_SYS,
            "Planet": Terminal.ICON_PLT,
            "Country": Terminal.ICON_CTR,
            "City": Terminal.ICON_CTY,
            "Street": Terminal.ICON_STR,
            "Building": Terminal.ICON_BLD,
            "Floor": Terminal.ICON_FLR,
            "Corridor": Terminal.ICON_COR,
            "Apartment": Terminal.ICON_APT,
            "Room": Terminal.ICON_ROM
        ]

        List<Location> hierarchy = []
        Location p = currentLocation
        while (p != null) {
            hierarchy << p
            p = p.parent
        }
        hierarchy = hierarchy.reverse()

        String header = Terminal.colorize(" $title ", title.contains("DIAGNOSTIC") ? Terminal.YELLOW : Terminal.L_CYAN)
        Terminal.println "\n" + header
        Terminal.println ""

        hierarchy.eachWithIndex { Location loc, int i ->
            String icon = icons[loc.getClass().simpleName] ?: "?"
            String name = loc.getName()
            String type = loc.getTypeLabel()
            String meta = loc.getLatticeMeta()

            String indent = ""
            String branch = ""
            if (i > 4) {
                indent = "             " + ("    " * (i - 5))
                branch = "└─ "
            }

            String depthStr = String.format("[%02d] ", i)
            String output = "${Terminal.dim(depthStr)} $indent$branch$icon $type : $name$meta"
            
            if (glitchIntensity > 0) {
                output = Terminal.glitchText(output, glitchIntensity)
            }

            if (loc == currentLocation) {
                String accent = loc.isAbyssal() ? Terminal.GREY : Terminal.L_CYAN
                Terminal.println Terminal.bold(" >> " + Terminal.colorize(Terminal.stripAnsi(output), accent))
            } else {
                Terminal.println "    " + output
            }
        }
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
