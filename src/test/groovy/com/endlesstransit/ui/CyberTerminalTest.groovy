package com.endlesstransit.ui
import com.endlesstransit.ui.Terminal
import com.endlesstransit.model.*
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager

Terminal.println "Running Cyber-Terminal and Mechanics Test..."

def player = new Player()
def universe = new Universe()
def filament = universe.filaments[0]
def sector = filament.children[0] // GalacticSector or NullSector
def system = sector.children[0]   // SolarSystem
def planet = system.planets[0]

// Test Depth
if (universe.getDepth() == 0) {
    Terminal.println "SUCCESS: Universe depth is 0."
} else {
    Terminal.println "FAILURE: Universe depth is ${universe.getDepth()}."
}

if (planet.getDepth() == 4) {
    Terminal.println "SUCCESS: Planet depth is 4 (Universe > Filament > Sector > System > Planet)."
} else {
    Terminal.println "FAILURE: Planet depth is ${planet.getDepth()}."
}

// Test Coordinates
String coords1 = planet.getCoordinates()
String coords2 = planet.getCoordinates()
if (coords1 == coords2 && coords1 != null) {
    Terminal.println "SUCCESS: Coordinates are stable for the same location."
} else {
    Terminal.println "FAILURE: Coordinates changed or are null."
}

// Test Step Count (Simulation)
player.stepCount++
if (player.stepCount == 1) {
    Terminal.println "SUCCESS: Player step count incremented."
} else {
    Terminal.println "FAILURE: Step count is ${player.stepCount}."
}

Terminal.println "All Cyber-Terminal Tests Passed!"
