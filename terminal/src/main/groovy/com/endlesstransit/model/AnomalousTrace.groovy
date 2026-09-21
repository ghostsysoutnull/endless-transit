package com.endlesstransit.model

import groovy.transform.CompileStatic

/**
 * AnomalousTrace: Sensory clues that hint at the room type behind a door.
 */
@CompileStatic
enum AnomalousTrace {
    OZONE("Ozone", "A sharp smell of ozone escapes the frame, ionizing the nearby air.", ["SERVER", "LABORATORY", "PLANT", "POWER", "ARRAY", "CORE"]),
    FROST("Frost", "Thin frost is forming on the magnetic hinges. Total absence of thermal signature detected.", ["STORAGE", "VOID", "CRYO", "WELL", "VAULT"]),
    CLICKING("Clicking", "A persistent, rhythmic clicking sound—like high-speed mechanical relays—originates from the lock housing.", ["MAINTENANCE", "CLOCKWORK", "ROBOTICS", "STATION", "NODE", "ARMORY"]),
    HUMMING("Humming", "A heavy, low-frequency thrum (60Hz) vibrates through the surrounding strata.", ["ENGINE", "TURBINE", "REACTOR", "DEPOT", "HUB", "BARRACKS", "TACTICAL"]),
    SILENCE("Stillness", "The air nearby is unnaturally still. Not even the standard system-hum is audible.", ["ABANDONED", "QUARTERS", "UNIT", "CELL", "CHAMBER"]),
    METALLIC_TEARING("Tearing", "Intermittent sounds of structural stress and metallic tearing echo from the other side.", ["BREACH", "UNSTABLE", "RUIN", "PULSE"])

    final String name
    final String sensoryDescription
    final List<String> roomKeywords 

    AnomalousTrace(String name, String sensoryDescription, List<String> roomKeywords) {
        this.name = name
        this.sensoryDescription = sensoryDescription
        this.roomKeywords = roomKeywords
    }
    
    boolean matches(String roomType) {
        String upperType = roomType.toUpperCase()
        return roomKeywords.any { upperType.contains(it) }
    }
}
