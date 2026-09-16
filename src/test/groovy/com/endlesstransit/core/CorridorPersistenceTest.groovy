package com.endlesstransit.core

import com.endlesstransit.model.*
import com.endlesstransit.ui.Terminal
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import static org.junit.jupiter.api.Assertions.*

/**
 * Phase 0.5a safety net: validates that a Floor in CorridorState survives a full
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
        // HK-012: never touch the player's save. Snapshot it, work on a scratch file, prove it afterwards.
        File real = new File(SyncManager.SAVE_FILE)
        boolean realExisted = real.exists()
        long realStamp = realExisted ? real.lastModified() : -1L
        long realSize = realExisted ? real.length() : -1L
        File scratch = File.createTempFile("endless-transit-", ".trace")
        try {
            runRoundTrip(scratch)
        } finally {
            scratch.delete()
        }
        assertEquals(realExisted, real.exists(), "The player's save file must not be created or deleted by this test")
        assertEquals(realStamp, realExisted ? real.lastModified() : -1L, "The player's save file must not be rewritten by this test")
        assertEquals(realSize, realExisted ? real.length() : -1L, "The player's save file must not be rewritten by this test")
    }

    private static void runRoundTrip(File scratch) {
        long testSeed = 77777L
        Game game = new Game(testSeed)
        game.saveFile = scratch.path

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

        // A freshly entered floor is in ElevatorState — assert baseline
        assertTrue(game.currentLocation instanceof Floor, "Should be at a Floor")
        Floor currentFloor = (Floor) game.currentLocation
        assertSame(ElevatorState.INSTANCE, currentFloor.currentState, "Floor must start in ElevatorState after enterLocation")

        String floorLIP = currentFloor.getLIP()

        // Simulate player choosing "c. Enter Corridor"
        currentFloor.enterCorridor()
        assertSame(CorridorState.INSTANCE, currentFloor.currentState, "enterCorridor() must switch to CorridorState")

        // Sync (save state to the scratch file)
        SyncManager.sync(game)
        assertTrue(scratch.exists() && scratch.length() > 0, "Scratch save file must be written after sync")

        // Restore into a fresh game with a different seed to prove reconstitution
        Game freshGame = new Game(1L)
        freshGame.saveFile = scratch.path
        freshGame.restoreSession()

        // Location must be the same floor
        assertEquals(floorLIP, freshGame.currentLocation.getLIP(),
            "Restored location LIP must match the saved floor LIP")
        assertTrue(freshGame.currentLocation instanceof Floor,
            "Restored location must be a Floor")

        // THE CRITICAL ASSERTION: corridor state must survive the full save/restore cycle
        Floor restoredFloor = (Floor) freshGame.currentLocation
        assertSame(CorridorState.INSTANCE, restoredFloor.currentState,
            "Floor must be in CorridorState after restore — " +
            "mutation state must be applied AFTER any reset logic during location entry")
    }
}
