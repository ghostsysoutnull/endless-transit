import type { Location } from '#engine/model/Location.ts';
import type { Seed } from '#engine/rng/Seed.ts';

const SPECTROGRAM = 'spectrogram';
/** Five bars, each 1 to 9 high (TelemetryComponent.groovy:134-137 at the 38-column pane). */
const BARS = 5;
const TALLEST = 9;

/** The system telemetry a place inside a building shows on the HUD's right pane. Plain data. */
export interface TelemetrySummary {
  /** The heights of the quantum spectrogram's bars. */
  readonly spectrogram: readonly number[];
}

/**
 * Owns one fact: what the HUD's telemetry pane reads for a place — nothing outdoors (the map, I08), and
 * indoors a spectrogram drawn on the frame (`FrameEntropy`: the place and the step count, as
 * TelemetryComponent.groovy:127-143 drew it from `FrameEntropy.forFrame`): a move redraws the bars, a
 * reload finds them as they were.
 */
export class Telemetry {
  of(place: Location, frame: Seed): TelemetrySummary | null {
    if (!place.indoors()) return null;
    const seed = frame.branch(SPECTROGRAM);
    return {
      spectrogram: Array.from({ length: BARS }, (_, i) => seed.branch(i).range(1, TALLEST)),
    };
  }
}
