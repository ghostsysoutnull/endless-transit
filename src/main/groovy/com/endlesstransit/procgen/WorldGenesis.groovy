package com.endlesstransit.procgen

import com.endlesstransit.model.*
import groovy.transform.CompileStatic

/**
 * WorldGenesis: Responsible for the initial creation and "Deep Start" logic.
 * Decouples the Game engine from the specific hierarchy of the world.
 */
@CompileStatic
class WorldGenesis {

    /**
     * DTO to return the results of world creation.
     */
    static class GenesisResult {
        Universe universe
        Location startLocation
    }

    /**
     * Creates a new universe and performs a deep crawl to find a suitable starting location.
     * Hierarchy: Universe > Filament > Sector > System > Planet > Country > City > Street
     */
    static GenesisResult createInitialWorld(LocusSeed masterLocus) {
        Universe universe = ProceduralFactory.createUniverse(masterLocus)
        
        // Deep traversal to find a starting Street
        // 1. Filament
        CosmicFilament filament = universe.getFilaments()[0]
        
        // 2. Node (GalacticSector or NullSector)
        Container node = (Container) filament.getChildren()[0]
        
        // 3. SolarSystem
        SolarSystem system = (SolarSystem) node.getChildren()[0]
        
        // 4. Planet
        Planet planet = system.getPlanets()[0]
        
        // 5. Country
        Country country = planet.getCountries()[0]
        
        // 6. City
        City city = country.getCities()[0]
        
        // 7. Street (Target Start)
        Location start = city.getStreets()[0]
        
        return new GenesisResult(universe: universe, startLocation: start)
    }
}
