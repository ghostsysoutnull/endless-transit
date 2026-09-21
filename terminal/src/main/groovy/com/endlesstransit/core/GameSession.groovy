package com.endlesstransit.core

import com.endlesstransit.model.Location
import com.endlesstransit.procgen.LocusSeed
import groovy.transform.CompileStatic

@CompileStatic
class GameSession {
    LocusSeed locus
    Player player
    Location currentLocation
    
    GameSession(LocusSeed locus, Player player, Location current) {
        this.locus = locus
        this.player = player
        this.currentLocation = current
    }
}
