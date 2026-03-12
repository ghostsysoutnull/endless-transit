package com.endlesstransit.regression

import com.endlesstransit.model.*
import com.endlesstransit.core.*
import com.endlesstransit.procgen.*
import com.endlesstransit.ui.Terminal
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import static org.junit.jupiter.api.Assertions.*

class VisitedProgressTest {

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
        InputHandler.defaultSource = new MockInputSource(["\n"])
    }

    @Test
    void execute() {
        Terminal.println "Running Visited Progress Tracking Test..."

        long testSeed = 12345L
        Game game = new Game(testSeed)

        // 1. Navigate to a Room
        Location walker = game.currentLocation
        Building building = null
        Floor floor = null
        Room room = null

        while (!(walker instanceof Room)) {
            if (walker instanceof Building) building = (Building) walker
            if (walker instanceof Floor) floor = (Floor) walker
            
            if (walker instanceof Container) {
                Container c = (Container) walker
                c.ensureChildrenPopulated()
                walker = c.children[0]
            } else {
                break
            }
        }

        assertNotNull(building, "Could not find a Building")
        assertNotNull(floor, "Could not find a Floor")
        assertTrue(walker instanceof Room, "Could not find a Room")
        room = (Room) walker

        Terminal.println "Found Building: ${building.name}"
        Terminal.println "Found Floor: ${floor.number}"
        Terminal.println "Found Room: ${room.name} (LIP: ${room.getLIP()})"

        // 2. Verify Elevator Mode on Entry
        game.enterLocation(floor)
        assertFalse(floor.isCorridorActive, "Floor should start in Elevator mode")
        def options = floor.getOptions(game)
        assertTrue(options.containsKey("c. Enter Corridor"), "Elevator should have corridor access")
        assertTrue(options.containsKey("u. Go Up") || options.containsKey("d. Go Down"), "Elevator should have vertical navigation")

        // 3. Switch to Corridor Mode
        options["c. Enter Corridor"].call()
        assertTrue(floor.isCorridorActive, "Floor should be in Corridor mode")
        def corridorOptions = floor.getOptions(game)
        assertTrue(corridorOptions.containsKey("b. Back to Elevator"), "Corridor should have back option")
        assertFalse(corridorOptions.containsKey("c. Enter Corridor"), "Corridor should not have enter corridor option")

        // 4. Enter the Room (from corridor mode)
        game.enterLocation(room)
        Terminal.println "Entered Room. Player VisitedLIPs: ${game.player.visitedLIPs.size()}"
        assertTrue(game.player.visitedLIPs.contains(room.getLIP()), "Room LIP not in visited set!")

        // 5. Verify Progress updated
        def finalProgress = building.getFloorProgress(floor, game.player)
        Terminal.println "Final Progress for Floor ${floor.number}: ${finalProgress.visited} / ${finalProgress.total}"

        assertTrue(finalProgress.visited > 0, "Progress did not increase!")

        // 6. Check UI labels
        List<String> content = building.getExtraContent(game.player, 80)
        boolean foundLabel = content.any { it.contains("[PROBED: ") }
        assertTrue(foundLabel, "Progress label not found in Building diagnostics!")

        // 6.1 Test the Scan command
        Terminal.println "Testing Scan command [s]..."
        game.processInput("s") // Should trigger ScanCommand.execute
        Terminal.println "Scan command execution finished."

        // 7. Test Vertical Reset (u/d should reset isCorridorActive)
        floor.isCorridorActive = true
        Floor nextFloor = building.getFloor(floor.number + 1)
        game.enterLocation(nextFloor)
        assertFalse(nextFloor.isCorridorActive, "Next floor should start in Elevator mode regardless of previous floor state")

        Terminal.println "SUCCESS: Visited Progress Tracking and Spatial Pivot verified."
    }
}
