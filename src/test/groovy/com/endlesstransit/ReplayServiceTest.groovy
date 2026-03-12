package com.endlesstransit

import com.endlesstransit.core.HeadlessRunner
import com.endlesstransit.core.ReplayService
import com.endlesstransit.ui.ScreenBuffer
import com.endlesstransit.ui.Terminal
import com.endlesstransit.procgen.LocusSeed
import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*
import java.io.File

class ReplayServiceTest {

    @Test
    void testPromotionWorkflow() {
        long seed = 12345L
        List<String> script = ["f", "01", "quit", "y", "y"]
        
        // 1. Manually create a ScreenBuffer to simulate a capture
        ScreenBuffer buffer = new ScreenBuffer(
            lines: ["+-------+", "| MOCK  |", "+-------+"],
            timestamp: System.currentTimeMillis(),
            locationPath: "0.1.2.3",
            masterLocus: new LocusSeed(seed),
            inputHistory: script
        )
        
        // 2. Write it to a temporary screenshot file
        File tempScreenshot = new File("screenshots/temp_test_screenshot.txt")
        if (!tempScreenshot.parentFile.exists()) tempScreenshot.parentFile.mkdirs()
        
        String metadata = buffer.getMetadataHeader()
        tempScreenshot.text = metadata + "\n" + buffer.lines.join("\n")
        
        // 3. Promote it
        String result = ReplayService.promoteToTest(tempScreenshot, "AutomatedRegressionTest")
        Terminal.println result
        assertTrue(result.contains("SUCCESS"))
        
        // 4. Verify the file exists
        File generatedTest = new File("src/test/groovy/com/endlesstransit/regression/AutomatedRegressionTest.groovy")
        assertTrue(generatedTest.exists())
        
        // Cleanup
        tempScreenshot.delete()
        // generatedTest.delete() // Keep it for a moment to inspect if needed
    }
}
