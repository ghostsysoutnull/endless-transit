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

    /** Built-in lists (used when no pools are given, e.g. a hand-built door); the factory passes ThemeService's (HK-016 step 3). */
    static final List<String> DEFAULT_MATERIALS = [
        "Heavy Bulkhead", "Synth-Glass Slab", "Pitted Concrete",
        "Reinforced Polymer", "Oxidized Metal Hatch", "Pristine Ceramic",
        "Brutalist Slab", "Industrial Barrier"
    ].asImmutable()
    static final List<String> DEFAULT_STATES = ["Vibrating", "Cold", "Rusted", "Stable", "Pitted", "Polished", "Static"].asImmutable()

    Door(LocusSeed locus = new LocusSeed(0), Map<String, String> materialPool = null, Map<String, String> statePool = null) {
        this.locus = locus
        this.appearance = generateAppearance(locus, materialPool, statePool)
        
        if (locus.branch("INSCRIPTION_ROLL").checkProbability(0.2)) {
            this.inscription = generateInscription(locus.branch("INSCRIPTION"))
        }
    }

    private DoorAppearance generateAppearance(LocusSeed l, Map<String, String> materialPool, Map<String, String> statePool) {
        List<String> materials = materialPool ? new ArrayList<String>(materialPool.keySet()) : DEFAULT_MATERIALS
        List<String> states = statePool ? new ArrayList<String>(statePool.keySet()) : DEFAULT_STATES
        String material = (String) l.branch("MAT").pickFrom(materials)
        String state = (String) l.branch("STATE").pickFrom(states)
        return new DoorAppearance(
            material: material,
            physicalState: state,
            materialNarrative: materialPool ? materialPool[material] : null,
            stateNarrative: statePool ? statePool[state] : null
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
