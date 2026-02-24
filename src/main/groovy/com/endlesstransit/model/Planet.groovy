package com.endlesstransit.model
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager
import com.endlesstransit.procgen.Gematria
import com.endlesstransit.procgen.NameGenerator

class Planet extends Container {
    List<Country> countries = []
    String name

    List<Country> getCountries() {
        ensureChildrenPopulated()
        return countries
    }

    Planet(String name) {
        this.name = name
    }

    @Override
    void populateChildren() {
        Random random = new Random()
        int numCountries = random.nextInt(7) + 2
        for (int i = 0; i < numCountries; i++) {
            addLocation(new Country(NameGenerator.generateCountryName()))
        }
    }

    @Override
    void addLocation(Location location) {
        super.addLocation(location)
        if (location instanceof Country) {
            countries.add(location)
        }
    }

    @Override
    String getDescription() {
        return "Planet: $name"
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        ensureChildrenPopulated()
        def options = getBaseOptions(game)
        countries.eachWithIndex { country, i ->
            String label = "${i + 1}. Visit ${country.name}"
            if (country.isVisited()) label += " [Visited]"
            options[label] = { game.enterLocation(country) }
        }
        return options
    }
}
