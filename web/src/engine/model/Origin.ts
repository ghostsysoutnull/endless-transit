import type { Seed } from '#engine/rng/Seed.ts';
import type { ChildSource } from './ChildSource.ts';
import type { Location } from './Location.ts';

/** What every location is born with: its parent (none for the universe), its own seed, its index among its siblings, and who generates its children. */
export interface Origin {
  readonly parent: Location | undefined;
  readonly seed: Seed;
  readonly index: number;
  readonly children: ChildSource;
}
