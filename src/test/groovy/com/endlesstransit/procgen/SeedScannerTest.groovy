package com.endlesstransit.procgen

import com.endlesstransit.model.Building
import com.endlesstransit.procgen.probes.BuildingFloorCountProbe
import com.endlesstransit.ui.Terminal
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import static org.junit.jupiter.api.Assertions.*

class SeedScannerTest {

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
    }

    @Test
    void testScanForTallBuilding() {
        SeedScanner scanner = new SeedScanner()
        // We want a building with at least 5 floors
        WorldProbe probe = new BuildingFloorCountProbe(5)
        
        // Scan 100 seeds starting from 0
        SeedScanner.ScanResult result = scanner.scan(new LocusSeed(0), 100, probe)
        
        assertNotNull(result, "Should have found a tall building within 100 seeds")
        assertTrue(result.matchingLocation instanceof Building, "Matching location should be a building")
        assertTrue(((Building) result.matchingLocation).maxFloors >= 5, "Building should have >= 5 floors")
        
        println "SUCCESS: Found tall building at seed ${result.locus} - LIP: ${result.matchingLocation.getLIP()}"
    }

    @Test
    void testNoMatchFound() {
        SeedScanner scanner = new SeedScanner()
        // Something impossible (hopefully)
        WorldProbe probe = new BuildingFloorCountProbe(99999)
        
        SeedScanner.ScanResult result = scanner.scan(new LocusSeed(0), 10, probe)
        assertNull(result, "Should NOT have found a 99k floor building in 10 seeds")
    }
}
