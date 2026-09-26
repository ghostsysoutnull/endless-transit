# Web Lessons
Web lessons, in the form the Codex's Self-Improvement Loop sets.

- **A failing project build must not write into `src/`**: `tsconfig.base.json` keeps `noEmitOnError`.
- **A scripted mutant owes a restore that cannot be skipped**: one mutant per foreground command, under `timeout`,
  restored by a `trap` and checked with `cmp`; never `pkill` a chain that still holds a mutant.
- **An endless generator is never made eager without a bound**: it does not fail, it never ends.
- **A full-page screenshot of a page taller than the screen is not the phone**: the capture re-emulates the device and
  can drop `pointer: coarse` (key hints, short rows). Judge touch layout from viewport shots, and measure on the live
  page.
- **A passing browser test does not mean a button is on screen**: Playwright scrolls to what it clicks. What must be
  reachable without scrolling is asserted with `toBeInViewport`.
- **A citation is read from the file at HEAD, never remembered**: print the lines (`sed -n 'a,bp'`) before writing
  `<file>:a-b`; they must hold the claim.
- **`command -v chromium` is not a search for a browser**: look in `~/.cache/ms-playwright` and
  `find / -name playwright-core` before saying there is none; drive it in real time (`docs/analysis/mocks/look.js`) — a
  headless `--virtual-time-budget` screenshot freezes animations and lies.
- **Read a mock once**: the first read of a mock picture writes its facts (sizes, constants, paces, gestures, its lines)
  into a digest beside the mock; plans and agents read the digest, the source only for a line they need.
