import type { Seed } from '#engine/rng/Seed.ts';
import { Address } from './Address.ts';
import type { Fact } from './Fact.ts';
import type { LocationKind } from './LocationKind.ts';
import type { Origin } from './Origin.ts';
import type { Vibe } from './Vibe.ts';

/**
 * A place in the world tree. Owns the **lazy-loading law**: children live behind a private backing array
 * and exist only after `children()` is asked — once, through the injected `ChildSource`. There is no other
 * way to reach them, so nothing can bypass the population check.
 *
 * Each kind answers for itself — what it is called, what it shows, how its children are reached — so
 * nobody ever asks "which kind are you?".
 */
export abstract class Location {
  readonly #origin: Origin;
  #children: readonly Location[] | undefined;

  constructor(origin: Origin) {
    this.#origin = origin;
  }

  abstract kind(): LocationKind;
  abstract name(): string;
  /** The narrative of the place, one paragraph per entry. */
  abstract description(): readonly string[];
  /** The one-line diagnostic of the place. */
  abstract status(): string;
  /** The line above the list of children. */
  abstract childrenHeading(): string;
  /** How a traveller here reaches a child: the words before the child's call sign (`Land on`). */
  abstract approachVerb(): string;

  /** How this place is announced on its parent's list. */
  callSign(): string {
    return this.name();
  }

  facts(): readonly Fact[] {
    return [];
  }

  /** A sealed place is listed but cannot be entered — nothing stands inside it. */
  sealed(): boolean {
    return false;
  }

  /** A place its parent's list should make stand out. */
  landmark(): boolean {
    return false;
  }

  /** What the planet above decided; nothing above planet level. */
  vibe(): Vibe | undefined {
    return this.parent()?.vibe();
  }

  /** How much likelier landmarks are below this place; 1 unless something above says otherwise. */
  landmarkFactor(): number {
    return this.parent()?.landmarkFactor() ?? 1;
  }

  seed(): Seed {
    return this.#origin.seed;
  }

  parent(): Location | undefined {
    return this.#origin.parent;
  }

  /** Zero-based position among the siblings. */
  index(): number {
    return this.#origin.index;
  }

  address(): Address {
    return this.parent()?.address().child(this.index()) ?? new Address([]);
  }

  depth(): number {
    return this.address().depth();
  }

  /** From the universe down to here. */
  trail(): readonly Location[] {
    return [...(this.parent()?.trail() ?? []), this];
  }

  children(): readonly Location[] {
    this.#children ??= Object.freeze([...this.#origin.children.childrenOf(this)]);
    return this.#children;
  }

  /** Whether the children have been generated yet. */
  populated(): boolean {
    return this.#children !== undefined;
  }

  /**
   * The place an address names, seen from here (this location must be the universe of that address).
   * One strict walker: an index nobody answers, or a sealed place on the way, is nowhere.
   */
  descendant(address: Address): Location | undefined {
    let here: Location | undefined = this.sealed() ? undefined : this;
    for (const index of address.indices().slice(this.depth())) {
      here = here?.children()[index];
      if (here?.sealed() === true) return undefined;
    }
    return here;
  }
}
