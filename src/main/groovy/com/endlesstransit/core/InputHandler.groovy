package com.endlesstransit.core

import com.endlesstransit.ui.Terminal
import groovy.transform.CompileStatic
import java.util.Scanner

/**
 * InputHandler: Responsible for raw user interaction and input normalization.
 * Decouples the Game loop from the specificities of CLI input.
 */
@CompileStatic
class InputHandler {
    InputSource source
    private List<String> inputHistory = []

    InputHandler(InputSource source = new RealTerminalSource()) {
        this.source = source
    }

    /**
     * @return An unmodifiable copy of the input history.
     */
    List<String> getHistory() {
        return Collections.unmodifiableList(inputHistory)
    }

    void restoreHistory(List<String> history) {
        this.inputHistory.clear()
        this.inputHistory.addAll(history)
    }

    /**
     * Reads a line from the user and trims whitespace.
     */
    String getRawInput(String lastActionName) {
        String hudLastAction = lastActionName ? " [Last: $lastActionName]" : ""
        
        Terminal.print Terminal.dim("---=====================================>>")
        Terminal.print Terminal.colorize(hudLastAction, Terminal.CYAN)
        Terminal.print " Enter choice: "
        
        String input = source.readLine()
        String trimmed = input?.trim()
        inputHistory.add(trimmed ?: "")
        return trimmed
    }

    /**
     * Normalizes input into standard game commands or keys.
     */
    String normalize(String input, String lastChoice) {
        if (input == null) return "quit"
        if (input.isEmpty()) return lastChoice ?: "-2"

        // Global Commands
        String lower = input.toLowerCase()
        if (lower in ["i", "sync", "map", "m", "lattice", "glitch", "help", "quit"]) {
            return lower == "m" ? "map" : lower
        }
        if (lower == "?") return "help"

        return input
    }

    /**
     * Provides a zero-agnostic matching check.
     * Matches "1" or "01" against "01".
     */
    boolean matches(String input, String optionKey) {
        if (input == null || optionKey == null) return false
        
        // 1. Exact match (case insensitive)
        if (optionKey.equalsIgnoreCase(input)) return true
        
        // 2. Zero-agnostic match for numeric keys
        String normalizedInput = input.replaceFirst("^0+(?!\$)", "")
        String normalizedKey = optionKey.replaceFirst("^0+(?!\$)", "")
        
        if (normalizedInput.isEmpty() || normalizedKey.isEmpty()) return false
        
        // Check if both are numeric before comparing normalized versions
        if (normalizedInput.chars().allMatch { Character.isDigit(it) } && normalizedKey.chars().allMatch { Character.isDigit(it) }) {
            return normalizedInput == normalizedKey
        }
        
        return false
    }

    /**
     * Triggers a pause until the player presses ENTER.
     * Skipped if the input source is non-interactive.
     */
    void waitForEnter() {
        if (!source.isInteractive()) return
        
        Terminal.print Terminal.dim("Press ENTER to return...")
        source.waitForEnter()
        inputHistory.add("") // ENTER is an empty string in history
    }

    String readLine() {
        String input = source.readLine()?.trim() ?: ""
        inputHistory.add(input)
        return input
    }
}
