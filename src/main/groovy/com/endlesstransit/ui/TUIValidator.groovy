package com.endlesstransit.ui

import groovy.transform.CompileStatic

@CompileStatic
class TUIValidator {
    /**
     * Calculates the visual width of a string by stripping ANSI codes
     * and counting 2-cell wide Unicode characters (emojis, icons).
     */
    static int getVisualWidth(String text) {
        if (text == null) return 0
        
        // 1. Strip ANSI escape sequences
        String clean = text.replaceAll(/\u001B\[[;?0-9]*[mGKH]/, "")
        
        // 2. Count characters, checking for 2-cell wide symbols
        int width = 0
        int i = 0
        while (i < clean.length()) {
            int cp = clean.codePointAt(i)
            // Common 2-cell ranges: Emojis, CJK, specific symbols used in ET
            if (isWide(cp)) {
                width += 2
            } else {
                width += 1
            }
            i += Character.charCount(cp)
        }
        return width
    }

    private static boolean isWide(int cp) {
        // ET Specific Icons
        if (cp == 0x2604 || // ☄
            cp == 0x263C || // ☼
            cp == 0x2295 || // ⊕
            cp == 0x1F3D9 || // 🏙
            cp == 0x25A4 || // ▤
            cp == 0x25A5 || // ▅
            cp == 0x25A2)   // ⬚
            return true

        // General Emoji Ranges
        if (cp >= 0x1F300 && cp <= 0x1F64F) return true
        if (cp >= 0x1F680 && cp <= 0x1F6FF) return true
        
        return false
    }
}
