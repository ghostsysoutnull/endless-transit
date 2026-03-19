package com.endlesstransit.model
import com.endlesstransit.procgen.LocusSeed
import groovy.transform.CompileStatic

/**
 * Abstract base for leaf locations (non-container nodes) in the world hierarchy.
 * Extracts the common parent-tracking, visited-flag, locus, LIP, path, depth,
 * and ancestor-traversal logic that Room would otherwise duplicate from Container.
 *
 * Phase 4a — Structural Extraction.
 */
@CompileStatic
abstract class AbstractLeafLocation implements Location {
    Location parent
    boolean visited = false
    LocusSeed locus
    OutputFormatter fmt

    protected OutputFormatter getEffectiveFmt() { fmt }

    @Override LocusSeed getLocus() { locus }
    @Override void setLocus(LocusSeed locus) { this.locus = locus }
    @Override Location getParent() { parent }
    @Override void setParent(Location parent) { this.parent = parent }
    @Override boolean isVisited() { visited }
    @Override void markVisited() { this.visited = true }

    @Override
    String getLIP() {
        if (parent == null) return "0"
        int myIndex = getIndexInParent() - 1
        return "${parent.getLIP()}.$myIndex"
    }

    @Override
    String getPath() {
        if (parent != null) return "${parent.getPath()} > ${getName()}"
        return getName()
    }

    @Override
    int getDepth() { (parent != null) ? parent.getDepth() + 1 : 0 }

    @Override
    Location findAncestor(Class type) {
        if (type.isInstance(this)) return this
        return parent?.findAncestor(type)
    }
}
