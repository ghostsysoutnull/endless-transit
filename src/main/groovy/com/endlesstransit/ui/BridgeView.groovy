package com.endlesstransit.ui
import com.endlesstransit.ui.Terminal

import com.endlesstransit.model.*
import com.endlesstransit.core.*
import com.endlesstransit.procgen.*
import groovy.transform.CompileStatic

/**
 * BridgeView: the frame compositor. Owns one instance of each ViewComponent, asks each for
 * its lines, and prints them through the Terminal in frame order. Its only layout logic is
 * the adaptive-bridge split, which zips the narrative and telemetry panes into boxed rows.
 *
 * The render* / print* methods are the public API used by RenderingCoordinator,
 * SessionRecap and the tests; each delegates to exactly one component.
 * Decomposed in OOA Phase 7 (579 → ~120 lines); geometry lives in FrameGeometry.
 */
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
    private final NarrativePaneComponent narrative = new NarrativePaneComponent()

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

    /** Prints a component's lines, one println per element, in order. */
    private static void emit(List<String> lines) {
        lines.each { String line -> Terminal.println(line) }
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

    void renderBridgeHUD(Location currentLocation, Player player) {
        emit(hudHeader.render(new RenderContext(currentLocation, player, null, null), FrameGeometry.FRAME_WIDTH))
    }

    void renderAdaptiveBridge(Location currentLocation, Player player, LocusSeed masterLocus) {
        RenderContext ctx = new RenderContext(currentLocation, player, null, masterLocus)
        List<String> leftLines = narrative.render(ctx, FrameGeometry.LEFT_PANE_WIDTH)
        List<String> rightLines = telemetry.render(ctx, FrameGeometry.RIGHT_PANE_WIDTH)

        int maxLines = Math.max(leftLines.size(), rightLines.size())
        VibeCapsule vibe = currentLocation.getVibe()
        String accent = currentLocation.isAbyssal() ? Terminal.GREY : (vibe?.atmosphericColor ?: Terminal.WHITE)

        for (int i = 0; i < maxLines; i++) {
            String left = i < leftLines.size() ? leftLines[i] : ""
            String right = i < rightLines.size() ? rightLines[i] : ""
            Terminal.drawSplitBoxedLine(left, right, FrameGeometry.SPLIT_POINT, FrameGeometry.FRAME_WIDTH, accent)
        }

        Terminal.drawBoxBottom(FrameGeometry.FRAME_WIDTH, accent)
    }

    void renderCompass(Location currentLocation, Map options) {
        emit(compass.render(new RenderContext(currentLocation, null, (Map<String, Closure>) options, null), FrameGeometry.FRAME_WIDTH))
    }

    void renderMenu(Location currentLocation, Map<String, Closure> options) {
        renderCompass(currentLocation, options)
        emit(directives.renderDirectives(new RenderContext(currentLocation, null, options, null)))
    }

    void renderGlobalControls() {
        emit(directives.renderGlobalControls())
    }

    void renderInventoryOverlay(Player player) {
        emit(inventoryOverlay.render(new RenderContext(null, player, null, null), FrameGeometry.FRAME_WIDTH))
        Terminal.flush()
    }

    void renderLatticeTrace(Location currentLocation) {
        emit(latticeTrace.render(new RenderContext(currentLocation, null, null, null), FrameGeometry.FRAME_WIDTH))
    }

    void printLatticeTrace(String title, Location currentLocation, double glitchIntensity = 0.0) {
        emit(latticeTrace.renderTrace(new RenderContext(currentLocation, null, null, null), title, glitchIntensity))
    }

    void renderLatticeMap(Location currentLocation, Player player) {
        emit(latticeMap.render(new RenderContext(currentLocation, player, null, null), FrameGeometry.FRAME_WIDTH))
    }
}
