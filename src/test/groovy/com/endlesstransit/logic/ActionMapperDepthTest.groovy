package com.endlesstransit.logic

import com.endlesstransit.core.*
import com.endlesstransit.model.*
import com.endlesstransit.ui.Terminal
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import static org.junit.jupiter.api.Assertions.*

/**
 * Phase 0.5e safety net: verifies ActionMapper resolves choices correctly at
 * three distinct navigation depths (street, corridor, room).
 * Required before Phase 6 (GameState decomposition / ActionMapper move to TurnProcessor)
 * — moving ActionMapper without coverage at multiple depths risks silent resolution
 * failures at depths other than building-floor navigation.
 */
class ActionMapperDepthTest {

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
        com.endlesstransit.model.ModelOutput.fmt = new com.endlesstransit.ui.StandardTerminalAdapter()
    }

    @Test
    void actionMapper_resolvesChoicesAtStreetDepth() {
        Game game = new Game(11111L, new MockInputSource([]))
        assertTrue(game.currentLocation instanceof Street, "Game must start at a Street")
        Street street = (Street) game.currentLocation

        Map<String, Closure> options = street.getOptions(game)
        assertFalse(options.isEmpty(), "Street must have building options")

        ActionMapper mapper = game.state.mapper
        mapper.update(options)

        // "01" should resolve to the first building
        Closure action = mapper.resolve("01", game.state.inputHandler)
        assertNotNull(action, "ActionMapper must resolve '01' at street level")
        action.call()

        assertTrue(game.currentLocation instanceof Building,
            "Resolving '01' at street level must navigate into a Building")
    }

    @Test
    void actionMapper_resolvesChoicesAtCorridorDepth() {
        Game game = new Game(22222L, new MockInputSource([]))
        assertTrue(game.currentLocation instanceof Street, "Game must start at a Street")

        // Navigate: Street -> Building -> Floor -> activate corridor
        Street street = (Street) game.currentLocation
        street.ensureChildrenPopulated()
        Building building = (Building) street.children.find { it instanceof Building }
        assertNotNull(building, "No building found")
        game.enterLocation(building)

        building.ensureChildrenPopulated()
        Floor floor = (Floor) building.children.find { it instanceof Floor }
        assertNotNull(floor, "No floor found")
        game.enterLocation(floor)
        floor.isCorridorActive = true  // activate corridor mode

        Map<String, Closure> corridorOptions = floor.getOptions(game)
        assertFalse(corridorOptions.isEmpty(), "Corridor mode must have apartment options")

        ActionMapper mapper = game.state.mapper
        mapper.update(corridorOptions)

        // "01" should resolve to the first apartment (auto-enters first Room)
        Closure action = mapper.resolve("01", game.state.inputHandler)
        assertNotNull(action, "ActionMapper must resolve '01' at corridor depth")
        action.call()

        // Apartment auto-entry means we land in a Room
        assertTrue(game.currentLocation instanceof Room,
            "Resolving '01' at corridor depth must navigate into a Room (via apartment auto-entry)")
    }

    @Test
    void actionMapper_resolvesChoicesAtRoomDepth() {
        Game game = new Game(44444L, new MockInputSource([]))

        // Navigate all the way to a Room
        Location walker = game.currentLocation
        while (!(walker instanceof Room)) {
            Container c = (Container) walker
            c.ensureChildrenPopulated()
            walker = c.children[0]
        }
        game.enterLocation((Room) walker)
        assertTrue(game.currentLocation instanceof Room, "Must be at a Room")

        Map<String, Closure> roomOptions = game.currentLocation.getOptions(game)
        assertFalse(roomOptions.isEmpty(), "Room must have options")

        ActionMapper mapper = game.state.mapper
        mapper.update(roomOptions)

        // "l" (Exit Apartment / leave) must always be resolvable from a Room
        Closure leaveAction = mapper.resolve("l", game.state.inputHandler)
        assertNotNull(leaveAction, "ActionMapper must resolve 'l' (leave/exit) at room depth")
        leaveAction.call()

        // After leaving, we must no longer be in the Room
        assertFalse(game.currentLocation instanceof Room,
            "Resolving 'l' at room depth must exit the Room")
    }
}
