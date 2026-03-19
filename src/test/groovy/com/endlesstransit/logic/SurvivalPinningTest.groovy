package com.endlesstransit.logic

import com.endlesstransit.core.*
import com.endlesstransit.model.*
import com.endlesstransit.procgen.LocusSeed
import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*

class SurvivalPinningTest {

    @Test
    void pinStandardDrain() {
        Game game = new Game(12345L, new MockInputSource(["01"]))
        game.player.coherence = 100.0

        // Ensure standard location (not Abyssal, not Entropic)
        Room room = new Room()
        room.locus = new LocusSeed(1L)
        room.fmt = game.fmt
        room.parent = new Apartment() // Default vibes are standard
        game.state.currentLocation = room
        
        game.processTurn()
        assertEquals(99.0, game.player.coherence, 0.001, "Standard drain should be 1.0")
    }

    @Test
    void pinAbyssalDrain() {
        Game game = new Game(12345L, new MockInputSource(["01"]))
        game.player.coherence = 100.0

        // Mock Abyssal location
        def room = new Room() {
            @Override boolean isAbyssal() { return true }
        }
        room.locus = new LocusSeed(1L)
        room.fmt = game.fmt
        room.parent = new Apartment()
        game.state.currentLocation = room
        
        game.processTurn()
        assertEquals(98.0, game.player.coherence, 0.001, "Abyssal drain should be 2.0")
    }

    @Test
    void pinEntropicDrain() {
        Game game = new Game(12345L, new MockInputSource(["01"]))
        game.player.coherence = 100.0

        // Mock Entropic vibe
        def room = new Room() {
            @Override VibeCapsule getVibe() { return new VibeCapsule("entropic", "rust", "void") }
        }
        room.locus = new LocusSeed(1L)
        room.fmt = game.fmt
        game.state.currentLocation = room
        
        game.processTurn()
        assertEquals(98.0, game.player.coherence, 0.001, "Entropic drain should be 2.0")
    }

    @Test
    void pinAbyssalEntropicDrain() {
        Game game = new Game(12345L, new MockInputSource(["01"]))
        game.player.coherence = 100.0

        // Mock Abyssal + Entropic
        def room = new Room() {
            @Override boolean isAbyssal() { return true }
            @Override VibeCapsule getVibe() { return new VibeCapsule("entropic", "rust", "void") }
        }
        room.locus = new LocusSeed(1L)
        room.fmt = game.fmt
        game.state.currentLocation = room
        
        game.processTurn()
        assertEquals(96.0, game.player.coherence, 0.001, "Combined drain should be 4.0")
    }

    @Test
    void pinRebootTrigger() {
        Game game = new Game(12345L, new MockInputSource(["\n"])) // Wait for enter
        game.player.coherence = 0.5
        
        // Standard drain (1.0) will push it to -0.5, triggering reboot
        Room room = new Room()
        room.locus = new LocusSeed(1L)
        room.parent = new Apartment()
        game.state.currentLocation = room
        
        game.processTurn()
        assertEquals(100.0, game.player.coherence, 0.001, "Should reboot to 100% coherence")
    }
}
