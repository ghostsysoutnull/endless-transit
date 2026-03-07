package com.endlesstransit.ui

class Terminal {
    static final String RESET = "\u001b[0m"
    static final String BOLD = "\u001b[1m"
    static final String DIM = "\u001b[2m"
    static final String ITALIC = "\u001b[3m"
    static final String HIDDEN = "\u001b[8m"
    static final String STRIKETHROUGH = "\u001b[9m"
    
    // Foreground Colors
    static final String BLACK = "\u001b[30m"
    static final String RED = "\u001b[31m"
    static final String GREEN = "\u001b[32m"
    static final String YELLOW = "\u001b[33m"
    static final String BLUE = "\u001b[34m"
    static final String MAGENTA = "\u001b[35m"
    static final String CYAN = "\u001b[36m"
    static final String WHITE = "\u001b[37m"
    static final String GREY = "\u001b[90m"
    
    // Light Colors
    static final String L_CYAN = "\u001b[96m"
    static final String L_BLUE = "\u001b[94m"
    static final String L_MAGENTA = "\u001b[95m"

    // ASCII Box Drawing Characters
    static final String BOX_TL = "╔"
    static final String BOX_TR = "╗"
    static final String BOX_BL = "╚"
    static final String BOX_BR = "╝"
    static final String BOX_H  = "═"
    static final String BOX_V  = "║"
    static final String BOX_T_SEP = "╦"
    static final String BOX_B_SEP = "╩"
    static final String BOX_L_SEP = "╠"
    static final String BOX_R_SEP = "╣"
    static final String BOX_CROSS = "╬"
    static final String BOX_H_LIGHT = "─"
    static final String BOX_L_SEP_LIGHT = "╟"
    static final String BOX_R_SEP_LIGHT = "╢"

    // Scale Icons
    static final String ICON_UNI = "∞"
    static final String ICON_FIL = "»"
    static final String ICON_SEC = "○"
    static final String ICON_SYS = "☼"
    static final String ICON_PLT = "⊕"
    static final String ICON_CTR = "⬚"
    static final String ICON_CTY = "🏙"
    static final String ICON_STR = "═"
    static final String ICON_BLD = "⌂"
    static final String ICON_FLR = "▤"
    static final String ICON_COR = "▅"
    static final String ICON_APT = "🚪"
    static final String ICON_ROM = "□"

    // Cursor Movement
    static void save() { print "\u001b[s" }
    static void restore() { print "\u001b[u" }
    static void home() { print "\u001b[H" }
    static void moveTo(int r, int c) { print "\u001b[${r};${c}H" }
    static void moveUp(int n) { print "\u001b[${n}A" }
    static void moveDown(int n) { print "\u001b[${n}B" }
    static void moveRight(int n) { print "\u001b[${n}C" }
    static void moveLeft(int n) { print "\u001b[${n}D" }
    
    static void clearLine() { print "\u001b[K" }
    static void clearToEnd() { print "\u001b[J" }
    
    static void clearScreen() {
        print "\u001b[2J"
        home()
    }

    static boolean skipSleep = false

    static void typewrite(String text, long delay = 10) {
        text.each { c ->
            print c
            System.out.flush()
            if (!skipSleep) Thread.sleep(delay)
        }
        println ""
    }

    static String glitchText(String text, double probability = 0.05) {
        char[] chars = text.toCharArray()
        Random r = new Random()
        String glitchChars = "█▓▒░/\\%!\$#*"
        
        for (int i = 0; i < chars.length; i++) {
            if (chars[i] != ' ' && chars[i] != '\n' && r.nextDouble() < probability) {
                chars[i] = glitchChars.charAt(r.nextInt(glitchChars.length())) as char
            }
        }
        return new String(chars)
    }

    static void clearArea(int startRow, int startCol, int rows, int cols) {
        save()
        for (int i = 0; i < rows; i++) {
            moveTo(startRow + i, startCol)
            print " " * cols
        }
        restore()
    }

    static String colorize(String text, String color) {
        return "${color}${text}${RESET}"
    }
    
    static String dim(String text) {
        return "${DIM}${text}${RESET}"
    }
    
    static String bold(String text) {
        return "${BOLD}${text}${RESET}"
    }

    /**
     * Renders a full-width horizontal divider with optional title and color.
     */
    static void drawLine(int width, String color = WHITE, String type = "heavy") {
        String charToUse = (type == "heavy") ? BOX_H : BOX_H_LIGHT
        println colorize(charToUse * width, color)
    }

    /**
     * Renders a boxed line of text. Uses ANSI Cursor Horizontal Absolute for perfect alignment.
     */
    static void drawBoxedLine(String text, int width, String color = WHITE, boolean boldText = false) {
        int innerWidth = width - 4
        String safeText = ansiSafeTruncate(text, innerWidth)
        
        print colorize(BOX_V + " ", color)
        print boldText ? bold(safeText) : safeText
        
        // Final border alignment using CHA
        print "\u001b[${width}G"
        println colorize(BOX_V, color)
    }

    /**
     * Renders a boxed line split into two panes with a vertical separator.
     * Uses CHA for alignment of both the separator and the right border.
     */
    static void drawSplitBoxedLine(String left, String right, int splitPoint, int width, String color = WHITE) {
        // Left part
        int leftInnerWidth = splitPoint - 4
        String safeLeft = ansiSafeTruncate(left, leftInnerWidth)
        print colorize(BOX_V + " ", color)
        print safeLeft
        
        // Separator alignment using CHA (splitPoint is 1-indexed for CHA)
        print "\u001b[${splitPoint}G"
        print colorize(BOX_V + " ", color)
        
        // Right part
        int rightInnerWidth = (width - splitPoint) - 3
        String safeRight = ansiSafeTruncate(right, rightInnerWidth)
        print safeRight
        
        // Right border alignment using CHA
        print "\u001b[${width}G"
        println colorize(BOX_V, color)
    }

    /**
     * Removes ANSI escape codes from a string to calculate visible length.
     */
    static String stripAnsi(String text) {
        if (text == null) return ""
        return text.replaceAll("\u001b\\[[()#;?]*[0-9;?]*[a-zA-Z]", "")
    }

    /**
     * Calculates the visual width of a string, accounting for wide characters (emojis, etc).
     */
    static int getVisualWidth(String text) {
        if (!text) return 0
        String stripped = stripAnsi(text)
        int width = 0
        int i = 0
        while (i < stripped.length()) {
            int cp = stripped.codePointAt(i)
            
            // East Asian Width / Emoji / Supplementary characters usually take 2 cells
            if (Character.isSupplementaryCodePoint(cp)) {
                width += 2
            } else if (cp >= 0x2000 && cp <= 0x32FF) { // Symbols
                width += 2
            } else if (cp >= 0x1F000) { // More emojis
                width += 2
            } else {
                // Check for specific wide symbols used in ET
                if ("🏙🚪⬚☼⊕".contains(new String(Character.toChars(cp)))) {
                    width += 2
                } else if ("█".contains(new String(Character.toChars(cp)))) {
                    width += 1
                } else {
                    width += 1
                }
            }
            i += Character.charCount(cp)
        }
        return width
    }

    /**
     * Truncates a string to a specific visual width while preserving ANSI codes.
     */
    static String ansiSafeTruncate(String text, int maxWidth) {
        if (getVisualWidth(text) <= maxWidth) return text
        
        StringBuilder result = new StringBuilder()
        int currentWidth = 0
        int i = 0
        
        while (i < text.length()) {
            if (text.startsWith("\u001b[", i)) {
                int end = text.indexOf('m', i)
                if (end != -1) {
                    result.append(text.substring(i, end + 1))
                    i = end + 1
                    continue
                }
            }
            
            int codePoint = text.codePointAt(i)
            int charWidth = getVisualWidth(new String(Character.toChars(codePoint)))
            
            if (currentWidth + charWidth + 3 > maxWidth) {
                result.append("...")
                result.append(RESET)
                break
            }
            
            result.append(Character.toChars(codePoint))
            currentWidth += charWidth
            i += Character.charCount(codePoint)
        }
        
        return result.toString()
    }

    /**
     * Renders a box header (Top).
     */
    static void drawBoxTop(int width, String color = WHITE) {
        println colorize(BOX_TL + (BOX_H * (width - 2)) + BOX_TR, color)
    }

    /**
     * Renders a box footer (Bottom).
     */
    static void drawBoxBottom(int width, String color = WHITE) {
        println colorize(BOX_BL + (BOX_H * (width - 2)) + BOX_BR, color)
    }

    /**
     * Renders a separator line between boxes.
     */
    static void drawBoxSeparator(int width, String color = WHITE, String type = "heavy") {
        String left = (type == "heavy") ? BOX_L_SEP : BOX_L_SEP_LIGHT
        String right = (type == "heavy") ? BOX_R_SEP : BOX_R_SEP_LIGHT
        String mid = (type == "heavy") ? BOX_H : BOX_H_LIGHT
        println colorize(left + (mid * (width - 2)) + right, color)
    }

    /**
     * Renders a 1D radar showing current position [ ] [X] [ ].
     */
    static String renderRadar(int index, int total, String activeColor = YELLOW) {
        if (total <= 0) return ""
        StringBuilder sb = new StringBuilder()
        for (int i = 1; i <= total; i++) {
            if (i == index) {
                sb.append(colorize("[X]", activeColor))
            } else {
                sb.append(dim("[ ]"))
            }
            if (i < total) sb.append(" ")
        }
        return sb.toString()
    }

    static List<String> wrapText(String text, int width) {
        List<String> lines = []
        if (!text) return lines
        
        String[] words = text.split(" ")
        StringBuilder currentLine = new StringBuilder()
        
        for (String word : words) {
            int wordWidth = getVisualWidth(word)
            int currentLineWidth = getVisualWidth(currentLine.toString())
            
            if (currentLineWidth + wordWidth + 1 > width) {
                if (currentLine.length() > 0) {
                    lines.add(currentLine.toString())
                    currentLine = new StringBuilder()
                }
            }
            if (currentLine.length() > 0) {
                currentLine.append(" ")
            }
            currentLine.append(word)
        }
        
        if (currentLine.length() > 0) {
            lines.add(currentLine.toString())
        }
        
        return lines
    }

    /**
     * A 2D buffer for composing complex ASCII maps before rendering.
     */
    static class MapBuffer {
        int width
        int height
        String[][] chars
        String[][] colors

        MapBuffer(int width, int height) {
            this.width = width
            this.height = height
            this.chars = new String[height][width]
            this.colors = new String[height][width]
            clear()
        }

        void clear() {
            for (int y = 0; y < height; y++) {
                for (int x = 0; x < width; x++) {
                    chars[y][x] = " "
                    colors[y][x] = RESET
                }
            }
        }

        void plot(int x, int y, String symbol, String color = RESET) {
            if (x >= 0 && x < width && y >= 0 && y < height) {
                chars[y][x] = symbol
                colors[y][x] = color
            }
        }

        void drawBox(int x, int y, int w, int h, String color = WHITE) {
            // Corners
            plot(x, y, BOX_TL, color)
            plot(x + w - 1, y, BOX_TR, color)
            plot(x, y + h - 1, BOX_BL, color)
            plot(x + w - 1, y + h - 1, BOX_BR, color)
            
            // Horizontals
            for (int i = 1; i < w - 1; i++) {
                plot(x + i, y, BOX_H, color)
                plot(x + i, y + h - 1, BOX_H, color)
            }
            
            // Verticals
            for (int j = 1; j < h - 1; j++) {
                plot(x, y + j, BOX_V, color)
                plot(x + w - 1, y + j, BOX_V, color)
            }
        }

        List<String> render() {
            List<String> renderedLines = []
            for (int y = 0; y < height; y++) {
                StringBuilder line = new StringBuilder()
                String currentColor = RESET
                for (int x = 0; x < width; x++) {
                    if (colors[y][x] != currentColor) {
                        line.append(colors[y][x])
                        currentColor = colors[y][x]
                    }
                    line.append(chars[y][x])
                }
                line.append(RESET)
                renderedLines.add(line.toString())
            }
            return renderedLines
        }
    }
}
