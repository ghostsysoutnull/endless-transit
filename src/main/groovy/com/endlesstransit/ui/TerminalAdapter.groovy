package com.endlesstransit.ui

import com.endlesstransit.model.OutputFormatter
import groovy.transform.CompileStatic

@CompileStatic
class TerminalAdapter implements OutputFormatter {
    @Override String getRED() { return Terminal.RED }
    @Override String getCYAN() { return Terminal.CYAN }
    @Override String getWHITE() { return Terminal.WHITE }
    @Override String getGREY() { return Terminal.GREY }
    @Override String getYELLOW() { return Terminal.YELLOW }
    @Override String getL_CYAN() { return Terminal.L_CYAN }
    @Override String getGREEN() { return Terminal.GREEN }
    @Override String getMAGENTA() { return Terminal.MAGENTA }
    @Override String getBLUE() { return Terminal.BLUE }
    @Override String getL_MAGENTA() { return Terminal.L_MAGENTA }
    @Override String getL_BLUE() { return Terminal.L_BLUE }

    @Override
    String colorize(String text, String color) {
        String code = Terminal.WHITE
        switch (color) {
            case "RED": code = Terminal.RED; break
            case "CYAN": code = Terminal.CYAN; break
            case "WHITE": code = Terminal.WHITE; break
            case "GREY": code = Terminal.GREY; break
            case "YELLOW": code = Terminal.YELLOW; break
            case "L_CYAN": code = Terminal.L_CYAN; break
            case "GREEN": code = Terminal.GREEN; break
            case "MAGENTA": code = Terminal.MAGENTA; break
            case "BLUE": code = Terminal.BLUE; break
            case "L_MAGENTA": code = Terminal.L_MAGENTA; break
            case "L_BLUE": code = Terminal.L_BLUE; break
        }
        return Terminal.colorize(text, code)
    }

    @Override
    String dim(String text) {
        return Terminal.dim(text)
    }

    @Override
    String bold(String text) {
        return Terminal.bold(text)
    }

    @Override
    String glitchText(String text, double probability) {
        return Terminal.glitchText(text, probability)
    }

    @Override
    String ansiSafeTruncate(String text, int width) {
        return Terminal.ansiSafeTruncate(text, width)
    }

    @Override
    int getVisualWidth(String text) {
        return Terminal.getVisualWidth(text)
    }

    @Override
    String padRight(String text, int width) {
        int visualWidth = Terminal.getVisualWidth(text)
        if (visualWidth >= width) return text
        return text + (" " * (width - visualWidth))
    }

    @Override
    List<String> wrapText(String text, int width) {
        return Terminal.wrapText(text, width)
    }

    @Override
    void print(String text) {
        Terminal.print(text)
    }

    @Override
    void println(String text) {
        Terminal.println(text)
    }
}
