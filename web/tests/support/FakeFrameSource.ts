import type { FrameSource } from '#ui/scene/FrameSource.ts';

/** A frame source a test drives by hand: it holds the frames asked for until `frame(time)` runs them. */
export class FakeFrameSource implements FrameSource {
  #time = 0;
  #next = 1;
  readonly #pending = new Map<number, (time: number) => void>();
  /** How many frames were ever asked for. */
  requests = 0;

  request(callback: (time: number) => void): number {
    this.requests++;
    const handle = this.#next++;
    this.#pending.set(handle, callback);
    return handle;
  }

  cancel(handle: number): void {
    this.#pending.delete(handle);
  }

  now(): number {
    return this.#time;
  }

  /** How many frames are waiting to run. */
  waiting(): number {
    return this.#pending.size;
  }

  /** Runs the frames asked for so far, at this time; frames they ask for wait for the next call. */
  frame(time: number): void {
    this.#time = time;
    const due = [...this.#pending.values()];
    this.#pending.clear();
    for (const callback of due) callback(time);
  }
}
