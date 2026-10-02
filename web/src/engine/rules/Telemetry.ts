import type { Location } from '#engine/model/Location.ts';
import type { Seed } from '#engine/rng/Seed.ts';

const SPECTROGRAM = 'spectrogram';
/** Five bars, each 1 to 9 high (TelemetryComponent.groovy:134-137 at the 38-column pane). */
const BARS = 5;
/** The tallest a bar gets: the scale a screen draws the bars against. */
export const SPECTROGRAM_TALLEST = 9;
const TALLEST = SPECTROGRAM_TALLEST;
/** The spectrogram's axis runs from one hertz to the lottery's top (Room.ts), log-scaled; a frequency past it sits at the edge. */
const TOP_HERTZ = 10_000_000;
/** Below the bedrock the ticker adds a line about a third of the time (Guide:283; HUDHeaderComponent.groovy:85-88). */
const VOID = 'void';
const VOICE_CHANCE = 0.3;
const VOICES = [
  'It is cold down here.',
  'We see you.',
  'Return to the surface.',
  'Bedrock approaching.',
] as const;

/** One object of the place as the spectrogram reads it: where its frequency sits on the axis (0 to 1), and whether it resonates. */
export interface SpectralPeak {
  readonly position: number;
  readonly resonant: boolean;
}

/** The system telemetry a place inside a building shows on the HUD's right pane. Plain data. */
export interface TelemetrySummary {
  /** The heights of the quantum spectrogram's floor. */
  readonly spectrogram: readonly number[];
  /** A peak per object the place holds, by its frequency. */
  readonly peaks: readonly SpectralPeak[];
  /** Whether an anomaly glitches the reading. */
  readonly glitched: boolean;
  /** What the void says this frame, below the bedrock; nothing above it, and nothing two frames in three. */
  readonly voice: string | null;
}

/**
 * Owns one fact: what the HUD's telemetry pane reads for a place — nothing outdoors (the map, I08), and
 * indoors a spectrogram drawn on the frame (`FrameEntropy`: the place and the step count, as
 * TelemetryComponent.groovy:127-143 drew it from `FrameEntropy.forFrame`): a move redraws the bars, a
 * reload finds them as they were. The place's objects stand as peaks on a log axis of their frequency, and its
 * anomaly glitches the whole reading.
 */
export class Telemetry {
  of(place: Location, frame: Seed): TelemetrySummary | null {
    if (!place.indoors()) return null;
    const seed = frame.branch(SPECTROGRAM);
    const whisper = frame.branch(VOID);
    return {
      spectrogram: Array.from({ length: BARS }, (_, i) => seed.branch(i).range(1, TALLEST)),
      peaks: (place.contents()?.objects ?? []).map((object) => ({
        position: Math.min(1, Math.log10(Math.max(1, object.frequency().hertz())) / Math.log10(TOP_HERTZ)),
        resonant: object.resonant(),
      })),
      glitched: place.glitched(),
      voice:
        place.abyssal() && whisper.probability(VOICE_CHANCE) ? whisper.branch('words').pick(VOICES) : null,
    };
  }
}
