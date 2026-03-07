package com.endlesstransit.model
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager
import com.endlesstransit.procgen.Gematria
import com.endlesstransit.procgen.NameGenerator
import groovy.transform.CompileStatic
import groovy.transform.PackageScope

@CompileStatic
class SolarSystem extends Container {
    @PackageScope List<Planet> planets = []
    String name

    List<Planet> getPlanets() {
        ensureChildrenPopulated()
        return planets
    }

    SolarSystem(String name, long seed = 0) {
        this.name = name
        this.seed = seed
    }

    @Override
    void populateChildren() {
        Random scrambler = seed != 0 ? new Random(seed) : new Random()
        int numPlanets = scrambler.nextInt(9) + 2
        for (int i = 0; i < numPlanets; i++) {
            long childSeed = scrambler.nextLong()
            addLocation(new Planet(NameGenerator.generatePlanetName(childSeed), childSeed))
        }
    }

    @Override
    void addLocation(Location location) {
        super.addLocation(location)
        if (location instanceof Planet) {
            this.planets.add((Planet)location)
        }
    }

    @Override
    String getDescription() {
        return "Solar System: $name"
    }

    @Override
    List<String> getExtraContent(Player player) {
        ensureChildrenPopulated()
        List<String> lines = []
        lines << "Orbital bodies within range:"
        lines << "-" * 40
        
        List<Planet> plts = getPlanets()
        for (int i = 0; i < plts.size(); i += 2) {
            Planet pL = plts[i]
            Planet pR = (i + 1 < plts.size()) ? plts[i+1] : (Planet)null
            
            String labelL = String.format("%02d. %s", i + 1, pL.name)
            if (pL.isVisited()) labelL += " [V]"
            
            String labelR = ""
            if (pR != null) {
                labelR = String.format("%02d. %s", i + 2, pR.name)
                if (pR.isVisited()) labelR += " [V]"
            }
            
            lines << String.format("%-40s | %-40s", labelL, labelR)
        }
        lines << "-" * 40
        return lines
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        ensureChildrenPopulated()
        Map<String, Closure> options = getBaseOptions(game)
        List<Planet> plts = getPlanets()
        for (int i = 0; i < plts.size(); i++) {
            Planet planet = plts[i]
            String id = String.format("%02d", i + 1)
            String label = "${id}. Land on ${planet.name}"
            options[label] = { game.enterLocation(planet) }
        }
        return options
    }
}
