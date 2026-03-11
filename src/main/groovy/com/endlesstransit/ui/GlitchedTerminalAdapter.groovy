package com.endlesstransit.ui

import com.endlesstransit.model.OutputFormatter
import groovy.transform.CompileStatic
import java.util.Random

/**
 * GlitchedTerminalAdapter: A Decorator for OutputFormatter.
 * Procedurally adds visual artifacts and noise to the terminal output.
 * Delegates all layout-sensitive calculations to the inner adapter to preserve alignment.
 */
@CompileStatic
class GlitchedTerminalAdapter implements OutputFormatter {
    private final OutputFormatter inner
    private final Random random = new Random()
    private final double glitchChance

    GlitchedTerminalAdapter(OutputFormatter inner, double glitchChance = 0.05) {
        this.inner = inner
        this.glitchChance = glitchChance
    }

    // --- Delegation (Aesthetic Primitives) ---
    @Override String getRED() { inner.RED }
    @Override String getCYAN() { inner.CYAN }
    @Override String getWHITE() { inner.WHITE }
    @Override String getGREY() { inner.GREY }
    @Override String getYELLOW() { inner.YELLOW }
    @Override String getL_CYAN() { inner.L_CYAN }
    @Override String getGREEN() { inner.GREEN }
    @Override String getMAGENTA() { inner.MAGENTA }
    @Override String getBLUE() { inner.BLUE }
    @Override String getL_MAGENTA() { inner.L_MAGENTA }
    @Override String getL_BLUE() { inner.L_BLUE }

    @Override
    String colorize(String text, String color) {
        // Occasionally flicker the color or swap it for RED if glitch triggers
        if (random.nextDouble() < glitchChance * 0.5) {
            return inner.colorize(text, "RED")
        }
        return inner.colorize(text, color)
    }

    @Override String dim(String text) { inner.dim(text) }
    @Override String bold(String text) { inner.bold(text) }

    @Override
    String glitchText(String text, double probability) {
        // Combine probabilities for extra glitchiness
        return inner.glitchText(text, Math.min(1.0, probability + glitchChance))
    }

    // --- Layout Delegation (CRITICAL for alignment) ---
    @Override String ansiSafeTruncate(String text, int width) { inner.ansiSafeTruncate(text, width) }
    @Override int getVisualWidth(String text) { inner.getVisualWidth(text) }
    @Override String padRight(String text, int width) { inner.padRight(text, width) }
    @Override List<String> wrapText(String text, int width) { inner.wrapText(text, width) }

    // --- Modified Output ---
    @Override
    void print(String text) {
        inner.print(applyNoise(text))
    }

    @Override
    void println(String text) {
        inner.println(applyNoise(text))
    }

    private String applyNoise(String text) {
        if (random.nextDouble() > glitchChance) return text
        
        // Simple procedural noise: swap one random char for a glitch symbol
        if (text.length() < 2) return text
        
        char[] chars = text.toCharArray()
        int idx = random.nextInt(chars.length)
        if (chars[idx] != ' ' && chars[idx] != '║' && chars[idx] != '═') {
            chars[idx] = ["░", "▒", "▓", "█", "†", "‡", "§"][random.nextInt(7)].charAt(0)
        }
        return new String(chars)
    }
}
