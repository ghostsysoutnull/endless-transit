package com.endlesstransit.ui
import com.endlesstransit.ui.Terminal
import com.endlesstransit.model.*
import com.endlesstransit.core.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import static org.junit.jupiter.api.Assertions.*

class CyberTerminalTest {

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
    }

    @Test
    void execute() {
        Terminal.println "Running Cyber-Terminal and Mechanics Test..."

        def player = new Player()
        def universe = new Universe()
        def filament = universe.filaments[0]
        def sector = filament.children[0] // GalacticSector or NullSector
        def system = sector.children[0]   // SolarSystem
        def planet = system.planets[0]

        // Test Depth
        assertEquals(0, universe.getDepth(), "Universe depth is 0.")
        assertEquals(4, planet.getDepth(), "Planet depth is 4 (Universe > Filament > Sector > System > Planet).")

        // Test Coordinates
        String coords1 = planet.getCoordinates()
        String coords2 = planet.getCoordinates()
        assertNotNull(coords1, "Coordinates should not be null")
        assertEquals(coords1, coords2, "Coordinates are stable for the same location.")

        // Test Step Count (Simulation)
        player.stepCount++
        assertEquals(1, player.stepCount, "Player step count incremented.")

        Terminal.println "All Cyber-Terminal Tests Passed!"
    }
}
