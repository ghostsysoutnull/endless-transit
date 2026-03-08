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
import com.endlesstransit.ui.Terminal
import groovy.transform.CompileStatic
import groovy.transform.PackageScope

@CompileStatic
class Country extends Container {
    @PackageScope List<City> cities = []
    String name
    String functionalTrait

    List<City> getCities() {
        ensureChildrenPopulated()
        return cities
    }

    @Override
    String getIndexLabel() {
        return "REGION"
    }

    @Override
    String getStatusSummary() {
        return "TRAIT: [${functionalTrait.toUpperCase()}]"
    }

    @Override
    String getLatticeMeta() {
        return Terminal.dim(" [TRAIT: ${functionalTrait.toUpperCase()}]")
    }

    Country(String name, LocusSeed locus = new LocusSeed(0L)) {
        this.name = name
        this.locus = locus
    }

    @Override
    void populateChildren() {
        ProceduralFactory.populateCountry(this)
    }

    @Override
    void addLocation(Location location) {
        super.addLocation(location)
        if (location instanceof City) {
            this.cities.add((City)location)
        }
    }

    @Override
    String getDescription() {
        VibeCapsule v = getVibe()
        String mutationInfo = v ? " [Sector Mutation: ${v.latticeMutation}]" : ""
        return "Country: $name$mutationInfo\nA vast administrative region governed by the ${functionalTrait} directive."
    }

    @Override
    List<String> getExtraContent(Player player) {
        ensureChildrenPopulated()
        List<String> lines = []
        lines << "Regional cities identified:"
        lines << "-" * 40
        
        List<City> cts = getCities()
        for (int i = 0; i < cts.size(); i += 2) {
            City cL = cts[i]
            City cR = (i + 1 < cts.size()) ? cts[i+1] : (City)null
            
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
        List<City> cts = getCities()
        for (int i = 0; i < cts.size(); i++) {
            City city = cts[i]
            String id = String.format("%02d", i + 1)
            String label = "${id}. Travel to ${city.name}"
            options[label] = { game.enterLocation(city) }
        }
        return options
    }
}
