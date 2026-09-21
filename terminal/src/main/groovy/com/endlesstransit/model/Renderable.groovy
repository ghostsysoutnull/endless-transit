package com.endlesstransit.model
import com.endlesstransit.core.Player

interface Renderable {
    String getDescription()
    VibeCapsule getVibe()
    boolean isAbyssal()
    String getMapSymbol()
    String getMapColor()
    List<String> getExtraContent(Player player, int width)
    
    // Semantic HUD / Navigation methods
    String getIndexLabel()
    String getStatusSummary()
    String getTypeLabel()
    String getLatticeMeta()
    String getMapType()
    String getSparklineLabel()
}
