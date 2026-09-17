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
            a.timeline = vibe.pickTimeline(locus.branch("TIMELINE_SELECTOR"))   // HK-016 step 2: era drifts like culture
            a.culture = vibe.pickCulture(locus.branch("CULTURE_SELECTOR"))
        } else if (vibe != null) {
            a.isAnomaly = true
        }
        a.fmt = registry.fmt
        return a
    }

    void populate(Apartment a) {
        int numRooms = a.locus.nextInt(1, 10)
        
        int totalObjects = a.locus.nextInt(5, 19)
        Random objRandom = a.locus.branch("OBJECT_POOL").nextRandom()
        // HK-016 step 2: deal from a shuffled deck — no object repeats inside an apartment.
        List<String> deck = new ArrayList<String>(registry.themeService.objectDeck(a.culture, a.timeline))
        Collections.shuffle(deck, objRandom)
        List<String> objectPool = new ArrayList<String>(deck.subList(0, Math.min(totalObjects, deck.size())))

        // HK-016 step 2: deal each room a distinct adjective, so no two rooms in the apartment share a name.
        List<String> adjectives = new ArrayList<String>(NameGenerator.adjectivesFor(a.culture))
        Collections.shuffle(adjectives, a.locus.branch("ROOM_ADJ").nextRandom())
        Set<String> usedNames = new HashSet<String>()
        for (int i = 0; i < numRooms; i++) {
            Room room = registry.createRoom(a, a.culture, a.timeline, a.locus.branch(i), (String) adjectives[i % adjectives.size()])
            if (!usedNames.add(room.roomName)) {
                // The deck wrapped onto a category already named with this adjective: take the next free one.
                for (String alt in adjectives) {
                    String candidate = "${alt} ${room.roomType}".toString()
                    if (usedNames.add(candidate)) { room.roomName = candidate; break }
                }
            }
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
