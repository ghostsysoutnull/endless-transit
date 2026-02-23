package com.endlesstransit

println "Running Street TUI and Options Test..."

def street = new Street("Test Ave")
println "Street: ${street.name} has ${street.buildings.size()} buildings."

def options = street.getOptions(new Game())

// Verify we have numeric IDs (1, 2, etc.)
boolean hasNumericIds = options.keySet().any { it.startsWith("1.") } && options.keySet().any { it.startsWith("2.") }

if (hasNumericIds) {
    println "SUCCESS: Street options correctly use numeric IDs."
} else {
    println "FAILURE: Street options do not use numeric IDs."
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
