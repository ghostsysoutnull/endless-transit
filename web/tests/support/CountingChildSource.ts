import type { ChildSource } from '#engine/model/ChildSource.ts';
import type { Location } from '#engine/model/Location.ts';

/** Test double: answers with the children a test hands it, and counts how often each parent asked. */
export class CountingChildSource implements ChildSource {
  readonly #make: (parent: Location) => readonly Location[];
  readonly #asked = new Map<string, number>();

  constructor(make: (parent: Location) => readonly Location[]) {
    this.#make = make;
  }

  childrenOf(parent: Location): readonly Location[] {
    const address = parent.address().toString();
    this.#asked.set(address, (this.#asked.get(address) ?? 0) + 1);
    return this.#make(parent);
  }

  /** How many times the location at this address asked for its children. */
  asked(address: string): number {
    return this.#asked.get(address) ?? 0;
  }
}
