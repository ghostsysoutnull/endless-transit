package com.endlesstransit.model
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.JournalManager
import com.endlesstransit.procgen.LocusSeed
import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*

class AbyssalRitualTest {
    @Test
    void testRitualPriming() {
        def building = new Building(new LocusSeed(0L))
        building.name = "Test"
        building.maxFloors = 3
        
        assertFalse(building.isPrimed(), "New building should not be primed")
        
        building.notifySampled(0)
        building.notifySampled(1)
        building.notifySampled(2)
        assertEquals(3, building.sampledFloors.size(), "Should have 3 sampled floors")
        
        building.infusionCount = 7
        assertTrue(building.isPrimed(), "Building should now be primed")
    }

    @Test
    void testKeystoneGeneration() {
        def game = new Game()
        def bldg = new Building(new LocusSeed(0L))
        bldg.name = "Alpha"
        bldg.maxFloors = 1
        bldg.apartmentsPerFloor = 2
        bldg.culture = "monolith"
        bldg.timeline = "ancient"
        bldg.notifySampled(0)
        bldg.infusionCount = 7 // Prime it
        
        def floor = bldg.getFloor(0)
        game.player.inventory << new InventoryItem("A", 10)
        game.player.inventory << new InventoryItem("B", 20)
        
        game.player.mergeItems(0, 1, floor)
        
        def keystone = game.player.inventory.find { it.name == "Alpha Keystone" }
        assertNotNull(keystone, "Keystone should be created in primed building")
        assertTrue(keystone.isKeystone, "Item should be marked as keystone")
        assertEquals(0, keystone.frequency.value, "Keystone should have 0Hz frequency")
    }

    @Test
    void testTerminologyShift() {
        def bldg = new Building(new LocusSeed(0L))
        bldg.name = "Deep"
        bldg.culture = "monolith"
        bldg.timeline = "ancient"
        bldg.maxFloors = 10
        bldg.apartmentsPerFloor = 2
        bldg.isBreached = true // Enable abyssal access
        
        def layer = bldg.getFloor(-1)
        assertNotNull(layer, "Abyssal layer should be accessible when breached")
        
        // Force population to be sure
        layer.ensureChildrenPopulated()
        
        assertEquals("Layer", layer.getTypeName())
        assertEquals("Layer -0x1", layer.getName())
        assertTrue(layer.isAbyssal(), "Layer should be abyssal")
        
        def artery = layer.getCorridor()
        assertNotNull(artery, "Artery (Corridor) should be populated for layer")
        assertEquals("Artery", artery.getTypeName())
        assertTrue(artery.isAbyssal(), "Artery should be abyssal")
        
        def crypt = artery.getApartments()[0]
        assertNotNull(crypt, "Crypt (Apartment) should exist in artery")
        assertEquals("Crypt", crypt.getTypeName())
        
        def shard = crypt.getRooms()[0]
        assertNotNull(shard, "Shard (Room) should exist in crypt")
        // Terminology check: Room type name is generated, but label is "SHARD"
        assertEquals("SHARD", shard.getTypeLabel())
    }
}
