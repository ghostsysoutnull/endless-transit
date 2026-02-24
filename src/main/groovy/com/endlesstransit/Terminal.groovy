package com.endlesstransit

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

    static void typewrite(String text, long delay = 10) {
        text.each { c ->
            print c
            System.out.flush()
            Thread.sleep(delay)
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

    static List<String> wrapText(String text, int width) {
        List<String> lines = []
        if (!text) return lines
        
        String[] words = text.split(" ")
        StringBuilder currentLine = new StringBuilder()
        
        for (String word : words) {
            if (currentLine.length() + word.length() + 1 > width) {
                if (currentLine.length() > 0) {
                    lines.add(currentLine.toString())
                    currentLine = new StringBuilder()
                }
                // If a single word is longer than width, it will still be on its own line
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
}
