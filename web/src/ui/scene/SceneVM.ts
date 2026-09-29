import type { Seed } from '#engine/rng/Seed.ts';
import type { SceneChild } from './SceneChild.ts';

/**
 * What every scene draws, as readonly data — plain data and the engine's value objects (U01b, U02): the words a
 * reader hears for the picture, where it stands, one child per listed place it draws in the list's order — its
 * option id is the pick — the name a reader hears for its slider (the list's heading), and the coherence tear's
 * strength and seed. Each picture's own view model adds what only it draws.
 */
export interface SceneVM<C extends SceneChild> {
  readonly label: string;
  /** The place's own address: it tells a new place from the same one drawn again. */
  readonly address: string;
  readonly children: readonly C[];
  /** The name a reader hears for the picture's slider (the list's heading); the slider shows only where the camera has a track. */
  readonly slider: string;
  /** How strongly the picture tears, 0 to 1 (`Coherence.decay`). */
  readonly decay: number;
  /** This frame's seed: what the tear and the grain are drawn from. */
  readonly noise: Seed;
}
