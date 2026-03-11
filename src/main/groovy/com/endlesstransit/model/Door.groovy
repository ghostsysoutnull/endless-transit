package com.endlesstransit.model

import com.endlesstransit.procgen.LocusSeed
import groovy.transform.CompileStatic

/**
 * Door: The interface between the corridor and the unit.
 * Refactored to support the Dual-Layer Scan (Data + Narrative).
 */
@CompileStatic
class Door {
    DoorAppearance appearance
    DoorInscription inscription
    AnomalousTrace trace
    
    Boolean visited = false
    LocusSeed locus

    Door(LocusSeed locus = new LocusSeed(0)) {
        this.locus = locus
        this.appearance = generateAppearance(locus)
        
        if (locus.branch("INSCRIPTION_ROLL").checkProbability(0.2)) {
            this.inscription = generateInscription(locus.branch("INSCRIPTION"))
        }
    }

    private DoorAppearance generateAppearance(LocusSeed l) {
        List<String> materials = [
            "Heavy Bulkhead", "Synth-Glass Slab", "Pitted Concrete", 
            "Reinforced Polymer", "Oxidized Metal Hatch", "Pristine Ceramic",
            "Brutalist Slab", "Industrial Barrier"
        ]
        List<String> states = ["Vibrating", "Cold", "Rusted", "Stable", "Pitted", "Polished", "Static"]
        
        return new DoorAppearance(
            material: (String) l.branch("MAT").pickFrom(materials),
            physicalState: (String) l.branch("STATE").pickFrom(states)
        )
    }

    private DoorInscription generateInscription(LocusSeed l) {
        List<String> words = [
            "STORAGE", "DATA_VAULT", "DANGER", "VOID_SINK", "it_hums", 
            "LATTICE", "HELP_IS_STATIC", "QUARANTINE", "RESONANCE", "NO_ENTRY"
        ]
        List<InscriptionStyle> styles = InscriptionStyle.values().toList()
        
        return new DoorInscription(
            text: (String) l.branch("WORD").pickFrom(words),
            style: (InscriptionStyle) l.branch("STYLE").pickFrom(styles)
        )
    }

    String getMinimalDescription() {
        StringBuilder sb = new StringBuilder()
        if (visited) sb.append("(VISITED) ")
        if (inscription) {
            sb.append(inscription.getFormattedText()).append(" ")
        }
        sb.append(appearance.getBrief())
        return sb.toString()
    }

    String getDescription() {
        return getMinimalDescription()
    }

    /**
     * Synthesizes a full atmospheric paragraph for the door.
     */
    String getFullNarrative() {
        StringBuilder sb = new StringBuilder()
        sb.append(appearance.getNarrative())
        
        if (trace) {
            sb.append(" ").append(trace.sensoryDescription)
        }
        
        if (inscription) {
            sb.append(" ").append(inscription.getNarrative())
        }
        
        return sb.toString()
    }
}
