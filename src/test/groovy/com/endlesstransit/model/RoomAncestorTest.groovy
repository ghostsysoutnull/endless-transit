package com.endlesstransit.model

import com.endlesstransit.core.Game
import com.endlesstransit.ui.Terminal
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import static org.junit.jupiter.api.Assertions.*

/**
 * Phase 0.5c safety net: validates Room's parent chain traversal via findAncestor().
 * Required before Phase 4a (LeafLocation abstract base extraction) — if parent wiring
 * breaks during the extraction of shared fields into AbstractLeafLocation, navigation
 * silently fails with no existing test catching it.
 */
class RoomAncestorTest {

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
    }

    @Test
    void room_ancestorChainIsCorrectlyWired() {
        Game game = new Game(33333L)

        // Walk children[0] down the hierarchy until we reach a Room.
        // NavigationOrchestrator auto-enters the first Room when an Apartment
        // is passed to enterLocation(), so we navigate the tree manually first.
        Location walker = game.currentLocation
        assertTrue(walker instanceof Street, "Game must start at a Street")

        while (!(walker instanceof Room)) {
            assertTrue(walker instanceof Container,
                "Unexpected non-Container, non-Room node: ${walker.class.simpleName}")
            Container c = (Container) walker
            c.ensureChildrenPopulated()
            assertFalse(c.children.isEmpty(),
                "Container ${c.getTypeName()} '${c.getName()}' has no children")
            walker = c.children[0]
        }

        Room room = (Room) walker
        game.enterLocation(room)
        assertEquals(room, game.currentLocation, "currentLocation must be the Room after enterLocation")

        String roomLIP = room.getLIP()
        assertNotNull(roomLIP, "Room LIP must not be null")
        assertFalse(roomLIP.isEmpty(), "Room LIP must not be empty")

        // --- Apartment ancestor ---
        Apartment apartment = (Apartment) room.findAncestor(Apartment)
        assertNotNull(apartment, "Room must have an Apartment ancestor")
        assertTrue(roomLIP.startsWith(apartment.getLIP()),
            "Room LIP (${roomLIP}) must start with Apartment LIP (${apartment.getLIP()})")

        // --- Corridor ancestor ---
        Corridor corridor = (Corridor) room.findAncestor(Corridor)
        assertNotNull(corridor, "Room must have a Corridor ancestor")
        assertTrue(roomLIP.startsWith(corridor.getLIP()),
            "Room LIP (${roomLIP}) must start with Corridor LIP (${corridor.getLIP()})")

        // --- Floor ancestor ---
        Floor floor = (Floor) room.findAncestor(Floor)
        assertNotNull(floor, "Room must have a Floor ancestor")
        assertTrue(roomLIP.startsWith(floor.getLIP()),
            "Room LIP (${roomLIP}) must start with Floor LIP (${floor.getLIP()})")

        // --- Building ancestor ---
        Building building = (Building) room.findAncestor(Building)
        assertNotNull(building, "Room must have a Building ancestor")
        assertTrue(roomLIP.startsWith(building.getLIP()),
            "Room LIP (${roomLIP}) must start with Building LIP (${building.getLIP()})")

        // --- Parent references are consistent (apartment IS the room's direct parent) ---
        assertEquals(apartment, room.parent,
            "Room's direct parent must be its Apartment ancestor")
        assertEquals(corridor, apartment.parent,
            "Apartment's direct parent must be its Corridor ancestor")
        assertEquals(floor, corridor.parent,
            "Corridor's direct parent must be its Floor ancestor")
        assertEquals(building, floor.parent,
            "Floor's direct parent must be its Building ancestor")

        // --- getDepth() ---
        assertTrue(room.getDepth() > 0, "Room depth must be positive")
        assertEquals(apartment.getDepth() + 1, room.getDepth(),
            "Room depth must equal its parent apartment depth + 1")

        // --- getPath() ---
        String path = room.getPath()
        assertTrue(path.contains(room.getName()),
            "Room path must contain the room name")
        assertTrue(path.contains(apartment.getName()),
            "Room path must contain at least one ancestor name segment")
    }
}
