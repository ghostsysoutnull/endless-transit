import type { Location } from '#engine/model/Location.ts';
import type { Seed } from '#engine/rng/Seed.ts';

const FRAME = 'frame';

/**
 * Owns one fact: the one source of randomness for what the HUD draws that is noise — the spectrogram, the
 * corrupted description, later the map's marks — seeded from the frame's own inputs: the place and the
 * step count (FrameEntropy.groovy:17-20). The same place at the same step always draws the same frame;
 * a move still changes it. Never the clock.
 */
export class FrameEntropy {
  of(place: Location, steps: number): Seed {
    return place.seed().branch(FRAME).branch(steps);
  }
}
