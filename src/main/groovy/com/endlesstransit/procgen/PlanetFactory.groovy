package com.endlesstransit.procgen

import com.endlesstransit.model.*
import groovy.transform.CompileStatic

/**
 * Phase 9: creation and population of {@link Planet}. Bodies moved verbatim from
 * {@code ProceduralFactory}; shared services and sibling factories are reached through the registry.
 */
@CompileStatic
final class PlanetFactory implements LocationFactory<Planet> {

    private final ProceduralFactory registry

    PlanetFactory(ProceduralFactory registry) {
        this.registry = registry
    }

    @Override
    Class<Planet> getType() { Planet }

    Planet create(Container parent, LocusSeed locus) {
        Planet p = new Planet(NameGenerator.generatePlanetName(locus), locus)
        p.setParent(parent)
        
        // 1. Initialize Planetary Vibe Deterministically
        String timeline = registry.themeService.getRandomTimeline(locus.branch("TIMELINE"))
        String primary = registry.themeService.getRandomCulture(locus.branch("CULTURE_P"))
        String secondary = registry.themeService.getRandomCulture(locus.branch("CULTURE_S"))
        
        int attempts = 0
        while (secondary == primary && attempts < 10) {
            secondary = registry.themeService.getRandomCulture(locus.branch("CULTURE_S_ALT" + attempts))
            attempts++
        }
        
        p.localVibe = new VibeCapsule(timeline, primary, secondary)
        
        // 2. Map color
        Map<String, String> colorMap = [
            "baroque": com.endlesstransit.ui.Terminal.YELLOW,
            "gilded": com.endlesstransit.ui.Terminal.WHITE,
            "monolith": com.endlesstransit.ui.Terminal.CYAN,
            "neon": com.endlesstransit.ui.Terminal.L_CYAN,
            "organic": com.endlesstransit.ui.Terminal.GREEN,
            "rust": com.endlesstransit.ui.Terminal.RED,
            "shogun": com.endlesstransit.ui.Terminal.MAGENTA,
            "void": com.endlesstransit.ui.Terminal.GREY,
            "zenith": com.endlesstransit.ui.Terminal.BLUE
        ]
        p.localVibe.atmosphericColor = colorMap[primary] ?: com.endlesstransit.ui.Terminal.WHITE
        p.fmt = registry.fmt
        return p
    }

    void populate(Planet p) {
        int numCountries = p.locus.nextInt(2, 8)
        for (int i = 0; i < numCountries; i++) {
            p.addLocation(registry.createCountry(p, p.locus.branch(i)))
        }
    }
}
