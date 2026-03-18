package com.endlesstransit.core
import com.endlesstransit.ui.Terminal
import com.endlesstransit.model.*
import com.endlesstransit.core.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import static org.junit.jupiter.api.Assertions.*

class InventoryObjectTest {

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
    }

    @Test
    void execute() {
        Terminal.println "Running Inventory Object Test..."

        def player = new Player()
        def item = new InventoryItem("Key", 360)
        player.inventory.add(item)

        assertEquals(1, player.inventory.size(), "Item added to inventory.")
        assertEquals("Key", player.inventory[0].name, "InventoryItem correctly stores name.")
        assertEquals(360, player.inventory[0].frequency.value, "InventoryItem correctly stores frequency.")

        // Test listing format
        Terminal.println "Visual check of inventory format:"
        player.listInventory()

        Terminal.println "Inventory Object Tests Passed!"
    }
}
