package com.endlesstransit
import com.endlesstransit.ui.Terminal
import com.endlesstransit.model.*
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager


try {
    Terminal.initialize()
    com.endlesstransit.model.ModelOutput.fmt = new com.endlesstransit.ui.StandardTerminalAdapter()
    def game = new Game()
    game.start()
} catch (Throwable t) {
    // If the game object was created, we can get the seed
    Logger.error("GLOBAL_BOOT_FAILURE: System failed during initialization.")
    Logger.error("  >> Exception: $t", t)
    
    Terminal.println "\n\u001b[31m!!! CRITICAL BOOT FAILURE !!!\u001b[0m"
    Terminal.println "Details have been logged to transit.log"
    System.exit(1)
}
