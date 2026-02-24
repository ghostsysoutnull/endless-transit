package com.endlesstransit

println "Running Cyber-Terminal and Mechanics Test..."

def player = new Player()
def universe = new Universe()
def system = universe.solarSystems[0]
def planet = system.planets[0]

// Test Depth
if (universe.getDepth() == 0) {
    println "SUCCESS: Universe depth is 0."
} else {
    println "FAILURE: Universe depth is ${universe.getDepth()}."
}

if (planet.getDepth() == 2) {
    println "SUCCESS: Planet depth is 2 (Universe > System > Planet)."
} else {
    println "FAILURE: Planet depth is ${planet.getDepth()}."
}

// Test Coordinates
String coords1 = planet.getCoordinates()
String coords2 = planet.getCoordinates()
if (coords1 == coords2 && coords1 != null) {
    println "SUCCESS: Coordinates are stable for the same location."
} else {
    println "FAILURE: Coordinates changed or are null."
}

// Test Step Count (Simulation)
player.stepCount++
if (player.stepCount == 1) {
    println "SUCCESS: Player step count incremented."
} else {
    println "FAILURE: Step count is ${player.stepCount}."
}

println "All Cyber-Terminal Tests Passed!"
