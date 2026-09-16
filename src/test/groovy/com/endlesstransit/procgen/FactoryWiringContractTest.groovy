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
 *
 * Part B (HK-008 c3): every container the registry hands out remembers the registry that made it,
 * including lazily populated descendants and the on-demand abyssal floor; a container built by hand
 * with no registry fails loud on first lazy access, naming its class.
 *
 * Part C (HK-008 c4): the Game owns its factory: a restored world is rebuilt by the restoring game's
 * factory, and two games in one JVM never share one (the old "last game wins the fmt" hazard).
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
            assertSame(freshGame.factory, freshGame.universe.factory, "C1: restored universe must carry the restoring game's factory")
            assertNotSame(game.factory, freshGame.factory, "C1: the restoring game does not reuse the saving game's factory")
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

    // --- Part B: factory identity ---

    @Test
    void B1_everyGeneratedLocation_carriesTheGamesFactory() {
        Game game = new Game(0x1234L)
        for (Location node : firstChildChain(game.universe)) {
            if (node instanceof Container) {
                assertSame(game.factory, ((Container) node).factory, "${node.getTypeName()} ${node.getName()} must carry game.factory")
            }
        }
    }

    @Test
    void B2_onDemandAbyssalFloor_carriesTheBuildingsFactory() {
        ProceduralFactory factory = new ProceduralFactory(new com.endlesstransit.ui.StandardTerminalAdapter())
        Building bldg = new Building(new LocusSeed(0L))
        bldg.factory = factory
        bldg.name = "Deep"
        bldg.culture = "monolith"
        bldg.timeline = "ancient"
        bldg.maxFloors = 10
        bldg.apartmentsPerFloor = 2
        bldg.isBreached = true

        Floor layer = bldg.getFloor(-1)
        assertNotNull(layer, "Breached building must create the abyssal floor on demand")
        assertSame(factory, layer.factory, "Abyssal floor must carry the building's factory")
        Corridor artery = layer.getCorridor()
        assertSame(factory, artery.factory, "Abyssal corridor must carry the building's factory")
        assertSame(factory, artery.getApartments()[0].factory, "Abyssal apartment must carry the building's factory")
    }

    @Test
    void B3_containerBuiltOutsideTheRegistry_failsLoudOnFirstLazyAccess() {
        Building bldg = new Building(new LocusSeed(0L))
        bldg.maxFloors = 1
        IllegalStateException ex = assertThrows(IllegalStateException) { bldg.getFloor(0) }
        assertTrue(ex.message.contains("Building"), ex.message)
        assertTrue(ex.message.contains("factory"), ex.message)
    }

    // --- Part C: ownership ---

    @Test
    void C2_twoGamesInOneJvm_holdIndependentFactoriesAndFormatters() {
        Game a = new Game(1L)
        Game b = new Game(1L)
        assertNotSame(a.factory, b.factory, "Each game builds its own factory")
        assertNotSame(a.fmt, b.fmt, "Each game builds its own formatter")
        assertSame(a.factory, a.universe.factory, "a's world was made by a's factory")
        assertSame(b.factory, b.universe.factory, "b's world was made by b's factory")
        assertSame(a.fmt, a.universe.fmt, "a's world still renders through a.fmt after b was built")
        assertSame(a.fmt, a.factory.fmt, "a's factory carries a.fmt")
        assertSame(b.fmt, b.factory.fmt, "b's factory carries b.fmt")
    }
}
