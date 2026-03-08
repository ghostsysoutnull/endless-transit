package com.endlesstransit.core

import com.endlesstransit.model.*
import com.endlesstransit.ui.Terminal

class TracePersistenceTest {
    static void main(String[] args) {
        testEndToEndPersistence()
    }

    static void testEndToEndPersistence() {
        println "Running End-to-End Trace Persistence Test..."
        Terminal.skipSleep = true
        
        long testSeed = 55555L
        Game game = new Game(testSeed)
        
        // 1. Simulate Session: Navigate to a Room dynamically
        Location walker = game.currentLocation
        println "Navigating from: ${walker.getTypeName()} ${walker.getName()}"
        
        while (!(walker instanceof Room)) {
            if (walker instanceof Container) {
                Container c = (Container) walker
                c.ensureChildrenPopulated()
                if (c.children.isEmpty()) {
                    println "  WARNING: Container ${c.getTypeName()} ${c.getName()} has no children!"
                    break
                }
                walker = c.children[0]
                println "  -> Entering ${walker.getTypeName()} ${walker.getName()}"
            } else {
                break
            }
        }
        
        assert walker instanceof Room : "Failed to find a room to test persistence!"
        String targetLIP = walker.getLIP()
        println "Target Room LIP: $targetLIP"
        game.enterLocation(walker)
        Location target = game.currentLocation
        
        String originalName = target.getName()
        String originalVibe = target.getVibe().toString()
        
        // 2. Modify State: Take an item
        InventoryItem testItem = new InventoryItem("Test Fragment", 1234)
        game.player.inventory.add(testItem)
        
        // 3. Modify World: Breach a building
        Building bldg = (Building) target.findAncestor(Building.class)
        bldg.isBreached = true
        bldg.infusionCount = 10
        bldg.sampledFloors.add(0)
        String buildingLIP = bldg.getLIP()
        
        // 4. SYNC
        SyncManager.sync(game)
        assert new File(SyncManager.SAVE_FILE).exists() : "Save file not created!"
        
        // 5. RESTORE into a fresh Game
        Game freshGame = new Game(1L) // Start with wrong seed to prove restoration works
        freshGame.restoreSession()
        
        // 6. VERIFY Stability
        assert freshGame.masterLocus.value == testSeed : "Master seed not restored!"
        assert freshGame.currentLocation.getLIP() == targetLIP : "Player location LIP mismatch!"
        assert freshGame.currentLocation.getName() == originalName : "Location name mismatch after restore!"
        assert freshGame.currentLocation.getVibe().toString() == originalVibe : "Environmental vibe mismatch after restore!"
        
        // 7. VERIFY Inventory
        assert freshGame.player.inventory.any { it.name == "Test Fragment" && it.frequency == 1234 } : "Inventory item lost!"
        
        // 8. VERIFY World Mutation (Breach)
        Building restoredBldg = (Building) freshGame.currentLocation.findAncestor(Building.class)
        assert restoredBldg.isBreached == true : "Building breach status lost!"
        assert restoredBldg.infusionCount == 10 : "Building ritual data lost!"
        
        // 9. VERIFY Footprints (Visited status)
        assert freshGame.currentLocation.isVisited() : "Visited status for current room not restored!"
        
        println "SUCCESS: Trace Persistence verified. World and Player state perfectly reconstituted."
    }
}
