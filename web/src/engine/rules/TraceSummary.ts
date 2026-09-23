/**
 * The lattice trace as plain data (Guide:92; LatticeTraceComponent.groovy:50-89): one step per level from
 * the universe down to where the traveller stands, each with its glyph, its kind, its name and the note the
 * kind adds (`[FLOORS: 16]`, `[BREACHED]`, `[TRAIT: X]`); the last one is current.
 */
export interface TraceSummary {
  readonly steps: readonly {
    /** Levels below the universe. */
    readonly depth: number;
    readonly icon: string;
    /** The kind's title (`Solar system`) — a screen never branches on it. */
    readonly kind: string;
    readonly name: string;
    /** What the kind says beside its name on the trace; empty for most kinds. */
    readonly meta: string;
    readonly current: boolean;
    /** Below the bedrock: drawn in the void's colour. */
    readonly abyssal: boolean;
  }[];
}
