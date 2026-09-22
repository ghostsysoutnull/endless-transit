import type { Seed } from '#engine/rng/Seed.ts';
import type { ChildSource } from './ChildSource.ts';
import type { Location } from './Location.ts';

/**
 * What every location is born with: its parent (none for the universe), its own seed, its index among its
 * siblings, and who generates its children. A kind that needs to ask its parent something only that kind
 * of parent answers (a floor asks its building how tall it is) names the parent's type.
 */
export interface Origin<P extends Location | undefined = Location | undefined> {
  readonly parent: P;
  readonly seed: Seed;
  readonly index: number;
  readonly children: ChildSource;
}
