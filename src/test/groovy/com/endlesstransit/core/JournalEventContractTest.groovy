package com.endlesstransit.core

import com.endlesstransit.model.*
import com.endlesstransit.procgen.LocusSeed
import com.endlesstransit.ui.Terminal
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*

/**
 * Phase 10-0 pre-check (Coverage Claim Protocol step 0).
 *
 * Pins the four capture/synthesis paths that today reach the journal and the
 * Abyssal ritual through direct JournalManager calls from the model. Every
 * assertion is on the public surface — the journal ticker and Building ritual
 * state — so the test is indifferent to whether the path is a direct call or a
 * domain event. Literals captured from master before any production change.
 *
 * All actors are game.player: a Player built by GameState is the one wired to
 * the game's listeners (declared edge E1 in the Phase 10 plan).
 */
class JournalEventContractTest {

    Game game
    Building bldg
    Floor floor
    Room room

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
        JournalManager.reset()
        game = new Game()                       // sets ProceduralFactory.instance.fmt
        bldg = new Building(new LocusSeed(0L))
        bldg.name = "Contract Tower"
        bldg.maxFloors = 1
        bldg.apartmentsPerFloor = 2
        bldg.culture = "monolith"
        bldg.timeline = "ancient"
        bldg.fmt = game.fmt
        floor = bldg.getFloor(0)
        room = floor.getCorridor().getApartments()[0].getRooms()[0]
        assertNotNull(room, "Chain Building > Floor > Corridor > Apartment > Room must resolve")
        assertSame(bldg, room.findAncestor(Building), "Room must sit under the test building")
    }

    // P1 — capture through the room option reaches the journal and samples the floor
    @Test
    void roomOptionCapture_journalsCaptureAndSamplesFloor() {
        room.objects = ["Contract Crystal"]
        room.markVisited()
        assertTrue(bldg.sampledFloors.isEmpty(), "Precondition: no floor sampled yet")

        Closure take = room.getOptions(game)["t. Interact with objects"]
        assertNotNull(take, "Single-object take option must exist")
        take.call()

        assertEquals(1, game.player.inventory.size(), "Object must land in the player's buffer")
        assertTrue(bldg.sampledFloors.contains(0), "Capture inside floor 0 must sample floor 0 on the building")
        List<String> recent = JournalManager.getRecentEvents(1)
        assertEquals(1, recent.size(), "Capture must add exactly one journal event")
        assertTrue(recent[0].startsWith("[CAPTURE]   Contract Crystal ("),
            "Journal event must be the capture line, got: ${recent[0]}")
    }

    // P2 — synthesis inside a building journals the hybrid and advances infusion by one
    @Test
    void synthesisInsideBuilding_journalsSynthesisAndAdvancesInfusion() {
        game.player.inventory.add(new InventoryItem("Alpha", 100))
        game.player.inventory.add(new InventoryItem("Beta", 200))
        assertEquals(0, bldg.infusionCount, "Precondition: unprimed building")

        game.player.mergeItems(0, 1, floor)

        assertEquals(1, bldg.infusionCount, "One synthesis inside the building must add exactly one infusion")
        assertEquals(1, game.player.inventory.size(), "Two fragments must collapse into one hybrid")
        List<String> recent = JournalManager.getRecentEvents(1)
        assertEquals(1, recent.size(), "Synthesis must add exactly one journal event")
        assertTrue(recent[0].startsWith("[SYNTHESIS] ${game.player.inventory[0].name} ("),
            "Journal event must be the synthesis line, got: ${recent[0]}")
    }

    // P3 — the hidden-frequency capture in processAction journals and samples the floor
    @Test
    void processActionHiddenFrequency_journalsCaptureAndSamplesFloor() {
        int before = game.player.inventory.size()
        int step = 0
        while (game.player.inventory.size() == before && step < 200) {
            game.player.stepCount = step
            room.processAction(game.player)
            step++
        }
        assertTrue(game.player.inventory.size() > before,
            "Seed 0 room must yield a hidden frequency within 200 steps")

        InventoryItem hidden = game.player.inventory.last()
        assertEquals("Hidden Frequency", hidden.name)
        assertTrue(bldg.sampledFloors.contains(0), "Hidden-frequency capture must sample floor 0")
        List<String> recent = JournalManager.getRecentEvents(1)
        assertEquals(1, recent.size(), "Hidden-frequency capture must add exactly one journal event")
        assertTrue(recent[0].startsWith("[CAPTURE]   Hidden Frequency ("),
            "Journal event must be the capture line, got: ${recent[0]}")
    }

    // P4 — the NullSector echo capture journals the capture (no building → no ritual effect)
    @Test
    void nullSectorEchoCapture_journalsCapture() {
        NullSector sector = new NullSector("Contract Void", new LocusSeed(7L))
        sector.fmt = game.fmt
        sector.signalStrength = 100

        Closure capture = sector.getOptions(game)["c. Capture Spectral Echo"]
        assertNotNull(capture, "Echo capture option must exist at full signal")
        capture.call()

        assertTrue(sector.echoFound, "Echo must be marked found")
        assertEquals("Spectral Echo", game.player.inventory.last().name)
        List<String> recent = JournalManager.getRecentEvents(1)
        assertEquals(1, recent.size(), "Echo capture must add exactly one journal event")
        assertTrue(recent[0].startsWith("[CAPTURE]   Spectral Echo ("),
            "Journal event must be the capture line, got: ${recent[0]}")
    }
}
