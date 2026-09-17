package com.endlesstransit.model

import com.endlesstransit.core.Game
import com.endlesstransit.ui.Terminal
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import static org.junit.jupiter.api.Assertions.*

/**
 * HK-019 (Coverage Claim Protocol): where `l` lands from a floor, in either mode, and on the way back
 * out of an apartment. Every step is driven through the option closures, like {@link FloorStateContractTest}.
 */
class CorridorLeaveContractTest {

    static final long SEED = 12345L
    static final String ENTER_CORRIDOR = "c. Enter Corridor"

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
    }

    /** Street -> first Building -> the given floor, entered. */
    private static Floor floorOf(Game game, int number) {
        Street street = (Street) game.currentLocation
        street.ensureChildrenPopulated()
        Building building = (Building) street.children.find { it instanceof Building }
        assertNotNull(building, "No building on street")
        game.enterLocation(building)
        Floor floor = building.getFloor(number)
        assertNotNull(floor, "No floor ${number} in building")
        game.enterLocation(floor)
        return floor
    }

    /** Calls the one option of the current location whose key is `l`. */
    private static void pressLeave(Game game) {
        Map.Entry<String, Closure> leave = game.currentLocation.getOptions(game).find { it.key.startsWith("l. ") }
        assertNotNull(leave, "No 'l' option at ${game.currentLocation.getClass().simpleName}")
        leave.value.call()
    }

    // P1 — the corridor's `l` skips the elevator and lands on the Building
    @Test
    void corridorModeLeaveLandsOnTheBuilding() {
        Game game = new Game(SEED)
        Floor floor = floorOf(game, 1)
        floor.getOptions(game)[ENTER_CORRIDOR].call()

        pressLeave(game)
        assertSame(floor.parent, game.currentLocation, "Corridor-mode 'l' must land on the Building")
    }

    // P2 — the elevator's `l` lands on the Building and leaves the mode alone
    @Test
    void elevatorModeLeaveLandsOnTheBuildingAndKeepsElevatorMode() {
        Game game = new Game(SEED)
        Floor floor = floorOf(game, 1)

        pressLeave(game)
        assertSame(floor.parent, game.currentLocation, "Elevator-mode 'l' must land on the Building")
        assertSame(ElevatorState.INSTANCE, floor.currentState, "Leaving from the elevator must not change the mode")
    }

    // P3 — coming back out of an apartment keeps the corridor: Room -> Corridor -> Floor still in corridor mode
    @Test
    void leavingAnApartmentKeepsCorridorMode() {
        Game game = new Game(SEED)
        Floor floor = floorOf(game, 1)
        floor.getOptions(game)[ENTER_CORRIDOR].call()
        floor.getOptions(game).find { it.key.startsWith("01. ") }.value.call()
        assertTrue(game.currentLocation instanceof Room, "Door 01 must auto-enter the first Room")

        pressLeave(game)
        assertSame(floor.getCorridor(), game.currentLocation, "A Room's 'l' must land on the Corridor")
        assertSame(CorridorState.INSTANCE, floor.currentState, "Leaving an apartment must keep corridor mode")

        pressLeave(game)
        assertSame(floor, game.currentLocation, "The Corridor's 'l' must land on the Floor")
        assertSame(CorridorState.INSTANCE, floor.currentState, "Returning from the Corridor must keep corridor mode")
    }
}
