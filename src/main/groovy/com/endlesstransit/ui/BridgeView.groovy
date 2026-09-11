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
    private final LatticeMapComponent latticeMap = new LatticeMapComponent()
    private final TelemetryComponent telemetry = new TelemetryComponent()

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

        // 2. Get Right Content (TelemetryComponent applies abyssal static itself)
        List<String> rightLines = telemetry.render(new RenderContext(currentLocation, player, null, masterLocus), rightWidth)

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
        RenderContext ctx = new RenderContext(currentLocation, player, null, null)
        latticeMap.render(ctx, 130).each { String line -> Terminal.println(line) }
    }
}
