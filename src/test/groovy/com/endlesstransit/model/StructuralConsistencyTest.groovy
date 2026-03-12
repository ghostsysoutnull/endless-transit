package com.endlesstransit.model
import com.endlesstransit.ui.Terminal
import com.endlesstransit.model.*
import com.endlesstransit.core.*
import com.endlesstransit.procgen.LocusSeed
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import static org.junit.jupiter.api.Assertions.*

class StructuralConsistencyTest {

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
    }

    @Test
    void execute() {
        Terminal.println "Running Structural Consistency Test..."

        def building = new Building(new LocusSeed(12345L))
        Terminal.println "Generated Building: ${building.name} with ${building.maxFloors} floors and ${building.apartmentsPerFloor} apartments per floor."

        for (int i = 0; i < building.maxFloors; i++) {
            def floor = building.getFloor(i)
            assertEquals(building.apartmentsPerFloor, floor.getCorridor().getApartments().size(), "Floor $i apartment count mismatch")
        }

        Terminal.println "SUCCESS: All floors have consistent apartment counts."

        Terminal.println "\nVerifying Street TUI generation..."
        def street = new Street("Test Ave")
        assertTrue(street.buildings.size() >= 4, "Street has too few buildings: ${street.buildings.size()}")
        Terminal.println "SUCCESS: Street has ${street.buildings.size()} buildings (multiple pairs)."

        Terminal.println "All Tests Passed!"
    }
}
