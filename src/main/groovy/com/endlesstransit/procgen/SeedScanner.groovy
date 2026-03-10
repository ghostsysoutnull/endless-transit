package com.endlesstransit.procgen

import com.endlesstransit.model.Location
import com.endlesstransit.model.Container
import com.endlesstransit.model.Universe
import com.endlesstransit.procgen.LocusSeed
import com.endlesstransit.procgen.ProceduralFactory
import com.endlesstransit.ui.Terminal
import groovy.transform.CompileStatic

import java.util.concurrent.atomic.AtomicLong

/**
 * SeedScanner: A discovery engine for exploring entropy space.
 * It iterates through seeds and traverses the world hierarchy to find locations
 * that satisfy a WorldProbe.
 */
@CompileStatic
class SeedScanner {

    static class ScanResult {
        LocusSeed locus
        Location matchingLocation
    }

    /**
     * Scans a range of seeds to find the first location that matches the probe.
     * @param startLocus Starting master locus.
     * @param count Number of seeds to check.
     * @param probe The criteria to match.
     * @return ScanResult or null if not found.
     */
    ScanResult scan(LocusSeed startLocus, long count, WorldProbe probe) {
        // Ensure UI is decoupled for speed and no-op output
        Terminal.initialize(true, true)

        Terminal.println("[VINCULUM_SEED_SCANNER] Starting scan for: ${probe.getName()}")

        for (long i = 0; i < count; i++) {
            LocusSeed currentLocus = new LocusSeed(startLocus.value + i)
            if (i % 10 == 0) Terminal.println("[VINCULUM_SEED_SCANNER] Seed: ${currentLocus.value} (${i}/${count})...")
            
            Universe universe = ProceduralFactory.instance.createUniverse(currentLocus)
            
            nodeCount = 0
            Location match = findInHierarchy(universe, probe)
            if (match != null) {
                Terminal.println("[VINCULUM_SEED_SCANNER] SUCCESS! Match found at seed: ${currentLocus.value} - Node count: $nodeCount")
                return new ScanResult(locus: currentLocus, matchingLocation: match)
            }
        }
        Terminal.println("[VINCULUM_SEED_SCANNER] FAILURE: No match found after $count seeds.")
        return null
    }

    private int nodeCount = 0
    private static final int MAX_NODES_PER_SEED = 10000

    /**
     * Recursive DFS traversal of the world tree to find a matching location.
     */
    private Location findInHierarchy(Location current, WorldProbe probe) {
        nodeCount++
        if (nodeCount > MAX_NODES_PER_SEED) return null

        if (probe.matches(current)) {
            return current
        }

        if (current instanceof Container && probe.shouldEnter(current)) {
            Container container = (Container) current
            // Depth limit still applies as a hard safety
            if (current.getDepth() > 15) return null 

            for (Location child : container.getChildren()) {
                Location match = findInHierarchy(child, probe)
                if (match != null) return match
            }
        }
        return null
    }
}
