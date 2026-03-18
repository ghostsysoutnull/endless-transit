package com.endlesstransit.model

import groovy.transform.CompileStatic

/**
 * RoomCategory: Typed enum replacing raw String room-type matching.
 * Each value carries its display name and the AnomalousTrace directly,
 * eliminating fragile substring matching in ProceduralFactory.populateCorridor().
 */
@CompileStatic
enum RoomCategory {

    // Military
    SECURITY_STATION("Security Station", AnomalousTrace.CLICKING),
    BARRACKS("Barracks", AnomalousTrace.HUMMING),
    ARMORY("Armory", AnomalousTrace.CLICKING),
    TACTICAL_HUB("Tactical Hub", AnomalousTrace.HUMMING),

    // Research
    LABORATORY("Laboratory", AnomalousTrace.OZONE),
    NEURAL_LINK_ARRAY("Neural Link Array", AnomalousTrace.OZONE),
    OBSERVATION_DECK("Observation Deck", AnomalousTrace.SILENCE),
    BIO_SERVER("Bio-Server", AnomalousTrace.OZONE),

    // Industrial
    POWER_PLANT("Power Plant", AnomalousTrace.OZONE),
    PROCESSING_CORE("Processing Core", AnomalousTrace.OZONE),
    MAINTENANCE_BAY("Maintenance Bay", AnomalousTrace.CLICKING),
    FUEL_DEPOT("Fuel Depot", AnomalousTrace.HUMMING),

    // Ceremonial
    PRAYER_HALL("Prayer Hall", AnomalousTrace.SILENCE),
    RITUAL_CHAMBER("Ritual Chamber", AnomalousTrace.SILENCE),
    ARCHIVE("Archive", AnomalousTrace.SILENCE),
    MEMORY_WELL("Memory Well", AnomalousTrace.FROST),

    // Commercial
    TRADING_FLOOR("Trading Floor", AnomalousTrace.SILENCE),
    LOGIC_MARKET("Logic Market", AnomalousTrace.SILENCE),
    CREDIT_HUB("Credit Hub", AnomalousTrace.HUMMING),
    SUPPLY_NODE("Supply Node", AnomalousTrace.CLICKING),

    // Agricultural
    HYDROPONIC_BAY("Hydroponic Bay", AnomalousTrace.SILENCE),
    SPORE_FARM("Spore Farm", AnomalousTrace.SILENCE),
    OXYGEN_SUMP("Oxygen Sump", AnomalousTrace.SILENCE),
    GROWTH_CHAMBER("Growth Chamber", AnomalousTrace.SILENCE),

    // Standard
    STANDARD_SPATIAL_CELL("Standard Spatial Cell", AnomalousTrace.SILENCE),
    GENERIC_LIVING_UNIT("Generic Living Unit", AnomalousTrace.SILENCE),
    TRANSIT_NODE("Transit Node", AnomalousTrace.CLICKING),
    LATTICE_SUB_CELL("Lattice Sub-Cell", AnomalousTrace.SILENCE)

    final String displayName
    final AnomalousTrace trace

    RoomCategory(String displayName, AnomalousTrace trace) {
        this.displayName = displayName
        this.trace = trace
    }
}
