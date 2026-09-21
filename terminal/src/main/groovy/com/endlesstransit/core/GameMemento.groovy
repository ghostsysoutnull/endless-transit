package com.endlesstransit.core

import com.endlesstransit.model.Location
import com.endlesstransit.procgen.LocusSeed
import groovy.transform.CompileStatic
import groovy.transform.Immutable

/**
 * GameMemento: An immutable snapshot of the game's state for save/load and time-travel.
 */
@CompileStatic
@Immutable
class GameMemento {
    LocusSeed masterLocus
    String currentLIP
    int playerCoherence
    List<InventoryItem> inventory
    List<String> inputHistory
    
    // We store the LIP instead of the Location object to ensure 
    // we can perfectly reconstitute the world from the seed.
}
