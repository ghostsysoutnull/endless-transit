package com.endlesstransit.core

import com.endlesstransit.model.Location
import groovy.transform.CompileStatic

@CompileStatic
class GameSession {
    long masterSeed
    Player player
    Location currentLocation
    
    GameSession(long seed, Player player, Location current) {
        this.masterSeed = seed
        this.player = player
        this.currentLocation = current
    }
}
