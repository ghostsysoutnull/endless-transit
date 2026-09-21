package com.endlesstransit.core

import com.endlesstransit.model.Location
import groovy.transform.CompileStatic

/**
 * LocationDiscovered: the player set foot on a macro location (Street and above) for the
 * first time (HK-010). Published by Player.markFootprint() exactly once per new path in
 * visitedPaths — never on re-entry, never for Floor/Corridor/Apartment/Room.
 * The journal listens and writes the [DISCOVERY] line that had no producer since 2026-03-05.
 */
@CompileStatic
class LocationDiscovered extends DomainEvent {
    final Location location
    final String path

    LocationDiscovered(Location location) {
        this.location = location
        this.path = location.getPath()
        this.lip = location.getLIP()
    }
}
