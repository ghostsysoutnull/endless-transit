import type { Vibe } from '#engine/model/Vibe.ts';
import type { Seed } from '#engine/rng/Seed.ts';

/**
 * Where a door stands: the corridor whose doors share the deal (by its seed), the door's place along it,
 * and the vibe in force there — the door's apartment is born from `corridor.child(index)`.
 */
export interface DoorSlot {
  readonly corridor: Seed;
  readonly index: number;
  readonly vibe: Vibe;
}
