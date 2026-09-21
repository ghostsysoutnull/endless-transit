#!/bin/bash
# vibe-check-model.sh: Stress test the procedural hierarchy

echo ">>> INITIATING MODEL_VIBE_CHECK..."
echo ">>> SCALING NEURAL LATTICE..."

# We can use a small Groovy script to probe the depth
groovy -cp src/main/groovy -e '
import com.endlesstransit.model.*
import com.endlesstransit.procgen.*

def universe = new Universe()
def filament = universe.filaments[0]
def node = filament.children[0]
def system = node.children[0]
def planet = system.planets[0]

println "Hierarchy Depth: ${planet.getDepth()}"
println "Locus Path: ${planet.getPath()}"

if (planet.getDepth() >= 4) {
    println "[VIBE_STATUS: STABLE]"
} else {
    println "[VIBE_STATUS: COLLAPSED]"
    System.exit(1)
}
'

echo ">>> MODEL_VIBE_CHECK COMPLETE."
