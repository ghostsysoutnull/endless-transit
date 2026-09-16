package com.endlesstransit.procgen

import com.endlesstransit.core.*
import com.endlesstransit.model.*
import com.endlesstransit.ui.Terminal
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*

/**
 * HK-008 contract: every location a Game generates is wired to that Game's collaborators.
 *
 * Part A (step-0 pin, passes before HK-008): the formatter on every node from the Universe
 * down to the first Room is the Game's own {@code fmt}, and so is the formatter on a world
 * rebuilt by a trace restore. Nothing asserted this before; rendering merely proved the
 * formatter was non-null (LocationRenderingTest).
 */
class FactoryWiringContractTest {

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
    }

    /** Universe → filament[0] → … → room[0], every node collected in order. */
    static List<Location> firstChildChain(Universe universe) {
        List<Location> chain = []
        Location walker = universe
        while (true) {
            chain << walker
            if (walker instanceof Room) break
            Container c = (Container) walker
            List<Location> kids = c.getChildren()
            assertFalse(kids.isEmpty(), "${c.getTypeName()} ${c.getName()} has no children")
            walker = kids[0]
        }
        assertEquals(13, chain.size(), "Universe → Room chain must span the full 13-level hierarchy (Sector or NullSector at level 3)")
        return chain
    }

    static List<Location> ancestors(Location leaf) {
        List<Location> chain = []
        for (Location l = leaf; l != null; l = l.parent) chain << l
        return chain
    }

    // --- Part A: fmt identity ---

    @Test
    void A1_everyGeneratedLocation_rendersThroughTheGamesFormatter() {
        Game game = new Game(0x1234L)
        for (Location node : firstChildChain(game.universe)) {
            assertSame(game.fmt, node.fmt, "${node.getTypeName()} ${node.getName()} must carry game.fmt")
        }
    }

    @Test
    void A2_restoredWorld_rendersThroughTheRestoringGamesFormatter() {
        // HK-012: never touch the player's save. Snapshot it, work on a scratch file, prove it afterwards.
        File real = new File(SyncManager.SAVE_FILE)
        boolean realExisted = real.exists()
        long realStamp = realExisted ? real.lastModified() : -1L
        long realSize = realExisted ? real.length() : -1L
        File scratch = File.createTempFile("endless-transit-hk008-", ".trace")
        try {
            Game game = new Game(55555L)
            game.saveFile = scratch.path
            Room room = (Room) firstChildChain(game.universe).last()
            game.enterLocation(room)
            SyncManager.sync(game)
            assertTrue(scratch.exists() && scratch.length() > 0, "Scratch save file not written")

            Game freshGame = new Game(1L)
            freshGame.saveFile = scratch.path
            freshGame.restoreSession()

            assertEquals(room.getLIP(), freshGame.currentLocation.getLIP(), "Sanity: restore landed on the saved room")
            assertSame(freshGame.fmt, freshGame.universe.fmt, "Restored universe must carry the restoring game's fmt")
            for (Location node : ancestors(freshGame.currentLocation)) {
                assertSame(freshGame.fmt, node.fmt, "Restored ${node.getTypeName()} ${node.getName()} must carry freshGame.fmt")
            }
        } finally {
            scratch.delete()
        }
        assertEquals(realExisted, real.exists(), "The player's save file must not be created or deleted by this test")
        assertEquals(realStamp, realExisted ? real.lastModified() : -1L, "The player's save file must not be rewritten by this test")
        assertEquals(realSize, realExisted ? real.length() : -1L, "The player's save file must not be rewritten by this test")
    }
}
