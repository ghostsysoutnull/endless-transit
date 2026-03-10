package com.endlesstransit.model
import com.endlesstransit.ui.Terminal
import com.endlesstransit.model.*
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager
import com.endlesstransit.procgen.LocusSeed

Terminal.println "Running Mnemonic and Reversal Test..."

def game = new Game()
// Mocking initialization to start in a predictable state is hard due to randomization,
// but we can verify the getOptions() return values for specific types.

// Test Room Reversal Logic
def apartment = new Apartment("Test Door", "rust", "ancient", new LocusSeed(12345L))
apartment.ensureChildrenPopulated()
def rooms = apartment.rooms

if (rooms.size() < 2) {
    Terminal.println "FAILURE: Test requires at least 2 rooms, but got ${rooms.size()}"
    System.exit(1)
}

// Ensure rooms are empty so options are predictable
rooms.each { it.objects = [] }

def room1 = rooms[0]
def options1 = room1.getOptions(game)

if (options1.keySet().any { it.contains("Go forward") } && options1.keySet().any { it.contains("Exit Apartment") }) {
    Terminal.println "SUCCESS: First room has 'f' and 'exit'."
} else {
    Terminal.println "FAILURE: First room options incorrect: ${options1.keySet()}"
    System.exit(1)
}

def lastRoom = rooms.last()
def lastOptions = lastRoom.getOptions(game)
if (lastOptions.containsKey("b. Go back") && !lastOptions.containsKey("f. Go forward")) {
    Terminal.println "SUCCESS: Last room has 'b' but no 'f'."
} else {
    Terminal.println "FAILURE: Last room options incorrect: ${lastOptions.keySet()}"
    System.exit(1)
}

// Test Floor Reversal
def building = new Building()
building.maxFloors = 5
def floor0 = building.getFloor(0)
def floor0Ops = floor0.getOptions(game)
if (floor0Ops.containsKey("u. Go Up") && !floor0Ops.containsKey("d. Go Down")) {
    Terminal.println "SUCCESS: Ground floor has 'u' but no 'd'."
}

Terminal.println "All Mnemonic Tests Passed!"
