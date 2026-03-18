package com.endlesstransit.model

import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.ui.Terminal
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import static org.junit.jupiter.api.Assertions.*

/**
 * Phase 0.5d safety net: validates that getDescription() and getExtraContent()
 * produce non-empty, content-correct output for all key location types.
 * Required before Phase 5 (ModelOutput.fmt DI refactor) — incorrect constructor
 * injection for any model class would cause blank/broken rendering with no test failing.
 */
class LocationRenderingTest {

    static final int WIDTH = 80

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
    }

    @Test
    void allLocationTypesRenderCorrectly() {
        Game game = new Game(66666L)
        Player player = game.player

        // Navigate down to a Room to gain access to the full ancestor chain
        Location walker = game.currentLocation
        assertTrue(walker instanceof Street, "Game must start at a Street")

        while (!(walker instanceof Room)) {
            Container c = (Container) walker
            c.ensureChildrenPopulated()
            assertFalse(c.children.isEmpty(), "Container ${c.getTypeName()} has no children")
            walker = c.children[0]
        }
        Room room = (Room) walker
        game.enterLocation(room)

        // Resolve all location types from the Room's ancestor chain
        Street street       = (Street)   room.findAncestor(Street)
        Building building   = (Building) room.findAncestor(Building)
        Floor floor         = (Floor)    room.findAncestor(Floor)
        Corridor corridor   = (Corridor) room.findAncestor(Corridor)
        Planet planet       = (Planet)   room.findAncestor(Planet)

        assertNotNull(street,   "Street ancestor must exist")
        assertNotNull(building, "Building ancestor must exist")
        assertNotNull(floor,    "Floor ancestor must exist")
        assertNotNull(corridor, "Corridor ancestor must exist")
        assertNotNull(planet,   "Planet ancestor must exist")

        // ── Street ────────────────────────────────────────────────────────────────
        String streetDesc = street.getDescription()
        assertNotNull(streetDesc, "Street description must not be null")
        assertTrue(streetDesc.contains("Street: "), "Street description must contain 'Street: '")

        List<String> streetContent = street.getExtraContent(player, WIDTH)
        assertNotNull(streetContent, "Street extra content must not be null")
        assertFalse(streetContent.isEmpty(), "Street extra content must not be empty")
        assertTrue(streetContent.any { it?.contains("Buildings on this street:") },
            "Street extra content must list buildings")

        // ── Building ──────────────────────────────────────────────────────────────
        String buildingDesc = building.getDescription()
        assertNotNull(buildingDesc, "Building description must not be null")
        assertFalse(buildingDesc.isEmpty(), "Building description must not be empty")

        List<String> buildingContent = building.getExtraContent(player, WIDTH)
        assertNotNull(buildingContent, "Building extra content must not be null")
        assertFalse(buildingContent.isEmpty(), "Building extra content must not be empty")
        assertTrue(buildingContent.any { it?.contains("BUILDING_STRATA_DIAGNOSTICS") },
            "Building extra content must include strata diagnostics header")

        // ── Floor (elevator mode — isCorridorActive defaults to false) ────────────
        String floorDesc = floor.getDescription()
        assertNotNull(floorDesc, "Floor description must not be null")
        assertTrue(floorDesc.contains("Floor") || floorDesc.contains("Layer"),
            "Floor description must identify the floor")

        floor.ensureChildrenPopulated()
        List<String> floorContent = floor.getExtraContent(player, WIDTH)
        assertNotNull(floorContent, "Floor extra content must not be null")
        assertFalse(floorContent.isEmpty(), "Floor extra content must not be empty")
        assertTrue(floorContent.any { it?.contains("FLOOR_DIAGNOSTIC_SUITE") },
            "Floor extra content (elevator mode) must include diagnostic suite header")

        // ── Corridor ──────────────────────────────────────────────────────────────
        String corridorDesc = corridor.getDescription()
        assertNotNull(corridorDesc, "Corridor description must not be null")
        assertTrue(corridorDesc.contains("[THEME:"), "Corridor description must contain [THEME:]")

        corridor.ensureChildrenPopulated()
        List<String> corridorContent = corridor.getExtraContent(player, WIDTH)
        assertNotNull(corridorContent, "Corridor extra content must not be null")
        assertFalse(corridorContent.isEmpty(), "Corridor extra content must not be empty")
        assertTrue(corridorContent.any { it?.contains("LOCAL_ACCESS_LIST") },
            "Corridor extra content must include local access list header")

        // ── Room ──────────────────────────────────────────────────────────────────
        String roomDesc = room.getDescription()
        assertNotNull(roomDesc, "Room description must not be null")
        assertFalse(roomDesc.isEmpty(), "Room description must not be empty")

        List<String> roomContent = room.getExtraContent(player, WIDTH)
        assertNotNull(roomContent, "Room extra content must not be null")
        assertFalse(roomContent.isEmpty(), "Room extra content must not be empty")
        assertTrue(roomContent.any { it?.contains("LOCAL_CELL_DIAGNOSTIC") },
            "Room extra content must include local cell diagnostic header")

        // ── Planet ────────────────────────────────────────────────────────────────
        String planetDesc = planet.getDescription()
        assertNotNull(planetDesc, "Planet description must not be null")
        assertTrue(planetDesc.contains("Planet: "), "Planet description must contain 'Planet: '")

        planet.ensureChildrenPopulated()
        List<String> planetContent = planet.getExtraContent(player, WIDTH)
        assertNotNull(planetContent, "Planet extra content must not be null")
        assertFalse(planetContent.isEmpty(), "Planet extra content must not be empty")
        assertTrue(planetContent.any { it?.contains("Planetary landmasses scanned:") },
            "Planet extra content must list landmasses")
    }
}
