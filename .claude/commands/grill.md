# /grill — The Plan Interrogation Protocol

Adversarial review of a draft plan before it is presented for authorization.
Use on every non-trivial plan (3+ steps or any ownership/structural move) and
on any plan the user asks to have grilled. Read-only: this command never edits
source, tests, or the plan document. It produces verdicts.

---

## 🌌 PHILOSOPHY
A plan is a set of claims about code. Most are cheap to verify and expensive to
get wrong. The author of a plan is the worst person to find its weakest claim,
so this pass runs with a different stance: **assume the plan is wrong and look
for where.** Every check below ends in a verdict, not prose. Origin: WF-002 in
`docs/analysis/WORKFLOW_BACKLOG.md` — a Phase 6b draft asserted test coverage
that did not exist, and only user review caught it.

---

## 🛠️ WORKFLOW

### 1. LOCATE THE PLAN
- Input is the draft plan under review: the most recent plan in this conversation,
  or a file path / phase section the user names.
- Read the matching section of `docs/analysis/OOA_REFACTOR_PLAN.md` (or the active
  task document from `tasks/todo.md`) so deviations can be measured against it.

### 2. RUN THE SIX CHECKS
Each check must be backed by tool output produced in this session (Read, grep,
`./vinc.sh`). A check answered from memory is a FAIL regardless of the answer.

| # | Check | Evidence required | Verdict |
| :--- | :--- | :--- | :--- |
| 1 | **Coverage claims** — every "test X guards Y" | The assertion lines from X, quoted. No quote → behavior is UNGUARDED and the plan needs a step-0 pinning test. | PASS / UNGUARDED |
| 2 | **Behavioral edges** — every line whose *semantics* change, not just its reference | Each edge listed with the file, the old behavior, the new behavior, and the named guard (test or scan) that would catch a regression. | PASS / UNGUARDED |
| 3 | **Lifecycle** (ownership moves only) — who constructs, who holds, who replaces the instance | grep for `new <Type>(` and for assignments to the field across `src/main` and `src/test`. Any site that *replaces* the instance after construction is flagged. | PASS / STALE-REF RISK |
| 4 | **Per-commit coherence** — each commit compiles and passes the full suite alone | The file list per commit, the production-file count against the phase cap, and the ordering argument for why intermediate states compile. | PASS / INCOHERENT |
| 5 | **Deviations from the plan document** + **pattern integrity** | Each difference between the draft and the phase section, with the reason. Silent deviations are a FAIL. If the plan introduces a State/Strategy/Factory/Visitor/Observer hierarchy: grep the planned *client* code (and tests) for `instanceof <NewType>`, `.class ==`, or `getClass()` on the new type — any hit is a FAIL; for an event/Observer hierarchy the *client* is the listener, so a subscriber that branches on `instanceof <EventSubtype>` instead of dispatching polymorphically (typed subscription or a method per event) is the same FAIL (WF-004: a plan-blessed `instanceof CorridorState` in `ScanCommand` passed all six checks). | PASS / UNDECLARED |
| 6 | **Reversion unit** — what gets reverted if a gate goes red | The revert boundary (commit, sub-phase, branch) and confirmation that no commit mixes production and unrelated doc changes. | PASS / UNBOUNDED |

### 3. BLAST RADIUS CROSS-CHECK
- grep `src/main` **and** `src/test` for every field, method, and constructor the
  plan touches. Compare the hit list to the plan's "Files" and "Test blast radius"
  lines. Any hit absent from the plan is reported.

### 4. REPORT
Output a table of the six verdicts, then one bullet per non-PASS item stating
the exact amendment needed. End with one of:
- **CLEARED** — no amendments; the plan may be presented for authorization as-is.
- **AMEND** — list the amendments; the plan is re-presented after they are made.
- **STOP** — a check exposed a flaw in the plan's premise; re-plan before continuing.

---

## 📍 EXAMPLE TRIGGERS
- "Grill the 6b plan."
- "Run /grill before you ask me to authorize this."
- "Interrogate the ownership move in step 3."

---

## 🏺 ARCHITECT'S NOTE
The Vinculum Protocol makes plans the gate to every change. A plan that passes
this interrogation has earned that authority; one that has not is a hypothesis.
Keep the checks at six. A longer list becomes a ritual that gets skimmed.
