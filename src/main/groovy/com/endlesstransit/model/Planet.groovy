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

    Planet(String name, long seed = 0) {
        this.name = name
        this.seed = seed
        
        // Initialize Planetary Vibe Deterministically
        String timeline = ThemeManager.getRandomTimeline(seed != 0 ? seed : 0)
        String primary = ThemeManager.getRandomCulture(seed != 0 ? seed + 1 : 0)
        String secondary = ThemeManager.getRandomCulture(seed != 0 ? seed + 2 : 0)
        while (secondary == primary) {
            // Stability check for secondary
            secondary = ThemeManager.getRandomCulture(seed != 0 ? seed + 3 : 0)
        }
        
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
        Random scrambler = seed != 0 ? new Random(seed) : new Random()
        int numCountries = scrambler.nextInt(7) + 2
        for (int i = 0; i < numCountries; i++) {
            long childSeed = scrambler.nextLong()
            addLocation(new Country(NameGenerator.generateCountryName(childSeed), childSeed))
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
    List<String> getExtraContent() {
        ensureChildrenPopulated()
        List<String> lines = []
        lines << "Planetary landmasses scanned:"
        lines << "-" * 40
        
        for (int i = 0; i < countries.size(); i += 2) {
            def cL = countries[i]
            def cR = (i + 1 < countries.size()) ? countries[i+1] : null
            
            String labelL = String.format("%02d. %s", i + 1, cL.name)
            if (cL.isVisited()) labelL += " [V]"
            
            String labelR = ""
            if (cR) {
                labelR = String.format("%02d. %s", i + 2, cR.name)
                if (cR.isVisited()) labelR += " [V]"
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
        countries.eachWithIndex { country, i ->
            String id = String.format("%02d", i + 1)
            String label = "${id}. Visit ${country.name}"
            options[label] = { game.enterLocation(country) }
        }
        return options
    }
}
