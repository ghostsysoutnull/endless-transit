package com.endlesstransit.logic

import com.endlesstransit.model.*
import com.endlesstransit.procgen.*
import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*

class ObjectDistributionTest {
    @Test
    void testObjectDistributionVariance() {
        LocusSeed master = new LocusSeed(12345L)
        ProceduralFactory factory = ProceduralFactory.instance
        
        Map<Integer, Integer> distribution = [:].withDefault { 0 }
        int totalRooms = 0
        int apartmentsTested = 50
        
        for (int i = 0; i < apartmentsTested; i++) {
            LocusSeed aptLocus = master.branch("APT_" + i)
            Apartment apt = factory.createApartment(null, "Test Door", "monolith", "ancient", aptLocus)
            factory.populateApartment(apt)
            
            apt.rooms.each { room ->
                int count = room.objects.size()
                distribution[count]++
                totalRooms++
            }
        }
        
        println "\n--- OBJECT_DISTRIBUTION_ANALYSIS ---"
        println "Total Rooms: $totalRooms"
        distribution.sort().each { count, freq ->
            double percentage = (freq / totalRooms) * 100
            println "Rooms with $count objects: $freq (${String.format("%.2f", percentage)}%)"
        }
        
        // If it's too concentrated, we might see a very high percentage in 0 or a single number
        double zeroRate = (distribution[0] / totalRooms) * 100
        println "Zero Object Rate: ${String.format("%.2f", zeroRate)}%"
        
        // We expect some variance. If more than 80% of rooms have the same number of objects (e.g. 0), it might feel "concentrated"
        boolean isConcentrated = distribution.values().any { it > totalRooms * 0.8 }
        assertFalse(isConcentrated, "Object distribution is too concentrated! Most rooms have the same count.")
    }
}
