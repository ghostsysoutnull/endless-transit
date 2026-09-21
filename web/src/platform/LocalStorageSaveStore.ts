import type { SaveStore } from '#engine/persistence/SaveStore.ts';

const SLOT = 'endless-transit.save';

/**
 * The save slot in the browser's `localStorage` (queue decision 4: browser only, may be cleared — accepted).
 * Storage can be unavailable or full (private windows, blocked site data); then the game simply does not
 * remember — it must never crash over a save.
 */
export class LocalStorageSaveStore implements SaveStore {
  readonly #storage: () => Storage;

  /** Takes a getter, not the object: with site data blocked, merely reading `window.localStorage` throws. */
  constructor(storage: () => Storage) {
    this.#storage = storage;
  }

  load(): string | undefined {
    try {
      return this.#storage().getItem(SLOT) ?? undefined;
    } catch {
      return undefined;
    }
  }

  save(text: string): void {
    try {
      this.#storage().setItem(SLOT, text);
    } catch {
      // Accepted loss (decision 4).
    }
  }
}
