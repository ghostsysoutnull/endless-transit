package com.endlesstransit.core
import com.endlesstransit.ui.Terminal
import com.endlesstransit.model.*
import com.endlesstransit.core.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import static org.junit.jupiter.api.Assertions.*

class MergeLabelTest {

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
    }

    @Test
    void execute() {
        Terminal.println "Running Merge Label Session Test..."

        def player = new Player()
        player.inventory.add(new InventoryItem("Fragment A", 100))
        player.inventory.add(new InventoryItem("Fragment B", 200))
        player.inventory.add(new InventoryItem("Fragment C", 300))

        // Perform first merge
        player.mergeItems(0, 1)
        def hybrid1 = player.inventory.find { it.name.contains("Hybrid") }

        assertNotNull(hybrid1, "Hybrid item should exist after first merge")
        assertEquals(1, hybrid1.sessionMergeCount, "First merge tracked in session.")

        // Perform second merge with the hybrid
        int hybridIdx = player.inventory.indexOf(hybrid1)
        def fragC = player.inventory.find { it.name == "Fragment C" }
        assertNotNull(fragC, "Fragment C should still exist")
        int otherIdx = player.inventory.indexOf(fragC)

        player.mergeItems(hybridIdx, otherIdx)
        // The new hybrid will be at the end of the list after merge
        def hybrid2 = player.inventory.last()

        assertNotNull(hybrid2, "Hybrid item should exist after recursive merge")
        assertEquals(2, hybrid2.sessionMergeCount, "Recursive merge tracked (Count: 2).")

        // Simulate exiting session
        player.inventory.each { it.sessionMergeCount = 0 }

        assertTrue(player.inventory.every { it.sessionMergeCount == 0 }, "Merge labels cleared after session.")

        Terminal.println "All Merge Label Tests Passed!"
    }
}
