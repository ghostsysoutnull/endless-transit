package com.endlesstransit.model
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.JournalManager
import groovy.test.GroovyTestCase

class AbyssalRitualTest extends GroovyTestCase {
    void testRitualPriming() {
        def building = new Building("Test")
        building.maxFloors = 3
        
        assertFalse("New building should not be primed", building.isPrimed())
        
        building.notifySampled(0)
        building.notifySampled(1)
        building.notifySampled(2)
        assertEquals("Should have 3 sampled floors", 3, building.sampledFloors.size())
        
        building.infusionCount = 7
        assertTrue("Building should now be primed", building.isPrimed())
    }

    void testKeystoneGeneration() {
        def game = new Game()
        def bldg = new Building("Alpha")
        bldg.maxFloors = 1
        bldg.notifySampled(0)
        bldg.infusionCount = 7 // Prime it
        
        def floor = bldg.getFloor(0)
        game.player.inventory << new InventoryItem("A", 10)
        game.player.inventory << new InventoryItem("B", 20)
        
        game.player.mergeItems(0, 1, floor)
        
        def keystone = game.player.inventory.find { it.name == "Alpha Keystone" }
        assertNotNull("Keystone should be created in primed building", keystone)
        assertTrue("Item should be marked as keystone", keystone.isKeystone)
        assertEquals("Keystone should have 0Hz frequency", 0, keystone.frequency)
    }

    void testTerminologyShift() {
        def bldg = new Building("Deep")
        def layer = bldg.getFloor(-1)
        
        assertEquals("Layer", layer.getTypeName())
        assertEquals("Layer -0x1", layer.getName())
        assertTrue("Layer should be abyssal", layer.isAbyssal())
        
        def artery = layer.corridor
        assertEquals("Artery", artery.getTypeName())
        assertTrue("Artery should be abyssal", artery.isAbyssal())
        
        def crypt = artery.apartments[0]
        assertEquals("Crypt", crypt.getTypeName())
        
        def shard = crypt.rooms[0]
        assertEquals("Shard", shard.getTypeName())
        assertTrue("Shard name should be hex", shard.getName().startsWith("Shard 0x"))
    }
}
