package com.endlesstransit.core

import com.endlesstransit.ui.Terminal
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*

/**
 * HK-015 item 2 (Coverage Claim Protocol step 0): the buffer screen pays its +15 coherence for a
 * merge that happened, and for nothing else. Before the fix `m 1 1` and `m 1 99` were refused
 * silently by Player.mergeItems and paid anyway. Driven through QuantumBufferController, the only
 * production caller of mergeItems.
 */
class BufferMergeRewardContractTest {

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
    }

    private static Game gameWithTwoItems(List<String> script) {
        Game game = new Game(12345L, new MockInputSource(script))
        game.player.inventory.add(new InventoryItem("Fragment A", 100))
        game.player.inventory.add(new InventoryItem("Fragment B", 250))
        game.player.coherence = 40
        return game
    }

    // P2a — an item cannot be merged with itself, so nothing is paid
    @Test
    void mergeWithItself_paysNothing() {
        Game game = gameWithTwoItems(["m 1 1", "b"])
        game.inventoryController.open(game)
        assertEquals(40, game.player.coherence, "A refused merge must not restore coherence")
        assertEquals(2, game.player.inventory.size(), "A refused merge must leave the buffer alone")
    }

    // P2b — an index outside the buffer is refused, so nothing is paid
    @Test
    void mergeOutOfRange_paysNothing() {
        Game game = gameWithTwoItems(["m 1 99", "b"])
        game.inventoryController.open(game)
        assertEquals(40, game.player.coherence, "A refused merge must not restore coherence")
        assertEquals(2, game.player.inventory.size(), "A refused merge must leave the buffer alone")
    }

    // P2c — a real merge still pays +15
    @Test
    void realMerge_paysFifteen() {
        Game game = gameWithTwoItems(["m 1 2", "b"])
        game.inventoryController.open(game)
        assertEquals(55, game.player.coherence, "Synthesis restores 15 coherence")
        assertEquals(1, game.player.inventory.size(), "Two fragments become one hybrid")
    }
}
