---
name: skill-chronicle
description: Project journaling and architectural synthesis for Endless Transit. Use when summarizing recent changes, documenting the "Vibe" of a session, or creating a permanent narrative history of the project's evolution.
---

# 📜 THE CHRONICLE PROTOCOL

## 🌌 PHILOSOPHY
In Endless Transit, the code is the Lore. This skill handles the **Dual-Channel Synthesis** of the project:
1.  **The Narrative (The Vibe):** Human-readable reflections on the project's aesthetics and player experience.
2.  **The Substrate (The Tech):** Technical breakdown of commits, entropy stability, and architectural shifts.

---

## 🛠️ WORKFLOW

### 1. CONTEXT HARVEST
- **Git History:** Extract the last 5-10 commits using `git log -n 5`.
- **Active Task:** Check `tasks/todo.md` and the current `@tasks/active/` document.
- **Locus Identity:** Retrieve the current `masterSeed` and `LIP` from the last session or `GameMemento`.

### 2. DUAL-CHANNEL SYNTHESIS
- Use the `references/LOG_TEMPLATE.md` to structure the entry.
- **Vibe:** Translate technical changes into immersive descriptions (e.g., "The pivot-state refactor grounds the player in the lobby").
- **Tech:** List specific refactors, pattern implementations (Command, Proxy), and verification results.

### 3. SNAPSHOT INTEGRATION
- Run the game in headless mode with the relevant seed: `./run.sh --test --seed-scan`.
- Identify a visual state that represents the recent changes.
- Use `CaptureCommand` (or `p` in-game) to take a snapshot and save it to `screenshots/`.
- Link the snapshot file path in the journal entry.

### 4. FRAGMENTATION & INDEXING
- **Filename:** `journals/LOG_${TIMESTAMP}_0x${SHORT_HASH}.md`
- **Registry:** Update `journals/CHRONICLE_INDEX.md` with a 1-line summary of the new log.

---

## 📍 EXAMPLE TRIGGERS
- "Summarize the navigation refactor into a journal entry."
- "Create a chronicle of our progress for today."
- "Log the current vibe of the building generation."

---

## 🏺 ARCHITECT'S NOTE
Keep the "Narrative" sections poetic and immersive. The "Substrate" section should remain clinical and precise. This duality is the core aesthetic of the Vinculum.
