import type { Seed } from '#engine/rng/Seed.ts';
import type { SpectralPeak } from '#engine/rules/Telemetry.ts';

/**
 * The quantum spectrogram as the canvas draws it: the floor's anchor heights against the tallest, the frame's seed the
 * floor is filled in from, the room's objects as peaks on the axis, and whether an anomaly glitches it all.
 */
export interface SpectrumVM {
  readonly anchors: readonly number[];
  readonly tallest: number;
  readonly noise: Seed;
  readonly peaks: readonly SpectralPeak[];
  readonly glitched: boolean;
}
