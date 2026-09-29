import type { ChildMark } from './ChildMark.ts';

/** A child marked by its option id. Value object: never built without an id. */
export class MarkedChild implements ChildMark {
  readonly #id: string;

  constructor(id: string) {
    if (id === '') throw new RangeError('a marked child has an id');
    this.#id = id;
  }

  marks(id: string): boolean {
    return id === this.#id;
  }

  marksAny(): boolean {
    return true;
  }

  or(): ChildMark {
    return this;
  }

  written(): string {
    return this.#id;
  }

  equals(other: ChildMark): boolean {
    return other.marks(this.#id);
  }
}
