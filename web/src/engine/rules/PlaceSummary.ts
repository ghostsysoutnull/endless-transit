import type { Fact } from '#engine/model/Fact.ts';
import type { Portrait } from '#engine/model/Portrait.ts';
import type { Seed } from '#engine/rng/Seed.ts';
import type { MapSummary } from './MapSummary.ts';
import type { TelemetrySummary } from './Telemetry.ts';

/** What the screen may know about the place the traveller stands in: plain data and the engine's value objects. */
export interface PlaceSummary {
  /** The kind's title (`Solar system`) — never its key: a screen has no business branching on it. */
  readonly kind: string;
  /**
   * Which picture draws the place and what it is handed (U01b, U02): the street, the tower, the corridor, or none —
   * the screen then stays as it was. It tells its reader which it is.
   */
  readonly portrait: Portrait;
  /** This frame's seed (`FrameEntropy`: the place and the step count): what a picture's noise is drawn from, never the clock. */
  readonly noise: Seed;
  readonly icon: string;
  readonly name: string;
  /** The path as text, `0.2.1`. */
  readonly address: string;
  /** One-based position among the siblings; nothing for the universe, nor for a kind with no index label (a floor: its name and the tower say its height, U02). */
  readonly position: { readonly label: string; readonly index: number; readonly total: number } | null;
  /** From the universe down to here, each step with its address. */
  readonly trail: readonly {
    readonly icon: string;
    readonly kind: string;
    readonly name: string;
    readonly address: string;
  }[];
  readonly status: string;
  readonly description: readonly string[];
  readonly facts: readonly Fact[];
  /** The colour name of the planet's frame; nothing above planet level. */
  readonly frame: string | null;
  /** Below a building's bedrock (Guide:279-280): the screen relabels and recolours by it. */
  readonly abyssal: boolean;
  readonly childrenHeading: string;
  /** What the place holds, when it is a kind that holds things (a room): relics by stable key and words, furniture described; null for every other kind. */
  readonly contents: {
    readonly objects: readonly { readonly key: string; readonly name: string }[];
    readonly furniture: readonly string[];
  } | null;
  /** The telemetry pane's readings; nothing outdoors. */
  readonly telemetry: TelemetrySummary | null;
  /** The place's lattice map — its children on a grid, this frame's marks; nothing for a kind with no map (a room). */
  readonly lattice: MapSummary | null;
}
