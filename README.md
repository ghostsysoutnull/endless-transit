# Endless Transit

[![Play](https://img.shields.io/badge/play-in_the_browser-00ffff.svg?style=flat-square)](https://ghostsysoutnull.github.io/endless-transit/play/)
[![Web](https://img.shields.io/badge/web-TypeScript-3178c6.svg?style=flat-square)](#the-web-game-web)
[![Terminal](https://img.shields.io/badge/terminal-Groovy_5_(frozen)-cyan.svg?style=flat-square)](#the-terminal-game-terminal)
[![Neural Link](https://img.shields.io/badge/link-persistent-magenta.svg?style=flat-square)](#)

> "The world is not a place. It is a sequence of frequencies."

**Endless Transit** is an infinite procedural universe simulation and text-adventure. You operate as an **Observer**,
beaming your consciousness across a recursive lattice of realities — universe, filament, sector, solar system, planet,
country, city, street, building, floor, corridor, apartment, room — through a cyber-terminal interface. One seed builds
one world, every time.

This repository holds **two games**:

| | Where | Status | Play it |
| :-- | :-- | :-- | :-- |
| **The web game** | [`web/`](web/) | the live game, where development happens | **[ghostsysoutnull.github.io/endless-transit/play/](https://ghostsysoutnull.github.io/endless-transit/play/)** — phone or desktop, nothing to install |
| **The terminal game** | [`terminal/`](terminal/) | the original, frozen: it takes no more features | `cd terminal && ./run.sh` |

The web game is a rule-by-rule port of the terminal game (touch first, saves in the browser, the terminal game's known
bugs fixed rather than copied); every place the two differ is listed in the
[web Player's Guide](https://ghostsysoutnull.github.io/endless-transit/web/players_guide.html).

---

## 🌐 The web game (`web/`)

Strict TypeScript, Vite, lit-html; a pure deterministic engine under `src/engine/`, browser adapters under
`src/platform/`, the screens under `src/ui/`. Node 24 or later.

```bash
cd web
npm install
npm run dev            # play while developing (http://localhost:5173/)
npm run check          # the gate: typecheck + lint + format + unit tests → one STATUS= line
npm run e2e            # browser tests against the production build, twice: desktop and phone
npm run publish:site   # check → build → ../docs/play/ (commit it; a push publishes)
```

Add `?debug` to the game's address for the debug tools (integrity, prime, keystone). The law of the code base, its
layers and its walls: [`web/CLAUDE.md`](web/CLAUDE.md).

## 🖥️ The terminal game (`terminal/`)

Groovy 5 on a JDK 17 or later. From `terminal/`:

```bash
./run.sh                    # the immersive portal, with the intro
./vinc.sh                   # the clinical interface: compile and start, no intro
./vinc.sh --test            # the full suite
./vinc.sh --lint            # house rules and invariants
./vinc.sh --scan            # the model gate (seed 0 → 9 nodes)
```

Its domains, tooling and records: [`terminal/CLAUDE.md`](terminal/CLAUDE.md).

---

## 📚 Manual and guides

The site at **[ghostsysoutnull.github.io/endless-transit](https://ghostsysoutnull.github.io/endless-transit/)** serves
the game and its documentation from [`docs/`](docs/):

*   **[Web Player's Guide](https://ghostsysoutnull.github.io/endless-transit/web/players_guide.html)** and its
    [cheat sheet](https://ghostsysoutnull.github.io/endless-transit/web/cheat_sheet.html) — plain language, every
    number cited from `web/src`.
*   **[Terminal Player's Guide](https://ghostsysoutnull.github.io/endless-transit/terminal/guide/players_guide.html)**
    and the in-world manual (installation, initialization, the lattice atlas, protocols, navigation, specifications,
    the observer's codex).

### 🤖 AI-agent collaboration
Each part of the tree carries its own `CLAUDE.md` (root, `web/`, `terminal/` and its domains), so an agent loads only
the law of the code it touches. The operating law is [`.claude/CODEX.md`](.claude/CODEX.md); the port's record is
[`tasks/PORT_QUEUE.md`](tasks/PORT_QUEUE.md) and one note per iteration under [`tasks/port/`](tasks/port/).

---
*Connection Stabilized. Safe Transit, Operator.*
