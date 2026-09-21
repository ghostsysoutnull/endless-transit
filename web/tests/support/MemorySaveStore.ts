import type { SaveStore } from '#engine/persistence/SaveStore.ts';

/** Test double: the save slot held in memory. */
export class MemorySaveStore implements SaveStore {
  #text: string | undefined;

  constructor(text?: string) {
    this.#text = text;
  }

  load(): string | undefined {
    return this.#text;
  }

  save(text: string): void {
    this.#text = text;
  }
}
