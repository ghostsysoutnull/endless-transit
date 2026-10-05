import type { Culture } from '#engine/model/Culture.ts';
import type { Era } from '#engine/model/Era.ts';
import type { Seed } from '#engine/rng/Seed.ts';

/**
 * Where a building stands when it is named: its street (by its seed) and its place along it — the building
 * is born from `street.child(index)` — the culture
 * and era in force there, how deep the street lies and the landmark factor the places above ask for; and
 * its own height.
 */
export interface BuildingSite {
  readonly street: Seed;
  readonly index: number;
  readonly culture: Culture;
  readonly era: Era;
  readonly floors: number;
  readonly depth: number;
  readonly landmarkFactor: number;
}
