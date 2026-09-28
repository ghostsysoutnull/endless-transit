import type { ReducedMotion } from '#ui/ReducedMotion.ts';

const QUERY = '(prefers-reduced-motion: reduce)';

/** The browser's `prefers-reduced-motion`, asked afresh each time — the only place the page reads it. */
export class BrowserReducedMotion implements ReducedMotion {
  readonly #window: Window;

  constructor(window: Window) {
    this.#window = window;
  }

  reduced(): boolean {
    return this.#window.matchMedia(QUERY).matches;
  }
}
