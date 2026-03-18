package com.endlesstransit.core

import com.endlesstransit.model.*
import com.endlesstransit.ui.Terminal
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import static org.junit.jupiter.api.Assertions.*
import java.io.File

class TracePersistenceTest {

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
    }

    @Test
    void execute() {
        Terminal.println "Running End-to-End Trace Persistence Test..."

        long testSeed = 55555L
        Game game = new Game(testSeed)
        
        // 1. Simulate Session: Navigate to a Room dynamically
        Location walker = game.currentLocation
        Terminal.println "Navigating from: ${walker.getTypeName()} ${walker.getName()}"
        
        while (!(walker instanceof Room)) {
            if (walker instanceof Container) {
                Container c = (Container) walker
                c.ensureChildrenPopulated()
                if (c.children.isEmpty()) {
                    Terminal.println "  WARNING: Container ${c.getTypeName()} ${c.getName()} has no children!"
                    break
                }
                walker = c.children[0]
                Terminal.println "  -> Entering ${walker.getTypeName()} ${walker.getName()}"
            } else {
                break
            }
        }
        
        assertTrue(walker instanceof Room, "Failed to find a room to test persistence!")
        String targetLIP = walker.getLIP()
        Terminal.println "Target Room LIP: $targetLIP"
        game.enterLocation(walker)
        Location target = game.currentLocation
        
        String originalName = target.getName()
        String originalVibe = target.getVibe().toString()
        
        // 2. Modify State: Take an item
        InventoryItem testItem = new InventoryItem("Test Fragment", 1234)
        game.player.inventory.add(testItem)
        
        // 3. Modify World: Breach a building
        Building bldg = (Building) target.findAncestor(Building.class)
        assertNotNull(bldg, "Could not find ancestor Building")
        bldg.isBreached = true
        bldg.infusionCount = 10
        bldg.sampledFloors.add(0)
        
        // 4. SYNC
        SyncManager.sync(game)
        assertTrue(new File(SyncManager.SAVE_FILE).exists(), "Save file not created!")
        
        // 5. RESTORE into a fresh Game
        Game freshGame = new Game(1L) // Start with wrong seed to prove restoration works
        freshGame.restoreSession()
        
        // 6. VERIFY Stability
        assertEquals(testSeed, freshGame.masterLocus.value, "Master seed not restored!")
        assertEquals(targetLIP, freshGame.currentLocation.getLIP(), "Player location LIP mismatch!")
        assertEquals(originalName, freshGame.currentLocation.getName(), "Location name mismatch after restore!")
        assertEquals(originalVibe, freshGame.currentLocation.getVibe().toString(), "Environmental vibe mismatch after restore!")
        
        // 7. VERIFY Inventory
        assertTrue(freshGame.player.inventory.any { it.name == "Test Fragment" && it.frequency.value == 1234 }, "Inventory item lost!")
        
        // 8. VERIFY World Mutation (Breach)
        Building restoredBldg = (Building) freshGame.currentLocation.findAncestor(Building.class)
        assertTrue(restoredBldg.isBreached, "Building breach status lost!")
        assertEquals(10, restoredBldg.infusionCount, "Building ritual data lost!")
        
        // 9. VERIFY Footprints (Visited status)
        assertTrue(freshGame.currentLocation.isVisited(), "Visited status for current room not restored!")
        
        Terminal.println "SUCCESS: Trace Persistence verified. World and Player state perfectly reconstituted."
    }
}
