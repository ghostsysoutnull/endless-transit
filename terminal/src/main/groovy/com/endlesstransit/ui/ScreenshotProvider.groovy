package com.endlesstransit.ui

import groovy.transform.CompileStatic

/**
 * Interface for any UI component that can provide a snapshot of its current state.
 */
@CompileStatic
interface ScreenshotProvider {
    /**
     * @param inputHistory The sequence of inputs leading to this state.
     * @return A ScreenBuffer capturing the current visual state.
     */
    ScreenBuffer capture(List<String> inputHistory)
    
    /**
     * @return The semantic name of this provider (e.g., "BridgeHUD", "JournalLog").
     */
    String getProviderName()
}
