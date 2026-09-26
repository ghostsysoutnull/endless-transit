# Web Lessons
Web lessons, in the form the Codex's Self-Improvement Loop sets.

- **An endless generator is never made eager without a bound**: it does not fail, it never ends.
- **A full-page screenshot of a page taller than the screen is not the phone**: the capture re-emulates the device and
  can drop `pointer: coarse` (key hints, short rows). Judge touch layout from viewport shots, and measure on the live
  page.
- **`command -v chromium` is not a search for a browser**: look in `~/.cache/ms-playwright` and
  `find / -name playwright-core` before saying there is none; drive it in real time (`docs/analysis/mocks/look.js`) — a
  headless `--virtual-time-budget` screenshot freezes animations and lies.
