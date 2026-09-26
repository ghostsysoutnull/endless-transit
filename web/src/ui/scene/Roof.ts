import { SceneHash } from './SceneHash.ts';

/** The four roofs a building may have: a landmark's peak, a mast, a box on top, or flat. */
export type RoofKind = 'peak' | 'mast' | 'box' | 'flat';

/**
 * Owns one fact: which roof a building has — a landmark's peak, else one of three by its address — so the
 * street and the tower draw the same building the same way (U02).
 */
export class Roof {
  readonly #hash = new SceneHash();

  of(address: string, landmark: boolean): RoofKind {
    if (landmark) return 'peak';
    const shape = this.#hash.fraction(address, 0);
    if (shape < 0.4) return 'mast';
    if (shape < 0.7) return 'box';
    return 'flat';
  }
}
