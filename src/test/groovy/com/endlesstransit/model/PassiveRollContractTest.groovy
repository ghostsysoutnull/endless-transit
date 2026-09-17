package com.endlesstransit.model

import com.endlesstransit.core.Game
import com.endlesstransit.core.SyncManager
import com.endlesstransit.ui.Terminal
import groovy.json.JsonOutput
import groovy.json.JsonSlurper
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*

/**
 * HK-015 item 1 (Coverage Claim Protocol step 0): the room's passive roll happens once per step.
 * Before the fix a winning roll repeated on every prompt spent standing still, and again after a
 * sync + restore. Every assertion is on the inventory, so the pins need no new API. Every save goes
 * to a scratch file (HK-012).
 */
class PassiveRollContractTest {

    static final long SEED = 24680L
    static final int STEP_LIMIT = 200

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

    /** Street -> first Building -> Floor 0 -> Corridor -> first Apartment (auto-entry puts the player in its first Room). */
    private static Game gameInRoom(File scratch) {
        Game game = new Game(SEED)
        game.saveFile = scratch.path
        Street street = (Street) game.currentLocation
        street.ensureChildrenPopulated()
        Building building = (Building) street.children.find { it instanceof Building }
        game.enterLocation(building)
        Floor floor = building.getFloor(0)
        game.enterLocation(floor)
        game.enterLocation(floor.getCorridor().getApartments()[0])
        assertTrue(game.currentLocation instanceof Room, "Precondition: auto-entry leaves the player in a room")
        return game
    }

    /** Advances the step until the passive roll pays out; returns the winning step. */
    private static int walkToWinningStep(Game game, int from = 0) {
        int before = game.player.inventory.size()
        int step = from
        while (step < STEP_LIMIT) {
            game.player.stepCount = step
            game.currentLocation.processAction(game.player)
            if (game.player.inventory.size() > before) return step
            step++
        }
        fail("No passive capture within ${STEP_LIMIT} steps")
        return -1
    }

    // P1a — standing still never pays twice
    @Test
    void standingStill_capturesAtMostOncePerStep() {
        File scratch = File.createTempFile("endless-transit-", ".trace")
        try {
            Game game = gameInRoom(scratch)
            int before = game.player.inventory.size()
            walkToWinningStep(game)
            10.times { game.currentLocation.processAction(game.player) }
            assertEquals(before + 1, game.player.inventory.size(),
                "Ten more prompts on the winning step must not capture again")
        } finally {
            scratch.delete()
            assertPlayersSaveUntouched()
        }
    }

    // P1b — a new step is a new roll
    @Test
    void nextWinningStep_capturesAgain() {
        File scratch = File.createTempFile("endless-transit-", ".trace")
        try {
            Game game = gameInRoom(scratch)
            int before = game.player.inventory.size()
            int first = walkToWinningStep(game)
            walkToWinningStep(game, first + 1)
            assertEquals(before + 2, game.player.inventory.size(), "Moving on must keep the lottery alive")
        } finally {
            scratch.delete()
            assertPlayersSaveUntouched()
        }
    }

    // P1c — sync + restore on the winning step does not pay again
    @Test
    void restoreOnTheWinningStep_doesNotCaptureAgain() {
        File scratch = File.createTempFile("endless-transit-", ".trace")
        try {
            Game game = gameInRoom(scratch)
            walkToWinningStep(game)
            int held = game.player.inventory.size()
            SyncManager.sync(game)

            Game fresh = new Game(1L)
            fresh.saveFile = scratch.path
            fresh.restoreSession()
            assertTrue(fresh.currentLocation instanceof Room, "Precondition: restored into the room")
            assertEquals(held, fresh.player.inventory.size(), "Precondition: inventory restored")

            fresh.currentLocation.processAction(fresh.player)
            assertEquals(held, fresh.player.inventory.size(), "The restored step was already rolled")
        } finally {
            scratch.delete()
            assertPlayersSaveUntouched()
        }
    }

    // P1d — a save from before the fix (no lastRollStep key) restores, and costs at most one re-roll
    @Test
    void saveWithoutRollKey_restoresAndRollsOnce() {
        File scratch = File.createTempFile("endless-transit-", ".trace")
        try {
            Game game = gameInRoom(scratch)
            walkToWinningStep(game)
            int held = game.player.inventory.size()
            SyncManager.sync(game)

            Map save = (Map) new JsonSlurper().parseText(scratch.text)
            ((Map) save.player).remove("lastRollStep")
            scratch.text = JsonOutput.toJson(save)

            Game fresh = new Game(1L)
            fresh.saveFile = scratch.path
            fresh.restoreSession()
            assertEquals(held, fresh.player.inventory.size(), "Precondition: an old save restores")

            3.times { fresh.currentLocation.processAction(fresh.player) }
            assertEquals(held + 1, fresh.player.inventory.size(), "An old save re-rolls its step once, not per prompt")
        } finally {
            scratch.delete()
            assertPlayersSaveUntouched()
        }
    }
}
