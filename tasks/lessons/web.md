# Web Lessons
Rule plus pointer, one or two sentences each; the story lives in the iteration's note (`tasks/port/<id>.md`).

- **A failing project build must not write into `src/`**: `tsconfig.base.json` sets `noEmitOnError` — without it a
  wall violation made `tsc -b` drop a stray `.d.ts` beside the source. (I01)
- **Never type `git checkout <rev> --` without a path**: it detaches HEAD and hides the branch's files; restore single
  files with `git restore --source=<rev> <path>`. (I01)
- **A scripted mutant owes a restore that cannot be skipped**: one mutant per foreground command, under `timeout`, restored
  by a `trap` and checked with `cmp`; never `pkill` a chain that still holds a mutant, and never make an endless generator
  eager without a bound — it does not fail, it never ends. (I02: an eager `Progeny` mutant hung, the kill skipped the restore.)
- **A full-page screenshot of a page taller than the screen is not the phone**: the capture re-emulates the device and can
  drop `pointer: coarse` (key hints, short rows). Judge touch layout from viewport shots, and measure on the live page. (I02)
- **A passing browser test does not mean a button is on screen**: Playwright scrolls to what it clicks. What must be
  reachable without scrolling is asserted with `toBeInViewport`. (I02: the desktop grid pushed LEAVE below the fold.)
