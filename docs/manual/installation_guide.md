---
layout: terminal
title: LINK_GATEWAY_INITIALIZATION
map_type: hardware
---

# LINK_SETUP: Pre-Flight Checklist

Before you can beam your consciousness into the Neural Web, your local gateway must be correctly initialized. Follow these protocols to establish a stable link.

## [01_HARDWARE_REQUIREMENTS]
The Endless Transit engine runs on the Java Virtual Machine (JVM).

1.  **Java Runtime (JRE/JDK):** Version 8 or higher is required. (Version 17+ recommended for peak stability).
2.  **Groovy Engine:** Version 4.x is required to parse the procedural logic.
3.  **Terminal Emulator:** Must support **ANSI Escape Sequences** (Color/Styles). 
    *   *Recommended:* iTerm2 (macOS), Windows Terminal (Windows), or Alacritty/Kitty (Linux).

## [02_DATA_EXTRACTION]
Clone the project repository to your local drive:

```bash
git clone https://github.com/ghostsysoutnull/endless-transit.git
cd endless-transit
```

## [03_LAUNCH_PROTOCOLS]
The link is initialized through the provided shell script.

### **Standard Initialization**
Ensure the script has execution permissions, then launch:
```bash
chmod +x run.sh vinc.sh
./run.sh
```

### **Clinical Interface (Developers & Agents)**
For high-velocity operations, use the **Vinculum Clinical Interface (VINC)** to bypass the immersive portal and enforce mandatory substrate verification:
```bash
./vinc.sh --test            # Rapid test execution (auto-compile)
./vinc.sh --compile         # Static verification check
./vinc.sh                   # Instant game launch
```

### **Manual Initialization**
If you prefer to bypass the script, execute the following command:
```bash
groovy -cp src/main/groovy src/main/groovy/com/endlesstransit/Main.groovy
```

## [04_FIELD_VERIFICATION]
Run the automated diagnostic suite to ensure your environment is synchronized:
```bash
./run.sh --test
```
If you see `ALL TESTS COMPLETED SUCCESSFULLY`, your link is stable.

## [05_PERSISTENCE_SYNC]
The system will attempt to create a `session.trace` file in the root directory to store your footprints. Ensure your user has **Write Permissions** in the project folder.

---
**STATUS**: READY_FOR_TRANSIT
**GATEWAY**: CONFIGURED
*Proceed to [SYSTEM_INITIALIZATION]({{ "/manual/system_initialization.html" | relative_url }}) to begin.*
