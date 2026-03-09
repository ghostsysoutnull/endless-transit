package com.endlesstransit.procgen
import com.endlesstransit.ui.Terminal
import com.endlesstransit.model.*
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager

Terminal.println "Running System Name Prefix Test..."

def universe = new Universe()
boolean foundSystem = false

// Traverse down to find some solar systems
universe.filaments.each { filament ->
    filament.children.each { sector ->
        if (sector instanceof GalacticSector || sector instanceof NullSector) {
            sector.children.each { system ->
                if (system instanceof SolarSystem) {
                    foundSystem = true
                    Terminal.println "Found system: '${system.name}'"
                    
                    if (system.name.startsWith("System-")) {
                        Terminal.println "FAILURE: System name '${system.name}' still has 'System-' prefix!"
                        System.exit(1)
                    }
                    
                    if (sector instanceof NullSector) {
                        if (system.name.startsWith("Lost-System-")) {
                            Terminal.println "FAILURE: System name '${system.name}' still has 'Lost-System-' prefix!"
                            System.exit(1)
                        }
                        if (!system.name.startsWith("Lost ")) {
                            Terminal.println "WARNING: System in NullSector doesn't start with 'Lost ' (Current: ${system.name})"
                        }
                    }
                }
            }
        }
    }
}

if (!foundSystem) {
    Terminal.println "FAILURE: No SolarSystems found to test!"
    System.exit(1)
}

Terminal.println "SUCCESS: System names look clean."
