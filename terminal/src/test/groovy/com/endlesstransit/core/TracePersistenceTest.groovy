package com.endlesstransit.core

import com.endlesstransit.model.*
import com.endlesstransit.ui.Terminal
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import static org.junit.jupiter.api.Assertions.*

class TracePersistenceTest {

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
    }

    @Test
    void execute() {
        Terminal.println "Running End-to-End Trace Persistence Test..."

        // HK-012: never touch the player's save. Snapshot it, work on a scratch file, prove it afterwards.
        File real = new File(SyncManager.SAVE_FILE)
        boolean realExisted = real.exists()
        long realStamp = realExisted ? real.lastModified() : -1L
        long realSize = realExisted ? real.length() : -1L
        File scratch = File.createTempFile("endless-transit-", ".trace")
        try {
            runRoundTrip(scratch)
        } finally {
            scratch.delete()
        }
        assertEquals(realExisted, real.exists(), "The player's save file must not be created or deleted by this test")
        assertEquals(realStamp, realExisted ? real.lastModified() : -1L, "The player's save file must not be rewritten by this test")
        assertEquals(realSize, realExisted ? real.length() : -1L, "The player's save file must not be rewritten by this test")
    }

    private static void runRoundTrip(File scratch) {
        long testSeed = 55555L
        Game game = new Game(testSeed)
        game.saveFile = scratch.path
        
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
        assertTrue(scratch.exists() && scratch.length() > 0, "Scratch save file not written!")

        // 5. RESTORE into a fresh Game
        Game freshGame = new Game(1L) // Start with wrong seed to prove restoration works
        freshGame.saveFile = scratch.path
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
