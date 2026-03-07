package com.endlesstransit.model
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager
import com.endlesstransit.procgen.Gematria
import com.endlesstransit.procgen.NameGenerator

class City extends Container {
    List<Street> streets = []
    String name
    boolean isRebelDistrict = false

    List<Street> getStreets() {
        ensureChildrenPopulated()
        return streets
    }

    City(String name, long seed = 0) {
        this.name = name
        this.seed = seed
    }

    @Override
    void populateChildren() {
        Random scrambler = seed != 0 ? new Random(seed) : new Random()
        
        if (this.localVibe == null) {
            def parentVibe = getVibe()
            if (parentVibe != null) {
                // 10% chance to be a "rebel" district and flip resonances
                if (scrambler.nextDouble() < 0.1) {
                    this.isRebelDistrict = true
                    this.localVibe = new VibeCapsule(parentVibe.timeline, parentVibe.secondaryCulture, parentVibe.primaryCulture)
                    this.localVibe.latticeMutation = parentVibe.latticeMutation
                    this.localVibe.stabilityFactor = parentVibe.stabilityFactor
                    this.localVibe.atmosphericColor = parentVibe.atmosphericColor
                }
            }
        }

        int numStreets = scrambler.nextInt(13) + 3
        for (int i = 0; i < numStreets; i++) {
            long childSeed = scrambler.nextLong()
            addLocation(new Street(NameGenerator.generateStreetName(childSeed), childSeed))
        }
    }

    @Override
    void addLocation(Location location) {
        super.addLocation(location)
        if (location instanceof Street) {
            streets.add(location)
        }
    }

    @Override
    String getDescription() {
        String info = isRebelDistrict ? " [UNAUTHORIZED_RESONANCE_DETECTED]" : ""
        return "City: $name$info\n" + (isRebelDistrict ? "The air is thick with illegal data-streams and shifting static." : "A stable regional node connected to the planetary lattice.")
    }

    @Override
    List<String> getExtraContent(Player player) {
        ensureChildrenPopulated()
        List<String> lines = []
        lines << "Streets detected in this city:"
        lines << "-" * 40
        
        for (int i = 0; i < streets.size(); i += 2) {
            def sL = streets[i]
            def sR = (i + 1 < streets.size()) ? streets[i+1] : null
            
            String labelL = String.format("%02d. %s", i + 1, sL.name)
            if (sL.isVisited()) labelL += " [V]"
            
            String labelR = ""
            if (sR) {
                labelR = String.format("%02d. %s", i + 2, sR.name)
                if (sR.isVisited()) labelR += " [V]"
            }
            
            lines << String.format("%-40s | %-40s", labelL, labelR)
        }
        lines << "-" * 40
        return lines
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        ensureChildrenPopulated()
        def options = getBaseOptions(game)
        streets.eachWithIndex { street, i ->
            String id = String.format("%02d", i + 1)
            String label = "${id}. Go to ${street.name}"
            options[label] = { game.enterLocation(street) }
        }
        return options
    }
}
