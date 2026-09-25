# U01a — what it really cost (research, 2026-09-25)

A read-only agent parsed the U01a writer's transcript (135 API calls: 50 plan, 85 build) and the branch diff
`72162e5..8aee831`. Context = `input_tokens + cache_read + cache_create` of a call. **Measured** and **inferred** are
marked; the regression below gives ≈ 722 + 0.43 tokens per character a step adds (chars/4 undercounts ≈ 1.8×).

## The figure and the spend (measured)
- The agent tool's figure is the **final context**, not a sum: plan 272,969 vs last context 270,667 + 809 out; build
  390,447 vs 387,587 + 1,030 (a residual of ≈ 1.5–1.8k unexplained).
- The **spend** is every call re-reading its context: plan 8.6M, build 28.0M — **36.7M processed**, 32× (plan) and 72×
  (build) the figure. The fixed start (the agent's own prompt and tools) is 33.5k at the first call.
- Where the 36.7M went: the fixed start 12.3%; **the plan's reading, carried through all 85 build steps, 69.6%** (the
  mock 19.2, `web/src` UI 14.7, engine 11.2, browser specs 10.7, docs and law 9.8, unit tests 4.8, thinking dropped at
  the go −4.4); the build's own growth 18.1%.

## The build (measured)
- Diff: `web/src` 8 files +169/−189; `web/tests` 12 files +110/−168 (144 lines goldens); `web/e2e` 11 files +104/−104;
  docs 3 files +23/−22; the note +158.
- Steps: tests (runs, reads, edits, goldens, a name-lookup probe) 49 of 85 and 56% of processed input; the source
  change 19 steps, 21.5%; docs 12 steps, 16%.

## Claims checked
1. "The plan is dear because it reads the whole mock" — **partly**: the mock is the largest single read (55k of 237k
   plan growth), but engine, specs and tests together weigh more.
2. "The figure is the final context" — **true** (above).
3. "A plan can be capped at ~60k" — **false**: the fixed start and the law are 61.8k before any mock or code.
4. The re-cut's per-iteration guesses — too high on the figure, and the figure understates the spend 30–70×.
5. "Batching renames into the wrap-up saves churn" — **mostly false**: 495 of 779 browser `expect` lines pin structure;
   the jargon a later scene retires is pinned by 8 text lines (richness:60, 61, 167; ritual:161, 162; items:85, 142,
   147) and 24 golden lines; U01a's 57 name pins went in one scripted step — the cost was the lookups and the gate's
   run-and-fix cycles, which every iteration pays anyway.

## What moves the cost
Spend = steps × the context each step carries (measured identity). In order: the build carrying the plan's context
(70% of U01a); how widely the plan reads; build steps spent on tests. A fresh builder starting near 80k instead of 252k
would have saved ≈ 14M of the build's 28M (inferred; it re-reads what it edits, so less).

## The next plans (inferred from measured sizes)
The mock's part per scene: street 740–766 + the scene machinery 939–1010, 1342–1421 (≈ 14k); tower and corridor
507–547, 767–864, 988–995, 1390–1421 (≈ 10k); apartment and room 493–506, 548–619, 865–938, 1344–1389, 1422–1439
(≈ 11k); above, below and trace 620–649, 668–739, 1011–1107 (≈ 10k); pole 490–492, 1108–1230 (≈ 7.5k); shared
(styles, layout, render) 7–492, 620–667, 939–1010, 1231–1484 (≈ 33k). A targeted plan ends near 105–140k of context
(U01b 134k, U02 133k, U03 141k, U04 138k, U05 104k, U06 222k). Iteration ranges, same-writer basis: U01b/U02/U03
280–490k, U04 320–550k, U05 200–340k, U06 310–420k+ — ≈ 1.7–2.8M in all.

**Not measured:** output and thinking tokens (redacted), exact tokenizer counts, dollars, U01b's new code, future step
counts.
