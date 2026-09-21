package com.endlesstransit.model
import com.endlesstransit.procgen.LocusSeed

interface Locatable {
    Location getParent()
    void setParent(Location parent)
    String getPath()
    int getDepth()
    String getCoordinates()
    String getName()
    String getTypeName()
    Location findAncestor(Class type)
    int getIndexInParent()
    int getTotalInParent()
    LocusSeed getLocus()
    void setLocus(LocusSeed locus)
    String getLIP()
}
