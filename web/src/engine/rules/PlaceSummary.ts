import type { Fact } from '#engine/model/Fact.ts';

/** What the screen may know about the place the traveller stands in: plain text and numbers only. */
export interface PlaceSummary {
  /** The kind's title (`Solar system`) — never its key: a screen has no business branching on it. */
  readonly kind: string;
  readonly icon: string;
  readonly name: string;
  /** The path as text, `0.2.1`. */
  readonly address: string;
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
  readonly childrenHeading: string;
}
