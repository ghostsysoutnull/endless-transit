package com.endlesstransit

println "Running System Name Prefix Test..."

def universe = new Universe()
boolean foundSystem = false

// Traverse down to find some solar systems
universe.filaments.each { filament ->
    filament.children.each { sector ->
        if (sector instanceof GalacticSector || sector instanceof NullSector) {
            sector.children.each { system ->
                if (system instanceof SolarSystem) {
                    foundSystem = true
                    println "Found system: '${system.name}'"
                    
                    if (system.name.startsWith("System-")) {
                        println "FAILURE: System name '${system.name}' still has 'System-' prefix!"
                        System.exit(1)
                    }
                    
                    if (sector instanceof NullSector) {
                        if (system.name.startsWith("Lost-System-")) {
                            println "FAILURE: System name '${system.name}' still has 'Lost-System-' prefix!"
                            System.exit(1)
                        }
                        if (!system.name.startsWith("Lost ")) {
                            println "WARNING: System in NullSector doesn't start with 'Lost ' (Current: ${system.name})"
                        }
                    }
                }
            }
        }
    }
}

if (!foundSystem) {
    println "FAILURE: No SolarSystems found to test!"
    System.exit(1)
}

println "SUCCESS: System names look clean."
