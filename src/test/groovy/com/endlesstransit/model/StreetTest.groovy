package com.endlesstransit.model
import com.endlesstransit.model.*
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager

println "Running Street TUI and Options Test..."

def player = new Player()
def universe = new Universe(12345)
def game = new Game()
game.player = player
game.currentLocation = universe

def street = new Street("Test Ave", 999)
street.setParent(new City("Test City"))
street.ensureChildrenPopulated()

println "Street: ${street.name} has ${street.buildings.size()} buildings."

def options = street.getOptions(game)

// Verify we have numeric IDs (1, 2, etc.)
boolean hasNumericIds = options.keySet().any { it.startsWith("1. ") } && options.keySet().any { it.startsWith("9. ") }

if (hasNumericIds) {
    println "SUCCESS: Street options correctly use numeric IDs."
} else {
    println "FAILURE: Street options do not use numeric IDs."
    println "Actual options: ${options.keySet()}"
    System.exit(1)
}

// TEST: Choice Matching Logic (Manual reproduction of Game.groovy logic)
def testChoiceSelection = { String choice ->
    def matchingKey = options.keySet().find { key ->
        if (key.equalsIgnoreCase(choice)) return true
        if (key.startsWith(choice + ". ")) return true
        if (choice.length() == 1 && Character.isDigit(choice[0] as char)) {
            if (key.startsWith("0" + choice + ". ")) return true
        }
        return false
    }
    return matchingKey
}

// Verify choice "9" matches "9. Enter Building..."
def key9 = testChoiceSelection("9")
if (key9 && key9.startsWith("9. ")) {
    println "SUCCESS: Choice '9' correctly matches building index 8."
} else {
    println "FAILURE: Choice '9' failed to match. Result: $key9"
    System.exit(1)
}

// TEST: LIP Resolution for all buildings
println "Verifying LIP stability for all ${street.buildings.size()} buildings..."
street.buildings.eachWithIndex { b, i ->
    String lip = b.getLIP()
    int lastPart = lip.split("\\.").last().toInteger()
    if (lastPart != i) {
        println "FAILURE: Building ${b.name} at index $i has inconsistent LIP: $lip (Expected last part: $i)"
        System.exit(1)
    }
}
println "SUCCESS: All building LIPs are stable and consistent."

println "All Street Tests Passed!"
