package com.endlesstransit.model
import com.endlesstransit.ui.Terminal
import com.endlesstransit.model.*
import com.endlesstransit.core.*
import com.endlesstransit.procgen.LocusSeed
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import static org.junit.jupiter.api.Assertions.*

class MnemonicReversalTest {

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
    }

    @Test
    void execute() {
        Terminal.println "Running Mnemonic and Reversal Test..."

        def game = new Game()
        
        // Test Room Reversal Logic
        def apartment = new Apartment("Test Door", "rust", "ancient", new LocusSeed(12345L))
        apartment.ensureChildrenPopulated()
        def rooms = apartment.rooms

        assertTrue(rooms.size() >= 2, "Test requires at least 2 rooms, but got ${rooms.size()}")

        // Ensure rooms are empty so options are predictable
        rooms.each { it.objects = [] }

        def room1 = rooms[0]
        def options1 = room1.getOptions(game)

        assertTrue(options1.keySet().any { it.contains("Go forward") }, "First room should have 'f'")
        assertTrue(options1.keySet().any { it.contains("Exit Apartment") }, "First room should have 'exit'")

        def lastRoom = rooms.last()
        def lastOptions = lastRoom.getOptions(game)
        assertTrue(lastOptions.containsKey("b. Go back"), "Last room should have 'b'")
        assertFalse(lastOptions.containsKey("f. Go forward"), "Last room should NOT have 'f'")

        // Test Floor Reversal
        def building = new Building()
        building.maxFloors = 5
        def floor0 = building.getFloor(0)
        def floor0Ops = floor0.getOptions(game)
        assertTrue(floor0Ops.containsKey("u. Go Up"), "Ground floor should have 'u'")
        assertFalse(floor0Ops.containsKey("d. Go Down"), "Ground floor should NOT have 'd'")

        Terminal.println "All Mnemonic Tests Passed!"
    }
}
