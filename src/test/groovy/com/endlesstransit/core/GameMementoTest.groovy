package com.endlesstransit.core

import com.endlesstransit.ui.Terminal
import com.endlesstransit.model.Location
import groovy.test.GroovyTestCase

class GameMementoTest extends GroovyTestCase {

    void setUp() {
        Terminal.initialize(true, true)
    }

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
        assertFalse("LIP should have changed after navigation", startLIP == midLIP)
        
        // 3. Create Memento
        GameMemento memento = game.createMemento()
        assertEquals("Memento should store current LIP", midLIP, memento.currentLIP)
        
        // 4. Play more steps
        game.processTurn()
        def nextOpts = game.currentLocation.getOptions(game)
        game.mapper.update(nextOpts)
        game.handleInput() // Choice "01" again
        
        Location endLoc = game.currentLocation
        String endLIP = endLoc.getLIP()
        assertFalse("LIP should have changed further", midLIP == endLIP)
        
        // 5. Restore Memento
        game.restore(memento)
        
        // 6. Verify restoration
        assertEquals("Master seed should be restored", seed, game.masterLocus.value)
        assertEquals("LIP should be restored to midLoc", midLIP, game.currentLocation.getLIP())
        assertEquals("Player coherence should be restored", memento.playerCoherence, game.player.coherence)
        
        println "SUCCESS: Game state perfectly restored from Memento."
    }
}
