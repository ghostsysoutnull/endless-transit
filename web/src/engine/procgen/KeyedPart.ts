import type { Vibe } from '#engine/model/Vibe.ts';
import type { NamePart } from './NamePart.ts';

/** A part of a name read from a directory of lists: the one its key names for the vibe in force. */
export class KeyedPart implements NamePart {
  readonly #directory: string;
  readonly #name: string;
  readonly #key: (vibe: Vibe | undefined) => string;

  constructor(directory: string, name: string, key: (vibe: Vibe | undefined) => string) {
    this.#directory = directory;
    this.#name = name;
    this.#key = key;
  }

  name(): string {
    return this.#name;
  }

  list(among: { readonly vibe: Vibe | undefined }): string {
    return `${this.#directory}/${this.#name}/${this.#key(among.vibe)}`;
  }
}
