import type { NamePart } from './NamePart.ts';

/** A part of a name read from its one list, whatever the vibe. */
export class PlainPart implements NamePart {
  readonly #directory: string;
  readonly #name: string;

  constructor(directory: string, name: string) {
    this.#directory = directory;
    this.#name = name;
  }

  name(): string {
    return this.#name;
  }

  list(): string {
    return `${this.#directory}/${this.#name}`;
  }
}
