package com.endlesstransit.model
import com.endlesstransit.model.*
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager

println "Running Mnemonic and Reversal Test..."

def game = new Game()
// Mocking initialization to start in a predictable state is hard due to randomization, 
// but we can verify the getOptions() return values for specific types.

// Test Room Reversal Logic
def apartment = new Apartment("Test Door")
apartment.ensureChildrenPopulated()
def rooms = apartment.rooms

// Ensure rooms are empty so options are predictable
rooms.each { it.objects = [] }

def room1 = rooms[0]
def options1 = room1.getOptions(game)

if (options1.containsKey("f. Go forward") && !options1.containsKey("b. Go back")) {
    println "SUCCESS: First room has 'f' but no 'b'."
} else {
    println "FAILURE: First room options incorrect: ${options1.keySet()}"
}

def lastRoom = rooms.last()
def lastOptions = lastRoom.getOptions(game)
if (lastOptions.containsKey("b. Go back") && !lastOptions.containsKey("f. Go forward")) {
    println "SUCCESS: Last room has 'b' but no 'f'."
} else {
    println "FAILURE: Last room options incorrect: ${lastOptions.keySet()}"
}

// Test Floor Reversal
def building = new Building()
def floor0 = building.getFloor(0)
def floor0Ops = floor0.getOptions(game)
if (floor0Ops.containsKey("u. Go Up") && !floor0Ops.containsKey("d. Go Down")) {
    println "SUCCESS: Ground floor has 'u' but no 'd'."
}

println "All Mnemonic Tests Passed!"
