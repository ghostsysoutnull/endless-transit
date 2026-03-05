package com.endlesstransit.model
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager
import com.endlesstransit.procgen.Gematria
import com.endlesstransit.procgen.NameGenerator

class Country extends Container {
    List<City> cities = []
    String name
    String functionalTrait

    List<City> getCities() {
        ensureChildrenPopulated()
        return cities
    }

    Country(String name, long seed = 0) {
        this.name = name
        this.seed = seed
        
        Random r = seed != 0 ? new Random(seed) : new Random()
        def traits = ["Ceremonial", "Military", "Industrial", "Agricultural", "Research", "Commercial"]
        this.functionalTrait = traits[r.nextInt(traits.size())]
    }

    @Override
    void populateChildren() {
        Random scrambler = seed != 0 ? new Random(seed) : new Random()
        
        // Ensure we have a local mutated vibe for this country based on the planet
        if (this.localVibe == null) {
            def parentVibe = getVibe()
            if (parentVibe != null) {
                this.localVibe = parentVibe.mutate(functionalTrait, scrambler.nextDouble() * 0.2 - 0.1)
            }
        }
        
        int numCities = scrambler.nextInt(9) + 2
        for (int i = 0; i < numCities; i++) {
            long childSeed = scrambler.nextLong()
            addLocation(new City(NameGenerator.generateCityName(childSeed), childSeed))
        }
    }

    @Override
    void addLocation(Location location) {
        super.addLocation(location)
        if (location instanceof City) {
            cities.add(location)
        }
    }

    @Override
    String getDescription() {
        def v = getVibe()
        String mutationInfo = v ? " [Sector Mutation: ${v.latticeMutation}]" : ""
        return "Country: $name$mutationInfo"
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        ensureChildrenPopulated()
        def options = getBaseOptions(game)
        cities.eachWithIndex { city, i ->
            String label = "${i + 1}. Travel to ${city.name}"
            if (city.isVisited()) label += " [Visited]"
            options[label] = { game.enterLocation(city) }
        }
        return options
    }
}
