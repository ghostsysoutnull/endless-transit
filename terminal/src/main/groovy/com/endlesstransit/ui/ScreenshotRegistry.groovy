package com.endlesstransit.ui

import groovy.transform.CompileStatic

/**
 * Registry for UI components that can provide screenshots.
 */
@CompileStatic
class ScreenshotRegistry {
    private static final List<ScreenshotProvider> providers = []

    static void register(ScreenshotProvider provider) {
        if (!providers.contains(provider)) {
            providers.add(provider)
        }
    }

    static void unregister(ScreenshotProvider provider) {
        providers.remove(provider)
    }

    static List<ScreenshotProvider> getProviders() {
        return new ArrayList<>(providers)
    }
}
