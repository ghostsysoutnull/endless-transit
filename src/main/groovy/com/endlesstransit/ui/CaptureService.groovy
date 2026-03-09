package com.endlesstransit.ui

import groovy.transform.CompileStatic
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors
import java.io.File

/**
 * Orchestrates the capture, formatting, and saving of screenshots.
 */
@CompileStatic
class CaptureService {
    private static final ExecutorService executor = Executors.newSingleThreadExecutor { Runnable r ->
        Thread t = new Thread(r)
        t.daemon = true
        return t
    }
    private static final String SCREENSHOT_DIR = "screenshots"
    
    static class CaptureResult {
        boolean success
        String filePath
        String error
        long timestamp
    }

    /**
     * Captures a screenshot from a specific provider.
     */
    static void capture(ScreenshotProvider provider, List<String> history, FormatStrategy strategy = new PlainFormatter()) {
        ScreenBuffer buffer = provider.capture(history)
        executor.submit {
            saveScreenshot(buffer, provider.getProviderName(), strategy)
        }
    }

    /**
     * Captures from all registered providers.
     */
    static void captureAll(List<String> history, FormatStrategy strategy = new PlainFormatter()) {
        ScreenshotRegistry.getProviders().each { provider ->
            capture(provider, history, strategy)
        }
    }

    private static void saveScreenshot(ScreenBuffer buffer, String providerName, FormatStrategy strategy) {
        try {
            File dir = new File(SCREENSHOT_DIR)
            if (!dir.exists()) dir.mkdirs()

            String timestamp = new Date(buffer.timestamp).format("yyyyMMdd_HHmmss")
            // Sanitize LIP for filename
            String lip = buffer.locationPath.replaceAll("[^a-zA-Z0-9.-]", "_")
            String filename = "${SCREENSHOT_DIR}/screenshot_${providerName}_${lip}_${timestamp}.${strategy.getExtension()}"
            
            String content = strategy.format(buffer)
            new File(filename).text = content
            
            // Log success to Journal/Logger if needed
            // For now, we'll assume it worked
        } catch (Exception e) {
            e.printStackTrace()
        }
    }
}
