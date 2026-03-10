package com.endlesstransit.model

import groovy.transform.CompileStatic

/**
 * AnomalousTrace: Sensory clues that hint at the room type behind a door.
 * Rewards player deduction by mapping environmental "leaks" to room functions.
 */
@CompileStatic
enum AnomalousTrace {
    OZONE("Ozone", "A sharp smell of ozone escaping the frame.", ["SERVER", "LABORATORY", "PLANT", "POWER", "ARRAY", "CORE"]),
    FROST("Frost", "The handle is ice-cold. Thin frost is forming on the hinges.", ["STORAGE", "VOID", "CRYO", "WELL", "VAULT"]),
    CLICKING("Clicking", "A persistent, rhythmic clicking sound from the lock housing.", ["MAINTENANCE", "CLOCKWORK", "ROBOTICS", "STATION", "NODE", "ARMORY"]),
    HUMMING("Humming", "A low-frequency vibration (60Hz) thrumming through the surface.", ["ENGINE", "TURBINE", "REACTOR", "DEPOT", "HUB", "BARRACKS", "TACTICAL"]),
    SILENCE("Stillness", "Total absence of sound or thermal signature. The air is unnaturally still.", ["ABANDONED", "QUARTERS", "UNIT", "CELL", "CHAMBER"]),
    METALLIC_TEARING("Tearing", "Intermittent sounds of structural stress and metallic tearing.", ["BREACH", "UNSTABLE", "RUIN", "PULSE"])

    final String name
    final String sensoryDescription
    final List<String> roomKeywords // Used for matching with ProceduralFactory room types

    AnomalousTrace(String name, String sensoryDescription, List<String> roomKeywords) {
        this.name = name
        this.sensoryDescription = sensoryDescription
        this.roomKeywords = roomKeywords
    }
    
    /**
     * Checks if this trace is a logical match for a given room type string.
     */
    boolean matches(String roomType) {
        String upperType = roomType.toUpperCase()
        return roomKeywords.any { upperType.contains(it) }
    }
}
