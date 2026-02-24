package com.endlesstransit

import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

class Logger {
    private static final String LOG_FILE = "transit.log"
    private static final int MAX_ROLLS = 5

    static void info(String message) {
        log("INFO", message)
    }

    static void error(String message, Throwable t = null) {
        log("ERROR", message)
        if (t != null) {
            StringWriter sw = new StringWriter()
            t.printStackTrace(new PrintWriter(sw))
            log("STACKTRACE", sw.toString())
        }
    }

    private static synchronized void log(String level, String message) {
        def timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS"))
        def logMessage = "[$timestamp] [$level] $message\n"
        
        File file = new File(LOG_FILE)
        if (file.exists() && file.length() > 500 * 1024) { // Roll at 500KB
            roll()
        }
        
        file.append(logMessage)
    }

    private static void roll() {
        for (int i = MAX_ROLLS - 1; i >= 1; i--) {
            File old = new File("${LOG_FILE}.$i")
            if (old.exists()) {
                old.renameTo(new File("${LOG_FILE}.${i + 1}"))
            }
        }
        File current = new File(LOG_FILE)
        current.renameTo(new File("${LOG_FILE}.1"))
    }
}
