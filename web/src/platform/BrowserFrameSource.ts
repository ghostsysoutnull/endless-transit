import type { FrameSource } from '#ui/scene/FrameSource.ts';

/** The browser's animation frames and its monotonic clock — the only frame source the page runs on. */
export class BrowserFrameSource implements FrameSource {
  readonly #window: Window;

  constructor(window: Window) {
    this.#window = window;
  }

  request(callback: (time: number) => void): number {
    return this.#window.requestAnimationFrame(callback);
  }

  cancel(handle: number): void {
    this.#window.cancelAnimationFrame(handle);
  }

  now(): number {
    return this.#window.performance.now();
  }
}
