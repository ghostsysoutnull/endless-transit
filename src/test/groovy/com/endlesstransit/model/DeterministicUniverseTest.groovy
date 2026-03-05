package com.endlesstransit.model

import com.endlesstransit.core.Logger

class DeterministicUniverseTest {
    static void main(String[] args) {
        testUniverseStability()
    }

    static void testUniverseStability() {
        println "Running Deterministic Universe Stability Test..."
        
        long testSeed = 987654321L
        
        // Universe A
        Universe u1 = new Universe(testSeed)
        String name1 = u1.getFilaments()[0].name
        String planetName1 = u1.getFilaments()[0].getChildren()[0].children[0].getPlanets()[0].name
        String vibe1 = u1.getFilaments()[0].getChildren()[0].children[0].getPlanets()[0].getVibe().toString()
        
        // Universe B
        Universe u2 = new Universe(testSeed)
        String name2 = u2.getFilaments()[0].name
        String planetName2 = u2.getFilaments()[0].getChildren()[0].children[0].getPlanets()[0].name
        String vibe2 = u2.getFilaments()[0].getChildren()[0].children[0].getPlanets()[0].getVibe().toString()

        assert name1 == name2 : "Filament name mismatch: $name1 vs $name2"
        assert planetName1 == planetName2 : "Planet name mismatch: $planetName1 vs $planetName2"
        assert vibe1 == vibe2 : "Vibe mismatch: $vibe1 vs $vibe2"
        
        println "SUCCESS: Universe is deterministic for seed $testSeed"
        
        // Verify LIP Resolution stability
        Location walker = u1.getFilaments()[0]
        while (!(walker instanceof Planet)) {
            walker = ((Container)walker).getChildren()[0]
        }
        String lip = walker.getLIP()
        
        Location loc1 = u1.resolveLIP(lip)
        Location loc2 = u2.resolveLIP(lip)
        
        assert loc1.getName() == loc2.getName() : "LIP Resolution name mismatch at $lip"
        assert loc1.getSeed() == loc2.getSeed() : "LIP Resolution seed mismatch at $lip"
        
        println "SUCCESS: LIP Resolution is stable."
    }
}
