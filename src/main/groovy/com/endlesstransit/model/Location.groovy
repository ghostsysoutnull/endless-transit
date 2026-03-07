package com.endlesstransit.model
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager

interface Location {
    String getDescription()
    void enter(Player player)
    Map<String, Closure> getOptions(Game game)
    Location getParent()
    void setParent(Location parent)
    boolean isVisited()
    void markVisited()
    int getIndexInParent()
    int getTotalInParent()
    void processAction(Player player)
    String getPath()
    int getDepth()
    String getCoordinates()
    String getName()
    String getTypeName()
    VibeCapsule getVibe()
    Location findAncestor(Class type)
    boolean isAbyssal()
    String getMapSymbol()
    String getMapColor()
    long getSeed()
    void setSeed(long seed)
    String getLIP()
    Map<String, Object> getMutationState()
    void applyMutationState(Map<String, Object> state)
    List<String> getExtraContent(Player player)
}
