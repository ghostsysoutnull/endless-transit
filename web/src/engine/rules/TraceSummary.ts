import type { Fact } from '#engine/model/Fact.ts';
import type { Portrait } from '#engine/model/Portrait.ts';

/**
 * The lattice trace as plain data (Guide:92; LatticeTraceComponent.groovy:50-89): one step per level from
 * the universe down to where the traveller stands, each with its glyph, its kind, its name and what its band
 * in the column draws (U04); the last one is current.
 */
export interface TraceSummary {
  readonly steps: readonly {
    /** Levels below the universe. */
    readonly depth: number;
    readonly icon: string;
    /** The kind's title (`Solar system`) — a screen never branches on it. */
    readonly kind: string;
    readonly name: string;
    readonly current: boolean;
    /** Below the bedrock: drawn in the void's colour. */
    readonly abyssal: boolean;
    /** Where it stands on the trail (U04): what its band's picture is keyed by. */
    readonly address: string;
    /** What its band draws: the level's own picture, as `Location.bandPortrait` says. */
    readonly portrait: Portrait;
    /** Its listed places, as its band marks them. */
    readonly children: readonly {
      readonly address: string;
      readonly name: string;
      readonly ordinal: string;
      readonly landmark: boolean;
      readonly visited: boolean;
      readonly sealed: boolean;
    }[];
    /** Its chips. */
    readonly facts: readonly Fact[];
    /** Its first line of words. */
    readonly words: string;
    /** How big a place of its kind is (`10²⁶ m`). */
    readonly scale: string;
  }[];
}
