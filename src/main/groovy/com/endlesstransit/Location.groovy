package com.endlesstransit

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
}
