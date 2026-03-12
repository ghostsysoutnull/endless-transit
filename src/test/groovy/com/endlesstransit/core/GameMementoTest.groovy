package com.endlesstransit.core

import com.endlesstransit.ui.Terminal
import com.endlesstransit.model.Location
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import static org.junit.jupiter.api.Assertions.*

class GameMementoTest {

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
    }

    @Test
    void testMementoCaptureAndRestore() {
        // 1. Initialize Game with a fixed seed
        long seed = 12345L
        MockInputSource mockInput = new MockInputSource(["01", "01"]) // Move a bit
        Game game = new Game(seed, mockInput)
        
        // Initial state
        Location startLoc = game.currentLocation
        String startLIP = startLoc.getLIP()
        int startCoherence = game.player.coherence
        
        // 2. Play a few steps
        game.processTurn() // Turn 1 (enter/process action)
        
        def opts = game.currentLocation.getOptions(game)
        game.mapper.update(opts)
        
        game.handleInput() // Turn 1 (navigation choice "01")
        
        Location midLoc = game.currentLocation
        String midLIP = midLoc.getLIP()
        assertFalse(startLIP == midLIP, "LIP should have changed after navigation")
        
        // 3. Create Memento
        GameMemento memento = game.createMemento()
        assertEquals(midLIP, memento.currentLIP, "Memento should store current LIP")
        
        // 4. Play more steps
        game.processTurn()
        def nextOpts = game.currentLocation.getOptions(game)
        game.mapper.update(nextOpts)
        game.handleInput() // Choice "01" again
        
        Location endLoc = game.currentLocation
        String endLIP = endLoc.getLIP()
        assertFalse(midLIP == endLIP, "LIP should have changed further")
        
        // 5. Restore Memento
        game.restore(memento)
        
        // 6. Verify restoration
        assertEquals(seed, game.masterLocus.value, "Master seed should be restored")
        assertEquals(midLIP, game.currentLocation.getLIP(), "LIP should be restored to midLoc")
        assertEquals(memento.playerCoherence, game.player.coherence, "Player coherence should be restored")
        
        Terminal.println "SUCCESS: Game state perfectly restored from Memento."
    }
}
