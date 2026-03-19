package com.endlesstransit.ui

import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.model.*
import com.endlesstransit.procgen.LocusSeed
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import static org.junit.jupiter.api.Assertions.*

/**
 * Phase 0.5f safety net: validates BridgeView structural invariants at 3 location depths.
 * Required before Phase 7 (BridgeView decomposition into ViewComponent instances) —
 * extracting components without this baseline could shift column alignment or drop
 * a separator with no existing test catching it.
 */
class BridgeViewStructureTest {

    static final LocusSeed SEED = new LocusSeed(12345L)

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
    }

    @Test
    void bridgeView_streetDepth_structuralInvariants() {
        Game game = new Game(SEED.value)
        assertTrue(game.currentLocation instanceof Street, "Game must start at Street")

        ScreenBuffer buffer = renderAt(game)

        VisualAssertionEngine.verify(buffer) {
            isBoxedCorrectly()
            contains("PULSE_TRAVERSAL")
            contains("COHERENCE")
            contains("LOCUS_TRACE")
            contains("╬")                  // compass centre
            contains("NEURAL_MAP: STREET") // right-pane content
        }
    }

    @Test
    void bridgeView_buildingDepth_structuralInvariants() {
        Game game = new Game(SEED.value)
        Street street = (Street) game.currentLocation
        street.ensureChildrenPopulated()
        Building building = (Building) street.children.find { it instanceof Building }
        assertNotNull(building, "Street must have a Building child")
        game.enterLocation(building)

        ScreenBuffer buffer = renderAt(game)

        VisualAssertionEngine.verify(buffer) {
            isBoxedCorrectly()
            contains("PULSE_TRAVERSAL")
            contains("COHERENCE")
            contains("LOCUS_TRACE")
            contains("╬")
            contains("BUILDING_STRATA_DIAGNOSTICS") // right-pane: building strata
        }
    }

    @Test
    void bridgeView_roomDepth_structuralInvariants() {
        Game game = new Game(SEED.value)

        // Walk children[0] down to a Room
        Location walker = game.currentLocation
        while (!(walker instanceof Room)) {
            Container c = (Container) walker
            c.ensureChildrenPopulated()
            walker = c.children[0]
        }
        game.enterLocation((Room) walker)
        assertTrue(game.currentLocation instanceof Room, "Must be at Room depth")

        ScreenBuffer buffer = renderAt(game)

        VisualAssertionEngine.verify(buffer) {
            isBoxedCorrectly()
            contains("PULSE_TRAVERSAL")
            contains("COHERENCE")
            contains("LOCUS_TRACE")
            contains("╬")
            contains("LOCAL_CELL_DIAGNOSTIC") // right-pane: room diagnostic
        }
    }

    // ── helpers ────────────────────────────────────────────────────────────────

    private static ScreenBuffer renderAt(Game game) {
        BridgeView bridgeView = new BridgeView()
        Map<String, Closure> options = game.currentLocation.getOptions(game)
        bridgeView.render(game.currentLocation, game.player, options, SEED)
        return bridgeView.capture(game.inputHandler.getHistory())
    }
}
