package com.endlesstransit.model

interface OutputFormatter {
    String getRED()
    String getCYAN()
    String getWHITE()
    String getGREY()
    String getYELLOW()
    String getL_CYAN()
    String getGREEN()
    String getMAGENTA()
    String getBLUE()
    String getL_MAGENTA()
    String getL_BLUE()

    String colorize(String text, String color)
    String dim(String text)
    String bold(String text)
    String glitchText(String text, double probability)
    String ansiSafeTruncate(String text, int width)
    int getVisualWidth(String text)
    List<String> wrapText(String text, int width)
    void print(String text)
    void println(String text)
}
