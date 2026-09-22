import type { Location } from './Location.ts';

/** Whoever can generate the children of a location — the generator's registry in the game, a double in tests. */
export interface ChildSource {
  childrenOf(parent: Location): readonly Location[];
}
