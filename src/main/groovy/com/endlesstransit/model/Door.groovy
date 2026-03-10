package com.endlesstransit.model

import com.endlesstransit.procgen.LocusSeed
import groovy.transform.CompileStatic

/**
 * Door: The interface between the corridor and the unit.
 * Refactored to use sensory and technical components for high-fidelity simulation.
 */
@CompileStatic
class Door {
    DoorAppearance appearance
    DoorInscription inscription
    AnomalousTrace trace
    
    Boolean visited = false
    LocusSeed locus

    /**
     * Primary constructor.
     * Uses the provided locus to deterministically synthesize its components.
     */
    Door(LocusSeed locus = new LocusSeed(0)) {
        this.locus = locus
        this.appearance = generateAppearance(locus)
        
        // 20% chance for a door to have a written inscription
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

    /**
     * Minimalist description for high-velocity HUD navigation.
     */
    String getMinimalDescription() {
        StringBuilder sb = new StringBuilder()
        if (visited) sb.append("(VISITED) ")
        if (inscription) {
            sb.append(inscription.getFormattedText()).append(" ")
        }
        sb.append(appearance.getBrief())
        return sb.toString()
    }

    /**
     * Backward compatibility with existing Model/UI logic.
     */
    String getDescription() {
        return getMinimalDescription()
    }

    /**
     * High-density technical diagnostic block for the [s] Scan command.
     */
    String getEnhancedDescription() {
        StringBuilder sb = new StringBuilder()
        sb.append("MATERIAL: ").append(appearance.material).append("\n")
        sb.append("STATE   : ").append(appearance.physicalState).append("\n")
        
        if (inscription) {
            sb.append("MARKING : ").append(inscription.style).append(" '").append(inscription.text).append("'\n")
        }
        
        if (trace) {
            sb.append("TRACE   : ").append(trace.sensoryDescription)
        } else {
            sb.append("TRACE   : No anomalous signatures detected.")
        }
        
        return sb.toString()
    }
}
