package com.endlesstransit.core

import com.endlesstransit.model.*
import com.endlesstransit.procgen.WorldGenesis
import com.endlesstransit.ui.Terminal
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*

/**
 * HK-023 slice 1: a save made below the Bedrock restores. Layers are created on demand after a breach,
 * so their LIP index lies past the building's normal floors; these pins hold the index rule the saves
 * depend on and the restore itself. Every case works on a scratch file (HK-012).
 */
class AbyssalRestoreContractTest {

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

    /** Street -> first Building, entered through the game so the building is a real footprint. */
    private static Building enteredBuilding(Game game) {
        Street street = (Street) game.currentLocation
        street.ensureChildrenPopulated()
        Building building = (Building) street.children.find { it instanceof Building }
        game.enterLocation(building)
        return building
    }

    private static String lastIndexOf(Location loc) {
        return loc.getLIP().tokenize('.').last()
    }

    // P1 (step 0): the index rule every existing save below the Bedrock was written with.
    @Test
    void layersReachedInMenuOrderSitRightAfterTheLastFloor() {
        Game game = new Game(SEED)
        Building building = enteredBuilding(game)
        assertEquals(building.maxFloors, building.children.size(), "Precondition: a fresh building holds exactly maxFloors floors")

        building.isBreached = true
        Floor first = building.getFloor(-1)
        Floor second = building.getFloor(-2)

        assertEquals(building.maxFloors.toString(), lastIndexOf(first), "Layer -1 takes the first index after the last floor")
        assertEquals((building.maxFloors + 1).toString(), lastIndexOf(second), "Layer -2 takes the next index")
        assertPlayersSaveUntouched()
    }

    // P2 (step 0): an index past the last floor of an unbreached building is nothing, and asking creates nothing.
    @Test
    void anIndexPastTheLastFloorOfAnUnbreachedBuildingResolvesToNothing() {
        Game game = new Game(SEED)
        Building building = enteredBuilding(game)
        Universe universe = (Universe) building.findAncestor(Universe.class)
        String pastTheEnd = building.getLIP() + "." + building.maxFloors

        assertNull(universe.resolveLIP(pastTheEnd), "Universe.resolveLIP must not invent a floor in an unbreached building")
        assertNull(WorldGenesis.resolveLIP(universe, pastTheEnd), "WorldGenesis.resolveLIP must not invent a floor in an unbreached building")
        assertEquals(building.maxFloors, building.children.size(), "Resolving must not create a Layer in an unbreached building")
        assertPlayersSaveUntouched()
    }

    private static Game restoredFrom(File scratch) {
        Game fresh = new Game(1L)
        fresh.saveFile = scratch.path
        fresh.restoreSession()
        return fresh
    }

    // R1: the bug. A save made on Layer -1 lands on Layer -1, and the Layer's own mutation comes back with it.
    @Test
    void aSaveMadeOnTheFirstLayerRestoresOnThatLayerInItsSavedMode() {
        File scratch = File.createTempFile("endless-transit-", ".trace")
        try {
            Game game = new Game(SEED)
            game.saveFile = scratch.path
            Building building = enteredBuilding(game)
            building.isBreached = true
            Floor layer = building.getFloor(-1)
            game.enterLocation(layer)
            layer.enterCorridor()
            String layerLip = layer.getLIP()
            SyncManager.sync(game)

            Game fresh = restoredFrom(scratch)

            assertEquals(SEED, fresh.masterLocus.value, "The save must be accepted")
            assertEquals(layerLip, fresh.currentLocation.getLIP(), "The player must stand on the saved Layer")
            Floor restored = (Floor) fresh.currentLocation
            assertEquals(-1, restored.number, "The restored location is Layer -1")
            assertTrue(restored.isAbyssal(), "The restored location is abyssal")
            assertEquals(CorridorState.ID, restored.getMutationState().state, "The Layer's saved mode must be applied")
        } finally {
            scratch.delete()
        }
        assertPlayersSaveUntouched()
    }

    // R2: deeper than the Layer itself - a Room under Layer -2, with the Layers above it re-marked visited.
    @Test
    void aSaveMadeInARoomUnderTheSecondLayerRestoresThereWithItsFootprints() {
        File scratch = File.createTempFile("endless-transit-", ".trace")
        try {
            Game game = new Game(SEED)
            game.saveFile = scratch.path
            Building building = enteredBuilding(game)
            building.isBreached = true
            game.enterLocation(building.getFloor(-1))
            game.enterLocation(building.getFloor(-2))
            while (!(game.currentLocation instanceof Room)) {
                Container here = (Container) game.currentLocation
                here.ensureChildrenPopulated()
                game.enterLocation(here.children[0])
            }
            String roomLip = game.currentLocation.getLIP()
            SyncManager.sync(game)

            Game fresh = restoredFrom(scratch)

            assertEquals(roomLip, fresh.currentLocation.getLIP(), "The player must stand in the saved Room")
            Building restoredBuilding = (Building) fresh.currentLocation.findAncestor(Building.class)
            assertTrue(restoredBuilding.getFloor(-2).isVisited(), "Layer -2 must be re-marked visited")
            assertTrue(restoredBuilding.getFloor(-1).isVisited(), "Layer -1 must be re-marked visited")
        } finally {
            scratch.delete()
        }
        assertPlayersSaveUntouched()
    }

    // R3: the index rule does not depend on which Layer is asked for first (LIP stability).
    @Test
    void aLayerAskedForOutOfOrderStillTakesItsOwnIndex() {
        Game game = new Game(SEED)
        Building building = enteredBuilding(game)
        building.isBreached = true

        Floor third = building.getFloor(-3)
        Floor first = building.getFloor(-1)

        assertEquals((building.maxFloors + 2).toString(), lastIndexOf(third), "Layer -3 takes the third index after the last floor")
        assertEquals(building.maxFloors.toString(), lastIndexOf(first), "Layer -1 takes the first index after the last floor")
        assertPlayersSaveUntouched()
    }
}
