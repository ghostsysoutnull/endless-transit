import type { Location } from '#engine/model/Location.ts';

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
 * indoors a spectrogram drawn on the place's own seed (TelemetryComponent.groovy:48-55, 127-143). The
 * Groovy seeded it on the frame (LIP hash + step count, `FrameEntropy`); there is no step count until I05,
 * so for now the same place always draws the same bars.
 */
export class Telemetry {
  of(place: Location): TelemetrySummary | null {
    if (!place.indoors()) return null;
    const seed = place.seed().branch(SPECTROGRAM);
    return {
      spectrogram: Array.from({ length: BARS }, (_, i) => seed.branch(i).range(1, TALLEST)),
    };
  }
}
