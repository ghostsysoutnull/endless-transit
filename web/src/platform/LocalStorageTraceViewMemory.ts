import type { TraceView } from '#ui/screens/TraceView.ts';
import type { TraceViewMemory } from '#ui/screens/TraceViewMemory.ts';

const SLOT = 'endless-transit.trace-view';

/**
 * The trace's view the player picked last (U05), in the browser's `localStorage`. What it reads back is whatever the
 * slot holds: only `pole` is the pole, anything else the column. Storage can be unavailable; then it forgets quietly.
 */
export class LocalStorageTraceViewMemory implements TraceViewMemory {
  readonly #storage: () => Storage;

  /** Takes a getter, not the object: with site data blocked, merely reading `window.localStorage` throws. */
  constructor(storage: () => Storage) {
    this.#storage = storage;
  }

  recall(): TraceView {
    try {
      return this.#storage().getItem(SLOT) === 'pole' ? 'pole' : 'column';
    } catch {
      return 'column';
    }
  }

  remember(view: TraceView): void {
    try {
      this.#storage().setItem(SLOT, view);
    } catch {
      // Forgotten: the column shows next time.
    }
  }
}
