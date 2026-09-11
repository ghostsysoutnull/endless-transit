package com.endlesstransit.ui

import com.endlesstransit.core.Game
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.JournalManager
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
    static Map<String, List<String>> captureAll(long seed = GOLDEN_SEED) {
        JournalManager.reset()               // static ticker state leaks between tests
        Terminal.initialize(true, true)
        Game game = new Game(seed)
        BridgeView view = game.bridgeView
        Map<String, List<String>> frames = new LinkedHashMap<>()

        // 1. Street — every public method
        Location street = game.currentLocation
        Map<String, Closure> streetOptions = street.getOptions(game)
        capture(frames, "01_street_render")            { view.render(street, game.player, streetOptions, game.masterLocus) }
        capture(frames, "02_street_renderBridgeHUD")   { view.renderBridgeHUD(street, game.player) }
        capture(frames, "03_street_renderAdaptive")    { view.renderAdaptiveBridge(street, game.player, game.masterLocus) }
        capture(frames, "04_street_renderCompass")     { view.renderCompass(street, streetOptions) }
        capture(frames, "05_street_renderMenu")        { view.renderMenu(street, streetOptions) }
        capture(frames, "06_street_renderGlobalCtl")   { view.renderGlobalControls() }
        capture(frames, "07_street_inventoryEmpty")    { view.renderInventoryOverlay(game.player) }
        capture(frames, "08_street_latticeTrace")      { view.renderLatticeTrace(street) }
        capture(frames, "09_street_latticeMap")        { view.renderLatticeMap(street, game.player) }
        capture(frames, "10_street_printLatticeDiag")  { view.printLatticeTrace("[FINAL_NEURAL_TRACE_DIAGNOSTIC]", street, 0.0) }

        // 2. Ancestors — the universe and filament map branches of the right pane
        Location universe = street
        while (universe.parent != null) universe = universe.parent
        Location filament = street
        while (filament.parent != null && filament.parent != universe) filament = filament.parent
        capture(frames, "11_universe_renderAdaptive")  { view.renderAdaptiveBridge(universe, game.player, game.masterLocus) }
        capture(frames, "12_filament_renderAdaptive")  { view.renderAdaptiveBridge(filament, game.player, game.masterLocus) }

        // 3. Descend children[0] to Building, then to Room — telemetry pane (masked)
        Location walker = street
        boolean buildingCaptured = false
        while (!(walker instanceof Room)) {
            Container c = (Container) walker
            c.ensureChildrenPopulated()
            walker = c.children[0]
            game.enterLocation(walker)
            walker = game.currentLocation
            if (!buildingCaptured) {
                Location building = walker
                capture(frames, "13_building_render") { view.render(building, game.player, building.getOptions(game), game.masterLocus) }
                buildingCaptured = true
            }
        }
        Location room = walker
        capture(frames, "14_room_render") { view.render(room, game.player, room.getOptions(game), game.masterLocus) }

        // 4. Non-empty trace buffer — RECENT: preview and populated overlay
        game.player.inventory.add(new InventoryItem("Fragment A", 100))
        game.player.inventory.add(new InventoryItem("Fragment B", 211))
        game.player.inventory.add(new InventoryItem("Fragment C", 333))
        capture(frames, "15_room_items_renderBridgeHUD") { view.renderBridgeHUD(room, game.player) }
        capture(frames, "16_room_items_inventoryOverlay") { view.renderInventoryOverlay(game.player) }

        // 5. Coherence bar colour thresholds — header only (adaptive bridge glitches below 40)
        game.player.coherence = 65
        capture(frames, "17_room_coherence65_renderBridgeHUD") { view.renderBridgeHUD(room, game.player) }
        game.player.coherence = 25
        capture(frames, "18_room_coherence25_renderBridgeHUD") { view.renderBridgeHUD(room, game.player) }

        return frames
    }

    private static void capture(Map<String, List<String>> frames, String name, Closure body) {
        Terminal.virtualBuffer.clear()
        body.call()
        frames[name] = Terminal.virtualBuffer.getBuffer()
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
