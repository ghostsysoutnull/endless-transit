package com.endlesstransit.core

import com.endlesstransit.ui.Terminal
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*

/**
 * HK-004: the `i` buffer screen renders through InventoryOverlayComponent — numbered items
 * (the numbers drop/merge take), signal bars, synthesis labels, SYNC_STATUS — then the commands.
 */
class QuantumBufferScreenTest {

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
    }

    @Test
    void bufferScreen_showsNumberedOverlayThenCommands() {
        Game game = new Game(12345L, new MockInputSource(["b"]))
        game.player.inventory.add(new InventoryItem("Fragment A", 100))
        InventoryItem merged = new InventoryItem("Keystone Z", 444)
        merged.sessionMergeCount = 1
        game.player.inventory.add(merged)

        Terminal.virtualBuffer.clear()
        game.inventoryController.open(game)
        String screen = Terminal.virtualBuffer.getBuffer().collect { Terminal.stripAnsi(it) }.join("\n")

        assertTrue(screen.contains("[QUANTUM_TRACE_BUFFER_SYNC...]"), "overlay title")
        assertTrue(screen.contains("1. 0100Hz"), "first item numbered with frequency")
        assertTrue(screen.contains("2. 0444Hz"), "second item numbered")
        assertTrue(screen.contains("[NEW_SYNTHESIS]"), "synthesis label carried over from listInventory")
        assertTrue(screen.contains(">> Fragment A"), "item name")
        assertTrue(screen.contains("SYNC_STATUS: NOMINAL"), "overlay footer")
        assertTrue(screen.contains("d [num]: Drop item"), "drop/merge commands still follow the list")
        assertFalse(screen.contains("QUANTUM_TRACE_BUFFER_INTERACE"), "old header retired")
        assertEquals(0, merged.sessionMergeCount, "leaving the buffer clears session labels")
    }
}
