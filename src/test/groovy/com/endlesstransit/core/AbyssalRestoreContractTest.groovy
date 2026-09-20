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
}
