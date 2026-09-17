package com.endlesstransit.core

import com.endlesstransit.model.*
import com.endlesstransit.ui.Terminal
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*

/**
 * HK-013 step 0 (Coverage Claim Protocol): pins what SyncManager.restore rebuilds that no other test
 * asserts — the player's counters and footprint sets, an item's merge count, and the two failure paths —
 * before the method is split into helpers. Every case works on a scratch file (HK-012).
 */
class RestoreContractTest {

    static final long SEED = 24680L

    private File real
    private boolean realExisted
    private long realStamp
    private long realSize

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
        real = new File(SyncManager.SAVE_FILE)
        realExisted = real.exists()
        realStamp = realExisted ? real.lastModified() : -1L
        realSize = realExisted ? real.length() : -1L
    }

    private void assertPlayersSaveUntouched() {
        assertEquals(realExisted, real.exists(), "The player's save file must not be created or deleted by this test")
        assertEquals(realStamp, realExisted ? real.lastModified() : -1L, "The player's save file must not be rewritten by this test")
        assertEquals(realSize, realExisted ? real.length() : -1L, "The player's save file must not be rewritten by this test")
    }

    /** Street -> first Building -> Floor 0, entered through the game so footprints are real. */
    private static Game walkedGame(File scratch) {
        Game game = new Game(SEED)
        game.saveFile = scratch.path
        Street street = (Street) game.currentLocation
        street.ensureChildrenPopulated()
        Building building = (Building) street.children.find { it instanceof Building }
        game.enterLocation(building)
        game.enterLocation(building.getFloor(0))
        return game
    }

    @Test
    void countersAndFootprintSetsSurviveRestore() {
        File scratch = File.createTempFile("endless-transit-", ".trace")
        try {
            Game game = walkedGame(scratch)
            game.player.coherence = 63
            game.player.stepCount = 17
            Set<String> lips = new LinkedHashSet<String>(game.player.visitedLIPs)
            Set<String> paths = new LinkedHashSet<String>(game.player.visitedPaths)
            assertTrue(lips.size() >= 3, "Precondition: the walk left footprints")
            String buildingLip = game.currentLocation.parent.getLIP()
            SyncManager.sync(game)

            Game fresh = new Game(1L)
            fresh.saveFile = scratch.path
            fresh.restoreSession()

            assertEquals(63, fresh.player.coherence, "Coherence must survive restore")
            assertEquals(17, fresh.player.stepCount, "Step count must survive restore")
            assertEquals(lips, fresh.player.visitedLIPs, "visitedLIPs must survive restore")
            assertEquals(paths, fresh.player.visitedPaths, "visitedPaths must survive restore")
            assertSame(fresh.currentLocation, fresh.player.currentLocation, "The restored player stands at the restored location")

            Location restoredBuilding = fresh.currentLocation.parent
            assertEquals(buildingLip, restoredBuilding.getLIP(), "Sanity: the parent is the walked building")
            assertTrue(restoredBuilding.isVisited(), "A footprint that is not the current location must be re-marked visited")
        } finally {
            scratch.delete()
        }
        assertPlayersSaveUntouched()
    }

    @Test
    void anItemsMergeCountSurvivesRestore() {
        File scratch = File.createTempFile("endless-transit-", ".trace")
        try {
            Game game = walkedGame(scratch)
            game.player.inventory << new InventoryItem("Twice Merged", 321, 2)
            SyncManager.sync(game)

            Game fresh = new Game(1L)
            fresh.saveFile = scratch.path
            fresh.restoreSession()

            InventoryItem item = fresh.player.inventory.find { it.name == "Twice Merged" }
            assertNotNull(item, "The item must survive restore")
            assertEquals(2, item.sessionMergeCount, "sessionMergeCount must survive restore")
            assertFalse(item.isKeystone, "A plain item must stay plain")
        } finally {
            scratch.delete()
        }
        assertPlayersSaveUntouched()
    }

    @Test
    void aMissingSaveLeavesTheGameUnchanged() {
        File scratch = File.createTempFile("endless-transit-", ".trace")
        scratch.delete()
        Game game = new Game(SEED)
        game.saveFile = scratch.path
        Player before = game.player
        Location where = game.currentLocation

        game.restoreSession()

        assertEquals(SEED, game.masterLocus.value, "A missing save must not change the seed")
        assertSame(before, game.player, "A missing save must not replace the player")
        assertSame(where, game.currentLocation, "A missing save must not move the player")
        assertPlayersSaveUntouched()
    }

    @Test
    void aCorruptSaveIsRefusedWithoutAnExceptionAndLeavesTheGameUnchanged() {
        File scratch = File.createTempFile("endless-transit-", ".trace")
        try {
            scratch.text = '{ "masterLocus": 5, "player": { "coherence": "not a number" '
            Game game = new Game(SEED)
            game.saveFile = scratch.path
            Player before = game.player
            Location where = game.currentLocation

            assertDoesNotThrow({ game.restoreSession() } as org.junit.jupiter.api.function.Executable)

            assertEquals(SEED, game.masterLocus.value, "A corrupt save must not change the seed")
            assertSame(before, game.player, "A corrupt save must not replace the player")
            assertSame(where, game.currentLocation, "A corrupt save must not move the player")
        } finally {
            scratch.delete()
        }
        assertPlayersSaveUntouched()
    }

    @Test
    void aSaveThatFailsHalfwayThroughThePlayerIsRefusedWhole() {
        // Valid JSON, valid seed, broken player block: the failure happens inside the reconstitution, not the parse.
        File scratch = File.createTempFile("endless-transit-", ".trace")
        try {
            scratch.text = '{ "masterLocus": 5, "timestamp": 0, "player": { "coherence": 50, "stepCount": 1, "footprints": [], "visitedPaths": [], "inventory": [ { "name": "X" } ] }, "mutations": {} }'
            Game game = new Game(SEED)
            game.saveFile = scratch.path
            Player before = game.player

            assertDoesNotThrow({ game.restoreSession() } as org.junit.jupiter.api.function.Executable)

            assertEquals(SEED, game.masterLocus.value, "A half-readable save must not change the seed")
            assertSame(before, game.player, "A half-readable save must not replace the player")
        } finally {
            scratch.delete()
        }
        assertPlayersSaveUntouched()
    }
}
