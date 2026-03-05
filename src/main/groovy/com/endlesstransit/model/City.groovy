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
        Random random = seed != 0 ? new Random(seed) : new Random()
        
        if (this.localVibe == null) {
            def parentVibe = getVibe()
            if (parentVibe != null) {
                // 10% chance to be a "rebel" district and flip resonances
                if (random.nextDouble() < 0.1) {
                    this.isRebelDistrict = true
                    this.localVibe = new VibeCapsule(parentVibe.timeline, parentVibe.secondaryCulture, parentVibe.primaryCulture)
                    this.localVibe.latticeMutation = parentVibe.latticeMutation
                    this.localVibe.stabilityFactor = parentVibe.stabilityFactor
                    this.localVibe.atmosphericColor = parentVibe.atmosphericColor
                }
            }
        }

        int numStreets = random.nextInt(13) + 3
        for (int i = 0; i < numStreets; i++) {
            long childSeed = seed != 0 ? seed + i + 1 : 0
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
        return "City: $name$info"
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        ensureChildrenPopulated()
        def options = getBaseOptions(game)
        streets.eachWithIndex { street, i ->
            String label = "${i + 1}. Go to ${street.name}"
            if (street.isVisited()) label += " [Visited]"
            options[label] = { game.enterLocation(street) }
        }
        return options
    }
}
