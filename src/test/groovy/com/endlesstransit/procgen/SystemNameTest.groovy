package com.endlesstransit.procgen
import com.endlesstransit.ui.Terminal
import com.endlesstransit.model.*
import com.endlesstransit.core.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import static org.junit.jupiter.api.Assertions.*

class SystemNameTest {

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
    }

    @Test
    void execute() {
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
                            
                            assertFalse(system.name.startsWith("System-"), "System name '${system.name}' still has 'System-' prefix!")
                            
                            if (sector instanceof NullSector) {
                                assertFalse(system.name.startsWith("Lost-System-"), "System name '${system.name}' still has 'Lost-System-' prefix!")
                                if (!system.name.startsWith("Lost ")) {
                                    Terminal.println "WARNING: System in NullSector doesn't start with 'Lost ' (Current: ${system.name})"
                                }
                            }
                        }
                    }
                }
            }
        }

        assertTrue(foundSystem, "No SolarSystems found to test!")
        Terminal.println "SUCCESS: System names look clean."
    }
}
