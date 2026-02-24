package com.endlesstransit.model
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager
import com.endlesstransit.procgen.Gematria
import com.endlesstransit.procgen.NameGenerator
import com.endlesstransit.ui.ThemeManager
import com.endlesstransit.ui.Terminal

class Planet extends Container {
    List<Country> countries = []
    String name

    List<Country> getCountries() {
        ensureChildrenPopulated()
        return countries
    }

    Planet(String name) {
        this.name = name
        
        // Initialize Planetary Vibe
        String timeline = ThemeManager.getRandomTimeline()
        String primary = ThemeManager.getRandomCulture()
        String secondary = ThemeManager.getRandomCulture()
        while (secondary == primary) secondary = ThemeManager.getRandomCulture()
        
        this.localVibe = new VibeCapsule(timeline, primary, secondary)
        
        // Pick an atmospheric color based on primary culture
        def colorMap = [
            "baroque": Terminal.YELLOW,
            "gilded": Terminal.WHITE,
            "monolith": Terminal.CYAN,
            "neon": Terminal.L_CYAN,
            "organic": Terminal.GREEN,
            "rust": Terminal.RED,
            "shogun": Terminal.MAGENTA,
            "void": Terminal.GREY,
            "zenith": Terminal.BLUE
        ]
        this.localVibe.atmosphericColor = colorMap[primary] ?: Terminal.WHITE
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
        def v = getVibe()
        return "Planet: $name\n" + 
               "${Terminal.dim("[RESONANCE:")} ${Terminal.colorize(v.primaryCulture.toUpperCase(), v.atmosphericColor)}${Terminal.dim("]")} " +
               "${Terminal.dim("[TIMELINE:")} ${Terminal.colorize(v.timeline.toUpperCase(), Terminal.YELLOW)}${Terminal.dim("]")}"
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
