import type { ContentSource } from '#engine/content/ContentSource.ts';

/**
 * The `.txt` lists of this folder, bundled as text. This is the ONE `import.meta.glob` of the project: it
 * lives outside the engine because only a bundler understands it. Its key order is an implementation
 * detail of the bundler — `index.txt` files are the ordering authority (see `ContentLibrary`).
 */
export class BundledContent implements ContentSource {
  readonly #files: Readonly<Record<string, string>>;

  constructor() {
    this.#files = import.meta.glob<string>('./**/*.txt', { query: '?raw', import: 'default', eager: true });
  }

  read(path: string): string | undefined {
    return this.#files[`./${path}`];
  }

  /** Every bundled file as a plain relative path (`themes/conditions.txt`). */
  paths(): readonly string[] {
    return Object.keys(this.#files).map((key) => key.replace(/^\.\//, ''));
  }
}
