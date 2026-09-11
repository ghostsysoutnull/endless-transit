package com.endlesstransit.ui

import com.endlesstransit.core.Game
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.JournalManager
import com.endlesstransit.model.Apartment
import com.endlesstransit.model.Building
import com.endlesstransit.model.Container
import com.endlesstransit.model.Location
import com.endlesstransit.model.Room
import groovy.transform.CompileStatic
import java.util.regex.Pattern

/**
 * Phase 7-0 golden-frame harness.
 *
 * Renders every BridgeView public method into the virtual buffer, one frame at a time,
 * for a fixed seed. Used by BridgeViewGoldenFrameTest (compare) and by the one-off
 * golden generator script (write). Both go through captureAll() so they cannot drift.
 *
 * Frames are chosen to stay on the deterministic path: no abyssal locations, no
 * coherence < 40 on the adaptive bridge (glitchText is random), no coherence < 30 on the
 * lattice map. The only remaining non-determinism — the wall-clock-seeded spectrogram in
 * generateSystemTelemetry — is neutralised by mask().
 */
@CompileStatic
class HudFrameHarness {

    static final long GOLDEN_SEED = 12345L
    static final File GOLDEN_DIR = new File("src/test/groovy/com/endlesstransit/ui/golden")

    /** A run of cyan █ followed directly by reset: only the spectrogram emits this shape. */
    private static final Pattern SPECTROGRAM_BAR = Pattern.compile("\\[36m█+\\[0m")
    private static final String MASKED_BAR = "[36m█[0m"

    static String mask(String line) {
        return SPECTROGRAM_BAR.matcher(line).replaceAll(MASKED_BAR)
    }

    static List<String> mask(List<String> lines) {
        return lines.collect { String l -> mask(l) }
    }

    /**
     * Captures all golden frames for the given seed, in a fixed order.
     * Frame order is load-bearing: player state (steps, coherence, visited) accumulates.
     */
    /** Frames captured through BridgeView (`via`) and, where a single component produces the
     *  whole frame, the same frame rendered by that component alone (`direct`). */
    static class Frames {
        final Map<String, List<String>> via = new LinkedHashMap<>()
        final Map<String, List<String>> direct = new LinkedHashMap<>()
    }

    static Frames captureAll(long seed = GOLDEN_SEED) {
        JournalManager.reset()               // static ticker state leaks between tests
        Terminal.initialize(true, true)
        Game game = new Game(seed)
        BridgeView view = game.bridgeView
        Frames frames = new Frames()
        // Standalone components for the `direct` captures (7g-iii): same inputs, no BridgeView.
        HUDHeaderComponent hud = new HUDHeaderComponent()
        CompassComponent compassC = new CompassComponent()
        DirectiveMenuComponent menuC = new DirectiveMenuComponent()
        InventoryOverlayComponent overlayC = new InventoryOverlayComponent()
        LatticeTraceComponent traceC = new LatticeTraceComponent()
        LatticeMapComponent mapC = new LatticeMapComponent()

        // 1. Street — every public method
        Location street = game.currentLocation
        Map<String, Closure> streetOptions = street.getOptions(game)
        capture(frames, "01_street_render")            { view.render(street, game.player, streetOptions, game.masterLocus) }
        capture(frames, "02_street_renderBridgeHUD", { view.renderBridgeHUD(street, game.player) }, { hud.render(ctxOf(game, street), FrameGeometry.FRAME_WIDTH) })
        capture(frames, "03_street_renderAdaptive")    { view.renderAdaptiveBridge(street, game.player, game.masterLocus) }
        capture(frames, "04_street_renderCompass", { view.renderCompass(street, streetOptions) }, { compassC.render(ctxOf(game, street, streetOptions), FrameGeometry.FRAME_WIDTH) })
        capture(frames, "05_street_renderMenu")        { view.renderMenu(street, streetOptions) }
        capture(frames, "06_street_renderGlobalCtl", { view.renderGlobalControls() }, { menuC.renderGlobalControls() })
        capture(frames, "07_street_inventoryEmpty", { view.renderInventoryOverlay(game.player) }, { overlayC.render(ctxOf(game, street), FrameGeometry.FRAME_WIDTH) })
        capture(frames, "08_street_latticeTrace", { view.renderLatticeTrace(street) }, { traceC.render(ctxOf(game, street), FrameGeometry.FRAME_WIDTH) })
        capture(frames, "09_street_latticeMap", { view.renderLatticeMap(street, game.player) }, { mapC.render(ctxOf(game, street), FrameGeometry.FRAME_WIDTH) })
        capture(frames, "10_street_printLatticeDiag", { view.printLatticeTrace("[FINAL_NEURAL_TRACE_DIAGNOSTIC]", street, 0.0) }, { traceC.renderTrace(ctxOf(game, street), "[FINAL_NEURAL_TRACE_DIAGNOSTIC]", 0.0) })
        // 2. Ancestors — the universe and filament map branches of the right pane
        Location universe = street
        while (universe.parent != null) universe = universe.parent
        Location filament = street
        while (filament.parent != null && filament.parent != universe) filament = filament.parent
        capture(frames, "11_universe_renderAdaptive")  { view.renderAdaptiveBridge(universe, game.player, game.masterLocus) }
        capture(frames, "12_filament_renderAdaptive")  { view.renderAdaptiveBridge(filament, game.player, game.masterLocus) }

        // 3. Descend children[0]: Building, Floor, Corridor, Room — full render at each depth.
        //    Depth >= 8 routes the right pane to the telemetry spectrogram (masked).
        //    Entering the Apartment auto-enters its first Room, so the Apartment is rendered afterwards.
        Location walker = street
        int idx = 13
        while (!(walker instanceof Room)) {
            Container c = (Container) walker
            c.ensureChildrenPopulated()
            walker = c.children[0]
            game.enterLocation(walker)
            walker = game.currentLocation
            Location here = walker
            String name = String.format("%02d_%s_render", idx++, here.getClass().simpleName.toLowerCase())
            capture(frames, name) { view.render(here, game.player, here.getOptions(game), game.masterLocus) }
        }
        Location room = walker
        Location apartment = room.parent
        if (!(apartment instanceof Apartment)) {
            throw new IllegalStateException("Expected Room parent to be an Apartment, got ${apartment?.getClass()?.simpleName}")
        }
        capture(frames, "17_apartment_render") { view.render(apartment, game.player, apartment.getOptions(game), game.masterLocus) }

        // 4. Non-empty trace buffer — RECENT: preview and populated overlay
        game.player.inventory.add(new InventoryItem("Fragment A", 100))
        game.player.inventory.add(new InventoryItem("Fragment B", 211))
        game.player.inventory.add(new InventoryItem("Fragment C", 333))
        capture(frames, "18_room_items_renderBridgeHUD", { view.renderBridgeHUD(room, game.player) }, { hud.render(ctxOf(game, room), FrameGeometry.FRAME_WIDTH) })
        capture(frames, "19_room_items_inventoryOverlay") { view.renderInventoryOverlay(game.player) }

        // 5. Event ticker prefix mapping — two most recent events, newest first
        //    (location = null keeps ritual side effects out of the frame)
        JournalManager.logDiscovery("Golden Locus > Alpha Chamber")
        JournalManager.logCapture(new InventoryItem("Fragment B", 211))
        capture(frames, "20_room_ticker_loc_obj_renderBridgeHUD", { view.renderBridgeHUD(room, game.player) }, { hud.render(ctxOf(game, room), FrameGeometry.FRAME_WIDTH) })
        JournalManager.logSynthesis(new InventoryItem("Keystone Z", 444))
        capture(frames, "21_room_ticker_obj_syn_renderBridgeHUD", { view.renderBridgeHUD(room, game.player) }, { hud.render(ctxOf(game, room), FrameGeometry.FRAME_WIDTH) })
        // 6. Coherence bar colour thresholds — header only (adaptive bridge glitches below 40)
        game.player.coherence = 65
        capture(frames, "22_room_coherence65_renderBridgeHUD", { view.renderBridgeHUD(room, game.player) }, { hud.render(ctxOf(game, room), FrameGeometry.FRAME_WIDTH) })
        game.player.coherence = 25
        capture(frames, "23_room_coherence25_renderBridgeHUD", { view.renderBridgeHUD(room, game.player) }, { hud.render(ctxOf(game, room), FrameGeometry.FRAME_WIDTH) })
        // 7. Compass branches not reachable on the seed-12345 walk (7c-0 pre-check):
        //    D active with U reciprocal, colon-form label, 12-char truncation, B on the left.
        //    renderCompass reads only the location's vibe and the option keys, so synthetic options are exact.
        Map<String, Closure> compassA = ["u. Go Up": {}, "d. Go Down": {}, "f. Go forward": {}, "l. Leave: The Long Building Name": {}] as Map<String, Closure>
        Map<String, Closure> compassB = ["d. Go Down": {}, "b. Go back": {}] as Map<String, Closure>
        capture(frames, "24_street_compass_u_d_f_lcolon_renderCompass", { view.renderCompass(street, compassA) }, { compassC.render(ctxOf(game, street, compassA), FrameGeometry.FRAME_WIDTH) })
        capture(frames, "25_street_compass_d_b_renderCompass", { view.renderCompass(street, compassB) }, { compassC.render(ctxOf(game, street, compassB), FrameGeometry.FRAME_WIDTH) })
        // 8. Lattice screens at depth (7d-0 pre-check). Coherence restored to 100 first: the map
        //    adds random glitch plots below 30 (HK-001), and frame 23 left it at 25.
        game.player.coherence = 100
        Location building = room
        while (!(building instanceof Building)) building = building.parent
        capture(frames, "26_room_latticeTrace", { view.renderLatticeTrace(room) }, { traceC.render(ctxOf(game, room), FrameGeometry.FRAME_WIDTH) })
        capture(frames, "27_room_latticeMap_scanError", { view.renderLatticeMap(room, game.player) }, { mapC.render(ctxOf(game, room), FrameGeometry.FRAME_WIDTH) })
        capture(frames, "28_building_latticeMap", { view.renderLatticeMap(building, game.player) }, { mapC.render(ctxOf(game, building), FrameGeometry.FRAME_WIDTH) })
        // 9. Menu skip-list forms only produced above Street (7e-ii-0 pre-check), a no-dot key,
        //    a plain directive, and a three-entry nav line. renderMenu reads only the option keys.
        Map<String, Closure> menuOpts = ["Go to Alpha": {}, "Travel to Beta": {}, "Visit Gamma": {}, "Land on Delta": {},
            "Transition to Epsilon": {}, "Detect faint signal: Zeta": {}, "Pulse to Eta": {}, "Synchronize with Theta": {},
            "9. Plain Directive": {}, "t. Trace": {}, "s. Scan": {}, "b. Go back": {}] as Map<String, Closure>
        capture(frames, "29_street_menu_skiplist_renderMenu") { view.renderMenu(street, menuOpts) }

        return frames
    }

    private static void capture(Frames frames, String name, Closure body, Closure<List<String>> direct = null) {
        Terminal.virtualBuffer.clear()
        body.call()
        frames.via[name] = Terminal.virtualBuffer.getBuffer()
        if (direct != null) frames.direct[name] = direct.call()
    }

    private static RenderContext ctxOf(Game game, Location location, Map<String, Closure> options = null) {
        return new RenderContext(location, game.player, options, game.masterLocus)
    }

    static File goldenFile(String name) {
        return new File(GOLDEN_DIR, name + ".txt")
    }

    static List<String> readGolden(File file) {
        String text = file.getText("UTF-8")
        if (text.endsWith("\n")) text = text.substring(0, text.length() - 1)
        return text.split("\n", -1) as List<String>
    }

    static void writeGolden(File file, List<String> lines) {
        file.parentFile.mkdirs()
        file.setText(lines.join("\n") + "\n", "UTF-8")
    }
}
