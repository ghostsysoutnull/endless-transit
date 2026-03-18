package com.endlesstransit.core

import com.endlesstransit.model.*
import com.endlesstransit.ui.Terminal
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import static org.junit.jupiter.api.Assertions.*

/**
 * Phase 0.5a safety net: validates that isCorridorActive = true survives a full
 * save/restore cycle via SyncManager. Required before Phase 1a (Floor.enter ordering fix)
 * to ensure the fix doesn't silently break corridor state reconstitution.
 */
class CorridorPersistenceTest {

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
    }

    @Test
    void corridorStateSurvivesSaveRestore() {
        long testSeed = 77777L
        Game game = new Game(testSeed)

        // Navigate: Street -> Building -> Floor
        assertTrue(game.currentLocation instanceof Street, "Game should start at a Street")
        Street street = (Street) game.currentLocation
        street.ensureChildrenPopulated()
        assertFalse(street.children.isEmpty(), "Street must have buildings")

        Building building = (Building) street.children.find { it instanceof Building }
        assertNotNull(building, "No building found on street")
        game.enterLocation(building)

        building.ensureChildrenPopulated()
        assertFalse(building.children.isEmpty(), "Building must have floors")

        Floor floor = (Floor) building.children.find { it instanceof Floor }
        assertNotNull(floor, "No floor found in building")
        game.enterLocation(floor)

        // enterLocation always resets isCorridorActive — assert baseline
        assertTrue(game.currentLocation instanceof Floor, "Should be at a Floor")
        Floor currentFloor = (Floor) game.currentLocation
        assertFalse(currentFloor.isCorridorActive, "isCorridorActive must start false after enterLocation")

        String floorLIP = currentFloor.getLIP()

        // Simulate player choosing "c. Enter Corridor"
        currentFloor.isCorridorActive = true
        assertTrue(currentFloor.isCorridorActive, "isCorridorActive must be settable to true")

        // Sync (save state to session.trace)
        SyncManager.sync(game)
        assertTrue(new File(SyncManager.SAVE_FILE).exists(), "Save file must exist after sync")

        // Restore into a fresh game with a different seed to prove reconstitution
        Game freshGame = new Game(1L)
        freshGame.restoreSession()

        // Location must be the same floor
        assertEquals(floorLIP, freshGame.currentLocation.getLIP(),
            "Restored location LIP must match the saved floor LIP")
        assertTrue(freshGame.currentLocation instanceof Floor,
            "Restored location must be a Floor")

        // THE CRITICAL ASSERTION: corridor state must survive the full save/restore cycle
        Floor restoredFloor = (Floor) freshGame.currentLocation
        assertTrue(restoredFloor.isCorridorActive,
            "isCorridorActive must be true after restore — " +
            "mutation state must be applied AFTER any reset logic during location entry")
    }
}
