package com.endlesstransit.procgen

import com.endlesstransit.model.*
import groovy.transform.CompileStatic

/**
 * Phase 9: creation and population of {@link Room}. Bodies moved verbatim from
 * {@code ProceduralFactory}; shared services and sibling factories are reached through the registry.
 */
@CompileStatic
final class RoomFactory {

    private final ProceduralFactory registry

    RoomFactory(ProceduralFactory registry) {
        this.registry = registry
    }

    Room create(Container parent, String culture, String timeline, LocusSeed locus, String adjective = null) {
        Room r = new Room()
        r.culture = culture
        r.timeline = timeline
        r.setLocus(locus)
        r.setParent(parent)
        
        // 1. Initial Attributes
        List<String> colors = ["white", "blue", "pink", "gray", "purple", "orange", "green", "red"]
        r.color = (String) locus.pickFrom(colors)
        
        // 2. Anomaly Logic
        if (parent instanceof Apartment) {
            r.isAnomaly = ((Apartment)parent).isAnomaly
        }

        // 3. Functional Naming
        Country country = (Country) r.findAncestor(Country.class)
        String trait = country != null ? country.functionalTrait : "Standard"
        Map<String, Object> nameData = registry.nameGenerator.generateRoomName(culture, trait, locus, adjective)
        r.roomName = (String) nameData["name"]
        RoomCategory category = (RoomCategory) nameData["category"]
        r.roomType = category.displayName

        // 4. Atmosphere
        VibeCapsule vibe = r.getVibe()
        String mutation = vibe != null ? vibe.latticeMutation : "Standard"
        Map<String, String> atmos = registry.themeService.generateAtmosphere(culture, timeline, mutation, r.isAnomaly, trait, locus)
        r.walls = atmos["walls"]
        r.lightingDesc = atmos["lighting"]
        r.structureDesc = atmos["structure"]

        // 5. Atmo-Traits
        r.atmoTraits["OXYGEN"] = "${locus.nextInt(12, 21)}%".toString()
        r.atmoTraits["TEMP"] = "${locus.nextInt(5, 25)}°C".toString()
        r.atmoTraits["SIGNAL"] = locus.nextBoolean() ? "[SHIELDED]" : "[CLEAR]"
        
        // 6. Furniture
        int numFurniture = locus.nextInt(1, 3)
        Random furnRandom = locus.branch("FURNITURE").nextRandom()
        // HK-016 step 2: furniture is a conditioned culture item, disjoint from the object deck.
        r.furniture.addAll(registry.themeService.generateFurniture(culture, numFurniture, furnRandom))
        r.fmt = registry.fmt
        return r
    }
}
