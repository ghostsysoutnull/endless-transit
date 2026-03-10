package com.endlesstransit.regression

import com.endlesstransit.model.*
import com.endlesstransit.core.*
import com.endlesstransit.procgen.*
import com.endlesstransit.ui.Terminal

Terminal.println "Running Visited Progress Tracking Test..."
Terminal.initialize(true, true)

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

assert building != null : "Could not find a Building"
assert floor != null : "Could not find a Floor"
assert walker instanceof Room : "Could not find a Room"
room = (Room) walker

Terminal.println "Found Building: ${building.name}"
Terminal.println "Found Floor: ${floor.number}"
Terminal.println "Found Room: ${room.name} (LIP: ${room.getLIP()})"

// 2. Verify Elevator Mode on Entry
game.enterLocation(floor)
assert floor.isCorridorActive == false : "Floor should start in Elevator mode"
def options = floor.getOptions(game)
assert options.containsKey("c. Enter Corridor") : "Elevator should have corridor access"
assert options.containsKey("u. Go Up") || options.containsKey("d. Go Down") : "Elevator should have vertical navigation"

// 3. Switch to Corridor Mode
options["c. Enter Corridor"].call()
assert floor.isCorridorActive == true : "Floor should be in Corridor mode"
def corridorOptions = floor.getOptions(game)
assert corridorOptions.containsKey("b. Back to Elevator") : "Corridor should have back option"
assert !corridorOptions.containsKey("c. Enter Corridor") : "Corridor should not have enter corridor option"

// 4. Enter the Room (from corridor mode)
game.enterLocation(room)
Terminal.println "Entered Room. Player VisitedLIPs: ${game.player.visitedLIPs.size()}"
assert game.player.visitedLIPs.contains(room.getLIP()) : "Room LIP not in visited set!"

// 5. Verify Progress updated
def finalProgress = building.getFloorProgress(floor, game.player)
Terminal.println "Final Progress for Floor ${floor.number}: ${finalProgress.visited} / ${finalProgress.total}"

assert finalProgress.visited > 0 : "Progress did not increase!"

// 6. Check UI labels
List<String> content = building.getExtraContent(game.player, 80)
boolean foundLabel = content.any { it.contains("[PROBED: 1/") }
assert foundLabel : "Progress label not found in Building diagnostics!"

// 7. Test Vertical Reset (u/d should reset isCorridorActive)
floor.isCorridorActive = true
Floor nextFloor = building.getFloor(floor.number + 1)
game.enterLocation(nextFloor)
assert nextFloor.isCorridorActive == false : "Next floor should start in Elevator mode regardless of previous floor state"

Terminal.println "SUCCESS: Visited Progress Tracking and Spatial Pivot verified."
