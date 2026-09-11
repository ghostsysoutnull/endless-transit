package com.endlesstransit.model

import com.endlesstransit.core.Game
import com.endlesstransit.core.InputHandler
import com.endlesstransit.core.MockInputSource
import com.endlesstransit.ui.Terminal
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import static org.junit.jupiter.api.Assertions.*

/**
 * Phase 8-0 pre-check (Coverage Claim Protocol): pins the Floor mode contract before the
 * isCorridorActive boolean becomes a FloorState object.
 *
 * Every transition is driven through the option closures ("c. Enter Corridor",
 * "b. Back to Elevator") so this test references neither the boolean nor its successor,
 * and stays valid unchanged across the refactor.
 */
class FloorStateContractTest {

    static final long SEED = 12345L
    static final int WIDTH = 88
    static final String ENTER_CORRIDOR = "c. Enter Corridor"
    static final String BACK_TO_ELEVATOR = "b. Back to Elevator"
    static final String ELEVATOR_HEADER = "FLOOR_DIAGNOSTIC_SUITE"
    static final String CORRIDOR_SCAN_MARKER = "[DATA_SUMMARY]"
    static final String BUILDING_SCAN_MARKER = "NEURAL_PROXIMITY_REPORT:"

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
        // ScanCommand ends with waitForEnter(); one newline per scan issued below.
        InputHandler.defaultSource = new MockInputSource(["\n", "\n", "\n", "\n"])
    }

    /** Street -> first Building -> first Floor, entered. */
    private static Floor firstFloor(Game game) {
        Street street = (Street) game.currentLocation
        street.ensureChildrenPopulated()
        Building building = (Building) street.children.find { it instanceof Building }
        assertNotNull(building, "No building on street")
        game.enterLocation(building)
        building.ensureChildrenPopulated()
        Floor floor = (Floor) building.children.find { it instanceof Floor }
        assertNotNull(floor, "No floor in building")
        game.enterLocation(floor)
        return floor
    }

    private static List<String> keys(Floor floor, Game game) {
        return new ArrayList<String>(floor.getOptions(game).keySet())
    }

    private static void assertCorridorContract(Floor floor, Game game) {
        Map<String, Closure> options = floor.getOptions(game)
        List<String> expectedKeys = [BACK_TO_ELEVATOR] + new ArrayList<String>(floor.getCorridor().getOptions(game).keySet())
        assertEquals(expectedKeys, new ArrayList<String>(options.keySet()),
            "Corridor-mode menu must be 'b. Back to Elevator' followed by the Corridor's own options, in order")
        assertFalse(options.containsKey(ENTER_CORRIDOR), "Corridor mode must not offer 'c. Enter Corridor'")

        List<String> expectedContent = floor.getCorridor().getExtraContent(game.player, WIDTH)
        assertEquals(expectedContent, floor.getExtraContent(game.player, WIDTH),
            "Corridor-mode extra content must be exactly the Corridor's extra content")
    }

    private static void assertElevatorContract(Floor floor, Game game, List<String> expectedKeys) {
        assertEquals(expectedKeys, keys(floor, game), "Elevator-mode menu keys must match")
        List<String> content = floor.getExtraContent(game.player, WIDTH)
        assertTrue(content.any { it?.contains(ELEVATOR_HEADER) },
            "Elevator-mode extra content must carry the ${ELEVATOR_HEADER} header")
    }

    @Test
    void corridorModeDelegatesMenuAndContentToCorridor() {
        Game game = new Game(SEED)
        Floor floor = firstFloor(game)

        List<String> elevatorKeys = keys(floor, game)
        assertTrue(elevatorKeys.contains(ENTER_CORRIDOR), "Fresh floor must start in elevator mode")
        assertElevatorContract(floor, game, elevatorKeys)

        floor.getOptions(game)[ENTER_CORRIDOR].call()
        assertCorridorContract(floor, game)
    }

    @Test
    void backToElevatorRestoresElevatorMenuAndDiagnostics() {
        Game game = new Game(SEED)
        Floor floor = firstFloor(game)
        List<String> elevatorKeys = keys(floor, game)

        floor.getOptions(game)[ENTER_CORRIDOR].call()
        assertFalse(keys(floor, game).contains(ENTER_CORRIDOR), "Sanity: now in corridor mode")

        floor.getOptions(game)[BACK_TO_ELEVATOR].call()
        assertElevatorContract(floor, game, elevatorKeys)
    }

    @Test
    void bedrockFloorHonoursTheSameContract() {
        Game game = new Game(SEED)
        Floor floor = firstFloor(game)
        Building building = (Building) floor.parent
        building.isBreached = true
        Floor bedrock = building.getFloor(-1)
        assertNotNull(bedrock, "Breached building must expose Floor -1")
        game.enterLocation(bedrock)
        assertTrue(bedrock.isAbyssal(), "Floor -1 must be abyssal")

        List<String> elevatorKeys = keys(bedrock, game)
        assertElevatorContract(bedrock, game, elevatorKeys)

        bedrock.getOptions(game)[ENTER_CORRIDOR].call()
        assertCorridorContract(bedrock, game)

        bedrock.getOptions(game)[BACK_TO_ELEVATOR].call()
        assertElevatorContract(bedrock, game, elevatorKeys)
    }

    @Test
    void mutationStateRoundTripsCorridorMode() {
        Game game = new Game(SEED)
        Floor floor = firstFloor(game)
        List<String> elevatorKeys = keys(floor, game)

        floor.getOptions(game)[ENTER_CORRIDOR].call()
        Map<String, Object> corridorSnapshot = floor.getMutationState()
        assertFalse(corridorSnapshot.isEmpty(), "Floor mutation state must be non-empty in corridor mode")

        floor.getOptions(game)[BACK_TO_ELEVATOR].call()
        Map<String, Object> elevatorSnapshot = floor.getMutationState()
        assertFalse(elevatorSnapshot.isEmpty(), "Floor mutation state must be non-empty in elevator mode")
        assertNotEquals(corridorSnapshot, elevatorSnapshot, "The two modes must serialize differently")
        assertElevatorContract(floor, game, elevatorKeys)

        floor.applyMutationState(corridorSnapshot)
        assertCorridorContract(floor, game)

        floor.applyMutationState(elevatorSnapshot)
        assertElevatorContract(floor, game, elevatorKeys)
    }

    @Test
    void scanCommandFollowsFloorMode() {
        Game game = new Game(SEED)
        Floor floor = firstFloor(game)

        Terminal.virtualBuffer.clear()
        game.processInput("s")
        String elevatorScan = Terminal.virtualBuffer.getBuffer().join("\n")
        assertTrue(elevatorScan.contains(BUILDING_SCAN_MARKER), "Elevator-mode scan must render the building scan")
        assertFalse(elevatorScan.contains(CORRIDOR_SCAN_MARKER), "Elevator-mode scan must not render the corridor scan")

        floor.getOptions(game)[ENTER_CORRIDOR].call()
        Terminal.virtualBuffer.clear()
        game.processInput("s")
        String corridorScan = Terminal.virtualBuffer.getBuffer().join("\n")
        assertTrue(corridorScan.contains(CORRIDOR_SCAN_MARKER), "Corridor-mode scan must render the corridor scan")
        assertFalse(corridorScan.contains(BUILDING_SCAN_MARKER), "Corridor-mode scan must not render the building scan")
    }
}
