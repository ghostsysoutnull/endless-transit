package com.endlesstransit.model

import com.endlesstransit.model.*
import com.endlesstransit.core.*
import com.endlesstransit.ui.Terminal
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import static org.junit.jupiter.api.Assertions.*

class DeepLatticeCrawlTest {
    Game game
    Universe universe

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
        game = new Game(42L) // Stable seed
        game.state.suppressRendering = true
        universe = game.universe
    }

    @Test
    void testVerticalIntegrity() {
        Terminal.println "Starting Deep Lattice Stress Crawl..."
        
        // 1. Universe -> Filaments
        Terminal.println "Phase 1: Macro Crawl (Universe)"
        crawlLocation(universe)

        // 2. Filament -> Sectors
        Terminal.println "Phase 2: Filament Crawl"
        def filament = universe.getFilaments()[0]
        crawlLocation(filament)

        // 3. Sector -> Systems
        Terminal.println "Phase 3: Sector Crawl"
        filament.ensureChildrenPopulated()
        Container sector = (Container) filament.children[0]
        crawlLocation(sector)

        // 4. System -> Planets
        Terminal.println "Phase 4: System Crawl"
        SolarSystem sys = (SolarSystem) sector.children[0]
        crawlLocation(sys)

        // 5. Planet -> Countries
        Terminal.println "Phase 5: Planet Crawl"
        def planet = sys.getPlanets()[0]
        crawlLocation(planet)

        // 6. Country -> Cities
        Terminal.println "Phase 6: Country Crawl"
        def country = planet.getCountries()[0]
        crawlLocation(country)

        // 7. City -> Streets
        Terminal.println "Phase 7: City Crawl"
        def city = country.getCities()[0]
        crawlLocation(city)

        // 8. Street -> Buildings
        Terminal.println "Phase 8: Street Crawl"
        def street = city.getStreets()[0]
        crawlLocation(street)

        // 9. Building -> Floors
        Terminal.println "Phase 9: Building Crawl"
        def building = street.getBuildings()[0]
        crawlLocation(building)

        // 10. Floor -> Corridor
        Terminal.println "Phase 10: Floor Crawl"
        def floor = building.getFloor(0)
        crawlLocation(floor)

        // 11. Corridor -> Apartments
        Terminal.println "Phase 11: Corridor Crawl"
        def corridor = floor.getCorridor()
        crawlLocation(corridor)

        // 12. Apartment -> Rooms (Atomic)
        Terminal.println "Phase 12: Apartment Crawl"
        def apartment = corridor.getApartments()[0]
        crawlLocation(apartment)

        Terminal.println "\nDEEP LATTICE CRAWL SUCCESSFUL: Vertical integrity verified across 12 levels."
    }

    private void crawlLocation(Location loc, int maxSiblings = 3) {
        Terminal.println "  >> Crawling: ${loc.getPath()} (${loc.getClass().simpleName})"
        game.enterLocation(loc)
        
        def options = loc.getOptions(game)
        assertFalse(options.isEmpty(), "Options should not be empty for ${loc.getName()}")

        // Filter out "Leave" options to prevent infinite backtracking
        Map<String, Closure> travelOptions = options.findAll { Object k, Object v -> !((String)k).toLowerCase().contains("leave") }
        
        if (travelOptions.isEmpty() && loc instanceof Container && !(loc instanceof Room)) {
             fail("No travel options found for container ${loc.getName()} which has ${((Container)loc).children.size()} children.")
        }
        
        def keys = travelOptions.keySet().toList()
        int count = Math.min(keys.size(), maxSiblings)
        
        for (int i = 0; i < count; i++) {
            String key = keys[i]
            Terminal.println "     - Testing Option: $key"
            
            String choice = key.contains(". ") ? key.substring(0, key.indexOf(". ")).trim() : key
            
            def matchingKey = options.keySet().find { k ->
                if (k.equalsIgnoreCase(choice)) return true
                if (k.contains(". ")) {
                    String labelId = k.substring(0, k.indexOf(". ")).trim()
                    String normalizedChoice = choice.replaceFirst("^0+(?!\$)", "")
                    String normalizedLabel = labelId.replaceFirst("^0+(?!\$)", "")
                    if (normalizedChoice == normalizedLabel) return true
                }
                return false
            }

            assertNotNull(matchingKey, "Could not match choice '$choice' for key '$key'")
            
            Location startLoc = game.currentLocation
            options[matchingKey].call()
            Terminal.println "       -> Arrived: ${game.currentLocation.getName()}"
            game.enterLocation(startLoc)
        }
    }
}
