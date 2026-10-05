import type { Seed } from '#engine/rng/Seed.ts';

/**
 * Where a name is dealt: the parent whose children share the deal (none for the universe) and the child's
 * place among them. An `Origin` is one.
 */
export interface NameSlot {
  readonly parent: { seed(): Seed } | undefined;
  readonly index: number;
}
