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

// Verify we have numeric IDs (01, 02, etc.)
boolean hasNumericIds = options.keySet().any { it.startsWith("01. ") } && options.keySet().any { it.startsWith("09. ") }

if (hasNumericIds) {
    println "SUCCESS: Street options correctly use zero-padded numeric IDs."
} else {
    println "FAILURE: Street options do not use zero-padded numeric IDs."
    println "Actual options: ${options.keySet()}"
    System.exit(1)
}

// TEST: Zero-Agnostic Choice Matching Logic (Manual reproduction of Game.groovy logic)
def testChoiceSelection = { String choice ->
    def matchingKey = options.keySet().find { key ->
        if (key.equalsIgnoreCase(choice)) return true
        if (key.contains(". ")) {
            String labelId = key.substring(0, key.indexOf(". ")).trim()
            String normalizedChoice = choice.replaceFirst("^0+(?!\$)", "")
            String normalizedLabel = labelId.replaceFirst("^0+(?!\$)", "")
            if (normalizedChoice == normalizedLabel) return true
        }
        return false
    }
    return matchingKey
}

// Verify choice "2" matches "02. Enter Building..."
def key2 = testChoiceSelection("2")
if (key2 && key2.startsWith("02. ")) {
    println "SUCCESS: Choice '2' correctly matches label '02.'."
} else {
    println "FAILURE: Choice '2' failed to match. Result: $key2"
    System.exit(1)
}

// Verify choice "02" matches "02. Enter Building..."
def key02 = testChoiceSelection("02")
if (key02 && key02.startsWith("02. ")) {
    println "SUCCESS: Choice '02' correctly matches label '02.'."
} else {
    println "FAILURE: Choice '02' failed to match. Result: $key02"
    System.exit(1)
}

// Verify choice "002" matches "02. Enter Building..." (Future proofing)
def key002 = testChoiceSelection("002")
if (key002 && key002.startsWith("02. ")) {
    println "SUCCESS: Choice '002' correctly matches label '02.'."
} else {
    println "FAILURE: Choice '002' failed to match. Result: $key002"
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
