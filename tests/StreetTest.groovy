package com.endlesstransit

println "Running Street TUI and Options Test..."

def street = new Street("Test Ave")
println "Street: ${street.name} has ${street.buildings.size()} buildings."

def options = street.getOptions(new Game())

// Verify we have 1L, 1R, etc.
boolean hasLeftRight = options.keySet().any { it.startsWith("1L") } && options.keySet().any { it.startsWith("1R") }

if (hasLeftRight) {
    println "SUCCESS: Street options correctly use 1L/1R format."
} else {
    println "FAILURE: Street options do not use 1L/1R format."
    println "Actual options: ${options.keySet()}"
    System.exit(1)
}

// Verify formatting of the TUI (manual check or regex)
// We'll just check if it generates at least 2 pairs
if (street.buildings.size() >= 4) {
    println "SUCCESS: Street has at least 2 pairs of buildings."
} else {
    println "FAILURE: Street has too few buildings: ${street.buildings.size()}"
    System.exit(1)
}

println "All Street Tests Passed!"
