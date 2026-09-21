package com.endlesstransit.core

import com.endlesstransit.ui.Terminal
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import static org.junit.jupiter.api.Assertions.*

/**
 * Phase 6c-0 safety net: pins that every access path to NavigationEngine hits
 * the same instance. Before this test nothing asserted that a recorded choice
 * becomes the lastChoice the next turn reads, or that boundary reversal fires.
 * A wiring mistake producing two engines would silently break repeat-on-enter
 * and auto-reversal with the suite green.
 *
 * Three paths are tied together:
 *   - NavigationCommand writes (recordChoice after a resolved action)
 *   - TurnProcessor reads and writes (lastChoice, checkBoundaryReversal)
 *   - Game facade reads (game.navEngine)
 */
class NavigationEngineWiringTest {

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
    }

    @Test
    void navigationCommandRecordIsVisibleThroughFacade() {
        Game game = new Game(12345L, new MockInputSource(["01"]))
        assertNull(game.navEngine.lastChoice, "No choice recorded before the first turn")

        game.processTurn()
        game.mapper.update(game.currentLocation.getOptions(game))
        game.handleInput()

        assertEquals("01", game.navEngine.lastChoice,
            "The choice recorded by NavigationCommand must be the one the facade exposes")
    }

    @Test
    void boundaryReversalInTurnProcessorIsVisibleThroughFacade() {
        Game game = new Game(12345L, new MockInputSource([""]))
        boolean reversed = false

        // Simulate: player was moving forward ("f"), but this location only offers "b".
        game.navEngine.recordChoice("f")
        game.mapper.update(["b. Go back": { reversed = true }] as Map<String, Closure>)

        // Empty input → TurnProcessor asks the engine for a boundary reversal.
        game.handleInput()

        assertTrue(reversed, "Reversal must dispatch the opposite-direction action")
        assertEquals("b", game.navEngine.lastChoice,
            "The reversal recorded inside TurnProcessor must be the one the facade exposes")
    }
}
