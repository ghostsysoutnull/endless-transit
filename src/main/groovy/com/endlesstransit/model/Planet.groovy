package com.endlesstransit.model
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager
import com.endlesstransit.procgen.Gematria
import com.endlesstransit.procgen.NameGenerator
import com.endlesstransit.procgen.ProceduralFactory
import com.endlesstransit.procgen.LocusSeed
import com.endlesstransit.ui.ThemeManager
import com.endlesstransit.ui.Terminal
import groovy.transform.CompileStatic
import groovy.transform.PackageScope

@CompileStatic
class Planet extends Container {
    @PackageScope List<Country> countries = []
    String name

    List<Country> getCountries() {
        ensureChildrenPopulated()
        return countries
    }

    @Override
    String getIndexLabel() {
        return "ORBIT"
    }

    @Override
    String getStatusSummary() {
        VibeCapsule v = getVibe()
        return "RESONANCE: [${v?.primaryCulture?.toUpperCase() ?: 'STABLE'}]"
    }

    @Override
    String getLatticeMeta() {
        VibeCapsule v = getVibe()
        if (v == null) return ""
        return Terminal.dim(" [${isAbyssal() ? 'BEDROCK' : 'SURFACE'} | ERA: ${v.timeline.toUpperCase()}]")
    }

    Planet(String name, LocusSeed locus = new LocusSeed(0)) {
        this.name = name
        this.locus = locus
    }

    @Override
    void populateChildren() {
        ProceduralFactory.populatePlanet(this)
    }

    @Override
    void addLocation(Location location) {
        super.addLocation(location)
        if (location instanceof Country) {
            this.countries.add((Country)location)
        }
    }

    @Override
    String getDescription() {
        VibeCapsule v = (VibeCapsule) getVibe()
        return "Planet: $name\n" + 
               "${Terminal.dim("[RESONANCE:")} ${Terminal.colorize(v.primaryCulture.toUpperCase(), v.atmosphericColor)}${Terminal.dim("]")} " + 
               "${Terminal.dim("[TIMELINE:")} ${Terminal.colorize(v.timeline.toUpperCase(), Terminal.YELLOW)}${Terminal.dim("]")}"
    }

    @Override
    List<String> getExtraContent(Player player) {
        ensureChildrenPopulated()
        List<String> lines = []
        lines << "Planetary landmasses scanned:"
        lines << "-" * 40
        
        List<Country> ctrs = getCountries()
        for (int i = 0; i < ctrs.size(); i += 2) {
            Country cL = ctrs[i]
            Country cR = (i + 1 < ctrs.size()) ? ctrs[i+1] : (Country)null
            
            String labelL = String.format("%02d. %s", i + 1, cL.name)
            if (cL.isVisited()) labelL += " [V]"
            
            String labelR = ""
            if (cR != null) {
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
        Map<String, Closure> options = getBaseOptions(game)
        List<Country> ctrs = getCountries()
        for (int i = 0; i < ctrs.size(); i++) {
            Country country = ctrs[i]
            String id = String.format("%02d", i + 1)
            String label = "${id}. Visit ${country.name}"
            options[label] = { game.enterLocation(country) }
        }
        return options
    }
}
