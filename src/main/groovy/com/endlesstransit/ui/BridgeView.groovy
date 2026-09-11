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
    private final DirectiveMenuComponent directives = new DirectiveMenuComponent()
    private final InventoryOverlayComponent inventoryOverlay = new InventoryOverlayComponent()

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
        RenderContext ctx = new RenderContext(null, player, null, null)
        inventoryOverlay.render(ctx, 130).each { String line -> Terminal.println(line) }
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
        RenderContext ctx = new RenderContext(currentLocation, null, options, null)
        directives.renderDirectives(ctx).each { String line -> Terminal.println(line) }
    }

    void renderGlobalControls() {
        directives.renderGlobalControls().each { String line -> Terminal.println(line) }
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
