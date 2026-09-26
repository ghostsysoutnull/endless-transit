# Web Lessons
Web lessons, in the form the Codex's Self-Improvement Loop sets.

- **A failing project build must not write into `src/`**: `tsconfig.base.json` sets `noEmitOnError` — without it a wall
  violation made `tsc -b` drop a stray `.d.ts` beside the source.
- **Never type `git checkout <rev> --` without a path**: it detaches HEAD and hides the branch's files; restore single
  files with `git restore --source=<rev> <path>`.
- **A scripted mutant owes a restore that cannot be skipped**: one mutant per foreground command, under `timeout`,
  restored by a `trap` and checked with `cmp`; never `pkill` a chain that still holds a mutant, and never make an
  endless generator eager without a bound — it does not fail, it never ends.
- **A full-page screenshot of a page taller than the screen is not the phone**: the capture re-emulates the device and
  can drop `pointer: coarse` (key hints, short rows). Judge touch layout from viewport shots, and measure on the live
  page.
- **A passing browser test does not mean a button is on screen**: Playwright scrolls to what it clicks. What must be
  reachable without scrolling is asserted with `toBeInViewport`.
- **Focus after a vanished control never lands on its opposite — the Shell decides from data**: `options[0]` after GO UP
  vanished was GO DOWN, and Enter rode back. An option carries the id that undoes it (`opposite`, from the model's
  `Move`); when the option just run is gone and its undo is on offer, the focus rests on the screen's `[data-rest]`,
  else on the first option that is not that undo. A label match in the view is not a rule.
- **A citation is read from the file at HEAD, never remembered**: `sed -n 'a,bp' <file>` before writing `<file>:a-b`,
  and the lines printed must hold the claim; a line-number check over every citation in the tree is one script.
- **A look that varies by a content row is a key column of that list**, carried by the engine; a UI table keyed by
  content names is a second owner and a lookup by display name.
- **A picture never branches on a string kind**: a shape or a roof is a drawer found by key, shared by every picture
  that draws it.
- **A UI change is unverified until it has been seen, and `command -v chromium` is not a search for a browser**: look in
  `~/.cache/ms-playwright` and `find / -name playwright-core` before saying there is none; drive it in real time
  (`docs/analysis/mocks/look.js`) — a headless `--virtual-time-budget` screenshot freezes animations and lies.
- **Read a mock once**: the first read of a mock picture writes its facts (sizes, constants, paces, gestures, its lines)
  into a digest beside the mock; plans and agents read the digest, the source only for a line they need.
