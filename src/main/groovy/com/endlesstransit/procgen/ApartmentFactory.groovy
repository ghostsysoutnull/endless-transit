package com.endlesstransit.procgen

import com.endlesstransit.model.*
import groovy.transform.CompileStatic

/**
 * Phase 9: creation and population of {@link Apartment}. Bodies moved verbatim from
 * {@code ProceduralFactory}; shared services and sibling factories are reached through the registry.
 */
@CompileStatic
final class ApartmentFactory implements LocationFactory<Apartment> {

    private final ProceduralFactory registry

    ApartmentFactory(ProceduralFactory registry) {
        this.registry = registry
    }

    @Override
    Class<Apartment> getType() { Apartment }

    Apartment create(Container parent, String doorDesc, String culture, String timeline, LocusSeed locus) {
        Apartment a = new Apartment(doorDesc, culture, timeline, locus)
        a.setParent(parent)
        
        VibeCapsule vibe = a.getVibe()
        if (vibe != null && locus.nextDouble() > 0.01) { // 99% chance to match vibe
            a.timeline = vibe.timeline
            a.culture = vibe.pickCulture(locus.branch("CULTURE_SELECTOR"))
        } else if (vibe != null) {
            a.isAnomaly = true
        }
        a.fmt = registry.fmt
        return a
    }

    void populate(Apartment a) {
        int numRooms = a.locus.nextInt(1, 10)
        
        List<String> objectPool = []
        int totalObjects = a.locus.nextInt(5, 19)
        Random objRandom = a.locus.branch("OBJECT_POOL").nextRandom()
        for (int i = 0; i < totalObjects; i++) {
            objectPool << registry.themeService.generateHybridObject(a.culture, a.timeline, objRandom)
        }

        for (int i = 0; i < numRooms; i++) {
            Room room = registry.createRoom(a, a.culture, a.timeline, a.locus.branch(i))
            a.addLocation(room)
        }

        int objIdx = 0
        while (!objectPool.isEmpty()) {
            int roomIdx = a.locus.branch("DIST_" + objIdx).nextInt(a.rooms.size())
            a.rooms[roomIdx].objects << (String) objectPool.remove(0)
            objIdx++
        }
    }
}
