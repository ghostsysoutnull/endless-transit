package com.endlesstransit.model

import com.endlesstransit.core.Game
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.SyncManager
import com.endlesstransit.ui.Terminal
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*

/**
 * HK-018 step 0 (Coverage Claim Protocol): pins the Bedrock breach option before its rule moves
 * onto the model. Every case walks a factory-built street, primes a building the way the ritual
 * does (every floor sampled, seven infusions) and reads the Peak's menu through Floor.getOptions.
 */
class BreachOptionContractTest {

    static final long SEED = 12345L
    static final String BREACH = "j. Breach the Bedrock"

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
    }

    private static List<Building> buildings(Game game) {
        Street street = (Street) game.currentLocation
        street.ensureChildrenPopulated()
        return street.children.findAll { it instanceof Building }.collect { (Building) it }
    }

    private static void prime(Building bldg) {
        (0..<bldg.maxFloors).each { int n -> bldg.notifySampled(n) }
        bldg.infusionCount = 7
        assertTrue(bldg.isPrimed(), "Precondition: building primed")
    }

    private static Floor peakOf(Game game, Building bldg) {
        game.enterLocation(bldg)
        Floor peak = bldg.getFloor(bldg.maxFloors - 1)
        assertNotNull(peak, "Building must have a Peak floor")
        game.enterLocation(peak)
        return peak
    }

    /** Forges the building's Keystone the way a player does: one merge inside the primed building. */
    private static InventoryItem forgeKeystone(Game game, Floor where) {
        game.player.inventory << new InventoryItem("A", 10)
        game.player.inventory << new InventoryItem("B", 20)
        int last = game.player.inventory.size() - 1
        game.player.mergeItems(last - 1, last, where)
        InventoryItem keystone = game.player.inventory.last()
        assertTrue(keystone.isKeystone, "Precondition: a merge inside a primed building yields its Keystone")
        return keystone
    }

    @Test
    void peakElevatorOffersBreachWithTheBuildingsKeystone() {
        Game game = new Game(SEED)
        Building bldg = buildings(game)[0]
        prime(bldg)
        Floor peak = peakOf(game, bldg)
        forgeKeystone(game, peak)

        List<String> keys = new ArrayList<String>(peak.getOptions(game).keySet())
        assertTrue(keys.contains(BREACH), "Primed building, Peak elevator, Keystone held: '${BREACH}' must be offered")
        assertEquals(["l. Leave Floor", BREACH, "d. Go Down", "c. Enter Corridor"], keys, "Peak elevator menu order")
    }

    @Test
    void peakCorridorOffersBreachRightAfterBackToElevator() {
        Game game = new Game(SEED)
        Building bldg = buildings(game)[0]
        prime(bldg)
        Floor peak = peakOf(game, bldg)
        InventoryItem keystone = forgeKeystone(game, peak)

        peak.enterCorridor()
        List<String> expected = ["b. Back to Elevator", BREACH] + new ArrayList<String>(peak.getCorridor().getOptions(game).keySet())
        assertEquals(expected, new ArrayList<String>(peak.getOptions(game).keySet()),
            "Corridor mode on the Peak: 'b', the breach, then the Corridor's own options")

        peak.getOptions(game)[BREACH].call()
        assertTrue(bldg.isBreached, "The breach must work from corridor mode")
        assertFalse(game.player.inventory.contains(keystone), "The breach must consume the Keystone from corridor mode")
        assertSame(CorridorState.INSTANCE, peak.currentState, "The breach must not change the floor's mode")
    }

    @Test
    void breachIsNotOfferedWithoutKeystoneUnprimedOrBelowThePeak() {
        Game game = new Game(SEED)
        Building bldg = buildings(game)[0]
        Floor peak = peakOf(game, bldg)

        assertFalse(peak.getOptions(game).containsKey(BREACH), "Unprimed building must not offer the breach")

        prime(bldg)
        assertFalse(peak.getOptions(game).containsKey(BREACH), "Primed building without a Keystone must not offer the breach")

        forgeKeystone(game, peak)
        Floor lobby = bldg.getFloor(0)
        game.enterLocation(lobby)
        assertFalse(lobby.getOptions(game).containsKey(BREACH), "Only the Peak offers the breach")
    }

    @Test
    void breachConsumesTheKeystoneAndBreachesTheBuilding() {
        Game game = new Game(SEED)
        Building bldg = buildings(game)[0]
        prime(bldg)
        Floor peak = peakOf(game, bldg)
        InventoryItem keystone = forgeKeystone(game, peak)

        peak.getOptions(game)[BREACH].call()

        assertTrue(bldg.isBreached, "The breach must mark the building breached")
        assertFalse(game.player.inventory.contains(keystone), "The breach must consume the Keystone")
        assertFalse(peak.getOptions(game).containsKey(BREACH), "A breached building must not offer the breach again")
    }

    @Test
    void aSecondMergeInTheSameBuildingYieldsAHybridNotAnotherKeystone() {
        Game game = new Game(SEED)
        Building bldg = buildings(game)[0]
        prime(bldg)
        Floor peak = peakOf(game, bldg)
        forgeKeystone(game, peak)

        game.player.inventory << new InventoryItem("C", 30)
        game.player.inventory << new InventoryItem("D", 40)
        int last = game.player.inventory.size() - 1
        game.player.mergeItems(last - 1, last, peak)

        assertEquals(1, game.player.inventory.count { it.isKeystone }, "At most one Keystone per building")
        assertFalse(game.player.inventory.last().isKeystone, "The second merge must yield a hybrid")
    }

    @Test
    void aForgedKeystoneStillOpensItsBuildingAfterTheBuildingIsRenamed() {
        Game game = new Game(SEED)
        Building bldg = buildings(game)[0]
        prime(bldg)
        Floor peak = peakOf(game, bldg)
        InventoryItem keystone = forgeKeystone(game, peak)
        assertEquals(bldg.getLIP(), keystone.boundLip, "A forged Keystone is bound to its building's LIP")

        bldg.name = "Renamed By A Content Update"

        assertTrue(peak.getOptions(game).containsKey(BREACH), "The Keystone is bound by LIP: a renamed building must still open")
    }

    @Test
    void aKeystoneWithNoBoundLipOpensNothingAndDoesNotBlockForging() {
        Game game = new Game(SEED)
        Building bldg = buildings(game)[0]
        prime(bldg)
        Floor peak = peakOf(game, bldg)
        game.player.inventory << new InventoryItem("${bldg.name} Keystone", 0, 0, true)

        assertFalse(peak.getOptions(game).containsKey(BREACH), "A matching name alone must not open the building")

        InventoryItem forged = forgeKeystone(game, peak)
        assertEquals(bldg.getLIP(), forged.boundLip, "An unbound Keystone must not block forging the bound one")
        assertTrue(peak.getOptions(game).containsKey(BREACH), "The bound Keystone opens the building")
    }

    @Test
    void aBoundKeystoneDoesNotOpenAnotherBuildingOfTheSameName() {
        Game game = new Game(SEED)
        Building first = buildings(game)[0]
        Building twin = buildings(game)[1]
        twin.name = first.name
        prime(first)
        prime(twin)
        forgeKeystone(game, peakOf(game, first))

        Floor twinPeak = peakOf(game, twin)
        assertFalse(twinPeak.getOptions(game).containsKey(BREACH), "The first building's Keystone must not open its namesake")

        InventoryItem twinKeystone = forgeKeystone(game, twinPeak)
        assertEquals(twin.getLIP(), twinKeystone.boundLip, "The namesake forges its own Keystone")
        assertEquals(2, game.player.inventory.count { it.isKeystone }, "One Keystone per building, not per name")
        assertTrue(twinPeak.getOptions(game).containsKey(BREACH), "The namesake's own Keystone opens it")
    }

    @Test
    void keystoneSurvivesSyncAndRestore() {
        // HK-012: never touch the player's save. Work on a scratch file and prove the real one is untouched.
        File real = new File(SyncManager.SAVE_FILE)
        boolean realExisted = real.exists()
        long realStamp = realExisted ? real.lastModified() : -1L
        long realSize = realExisted ? real.length() : -1L
        File scratch = File.createTempFile("endless-transit-", ".trace")
        try {
            Game game = new Game(SEED)
            game.saveFile = scratch.path
            Building bldg = buildings(game)[0]
            prime(bldg)
            Floor peak = peakOf(game, bldg)
            forgeKeystone(game, peak)
            SyncManager.sync(game)

            Game fresh = new Game(1L)
            fresh.saveFile = scratch.path
            fresh.restoreSession()

            assertEquals(1, fresh.player.inventory.count { it.isKeystone }, "The Keystone flag must survive sync/restore")
            assertEquals(bldg.getLIP(), fresh.player.inventory.find { it.isKeystone }.boundLip, "The Keystone's bound LIP must survive sync/restore")
            Floor restoredPeak = (Floor) fresh.currentLocation
            assertTrue(restoredPeak.getOptions(fresh).containsKey(BREACH), "A restored Keystone must still open its building")
        } finally {
            scratch.delete()
        }
        assertEquals(realExisted, real.exists(), "The player's save file must not be created or deleted by this test")
        assertEquals(realStamp, realExisted ? real.lastModified() : -1L, "The player's save file must not be rewritten by this test")
        assertEquals(realSize, realExisted ? real.length() : -1L, "The player's save file must not be rewritten by this test")
    }
}
