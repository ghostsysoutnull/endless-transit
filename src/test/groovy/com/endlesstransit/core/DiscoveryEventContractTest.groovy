package com.endlesstransit.core

import com.endlesstransit.model.*
import com.endlesstransit.ui.Terminal
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*

/**
 * HK-010 contract: entering a macro location for the first time publishes
 * LocationDiscovered and the journal records it. Written before the production
 * change (RED on master: nothing publishes), lands with it.
 *
 * D2-D4 call game.journal.reset() after building the Game: that mirrors
 * Game.start() -> startSession(), which clears the start-locus discoveries the
 * constructor publishes before the player sees a frame (plan edge E1).
 */
class DiscoveryEventContractTest {

    static final long SEED = 12345L

    Game game
    Street street
    Building building

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
        game = new Game(SEED)
        street = (Street) game.currentLocation
        street.ensureChildrenPopulated()
        building = (Building) street.children[0]
        assertNotNull(building.getFloor(0), "Seed 12345 first building must have a floor 0")
    }

    private static int discoveries(List<String> entries) {
        entries.count { String e -> e.startsWith("[DISCOVERY]") } as int
    }

    // D1 — publisher contract: one event per new macro path, none for re-entry or a Floor
    @Test
    void markFootprint_publishesOncePerNewMacroPath() {
        EventBus bus = new EventBus()
        List<LocationDiscovered> seen = []
        bus.subscribe(LocationDiscovered) { LocationDiscovered e -> seen << e }
        Player p = new Player(bus)

        p.markFootprint(street)
        assertEquals(1, seen.size(), "First footprint on a Street must publish one discovery")
        assertSame(street, seen[0].location)
        assertEquals(street.getPath(), seen[0].path)
        assertEquals(street.getLIP(), seen[0].lip)

        p.markFootprint(street)
        assertEquals(1, seen.size(), "Re-entering the same Street must not publish again")

        Floor floor = building.getFloor(0)
        p.markFootprint(floor)
        assertEquals(1, seen.size(), "A Floor is not a macro location and must not publish")
        assertTrue(p.visitedLIPs.contains(floor.getLIP()), "The Floor footprint itself is still recorded")
    }

    // D2 — the journal line, exact format, through real navigation
    @Test
    void enteringBuilding_journalsDiscoveryLine() {
        game.journal.reset()
        game.enterLocation(building)

        VibeCapsule v = building.getVibe()
        assertNotNull(v, "Building must resolve a vibe through its ancestors")
        List<String> recent = game.journal.getRecentEvents(1)
        assertEquals(1, recent.size(), "Entering a new building must add exactly one journal event")
        assertEquals("[DISCOVERY] ${building.getPath()} [Era: ${v.timeline}, Resonance: ${v.primaryCulture}]".toString(),
            recent[0])
    }

    // D3 — re-entry and descending to a Floor add no further discovery
    @Test
    void reentryAndFloor_addNoDiscovery() {
        game.journal.reset()
        game.enterLocation(building)
        assertEquals(1, discoveries(game.journal.getRecentEvents(10)))

        game.exitLocation()
        game.enterLocation(building)
        assertEquals(1, discoveries(game.journal.getRecentEvents(10)), "Re-entering the building must not journal again")

        game.enterLocation(building.getFloor(0))
        assertEquals(1, discoveries(game.journal.getRecentEvents(10)), "Entering a Floor must not journal a discovery")
    }

    // D4 — the session file: [LOC] manifest line and the Network Expansion count
    @Test
    void sessionFile_containsLocLineAndNetworkExpansionCount() {
        String testFile = "journal_test.txt"
        String lastEntryFile = "journal-last-entry_test.txt"
        File f = new File(testFile)
        File fLast = new File(lastEntryFile)
        game.journal.journalFile = testFile
        game.journal.lastEntryFile = lastEntryFile
        try {
            game.journal.startSession(game.player)
            game.enterLocation(building)
            game.journal.saveSession(game.player)

            String content = f.text
            assertTrue(content.contains("  >> [LOC] ${building.getPath()}"),
                "Manifest must list the discovered building, got:\n$content")
            assertTrue(content.contains("Network Expansion:     1 macro-locations mapped"),
                "Summary must count exactly one discovery, got:\n$content")
        } finally {
            f.delete()
            fLast.delete()
        }
    }
}
