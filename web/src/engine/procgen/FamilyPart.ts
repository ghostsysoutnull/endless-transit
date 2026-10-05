import type { NamePart } from './NamePart.ts';
import type { NameSlot } from './NameSlot.ts';

/** The branch of a parent's seed the list its children share is picked on. */
const FAMILY = 'name-family';

/**
 * A part of a name read from a directory of lists: the one the parent's seed picks, so the children of one
 * parent all read the same list and two parents seldom do (a universe letters its filaments in one
 * alphabet). Never built without a list to pick.
 */
export class FamilyPart implements NamePart {
  readonly #directory: string;
  readonly #name: string;
  readonly #lists: readonly string[];

  constructor(directory: string, name: string, lists: readonly string[]) {
    if (lists.length === 0) throw new Error(`${directory}/${name}/index names no list`);
    this.#directory = directory;
    this.#name = name;
    this.#lists = [...lists];
  }

  name(): string {
    return this.#name;
  }

  list(slot: NameSlot): string {
    if (slot.parent === undefined) {
      throw new Error(`${this.#directory}/${this.#name} is picked on the parent's seed: it needs a parent`);
    }
    const part = `${this.#directory}/${this.#name}`;
    return `${part}/${slot.parent.seed().branch(FAMILY).branch(part).pick(this.#lists)}`;
  }
}
