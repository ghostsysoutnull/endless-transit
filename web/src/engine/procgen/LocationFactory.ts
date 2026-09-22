import type { Location } from '#engine/model/Location.ts';
import type { LocationKind } from '#engine/model/LocationKind.ts';
import type { Origin } from '#engine/model/Origin.ts';

/**
 * One registry entry of the generator: everything about making one kind of location — how it is named
 * and what it decides (`create`), and what it holds (`populate`). Both are pure functions of the seeds
 * involved, so any place can be generated from any position, in any order. A factory names the kind it
 * makes and the kind of parent it is made under; the registry's dispatch on the parent's kind is what
 * makes the pairing true.
 */
export interface LocationFactory<
  T extends Location = Location,
  P extends Location | undefined = Location | undefined,
> {
  /** The registry key: the kind this factory creates and populates. */
  kind(): LocationKind;
  create(origin: Origin<P>): T;
  /** Generates the children of a location of this factory's kind. Called once, by `Location.children()`. */
  populate(parent: T): readonly Location[];
}
