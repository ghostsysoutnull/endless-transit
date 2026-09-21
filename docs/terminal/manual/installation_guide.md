---
layout: terminal
title: LINK_GATEWAY_INITIALIZATION
map_type: hardware
---

# LINK_SETUP: Pre-Flight Checklist

Before you can beam your consciousness into the Neural Web, your local gateway must be correctly initialized. Follow these protocols to establish a stable link.

## [01_HARDWARE_REQUIREMENTS]
The Endless Transit engine runs on the Java Virtual Machine (JVM).

1.  **Groovy Engine:** Version **5.x**. The substrate is built and verified against Groovy 5.0; older engines are untested.
2.  **Java Runtime (JDK):** Version **17 or higher** is recommended. Groovy 5 itself declares JDK 11 as its floor; nothing older will hold the link.
3.  **Terminal Emulator:** Must support **ANSI Escape Sequences** (Color/Styles). 
    *   *Recommended:* iTerm2 (macOS), Windows Terminal (Windows), or Alacritty/Kitty (Linux).

## [02_DATA_EXTRACTION]
Clone the project repository to your local drive:

```bash
git clone https://github.com/ghostsysoutnull/endless-transit.git
cd endless-transit/terminal
```

## [03_LAUNCH_PROTOCOLS]
The link is initialized through the provided shell script.

### **Standard Initialization**
Ensure the script has execution permissions, then launch from the repository's **`terminal/` folder** (the terminal game lives there):
```bash
chmod +x run.sh vinc.sh
./run.sh
```

To open the link on a chosen Master Seed, pass it at launch. Any whole number is accepted, negative included; anything else is refused before the link opens:
```bash
./run.sh --seed 4660
```
Without `--seed`, a new transit is seeded from the clock.

### **Clinical Interface (Developers & Agents)**
For high-velocity operations, use the **Vinculum Clinical Interface (VINC)** to bypass the immersive portal and enforce mandatory substrate verification:
```bash
./vinc.sh --test            # Rapid test execution (auto-compile)
./vinc.sh --compile         # Static verification check
./vinc.sh                   # Auto-compile, then launch without the portal sequence
./vinc.sh --seed 4660       # The same, on a chosen Master Seed
```
Both scripts anchor themselves to their own folder (`terminal/`), so they may be called from anywhere; the game keeps its save, journal and log files in that folder.

### **Manual Initialization**
If you prefer to bypass the scripts, execute the following from the repository's `terminal/` folder. The `src/main/resources` entry is load-bearing: without it the lexicons and themes are not found, and the link fails on its first frame. (`lib/*` mirrors the launch scripts; the game itself draws nothing from it today.)
```bash
groovy -cp "src/main/groovy:src/main/resources:lib/*" src/main/groovy/com/endlesstransit/Main.groovy
```

## [04_FIELD_VERIFICATION]
Run the automated diagnostic suite to ensure your environment is synchronized:
```bash
./vinc.sh --test
```
If the run ends with `[VINCULUM_TEST_SUITE_SYNCHRONIZED_SUCCESSFULLY]`, your link is stable.

## [05_PERSISTENCE_SYNC]
The link writes to the root of the project folder. Ensure your user has **Write Permissions** there.

*   **`session.trace`** — your neural trace. It is written only when you issue `sync`, or when you accept the synchronization offered as you `quit`; decline that offer and nothing is saved. It holds the Master Seed, your position, Coherence, pulse count, footprints, your buffer, and every change you made to the world.
*   **`journal.txt`**, **`journal-last-entry.txt`** — the record of each completed session, written at termination. `.journal_session_tmp` is its scratch file.
*   **`transit.log`** — the diagnostic log, rotated as `transit.log.1` … `.5`.
*   **`screenshots/`** — bridge captures taken with `p` or `P`.

---
**STATUS**: READY_FOR_TRANSIT
**GATEWAY**: CONFIGURED
*Proceed to [SYSTEM_INITIALIZATION]({{ "/terminal/manual/system_initialization.html" | relative_url }}) to begin.*
