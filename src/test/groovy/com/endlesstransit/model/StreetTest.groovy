package com.endlesstransit.model
import com.endlesstransit.ui.Terminal
import com.endlesstransit.model.*
import com.endlesstransit.core.*
import com.endlesstransit.procgen.LocusSeed
import com.endlesstransit.procgen.ProceduralFactory
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import static org.junit.jupiter.api.Assertions.*

class StreetTest {

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
    }

    @Test
    void execute() {
        Terminal.println "Running Street TUI and Options Test..."

        def player = new Player()
        def universe = ProceduralFactory.instance.createUniverse(new LocusSeed(12345L))
        def game = new Game()
        game.player = player
        game.currentLocation = universe

        def street = new Street("Test Ave", new LocusSeed(999L))
        street.setParent(new City("Test City"))
        street.ensureChildrenPopulated()

        Terminal.println "Street: ${street.name} has ${street.buildings.size()} buildings."

        def options = street.getOptions(game)

        // Verify we have numeric IDs (01, 02, etc.)
        assertTrue(options.keySet().any { it.startsWith("01. ") }, "Should have 01. option")
        assertTrue(options.keySet().any { it.startsWith("09. ") }, "Should have 09. option")

        // TEST: Zero-Agnostic Choice Matching Logic (Manual reproduction of Game.groovy logic)
        def testChoiceSelection = { String choice ->
            def matchingKey = options.keySet().find { key ->
                if (key.equalsIgnoreCase(choice)) return true
                if (key.contains(". ")) {
                    String labelId = key.substring(0, key.indexOf(". ")).trim()
                    String normalizedChoice = choice.replaceFirst("^0+(?!\$)", "")
                    String normalizedLabel = labelId.replaceFirst("^0+(?!\$)", "")
                    if (normalizedChoice == normalizedLabel) return true
                }
                return false
            }
            return matchingKey
        }

        // Verify choice "2" matches "02. Enter Building..."
        def key2 = testChoiceSelection("2")
        assertNotNull(key2, "Choice '2' should match")
        assertTrue(key2.startsWith("02. "), "Choice '2' correctly matches label '02.'")

        // Verify choice "02" matches "02. Enter Building..."
        def key02 = testChoiceSelection("02")
        assertNotNull(key02, "Choice '02' should match")
        assertTrue(key02.startsWith("02. "), "Choice '02' correctly matches label '02.'")

        // Verify choice "002" matches "02. Enter Building..." (Future proofing)
        def key002 = testChoiceSelection("002")
        assertNotNull(key002, "Choice '002' should match")
        assertTrue(key002.startsWith("02. "), "Choice '002' correctly matches label '02.'")

        // TEST: LIP Resolution for all buildings
        Terminal.println "Verifying LIP stability for all ${street.buildings.size()} buildings..."
        street.buildings.eachWithIndex { b, i ->
            String lip = b.getLIP()
            int lastPart = lip.split("\\.").last().toInteger()
            assertEquals(i, lastPart, "Building ${b.name} at index $i has inconsistent LIP: $lip")
        }
        Terminal.println "SUCCESS: All building LIPs are stable and consistent."

        Terminal.println "All Street Tests Passed!"
    }
}
