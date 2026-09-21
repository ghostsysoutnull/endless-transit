#!/bin/bash
# WF-007: the mechanical half of /close-wave. Read-only — this script never writes a file.
#   D1  suite count      DISCOVERED (./vinc.sh --test --agent) == tasks/RECOVERY_PROMPT.md "Test Suite" == tasks/todo.md "Suite baseline"
#   D2  latest chronicle top LOG_ID of journals/CHRONICLE_INDEX.md == recovery prompt "Latest chronicle" == newest journals/LOG_* file
#   D3  blueprint stamps each terminal/docs/blueprints/logic/classes/<pkg>/<Class>.md ends in a stamp carrying the first 10 chars of
#                        `git hash-object` of its class file ("Verified against:" or "Baselined (not audited) against:")
#   D4  handover size    tasks/RECOVERY_PROMPT.md <= 1000 words — it holds current state only; history lives in the chronicle (WF-008)
# Env (for negative checks against a scratch copy; the tree is never touched):
#   DOCS_ROOT        repository root to read from (default: the parent of terminal/). Project records (tasks/, journals/)
#                    are read from it; the Groovy records (blueprints, src/) from its terminal/ folder.
#   VINC_DISCOVERED  discovered-test count to trust instead of running the suite
# Usage: terminal/.agents/docs-check.sh [--agent]      (normally via ./terminal/vinc.sh --docs [--agent])

HERE="$(cd "$(dirname "$0")/.." && pwd)"   # terminal/ — this script lives in terminal/.agents/
ROOT="${DOCS_ROOT:-$HERE/..}"
TERM_ROOT="$ROOT/terminal"
AGENT=0; [ "$1" = "--agent" ] && AGENT=1
RED='\033[0;31m'; GREEN='\033[0;32m'; CYAN='\033[0;36m'; RESET='\033[0m'
FAILS=()
fail() { FAILS+=("$1"); }

# --- D1: suite count -------------------------------------------------------------------------------------------------
if [ -n "$VINC_DISCOVERED" ]; then
    ACTUAL="$VINC_DISCOVERED"
else
    ACTUAL=$("$HERE/vinc.sh" --test --agent 2>/dev/null | sed -n 's/.*STATUS=PASS DISCOVERED=\([0-9]*\).*/\1/p')
fi
RP_COUNT=$(sed -n 's/^- \*\*Test Suite:\*\* \([0-9]*\) discovered.*/\1/p' "$ROOT/tasks/RECOVERY_PROMPT.md" | head -1)
TODO_COUNT=$(sed -n 's/^\*\*Suite baseline:\*\* \([0-9]*\) discovered.*/\1/p' "$ROOT/tasks/todo.md" | head -1)
D1=ok
if [ -z "$ACTUAL" ]; then
    D1=FAIL; fail "D1 suite did not report STATUS=PASS — run ./vinc.sh --test -q"
else
    [ "$RP_COUNT" = "$ACTUAL" ]   || { D1=FAIL; fail "D1 tasks/RECOVERY_PROMPT.md 'Test Suite' says '${RP_COUNT:-<missing>}', suite discovered $ACTUAL"; }
    [ "$TODO_COUNT" = "$ACTUAL" ] || { D1=FAIL; fail "D1 tasks/todo.md 'Suite baseline' says '${TODO_COUNT:-<missing>}', suite discovered $ACTUAL"; }
fi

# --- D2: latest chronicle --------------------------------------------------------------------------------------------
IDX_ID=$(sed -n 's/^| \*\*\(0x[0-9A-Fa-f]*\)\*\* |.*/\1/p' "$ROOT/journals/CHRONICLE_INDEX.md" | head -1)
RP_ID=$(sed -n 's/^- \*\*Latest chronicle:\*\* `\(0x[0-9A-Fa-f]*\)`.*/\1/p' "$ROOT/tasks/RECOVERY_PROMPT.md" | head -1)
LOG_ID=$(ls "$ROOT"/journals/LOG_*.md 2>/dev/null | sort | tail -1 | sed -n 's/.*_\(0x[0-9A-Fa-f]*\)\.md$/\1/p')
D2=ok
[ -n "$IDX_ID" ] || { D2=FAIL; fail "D2 journals/CHRONICLE_INDEX.md has no '| **0x…** |' row"; }
[ "$RP_ID" = "$IDX_ID" ]  || { D2=FAIL; fail "D2 tasks/RECOVERY_PROMPT.md 'Latest chronicle' is '${RP_ID:-<missing>}', index top row is '$IDX_ID'"; }
[ "$LOG_ID" = "$IDX_ID" ] || { D2=FAIL; fail "D2 newest journals/LOG_* file is '${LOG_ID:-<missing>}', index top row is '$IDX_ID'"; }

# --- D3: blueprint stamps --------------------------------------------------------------------------------------------
D3=ok; BP_COUNT=0
for BP in "$TERM_ROOT"/docs/blueprints/logic/classes/*/*.md; do
    [ -f "$BP" ] || continue
    BP_COUNT=$((BP_COUNT + 1))
    PKG=$(basename "$(dirname "$BP")"); CLS=$(basename "$BP" .md)
    SRC="$TERM_ROOT/src/main/groovy/com/endlesstransit/$PKG/$CLS.groovy"
    if [ ! -f "$SRC" ]; then D3=FAIL; fail "D3 ${BP#$ROOT/} describes $PKG/$CLS.groovy, which does not exist"; continue; fi
    WANT=$(git hash-object "$SRC" | cut -c1-10)
    HAVE=$(tail -1 "$BP" | sed -n "s/^\*\(Verified\|Baselined (not audited)\) against: $CLS\.groovy @ \([0-9a-f]\{10\}\)\*$/\2/p")
    [ "$HAVE" = "$WANT" ] || { D3=FAIL; fail "D3 ${BP#$ROOT/} stamp is '${HAVE:-<missing>}', $CLS.groovy is $WANT — read the blueprint against the class, fix it, re-stamp 'Verified against'"; }
done
[ $BP_COUNT -gt 0 ] || { D3=FAIL; fail "D3 no blueprints found under terminal/docs/blueprints/logic/classes"; }

# --- D4: handover size ----------------------------------------------------------------------------------------------
RP_WORDS=$(wc -w < "$ROOT/tasks/RECOVERY_PROMPT.md" | tr -d ' ')
D4=ok
[ "${RP_WORDS:-0}" -le 1000 ] || { D4=FAIL; fail "D4 tasks/RECOVERY_PROMPT.md is $RP_WORDS words (cap 1000) — it holds current state only; move history to the chronicle, do not raise the cap"; }

# --- report ----------------------------------------------------------------------------------------------------------
if [ ${#FAILS[@]} -eq 0 ]; then STATUS=PASS; EXIT=0; else STATUS=FAIL; EXIT=1; fi
LINE="DOCS=$STATUS D1=$D1(${ACTUAL:-?}) D2=$D2(${IDX_ID:-?}) D3=$D3($BP_COUNT) D4=$D4(${RP_WORDS:-?})"
if [ $AGENT -eq 1 ]; then
    for F in "${FAILS[@]}"; do echo "$F" >&2; done
    echo "$LINE"
else
    echo -e "${CYAN}[VINC:AUDITING_DOCS...]${RESET}"
    for F in "${FAILS[@]}"; do echo "    $F"; done
    if [ $STATUS = PASS ]; then echo -e "${GREEN}[DOCS_TRUE]${RESET} $LINE"; else echo -e "${RED}[DOCS_STALE]${RESET} $LINE"; fi
fi
exit $EXIT
