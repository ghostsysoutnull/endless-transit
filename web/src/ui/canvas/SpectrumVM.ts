import type { Seed } from '#engine/rng/Seed.ts';

/** The quantum spectrogram as the canvas draws it: the engine's anchor heights against the tallest, and the frame's seed its bars are filled in from. */
export interface SpectrumVM {
  readonly anchors: readonly number[];
  readonly tallest: number;
  readonly noise: Seed;
}
