# Web Lessons
Web lessons, in the form the Codex's Self-Improvement Loop sets.

- **An endless generator is never made eager without a bound**: it does not fail, it never ends.
- **A full-page screenshot of a page taller than the screen is not the phone**: the capture re-emulates the device and
  can drop `pointer: coarse` (key hints, short rows). Judge touch layout from viewport shots, and measure on the live
  page.
- **`command -v chromium` is not a search for a browser**: look in `~/.cache/ms-playwright` and
  `find / -name playwright-core` before saying there is none; drive it in real time (`docs/analysis/mocks/look.js`) — a
  headless `--virtual-time-budget` screenshot freezes animations and lies.
- **Accessibility is not a concern for this game**: nothing is built or kept for a screen reader; a button exists
  because a finger uses it.
- **A control the player needs on every screen is fixed to the screen itself**, never placed in the page's flow, where
  a long list pushes it out of reach.
- **A picture that takes the up-and-down drag locks the page under it**: before a picture is made taller or draggable,
  say where the finger scrolls the page from.
