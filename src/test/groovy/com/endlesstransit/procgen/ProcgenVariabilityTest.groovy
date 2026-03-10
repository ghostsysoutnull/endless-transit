package com.endlesstransit.procgen
import com.endlesstransit.ui.Terminal
import com.endlesstransit.model.*
import com.endlesstransit.procgen.LocusSeed
import com.endlesstransit.procgen.ProceduralFactory
import groovy.test.GroovyTestCase

class ProcgenVariabilityTest extends GroovyTestCase {
    void testApartmentVariability() {
        LocusSeed streetLocus = new LocusSeed(987654321L)
        
        // Generate a building and populate some floors
        def building = ProceduralFactory.instance.createBuilding(null, "rust", "ancient", streetLocus.branch(0), 10, false, false)
        
        Terminal.println "Testing Building: ${building.name}"
        
        Set<Integer> roomCounts = []
        Set<Integer> objectCounts = []
        Set<String> roomNames = []
        
        // Check 5 floors for variability
        for (int f = 0; f < Math.min(5, building.maxFloors); f++) {
            def floor = building.getFloor(f)
            def corridor = floor.getCorridor()
            
            corridor.apartments.each { apt ->
                ProceduralFactory.instance.populateApartment(apt)
                roomCounts << apt.rooms.size()
                
                int totalAptObjects = 0
                apt.rooms.each { room ->
                    totalAptObjects += room.objects.size()
                    roomNames << room.roomName
                }
                objectCounts << totalAptObjects
            }
        }
        
        Terminal.println "Room counts found: $roomCounts"
        Terminal.println "Object counts per apartment found: $objectCounts"
        Terminal.println "Unique room names: ${roomNames.size()} / Total rooms: ${roomNames.size()}"
        
        assertTrue("Should have variable room counts, found only: $roomCounts", roomCounts.size() > 1)
        assertTrue("Should have variable object counts, found only: $objectCounts", objectCounts.size() > 1)
        
        // Note: Room names might occasionally collide by pure chance, but with many rooms it should be mostly unique
        assertTrue("Too many room name collisions. Unique: ${roomNames.size()}", roomNames.size() > 5)
    }

    void testBuildingVariability() {
        LocusSeed streetLocus = new LocusSeed(11223344L)
        Set<Integer> floorCounts = []
        Set<String> buildingNames = []
        
        for (int i = 0; i < 20; i++) {
            def b = ProceduralFactory.instance.createBuilding(null, "monolith", "ancient", streetLocus.branch(i), 10, false, false)
            floorCounts << b.maxFloors
            buildingNames << b.name
        }
        
        Terminal.println "Floor counts found: $floorCounts"
        Terminal.println "Unique building names: ${buildingNames.size()} / 20"
        
        assertTrue("Should have variable floor counts, found only: $floorCounts", floorCounts.size() > 3)
        assertTrue("Should have mostly unique building names, found only: ${buildingNames.size()}", buildingNames.size() > 15)
    }
}
