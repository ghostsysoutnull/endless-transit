import type { ContentSource } from '#engine/content/ContentSource.ts';

/** Test double: content held in a map; counts reads so a test can prove a list is parsed once. */
export class MemoryContentSource implements ContentSource {
  readonly #files: ReadonlyMap<string, string>;
  #reads = 0;

  constructor(files: Readonly<Record<string, string>>) {
    this.#files = new Map(Object.entries(files));
  }

  read(path: string): string | undefined {
    this.#reads++;
    return this.#files.get(path);
  }

  reads(): number {
    return this.#reads;
  }
}
