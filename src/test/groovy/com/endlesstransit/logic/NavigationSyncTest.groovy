package com.endlesstransit.logic

import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import static org.junit.jupiter.api.Assertions.*
import com.endlesstransit.core.*
import com.endlesstransit.model.*
import com.endlesstransit.procgen.*
import com.endlesstransit.ui.Terminal

class NavigationSyncTest {

    @BeforeEach
    void setup() {
        Terminal.initialize(true, true)
        com.endlesstransit.model.ModelOutput.fmt = new com.endlesstransit.ui.StandardTerminalAdapter()
    }

    @Test
    void "test building floor navigation synchronization"() {
        // Setup a building with 10 floors
        def locus = new LocusSeed(123L)
        def building = new Building(locus)
        building.name = "Test Building"
        building.maxFloors = 10
        building.apartmentsPerFloor = 5
        building.culture = "rust"
        building.timeline = "ancient"
        building.setParent(new Street("Test Street"))

        // Populate floors
        building.ensureChildrenPopulated()
        def floors = building.floors
        assertEquals(10, floors.size(), "Should have 10 floors")

        // Get Diagnostic Output (Left Pane)
        List<String> diagnosticLines = building.getExtraContent(new Player(), 100)
        
        // Find the line for "Floor 5" or ID "05"
        String targetId = "05."
        boolean foundInDiagnostic = diagnosticLines.any { it.contains(targetId) }
        assertTrue(foundInDiagnostic, "Floor ID '05.' should be in diagnostic output")

        // Get Options (Menu Pane)
        def game = new Game(locus, new MockInputSource([]))
        def options = building.getOptions(game)

        // Try to resolve "05" using the ActionMapper
        def mapper = game.state.mapper
        mapper.update(options)
        
        def inputHandler = game.state.inputHandler
        def action = mapper.resolve("05", inputHandler)
        
        assertNotNull(action, "Should be able to resolve choice '05'")

        // Execute action and check where we end up
        action.call()
        
        Location entered = game.state.currentLocation
        assertTrue(entered instanceof Floor, "Should have entered a floor")
        assertEquals(5, ((Floor)entered).number, "Choice '05' should lead to Floor 5")

        // Test zero-agnostic resolution: "5" should match "05"
        def action5 = mapper.resolve("5", inputHandler)
        assertNotNull(action5, "Should be able to resolve choice '5' (zero-agnostic)")
        action5.call()
        assertEquals(5, ((Floor)game.state.currentLocation).number, "Choice '5' should lead to Floor 5")

        // Test choice "00" - should lead to Floor 0
        def action00 = mapper.resolve("00", inputHandler)
        action00.call()
        assertEquals(0, ((Floor)game.state.currentLocation).number, "Choice '00' should lead to Floor 0")

        // Test choice "0" - should match "00"
        def action0 = mapper.resolve("0", inputHandler)
        assertNotNull(action0, "Should be able to resolve choice '0' (zero-agnostic)")
        action0.call()
        assertEquals(0, ((Floor)game.state.currentLocation).number, "Choice '0' should lead to Floor 0")
    }
}
