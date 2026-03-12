package com.endlesstransit.logic

import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import static org.junit.jupiter.api.Assertions.*
import com.endlesstransit.core.*
import com.endlesstransit.model.*
import com.endlesstransit.procgen.LocusSeed

class CoherenceDrainTest {
    GameState state
    TurnProcessor turnProcessor

    @BeforeEach
    void setup() {
        state = new GameState(new LocusSeed(1L), new MockInputSource([]))
        state.player = new Player()
        state.player.coherence = 100
        turnProcessor = new TurnProcessor(state, null, null)
    }

    @Test
    void "test base drain"() {
        Floor floor = new Floor(1, 10, "rust", "ancient", new LocusSeed(1L))
        floor.setVibe(new VibeCapsule("ancient", "rust", "rust"))
        state.currentLocation = floor
        
        turnProcessor.processTurn()
        assertEquals(99, state.player.coherence, "Base drain should be 1.0")
    }

    @Test
    void "test abyssal multiplier"() {
        // Floor with negative number is Abyssal
        Floor floor = new Floor(-1, 10, "rust", "ancient", new LocusSeed(1L))
        floor.setVibe(new VibeCapsule("ancient", "abyssal", "abyssal"))
        state.currentLocation = floor
        
        turnProcessor.processTurn()
        assertEquals(98, state.player.coherence, "Abyssal drain should be 2.0")
    }
    
    @Test
    void "test entropic multiplier"() {
        Floor floor = new Floor(1, 10, "rust", "ancient", new LocusSeed(1L))
        floor.setVibe(new VibeCapsule("entropic", "rust", "rust"))
        state.currentLocation = floor
        
        turnProcessor.processTurn()
        assertEquals(98, state.player.coherence, "Entropic drain should be 2.0")
    }

    @Test
    void "test combined multipliers"() {
        Floor floor = new Floor(-1, 10, "rust", "ancient", new LocusSeed(1L))
        floor.setVibe(new VibeCapsule("entropic", "abyssal", "abyssal"))
        state.currentLocation = floor
        
        turnProcessor.processTurn()
        assertEquals(96, state.player.coherence, "Combined drain should be 4.0")
    }
}
