package com.endlesstransit.model

import groovy.test.GroovyTestCase
import com.endlesstransit.model.*
import com.endlesstransit.core.*
import com.endlesstransit.ui.Terminal

class DeepLatticeCrawlTest extends GroovyTestCase {
    Game game
    Universe universe

    void setUp() {
        Terminal.skipSleep = true
        game = new Game(42L) // Stable seed
        universe = game.universe
    }

    void testVerticalIntegrity() {
        println "Starting Deep Lattice Stress Crawl..."
        
        // 1. Universe -> Filaments
        println "Phase 1: Macro Crawl (Universe)"
        crawlLocation(universe)

        // 2. Filament -> Sectors
        println "Phase 2: Filament Crawl"
        def filament = universe.getFilaments()[0]
        crawlLocation(filament)

        // 3. Sector -> Systems
        println "Phase 3: Sector Crawl"
        filament.ensureChildrenPopulated()
        Container sector = (Container) filament.children[0]
        crawlLocation(sector)

        // 4. System -> Planets
        println "Phase 4: System Crawl"
        SolarSystem sys = (SolarSystem) sector.children[0]
        crawlLocation(sys)

        // 5. Planet -> Countries
        println "Phase 5: Planet Crawl"
        def planet = sys.getPlanets()[0]
        crawlLocation(planet)

        // 6. Country -> Cities
        println "Phase 6: Country Crawl"
        def country = planet.getCountries()[0]
        crawlLocation(country)

        // 7. City -> Streets
        println "Phase 7: City Crawl"
        def city = country.getCities()[0]
        crawlLocation(city)

        // 8. Street -> Buildings
        println "Phase 8: Street Crawl"
        def street = city.getStreets()[0]
        crawlLocation(street)

        // 9. Building -> Floors
        println "Phase 9: Building Crawl"
        def building = street.getBuildings()[0]
        crawlLocation(building)

        // 10. Floor -> Corridor
        println "Phase 10: Floor Crawl"
        def floor = building.getFloor(0)
        crawlLocation(floor)

        // 11. Corridor -> Apartments
        println "Phase 11: Corridor Crawl"
        def corridor = floor.getCorridor()
        crawlLocation(corridor)

        // 12. Apartment -> Rooms (Atomic)
        println "Phase 12: Apartment Crawl"
        def apartment = corridor.getApartments()[0]
        crawlLocation(apartment)

        println "\nDEEP LATTICE CRAWL SUCCESSFUL: Vertical integrity verified across 12 levels."
    }

    private void crawlLocation(Location loc, int maxSiblings = 3) {
        println "  >> Crawling: ${loc.getPath()} (${loc.getClass().simpleName})"
        game.enterLocation(loc)
        
        def options = loc.getOptions(game)
        assertFalse("Options should not be empty for ${loc.getName()}", options.isEmpty())

        // Filter out "Leave" options to prevent infinite backtracking
        Map<String, Closure> travelOptions = options.findAll { Object k, Object v -> !((String)k).toLowerCase().contains("leave") }
        
        if (travelOptions.isEmpty() && loc instanceof Container && !(loc instanceof Room)) {
             fail("No travel options found for container ${loc.getName()} which has ${((Container)loc).children.size()} children.")
        }
        
        def keys = travelOptions.keySet().toList()
        int count = Math.min(keys.size(), maxSiblings)
        
        for (int i = 0; i < count; i++) {
            String key = keys[i]
            println "     - Testing Option: $key"
            
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

            assertNotNull("Could not match choice '$choice' for key '$key'", matchingKey)
            
            Location startLoc = game.currentLocation
            options[matchingKey].call()
            println "       -> Arrived: ${game.currentLocation.getName()}"
            game.enterLocation(startLoc)
        }
    }
}
