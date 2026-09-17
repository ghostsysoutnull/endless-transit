package com.endlesstransit
import com.endlesstransit.ui.Terminal
import com.endlesstransit.model.*
import com.endlesstransit.core.Game
import com.endlesstransit.core.LaunchArgs
import com.endlesstransit.core.Logger


try {
    Terminal.initialize()
    Long seed = null
    try {
        seed = LaunchArgs.seedFrom(args)
    } catch (IllegalArgumentException badOption) {
        Terminal.println Terminal.colorize("!!! LAUNCH_REFUSED: ${badOption.message}", Terminal.RED)
        System.exit(1)
    }
    def game = seed != null ? new Game(seed) : new Game()
    game.start()
} catch (Throwable t) {
    // If the game object was created, we can get the seed
    Logger.error("GLOBAL_BOOT_FAILURE: System failed during initialization.")
    Logger.error("  >> Exception: $t", t)
    
    Terminal.println "\n\u001b[31m!!! CRITICAL BOOT FAILURE !!!\u001b[0m"
    Terminal.println "Details have been logged to transit.log"
    System.exit(1)
}
