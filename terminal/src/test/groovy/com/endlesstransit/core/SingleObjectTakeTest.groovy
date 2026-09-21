package com.endlesstransit.core
import com.endlesstransit.ui.Terminal
import com.endlesstransit.model.*
import com.endlesstransit.core.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import static org.junit.jupiter.api.Assertions.*

class SingleObjectTakeTest {

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
    }

    @Test
    void execute() {
        Terminal.println "Running Single Object Automatic Take Test..."

        def player = new Player()
        def game = new Game()
        game.player = player

        // Setup a room with exactly one object
        def room = new Room()
        room.fmt = game.fmt
        room.objects = ["Singular Crystal"]
        room.markVisited()

        def options = room.getOptions(game)
        def takeAction = options["t. Interact with objects"]

        assertNotNull(takeAction, "Take option not found in room.")

        Terminal.println "Executing take action for single object..."
        takeAction.call()
        
        assertEquals(1, player.inventory.size(), "Object should be taken automatically.")
        assertEquals("Singular Crystal", player.inventory[0].name, "Correct object taken.")
        assertTrue(room.objects.isEmpty(), "Object was removed from room.")

        Terminal.println "All Single Object Take Tests Passed!"
    }
}
