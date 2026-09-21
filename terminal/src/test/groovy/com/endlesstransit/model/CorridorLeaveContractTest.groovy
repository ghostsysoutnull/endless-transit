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

    private static void assertBackAtTheElevator(Floor floor, Game game) {
        assertSame(floor.parent, game.currentLocation, "The walk must end on the Building")
        assertSame(ElevatorState.INSTANCE, floor.currentState, "A floor left from the corridor must return to elevator mode")
        assertEquals(ElevatorState.ID, floor.getMutationState().state, "The saved mode must be the elevator")

        game.enterLocation(floor)
        assertTrue(floor.getOptions(game).containsKey(ENTER_CORRIDOR), "The next visit must open on the elevator menu")
    }

    // P4 — HK-019: the corridor's `l` hands the floor back to the elevator
    @Test
    void corridorModeLeaveReturnsTheFloorToTheElevator() {
        Game game = new Game(SEED)
        Floor floor = floorOf(game, 1)
        floor.getOptions(game)[ENTER_CORRIDOR].call()

        pressLeave(game)
        assertBackAtTheElevator(floor, game)
        assertTrue(floor.getOptions(game).containsKey("u. Go Up"), "The elevator menu must offer 'u' again")
    }

    // P4b — the full walk-out (also what Enter-repeat drives): Room -> Corridor -> Floor -> Building
    @Test
    void walkingOutOfAnApartmentToTheBuildingReturnsTheFloorToTheElevator() {
        Game game = new Game(SEED)
        Floor floor = floorOf(game, 1)
        floor.getOptions(game)[ENTER_CORRIDOR].call()
        floor.getOptions(game).find { it.key.startsWith("01. ") }.value.call()

        pressLeave(game)
        pressLeave(game)
        pressLeave(game)
        assertBackAtTheElevator(floor, game)
    }

    // P5 — the bedrock floor honours the same rule
    @Test
    void bedrockFloorReturnsToTheElevatorToo() {
        Game game = new Game(SEED)
        Floor first = floorOf(game, 1)
        Building building = (Building) first.parent
        building.isBreached = true
        Floor bedrock = building.getFloor(-1)
        assertNotNull(bedrock, "Breached building must expose Floor -1")
        game.enterLocation(bedrock)
        bedrock.getOptions(game)[ENTER_CORRIDOR].call()

        pressLeave(game)
        assertBackAtTheElevator(bedrock, game)
    }
}
