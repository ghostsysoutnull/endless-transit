package com.endlesstransit.logic

import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import static org.junit.jupiter.api.Assertions.*
import com.endlesstransit.core.*
import com.endlesstransit.model.*
import com.endlesstransit.procgen.*
import com.endlesstransit.ui.Terminal

class RegionalDivergenceTest {

    @BeforeEach
    void setup() {
        Terminal.initialize(true, true)
    }

    @Test
    void "test regional divergence frequency in cities"() {
        int totalCities = 1000
        int rebelCities = 0
        
        ProceduralFactory factory = ProceduralFactory.instance
        
        for (int i = 0; i < totalCities; i++) {
            LocusSeed seed = new LocusSeed(1000L + i)
            // Create a fake parent structure to provide vibes
            Universe universe = factory.createUniverse(seed)
            // Procedural traversal - navigate down to a Country
            Location current = universe
            while (!(current instanceof Country) && current.getDepth() < 10) {
                current = (Location) current.getChildren()[0]
            }
            Country country = (Country) current
            assertNotNull(country.getVibe(), "Country must have a vibe for city to diverge")
            
            City city = factory.createCity(country, seed.branch("CITY"))
            city.populateChildren() // This triggers the rebel check in ProceduralFactory
            
            if (city.isRebelDistrict) {
                rebelCities++
                
                // Verify culture flip
                VibeCapsule parentVibe = country.getVibe()
                VibeCapsule cityVibe = city.getVibe()
                
                assertNotNull(cityVibe, "City should have a vibe")
                assertEquals(parentVibe.primaryCulture, cityVibe.secondaryCulture, "Rebel city should flip primary to secondary")
                assertEquals(parentVibe.secondaryCulture, cityVibe.primaryCulture, "Rebel city should flip secondary to primary")
            }
        }
        
        double frequency = rebelCities / (double) totalCities
        Terminal.println "SUCCESS: Found $rebelCities rebel cities in $totalCities trials (Frequency: ${String.format('%.2f', frequency * 100)}%)"
        
        // 10% expected, allow 5% to 15% range for 500 trials
        assertTrue(frequency >= 0.05 && frequency <= 0.15, "Rebel city frequency should be around 10% (was ${frequency * 100}%)")
    }
}
