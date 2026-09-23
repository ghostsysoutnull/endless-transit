import type { Fact } from '#engine/model/Fact.ts';
import type { TelemetrySummary } from './Telemetry.ts';

/** What the screen may know about the place the traveller stands in: plain text and numbers only. */
export interface PlaceSummary {
  /** The kind's title (`Solar system`) — never its key: a screen has no business branching on it. */
  readonly kind: string;
  readonly icon: string;
  readonly name: string;
  /** The path as text, `0.2.1`. */
  readonly address: string;
  /** The place's decorative coordinates, `12.345 / 67.890`. */
  readonly hash: string;
  /** Levels below the universe. */
  readonly depth: number;
  /** One-based position among the siblings; nothing for the universe. */
  readonly position: { readonly label: string; readonly index: number; readonly total: number } | null;
  /** From the universe down to here. */
  readonly trail: readonly { readonly icon: string; readonly kind: string; readonly name: string }[];
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
}
