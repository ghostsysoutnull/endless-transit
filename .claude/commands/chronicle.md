# /chronicle — The Chronicle Protocol

Project journaling and architectural synthesis for Endless Transit.
Use when summarizing recent changes, documenting the "Vibe" of a session,
or creating a permanent narrative history of the project's evolution.

---

## 🌌 PHILOSOPHY
In Endless Transit, the code is the Lore. This command handles **Dual-Channel Synthesis**:
1. **The Narrative (The Vibe):** Human-readable reflections on aesthetics and player experience.
2. **The Substrate (The Tech):** Technical breakdown of commits, entropy stability, and architectural shifts.

---

## 🛠️ WORKFLOW

### 1. CONTEXT HARVEST
- Run `git log -n 10 --oneline` to extract recent commits.
- Read `tasks/todo.md` and the current active task document from `tasks/active/`.
- Read `journals/CHRONICLE_INDEX.md` to understand the existing log history.
- Retrieve the current `masterSeed` and `LIP` from the last session or `GameMemento` if available.

### 2. DUAL-CHANNEL SYNTHESIS
Use `journals/LOG_TEMPLATE.md` (at `.gemini/skills/skill-chronicle/references/LOG_TEMPLATE.md`) to structure the entry:
- **Vibe:** Translate technical changes into immersive descriptions (e.g., "The pivot-state refactor grounds the player in the lobby").
- **Tech:** List specific refactors, pattern implementations, and verification results.

### 3. SNAPSHOT INTEGRATION
- Note the relevant seed and LIP for this session.
- If a screenshot was captured (`screenshots/`), link its path in the journal entry.

### 4. FRAGMENTATION & INDEXING
- **Filename:** `journals/LOG_<YYYYMMDD_HHMMSS>_0x<SHORT_GIT_HASH>.md`
- Write the new log file using the template structure.
- Update `journals/CHRONICLE_INDEX.md` with a 1-line summary of the new entry.

---

## 📍 EXAMPLE TRIGGERS
- "Summarize the navigation refactor into a journal entry."
- "Create a chronicle of our progress for today."
- "Log the current vibe of the building generation."

---

## 🏺 ARCHITECT'S NOTE
Keep the "Narrative" sections poetic and immersive. The "Substrate" section should remain clinical and precise. This duality is the core aesthetic of the Vinculum.
