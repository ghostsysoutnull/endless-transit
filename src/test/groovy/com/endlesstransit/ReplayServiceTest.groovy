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
        
        // 3. Promote it — use a temp name to avoid polluting the snapshot directory
        String result = ReplayService.promoteToTest(tempScreenshot, "ReplayServiceTest_tmp")
        Terminal.println result
        assertTrue(result.contains("SUCCESS"))

        // 4. Verify the snapshot file was written with the correct content
        File generatedSnapshot = new File("src/test/groovy/com/endlesstransit/regression/snapshots/ReplayServiceTest_tmp.json")
        assertTrue(generatedSnapshot.exists())
        assertTrue(generatedSnapshot.text.contains('"seed": 12345'))
        assertTrue(generatedSnapshot.text.contains('"history"'))

        // Cleanup — always delete the generated snapshot; it is scaffolding, not a real case
        tempScreenshot.delete()
        generatedSnapshot.delete()
    }
}
