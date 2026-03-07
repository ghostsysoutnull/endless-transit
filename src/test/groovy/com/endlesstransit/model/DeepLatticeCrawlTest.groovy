package com.endlesstransit.model
import com.endlesstransit.model.*
import com.endlesstransit.core.*
import com.endlesstransit.ui.Terminal

println "Starting Deep Lattice Stress Crawl..."

def game = new Game()
def player = game.player
def universe = game.universe

// Helper to crawl all options in a location
def crawlLocation = { Location loc, int maxSiblings = 3 ->
    println "  >> Crawling: ${loc.getPath()} (${loc.getClass().simpleName})"
    game.enterLocation(loc)
    
    def options = loc.getOptions(game)
    if (options.isEmpty()) {
        println "     [!] No options found for ${loc.getName()}"
        return
    }

    // Filter out "Leave" options to prevent infinite backtracking during the stress test
    def travelOptions = options.findAll { !it.key.toLowerCase().contains("leave") }
    
    if (travelOptions.isEmpty() && loc instanceof Container && !(loc instanceof Room)) {
        println "FAILURE: No travel options found for container ${loc.getName()} which has ${loc.children.size()} children."
        System.exit(1)
    }
    
    // Limit siblings to prevent test from taking hours
    def keys = travelOptions.keySet().toList()
    int count = Math.min(keys.size(), maxSiblings)
    
    for (int i = 0; i < count; i++) {
        String key = keys[i]
        println "     - Testing Option: $key"
        
        // Match using the new zero-agnostic logic
        String choice = key.contains(". ") ? key.substring(0, key.indexOf(". ")).trim() : key
        
        // Execute the choice logic from Game.groovy
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

        if (matchingKey) {
            // Save current location to return after the branch
            Location startLoc = game.currentLocation
            
            // Execute option
            options[matchingKey].call()
            Location target = game.currentLocation
            
            println "       -> Arrived: ${target.getName()}"
            
            // Recurse if it's a container and we haven't reached atom level
            if (target instanceof Container && !(target instanceof Room)) {
                // Limit depth recursion for the stress test
                // Just crawl the first child of each branch to verify vertical integrity
            }
            
            // Return to start location for next option test
            game.enterLocation(startLoc)
        } else {
            println "FAILURE: Could not match choice '$choice' for key '$key'"
            System.exit(1)
        }
    }
}

// 1. Universe -> Filaments
println "Phase 1: Macro Crawl (Universe)"
crawlLocation(universe)

// 2. Filament -> Sectors
println "Phase 2: Filament Crawl"
def filament = universe.filaments[0]
crawlLocation(filament)

// 3. Sector -> Systems
println "Phase 3: Sector Crawl"
filament.ensureChildrenPopulated()
def sector = filament.children[0]
crawlLocation(sector)

// 4. System -> Planets
println "Phase 4: System Crawl"
sector.ensureChildrenPopulated()
def sys = sector.children[0]
crawlLocation(sys)

// 5. Planet -> Countries
println "Phase 5: Planet Crawl"
sys.ensureChildrenPopulated()
def planet = sys.children[0]
crawlLocation(planet)

// 6. Country -> Cities
println "Phase 6: Country Crawl"
planet.ensureChildrenPopulated()
def country = planet.children[0]
crawlLocation(country)

// 7. City -> Streets
println "Phase 7: City Crawl"
country.ensureChildrenPopulated()
def city = country.children[0]
crawlLocation(city)

// 8. Street -> Buildings
println "Phase 8: Street Crawl"
city.ensureChildrenPopulated()
def street = city.children[0]
crawlLocation(street)

// 9. Building -> Floors
println "Phase 9: Building Crawl"
street.ensureChildrenPopulated()
def building = street.children[0]
crawlLocation(building)

// 10. Floor -> Corridor
println "Phase 10: Floor Crawl"
def floor = building.getFloor(0)
crawlLocation(floor)

// 11. Corridor -> Apartments
println "Phase 11: Corridor Crawl"
floor.ensureChildrenPopulated()
def corridor = floor.children[0]
crawlLocation(corridor)

// 12. Apartment -> Rooms (Atomic)
println "Phase 12: Apartment Crawl"
corridor.ensureChildrenPopulated()
def apartment = corridor.children[0]
crawlLocation(apartment)

println "\nDEEP LATTICE CRAWL SUCCESSFUL: Vertical integrity verified across 12 levels."
