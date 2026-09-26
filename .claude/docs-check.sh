#!/bin/bash
# The project's docs gate (split from terminal/.agents/docs-check.sh, 2026-09-25 — the Groovy checks stay there).
# Read-only — this script never writes a file.
#   CHRONICLE  top LOG_ID of journals/CHRONICLE_INDEX.md == recovery prompt "Latest chronicle" == newest journals/LOG_* file
#   HANDOVER   tasks/RECOVERY_PROMPT.md <= 1000 words — it holds current state only; history lives in the records (WF-008)
#   BLOCK      the "Working with the user" block exists at the top of CLAUDE.md (its caps dropped by the user, 2026-09-26)
# Env: DOCS_ROOT  repository root to read from (default: the parent of .claude/) — for negative checks on a scratch copy.
# Usage: ./.claude/docs-check.sh [--agent]

ROOT="${DOCS_ROOT:-$(cd "$(dirname "$0")/.." && pwd)}"
AGENT=0; [ "$1" = "--agent" ] && AGENT=1
FAILS=()
fail() { FAILS+=("$1"); }

# --- CHRONICLE -------------------------------------------------------------------------------------------------------
IDX_ID=$(sed -n 's/^| \*\*\(0x[0-9A-Fa-f]*\)\*\* |.*/\1/p' "$ROOT/journals/CHRONICLE_INDEX.md" | head -1)
RP_ID=$(sed -n 's/^- \*\*Latest chronicle:\*\* `\(0x[0-9A-Fa-f]*\)`.*/\1/p' "$ROOT/tasks/RECOVERY_PROMPT.md" | head -1)
LOG_ID=$(ls "$ROOT"/journals/LOG_*.md 2>/dev/null | sort | tail -1 | sed -n 's/.*_\(0x[0-9A-Fa-f]*\)\.md$/\1/p')
CHRONICLE=ok
[ -n "$IDX_ID" ] || { CHRONICLE=FAIL; fail "CHRONICLE journals/CHRONICLE_INDEX.md has no '| **0x…** |' row"; }
[ "$RP_ID" = "$IDX_ID" ]  || { CHRONICLE=FAIL; fail "CHRONICLE tasks/RECOVERY_PROMPT.md 'Latest chronicle' is '${RP_ID:-<missing>}', index top row is '$IDX_ID'"; }
[ "$LOG_ID" = "$IDX_ID" ] || { CHRONICLE=FAIL; fail "CHRONICLE newest journals/LOG_* file is '${LOG_ID:-<missing>}', index top row is '$IDX_ID'"; }

# --- HANDOVER --------------------------------------------------------------------------------------------------------
RP_WORDS=$(wc -w < "$ROOT/tasks/RECOVERY_PROMPT.md" | tr -d ' ')
HANDOVER=ok
[ "${RP_WORDS:-0}" -le 1000 ] || { HANDOVER=FAIL; fail "HANDOVER tasks/RECOVERY_PROMPT.md is $RP_WORDS words (cap 1000) — it holds current state only; do not raise the cap"; }

# --- BLOCK -----------------------------------------------------------------------------------------------------------
BLOCK_TEXT=$(awk '/^## 🤝 Working with the user/{f=1} f&&/^$/{exit} f' "$ROOT/CLAUDE.md")
BLOCK=ok
[ -n "$BLOCK_TEXT" ] || { BLOCK=FAIL; fail "BLOCK CLAUDE.md has no '## 🤝 Working with the user' block"; }

# --- report ----------------------------------------------------------------------------------------------------------
if [ ${#FAILS[@]} -eq 0 ]; then STATUS=PASS; EXIT=0; else STATUS=FAIL; EXIT=1; fi
LINE="DOCS=$STATUS CHRONICLE=$CHRONICLE(${IDX_ID:-?}) HANDOVER=$HANDOVER(${RP_WORDS:-?}) BLOCK=$BLOCK"
if [ $AGENT -eq 1 ]; then
    for F in "${FAILS[@]}"; do echo "$F" >&2; done
else
    for F in "${FAILS[@]}"; do echo "    $F"; done
fi
echo "$LINE"
exit $EXIT
