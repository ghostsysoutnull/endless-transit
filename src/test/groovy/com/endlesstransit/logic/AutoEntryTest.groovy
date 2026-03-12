package com.endlesstransit.logic

import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import static org.junit.jupiter.api.Assertions.*
import com.endlesstransit.core.*
import com.endlesstransit.model.*
import com.endlesstransit.procgen.LocusSeed

class AutoEntryTest {
    GameState state
    NavigationOrchestrator nav

    @BeforeEach
    void setup() {
        state = new GameState(new LocusSeed(1L), new MockInputSource([]))
        state.player = new Player()
        nav = new NavigationOrchestrator(state)
    }

    @Test
    void "test apartment auto entry"() {
        def corridor = new Corridor(1, "rust", "ancient", new LocusSeed(1L))
        def apt = new Apartment("Standard Door", "rust", "ancient", new LocusSeed(1L))
        corridor.addLocation(apt)
        apt.parent = corridor
        
        apt.ensureChildrenPopulated()
        def firstRoom = apt.getRooms()[0]

        nav.enterLocation(apt)

        assertEquals(firstRoom, state.currentLocation, "Should have auto-jumped to the first room")
        assertTrue(state.player.visitedLIPs.contains(apt.getLIP()), "Apartment should be marked visited")
    }
}
