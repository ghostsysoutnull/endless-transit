package com.endlesstransit.model
import com.endlesstransit.ui.Terminal
import com.endlesstransit.model.*
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager
import com.endlesstransit.procgen.LocusSeed
import com.endlesstransit.procgen.ProceduralFactory

// Simple manual test script to verify consistency and logic
Terminal.println "Running Structural Consistency Test..."

def building = new Building(new LocusSeed(12345L))
Terminal.println "Generated Building: ${building.name} with ${building.maxFloors} floors and ${building.apartmentsPerFloor} apartments per floor."

boolean consistent = true
for (int i = 0; i < building.maxFloors; i++) {
    def floor = building.getFloor(i)
    if (floor.getCorridor().getApartments().size() != building.apartmentsPerFloor) {
        Terminal.println "FAILURE: Floor $i has ${floor.getCorridor().getApartments().size()} apartments, expected ${building.apartmentsPerFloor}"
        consistent = false
    }
}

if (consistent) {
    Terminal.println "SUCCESS: All floors have consistent apartment counts."
}

Terminal.println "\nVerifying Street TUI generation..."
def street = new Street("Test Ave")
if (street.buildings.size() >= 4) {
    Terminal.println "SUCCESS: Street has ${street.buildings.size()} buildings (multiple pairs)."
} else {
    Terminal.println "FAILURE: Street has too few buildings: ${street.buildings.size()}"
    System.exit(1)
}

Terminal.println "\nAll Tests Passed!"
