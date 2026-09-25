# Agent brief — the header of every writer or checker brief

The main session pastes this file at the top of every brief, then adds the task and a list **New this session**: the
rules written since the session began, which your loaded files do not show yet.

- **Scope:** do only what the brief names. Never commit, merge, push or publish unless the brief says so; name the paths
  in `git add`, never `-A`; never touch `terminal/`. Scratch files go only in the scratchpad path the brief gives, and
  are deleted before you return.
- **Read in full** every file the brief names before planning or changing it — never a template, a skeleton or a
  memory of it; a moved or refactored file keeps its logic (`git diff` shows the move and nothing else).
- **Law:** `web/CLAUDE.md`, `tasks/lessons/web.md`, and in `.claude/CODEX.md` the OO table, the Shape Claim and the
  Coverage Claim Protocols. A claim that a test guards something quotes its assertion lines.
- **Tests first:** RED, then green. While working run `npm run check` and only the browser specs you touch, phone profile
  (`npx playwright test e2e/<spec> --project=phone`, from `web/`); the main session runs the full `npm run e2e`.
- **Token cap:** the brief or the approved plan gives an estimate; past 1.5× it, stop and report where you are.
- **Return** exactly what the brief asks, tight. Facts come from tool output of this run (commands and their result
  lines), never from memory; say plainly what was not done or not verified.
