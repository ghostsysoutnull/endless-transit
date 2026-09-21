package com.endlesstransit.procgen

import com.endlesstransit.model.*
import com.endlesstransit.ui.Terminal
import groovy.transform.CompileStatic

/**
 * Phase 9: creation and population of {@link Corridor}. Bodies moved verbatim from
 * {@code ProceduralFactory}; shared services and sibling factories are reached through the registry.
 */
@CompileStatic
final class CorridorFactory implements LocationFactory<Corridor> {

    private final ProceduralFactory registry

    CorridorFactory(ProceduralFactory registry) {
        this.registry = registry
    }

    @Override
    Class<Corridor> getType() { Corridor }

    Corridor create(Container parent, int numApartments, String culture, String timeline, LocusSeed locus) {
        Corridor c = new Corridor(numApartments, culture, timeline, locus)
        c.setParent(parent)
        c.fmt = registry.fmt
        c.descriptionVariant = registry.themeService.descriptionVariant("corridor", locus)   // HK-016 step 2
        return c
    }

    void populate(Corridor c) {
        LocusSeed locus = c.locus
        Country country = (Country) c.findAncestor(Country.class)
        if (country == null) {
            Terminal.println "[TOPOLOGY_WARN] populateCorridor: no Country ancestor for ${c.getLIP()} — trait defaults to Standard, all doors may resolve to SILENCE"
        }
        String trait = country != null ? country.functionalTrait : "Standard"

        for (int i = 0; i < c.numApartments; i++) {
            LocusSeed aptLocus = locus.branch(i)
            LocusSeed doorLocus = aptLocus.branch("DOOR")
            
            // 1. Back-Propagation: Peek at the first room's category to decide the trace
            LocusSeed firstRoomLocus = aptLocus.branch(0)
            RoomCategory roomCategory = (RoomCategory) registry.nameGenerator.generateRoomName(c.culture, trait, firstRoomLocus)["category"]

            Door door = new Door(doorLocus, registry.themeService.doorMaterials, registry.themeService.doorStates)   // HK-016 step 3: lists + narratives from files
            door.trace = roomCategory.trace

            // 2. Contextual Inscription logic (overrides Door's random one if room is significant)
            if (doorLocus.branch("INSCRIPTION_ROLL").checkProbability(0.2)) {
                door.inscription = generateContextualInscription(roomCategory.displayName, doorLocus.branch("INSCRIPTION"))
            }

            c.doors << door
            Apartment apartment = registry.createApartment(c, door.getMinimalDescription(), c.culture, c.timeline, aptLocus)
            c.addLocation(apartment)
        }
    }

    /**
     * Synthesizes an inscription that logically matches the room type.
     */
    private DoorInscription generateContextualInscription(String roomType, LocusSeed l) {
        String upperType = roomType.toUpperCase()
        String word = "LATTICE"
        InscriptionStyle style = InscriptionStyle.STAMPED
        
        if (upperType.contains("STORAGE") || upperType.contains("CELL")) {
            word = "STORAGE"
            style = InscriptionStyle.STAMPED
        } else if (upperType.contains("LAB") || upperType.contains("SERVER")) {
            word = "DATA_VAULT"
            style = InscriptionStyle.STAMPED
        } else if (upperType.contains("SECURITY") || upperType.contains("ARMORY")) {
            word = "DANGER"
            style = InscriptionStyle.BURNED
        } else if (upperType.contains("ABANDONED") || upperType.contains("RUIN")) {
            word = "it_hums"
            style = InscriptionStyle.SCRAWLED
        } else {
            // Default random pool for standard rooms
            List<String> words = registry.themeService.doorWords ?: ["VOID_SINK", "LATTICE", "HELP_IS_STATIC", "QUARANTINE", "RESONANCE", "NO_ENTRY"]
            word = (String) l.branch("WORD").pickFrom(words)
            style = (InscriptionStyle) l.branch("STYLE").pickFrom(InscriptionStyle.values().toList())
        }
        
        return new DoorInscription(word, style)
    }
}
