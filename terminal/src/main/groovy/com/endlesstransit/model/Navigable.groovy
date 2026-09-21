package com.endlesstransit.model
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player

interface Navigable {
    void enter(Player player)
    Map<String, Closure> getOptions(Game game)
    void processAction(Player player)
    boolean isVisited()
    void markVisited()
}
