package com.endlesstransit.procgen

import com.endlesstransit.model.Building
import com.endlesstransit.procgen.probes.BuildingFloorCountProbe
import com.endlesstransit.ui.Terminal
import groovy.test.GroovyTestCase

class SeedScannerTest extends GroovyTestCase {

    void setUp() {
        Terminal.initialize(true, true)
    }

    void testScanForTallBuilding() {
        SeedScanner scanner = new SeedScanner()
        // We want a building with at least 5 floors
        WorldProbe probe = new BuildingFloorCountProbe(5)
        
        // Scan 100 seeds starting from 0
        SeedScanner.ScanResult result = scanner.scan(new LocusSeed(0), 100, probe)
        
        assertNotNull("Should have found a tall building within 100 seeds", result)
        assertTrue("Matching location should be a building", result.matchingLocation instanceof Building)
        assertTrue("Building should have >= 5 floors", ((Building) result.matchingLocation).maxFloors >= 5)
        
        println "SUCCESS: Found tall building at seed ${result.locus} - LIP: ${result.matchingLocation.getLIP()}"
    }

    void testNoMatchFound() {
        SeedScanner scanner = new SeedScanner()
        // Something impossible (hopefully)
        WorldProbe probe = new BuildingFloorCountProbe(99999)
        
        SeedScanner.ScanResult result = scanner.scan(new LocusSeed(0), 10, probe)
        assertNull("Should NOT have found a 99k floor building in 10 seeds", result)
    }
}
