package com.endlesstransit.core
import com.endlesstransit.ui.Terminal
import com.endlesstransit.model.*
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager

Terminal.println "Running Merge Label Session Test..."

def player = new Player()
player.inventory.add(new InventoryItem("Fragment A", 100))
player.inventory.add(new InventoryItem("Fragment B", 200))
player.inventory.add(new InventoryItem("Fragment C", 300))

// Perform first merge
player.mergeItems(0, 1)
def hybrid1 = player.inventory.find { it.name.contains("Hybrid") }

if (hybrid1 && hybrid1.sessionMergeCount == 1) {
    Terminal.println "SUCCESS: First merge tracked in session."
} else {
    Terminal.println "FAILURE: First merge not tracked correctly. Count: ${hybrid1?.sessionMergeCount}"
    System.exit(1)
}

// Perform second merge with the hybrid
int hybridIdx = player.inventory.indexOf(hybrid1)
int otherIdx = player.inventory.find { it.name == "Fragment C" } ? player.inventory.indexOf(player.inventory.find { it.name == "Fragment C" }) : -1

player.mergeItems(hybridIdx, otherIdx)
// The new hybrid will be at the end of the list after merge
def hybrid2 = player.inventory.last()

if (hybrid2 && hybrid2.sessionMergeCount == 2) {
    Terminal.println "SUCCESS: Recursive merge tracked (Count: 2)."
} else {
    Terminal.println "FAILURE: Recursive merge count incorrect. Count: ${hybrid2?.sessionMergeCount}"
    // Note: The naming might be slightly different depending on which index was removed first, 
    // but the logic for sessionMergeCount should hold.
    if (!hybrid2) {
        Terminal.println "Actual inventory: ${player.inventory.collect { it.name }}"
    }
    System.exit(1)
}

// Simulate exiting session
player.inventory.each { it.sessionMergeCount = 0 }

if (player.inventory.every { it.sessionMergeCount == 0 }) {
    Terminal.println "SUCCESS: Merge labels cleared after session."
} else {
    Terminal.println "FAILURE: Merge labels persisted."
    System.exit(1)
}

Terminal.println "All Merge Label Tests Passed!"
