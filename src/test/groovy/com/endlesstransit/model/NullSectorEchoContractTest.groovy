package com.endlesstransit.model

import com.endlesstransit.core.Game
import com.endlesstransit.procgen.LocusSeed
import com.endlesstransit.ui.Terminal
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*

/**
 * HK-015 item 5: the Null Reach echo scan is reachable (its key is not the global scan's `s`) and
 * its roll comes from the locus and the step, like every other roll in the world.
 */
class NullSectorEchoContractTest {

    static final String SCAN = "e. Scan for spectral echoes"

    Game game

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
        game = new Game(12345L)
    }

    private NullSector sector(long seed) {
        NullSector s = new NullSector("Contract Void", new LocusSeed(seed))
        s.fmt = game.fmt
        s.factory = game.factory
        return s
    }

    /** Signal after each of three scans, one step apart — as NavigationCommand advances the step before the option runs. */
    private List<Integer> threeScans(NullSector s) {
        List<Integer> readings = []
        (1..3).each { int step ->
            game.player.stepCount = step
            s.getOptions(game)[SCAN].call()
            readings << s.signalStrength
        }
        return readings
    }

    // P5a — the option key is free of the global command table
    @Test
    void echoScan_isKeyedE_notS() {
        Set<String> keys = sector(7L).getOptions(game).keySet()
        assertTrue(keys.contains(SCAN), "Echo scan must be offered as 'e.', got: ${keys}")
        assertFalse(keys.any { it.startsWith("s.") || it.startsWith("S.") },
            "No Null Reach option may use the global scan key")
    }

    // P5b — same locus, same steps, same signal
    @Test
    void echoScan_isDeterministic() {
        assertEquals(threeScans(sector(7L)), threeScans(sector(7L)), "Same seed and steps must give the same signal")
    }

    // P5c — a scan raises the signal by 10..39, as before
    @Test
    void echoScan_gainStaysInRange() {
        NullSector s = sector(7L)
        game.player.stepCount = 1
        s.getOptions(game)[SCAN].call()
        assertTrue(s.signalStrength >= 10 && s.signalStrength <= 39, "First scan gain out of range: ${s.signalStrength}")
    }
}
