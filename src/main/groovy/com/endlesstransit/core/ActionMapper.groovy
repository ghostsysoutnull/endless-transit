package com.endlesstransit.core

import groovy.transform.CompileStatic

/**
 * ActionMapper: Responsible for mapping user input to execution logic.
 * Decouples navigation keys from the high-level Game state.
 */
@CompileStatic
class ActionMapper {
    Map<String, String> currentActionMap = [:]
    Map<String, String> previousActionMap = [:]
    Map<String, Closure> currentMenu = [:]

    /**
     * Rebuilds the menu and action maps from the current location options.
     */
    void update(Map<String, Closure> options) {
        previousActionMap = currentActionMap
        currentActionMap = [:]
        currentMenu = [:]
        
        options.each { String label, Closure action ->
            String key = label.contains(".") ? label.split("\\.")[0].trim() : label
            currentMenu[key] = action
            currentActionMap[key] = label
        }
        
        // Register global metadata for UI feedback
        currentActionMap["i"] = "List inventory"
        currentActionMap["quit"] = "Quit"
    }

    /**
     * Returns the visual label (name) for a given key in the last turn.
     */
    String getActionName(String key) {
        if (key == null) return ""
        String fullLabel = currentActionMap.get(key) ?: previousActionMap.get(key)
        if (fullLabel && fullLabel.contains(". ")) {
            return fullLabel.substring(fullLabel.indexOf(". ") + 2)
        }
        return fullLabel ?: key
    }

    /**
     * Finds the matching closure for a given normalized input.
     */
    Closure resolve(String input, InputHandler handler) {
        String matchingKey = (String) currentMenu.keySet().find { String key ->
            handler.matches(input, key)
        }
        return matchingKey ? currentMenu.get(matchingKey) : null
    }

    boolean hasOption(String prefix) {
        return currentMenu.keySet().any { it.startsWith(prefix + ". ") }
    }
}
