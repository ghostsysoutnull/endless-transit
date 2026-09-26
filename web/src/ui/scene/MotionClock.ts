import type { FrameSource } from './FrameSource.ts';

/**
 * The page's one frame loop (Decision 4): every picture that moves listens to it, and it asks its source for
 * one frame at a time — only while someone listens. The next frame is asked for before the listeners run, so
 * a listener that leaves in its own frame (a pick that ends the scene) stops the loop cleanly; the listeners
 * of a frame are the ones listening when it began, less any that left during it.
 */
export class MotionClock {
  readonly #source: FrameSource;
  readonly #listeners = new Set<(time: number) => void>();
  #pending: number | undefined;

  constructor(source: FrameSource) {
    this.#source = source;
  }

  /** Listens from the next frame on; the function returned stops listening. */
  subscribe(listener: (time: number) => void): () => void {
    this.#listeners.add(listener);
    if (this.#pending === undefined) this.#ask();
    return () => {
      this.#listeners.delete(listener);
      if (this.#listeners.size === 0 && this.#pending !== undefined) {
        this.#source.cancel(this.#pending);
        this.#pending = undefined;
      }
    };
  }

  now(): number {
    return this.#source.now();
  }

  #ask(): void {
    this.#pending = this.#source.request((time) => {
      this.#frame(time);
    });
  }

  #frame(time: number): void {
    this.#pending = undefined;
    if (this.#listeners.size === 0) return;
    this.#ask();
    for (const listener of [...this.#listeners]) {
      if (this.#listeners.has(listener)) listener(time);
    }
  }
}
