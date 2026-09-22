import type { ContentSource } from './ContentSource.ts';

/**
 * The game's word lists. Owns two facts: **how a `.txt` list is parsed** (one entry per line, trimmed,
 * blank lines dropped, file order kept; a `key|value` list is the same lines cut at the first `|`) and **order = the index file's order** — a directory's members
 * are whatever its `index.txt` names, in that order, never a sorted directory listing.
 *
 * Paths carry no extension: `list('themes/conditions')`, `index('themes/cultures')`.
 */
export class ContentLibrary {
  readonly #source: ContentSource;
  readonly #parsed = new Map<string, readonly string[]>();

  constructor(source: ContentSource) {
    this.#source = source;
  }

  index(directory: string): readonly string[] {
    return this.list(`${directory}/index`);
  }

  list(path: string): readonly string[] {
    const known = this.#parsed.get(path);
    if (known !== undefined) return known;
    const lines = this.#parse(`${path}.txt`);
    this.#parsed.set(path, lines);
    return lines;
  }

  /** A `key|value` list, in file order. A line without `|` is an error, never a silent empty value. */
  pairs(path: string): readonly (readonly [string, string])[] {
    return this.list(path).map((line) => {
      const cut = line.indexOf('|');
      if (cut < 0) throw new Error(`content file ${path}.txt: '${line}' is not a key|value line`);
      return [line.slice(0, cut).trim(), line.slice(cut + 1).trim()] as const;
    });
  }

  #parse(file: string): readonly string[] {
    const text = this.#source.read(file);
    if (text === undefined) throw new Error(`content file is missing: ${file}`);
    const lines = text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line !== '');
    if (lines.length === 0) throw new Error(`content file has no entries: ${file}`);
    return Object.freeze(lines);
  }
}
