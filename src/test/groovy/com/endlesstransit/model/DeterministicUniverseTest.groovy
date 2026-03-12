package com.endlesstransit.model
import com.endlesstransit.ui.Terminal
import com.endlesstransit.model.*
import com.endlesstransit.core.*
import com.endlesstransit.procgen.LocusSeed
import com.endlesstransit.procgen.ProceduralFactory
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import static org.junit.jupiter.api.Assertions.*

class DeterministicUniverseTest {

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
    }

    @Test
    void execute() {
        Terminal.println "Running Deterministic Universe Stability Test..."
        
        LocusSeed testLocus = new LocusSeed(987654321L)
        
        // Universe A
        Universe u1 = ProceduralFactory.instance.createUniverse(testLocus)
        String name1 = u1.getFilaments()[0].getName()
        String planetName1 = u1.getFilaments()[0].getChildren()[0].getChildren()[0].getPlanets()[0].name
        String vibe1 = u1.getFilaments()[0].getChildren()[0].getChildren()[0].getPlanets()[0].getVibe().toString()
        
        // Universe B
        Universe u2 = ProceduralFactory.instance.createUniverse(testLocus)
        String name2 = u2.getFilaments()[0].getName()
        String planetName2 = u2.getFilaments()[0].getChildren()[0].getChildren()[0].getPlanets()[0].name
        String vibe2 = u2.getFilaments()[0].getChildren()[0].getChildren()[0].getPlanets()[0].getVibe().toString()

        assertEquals(name1, name2, "Filament name mismatch: $name1 vs $name2")
        assertEquals(planetName1, planetName2, "Planet name mismatch: $planetName1 vs $planetName2")
        assertEquals(vibe1, vibe2, "Vibe mismatch: $vibe1 vs $vibe2")
        
        Terminal.println "SUCCESS: Universe is deterministic for locus ${testLocus.value}"
        
        // Verify LIP Resolution stability
        Location walker = u1.getFilaments()[0]
        while (!(walker instanceof Planet)) {
            walker = ((Container)walker).getChildren()[0]
        }
        String lip = walker.getLIP()
        
        Location loc1 = u1.resolveLIP(lip)
        Location loc2 = u2.resolveLIP(lip)
        
        assertNotNull(loc1, "loc1 should not be null")
        assertNotNull(loc2, "loc2 should not be null")
        assertEquals(loc1.getName(), loc2.getName(), "LIP Resolution name mismatch at $lip")
        assertEquals(loc1.getLocus().value, loc2.getLocus().value, "LIP Resolution seed mismatch at $lip")
        
        Terminal.println "SUCCESS: LIP Resolution is stable."
    }
}
