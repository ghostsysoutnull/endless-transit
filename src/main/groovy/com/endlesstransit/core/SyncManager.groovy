package com.endlesstransit.core

import com.endlesstransit.model.*
import com.endlesstransit.procgen.LocusSeed
import com.endlesstransit.procgen.ProceduralFactory
import com.endlesstransit.ui.Terminal
import groovy.json.JsonBuilder
import groovy.json.JsonSlurper
import groovy.transform.CompileStatic

@CompileStatic
class SyncManager {
    static final String SAVE_FILE = "session.trace"

    /**
     * Captures the current game state into a JSON file.
     */
    static void sync(Game game) {
        Logger.info("SYNC_INITIATED: Capturing neural trace...")
        
        def player = game.player
        def snapshot = [
            "version": "1.2",
            "masterLocus": game.masterLocus.value,
            "timestamp": System.currentTimeMillis(),
            "player": [
                "coherence": player.coherence,
                "stepCount": player.stepCount,
                "currentLIP": game.currentLocation.getLIP(),
                "footprints": player.footprints.toList(),
                "visitedPaths": player.visitedPaths.toList(),
                "inventory": player.inventory.collect { [
                    "name": it.name,
                    "frequency": it.frequency,
                    "sessionMergeCount": it.sessionMergeCount,
                    "isKeystone": it.isKeystone
                ] }
            ],
            "mutations": gatherMutations(game)
        ]

        try {
            def json = new JsonBuilder(snapshot)
            new File(SAVE_FILE).write(json.toPrettyString())
            Logger.info("SYNC_COMPLETE: Trace stabilized at $SAVE_FILE")
        } catch (Exception e) {
            Logger.error("SYNC_FAILED: Failed to write trace to substrate.", e)
            throw e
        }
    }

    /**
     * Loads the game state from a JSON file and reconstitutes the world into a GameSession.
     */
    static GameSession restore() {
        File file = new File(SAVE_FILE)
        if (!file.exists()) {
            Logger.info("RESTORE_FAILED: No trace substrate found at $SAVE_FILE")
            return null
        }

        try {
            Map snapshot = (Map) new JsonSlurper().parse(file)
            long seedValue = (snapshot["masterLocus"] as Number).longValue()
            LocusSeed locus = new LocusSeed(seedValue)
            Logger.info("RESTORE_INITIATED: Reconstituting trace from ${new Date(snapshot.timestamp as long)} (Locus: $locus)")
            
            Universe universe = ProceduralFactory.instance.createUniverse(locus)
            
            // 1. Reconstitute Player
            Player player = new Player()
            Map playerState = (Map) snapshot["player"]
            player.coherence = (int) playerState["coherence"]
            player.stepCount = (int) playerState["stepCount"]
            player.footprints.addAll((List<String>) playerState["footprints"])
            player.visitedPaths.addAll((List<String>) playerState["visitedPaths"])
            
            List inventory = (List) playerState["inventory"]
            inventory.each { Object itemObj ->
                Map item = (Map) itemObj
                player.inventory.add(new InventoryItem(
                    (String) item["name"], 
                    (int) item["frequency"], 
                    (int) item["sessionMergeCount"], 
                    (boolean) item["isKeystone"]
                ))
            }

            // 2. Apply World Mutations
            Map mutations = (Map) snapshot["mutations"]
            mutations.each { Object lipObj, Object stateObj ->
                String lip = (String) lipObj
                Map<String, Object> state = (Map<String, Object>) stateObj
                Location loc = universe.resolveLIP(lip)
                if (loc != null) {
                    loc.applyMutationState(state)
                }
            }

            // 3. Re-mark footprints and visited status
            player.footprints.each { String lip ->
                Location loc = universe.resolveLIP(lip)
                if (loc != null) {
                    loc.markVisited()
                }
            }

            // 4. Resolve Current Location
            String currentLIP = (String) playerState["currentLIP"]
            Location current = universe.resolveLIP(currentLIP)
            player.currentLocation = current

            return new GameSession(locus, player, current)
        } catch (Exception e) {
            Logger.error("RESTORE_FAILED: Trace corruption detected.", e)
            return null
        }
    }

    /**
     * Scans all footprints and gathers locations with non-empty mutation states.
     */
    private static Map<String, Map<String, Object>> gatherMutations(Game game) {
        Map<String, Map<String, Object>> mutations = [:]
        
        // This is a bit expensive, but ensures all visited rooms/buildings are saved.
        // In a real "Sync", we only save things that actually changed.
        game.player.footprints.each { lip ->
            Location loc = ((Universe)game.currentLocation.findAncestor(Universe.class)).resolveLIP(lip)
            if (loc != null) {
                def state = loc.getMutationState()
                if (state) {
                    mutations[lip] = state
                }
            }
        }
        return mutations
    }
}
