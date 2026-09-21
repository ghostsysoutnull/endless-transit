# Endless Transit

One repository, two sibling games:
- **`terminal/`** — the original Groovy terminal game. **Frozen**: the reference the port is made from. Its domains,
  tooling and lessons: `terminal/CLAUDE.md`. Its gates: `./terminal/vinc.sh --test | --lint | --scan | --docs`
  (each with `--agent 2>/dev/null` for a one-line result).
- **`web/`** — the new TypeScript game for the browser, phone first. **Active**: development happens here; its law is
  `web/CLAUDE.md` (the folder is created by port iteration I01).

Project records stay at the root: `docs/` (the player site, plus `docs/analysis/`), `journals/`, `tasks/`, `.claude/`.

## ⚖️ The Codex: Operating Law
- **@.claude/CODEX.md**

## 🚀 Active Task
The web port — **`tasks/PORT_QUEUE.md`**, run under the Standing Order (`.claude/CODEX.md`). Spec:
`docs/analysis/WEB_PORT_STUDY.md`; one note per iteration in `tasks/port/`.

## 📡 Handover
Current state: **`tasks/RECOVERY_PROMPT.md`**. History, read on demand: `journals/CHRONICLE_INDEX.md` → `journals/LOG_*`.
Older records: `tasks/todo.md`, `tasks/backlog/`.

## 🏛️ Lessons
- **Process lessons (any code)**: @tasks/lessons/infrastructure.md
