package com.endlesstransit.model
import com.endlesstransit.model.*
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager

// Simple manual test script to verify consistency and logic
println "Running Structural Consistency Test..."

def building = new Building()
println "Generated Building: ${building.name} with ${building.maxFloors} floors and ${building.apartmentsPerFloor} apartments per floor."

boolean consistent = true
for (int i = 0; i < building.maxFloors; i++) {
    def floor = building.getFloor(i)
    if (floor.getCorridor().getApartments().size() != building.apartmentsPerFloor) {
        println "FAILURE: Floor $i has ${floor.getCorridor().getApartments().size()} apartments, expected ${building.apartmentsPerFloor}"
        consistent = false
    }
}

if (consistent) {
    println "SUCCESS: All floors have consistent apartment counts."
}

println "\nVerifying Street TUI generation..."
def street = new Street("Test Ave")
if (street.buildings.size() >= 4) {
    println "SUCCESS: Street has ${street.buildings.size()} buildings (multiple pairs)."
} else {
    println "FAILURE: Street has too few buildings: ${street.buildings.size()}"
    System.exit(1)
}

println "\nAll Tests Passed!"
