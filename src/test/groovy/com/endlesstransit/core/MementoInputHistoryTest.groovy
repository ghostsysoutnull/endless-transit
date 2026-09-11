package com.endlesstransit.core

import com.endlesstransit.ui.Terminal
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import static org.junit.jupiter.api.Assertions.*

/**
 * Phase 6b-0 safety net: pins input-history behavior across a memento restore.
 *
 * Before Phase 6b, PersistenceService.restore() replaced the InputHandler instance
 * on GameState. Phase 6b injects one InputHandler into several services, so the
 * restore path must keep the live instance and restore history in place. This test
 * is green on both designs and fails if any service ends up holding a stale handler:
 *   1. history after restore equals the memento's recorded history
 *   2. the InputSource is the same object before and after restore
 *   3. the handler the facade exposes is the one that keeps recording afterwards,
 *      and a fresh memento reflects that live history
 *
 * See tasks/lessons/core.md — "Flight Recorder History Stability".
 */
class MementoInputHistoryTest {

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
    }

    @Test
    void inputHistorySurvivesRestoreOnTheLiveHandler() {
        long seed = 12345L
        MockInputSource mockInput = new MockInputSource(["01", "01", "01"])
        Game game = new Game(seed, mockInput)
        InputSource sourceBefore = game.inputHandler.source

        // Turn 1 → history ["01"]
        playOneTurn(game)
        GameMemento memento = game.createMemento()
        assertEquals(["01"], memento.inputHistory, "Memento must capture the history so far")

        // Turn 2 → history ["01", "01"]; diverges from the memento
        playOneTurn(game)
        assertEquals(["01", "01"], game.inputHandler.getHistory(), "Live history must advance past the memento")

        game.restore(memento)

        // 1. History is restored to the memento's snapshot
        assertEquals(memento.inputHistory, game.inputHandler.getHistory(),
            "History after restore must equal the memento's recorded history")

        // 2. The input source survives restore (the mock keeps feeding the game)
        assertSame(sourceBefore, game.inputHandler.source,
            "InputSource must be the same object after restore")

        // 3. The handler exposed by the facade is the one still recording
        playOneTurn(game)
        assertEquals(["01", "01"], game.inputHandler.getHistory(),
            "The live handler must keep recording after restore")
        assertEquals(game.inputHandler.getHistory(), game.createMemento().inputHistory,
            "A fresh memento must read from the same handler the facade exposes")
    }

    private static void playOneTurn(Game game) {
        game.processTurn()
        Map<String, Closure> options = game.currentLocation.getOptions(game)
        game.mapper.update(options)
        game.handleInput()
    }
}
