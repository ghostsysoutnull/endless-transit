const FULL = 100;
const EMPTY = 0;
/**
 * The bands of the coherence bar, from the top down (Guide:151-156, HUDHeaderComponent.groovy:146-148): a
 * value is in the first band whose floor it reaches. The keys are what a screen colours by.
 */
const BANDS: readonly { readonly key: string; readonly from: number }[] = [
  { key: 'stable', from: 70 },
  { key: 'degraded', from: 30 },
  { key: 'critical', from: EMPTY },
];
/** Under this the place's description starts corrupting (Guide:155, NarrativePaneComponent.groovy:25). */
const CORRUPTS_BELOW = 40;

/**
 * Owns one fact: the traveller's one resource as a value — a whole number from 0 to 100 (Guide:43), what
 * draining and restoring do to it (a floor at 0, a cap at 100, Player.groovy:50-52), and what each value
 * means: the band the bar shows, whether the description corrupts, whether the link has failed. Immutable:
 * every change is a new value.
 */
export class Coherence {
  readonly #value: number;

  /** Static: a fact of the scale, not of one value — the whole range, for a meter to say (`aria-valuemin`/`max`). */
  static range(): { readonly min: number; readonly max: number } {
    return { min: EMPTY, max: FULL };
  }

  /**
   * Static: a fact of the scale, not of one value — the values worth setting by hand (the debug INTEGRITY,
   * Guide:441), from the top down: full, each band edge and the corruption edge with the value below it,
   * and one from failure. Derived from the bands and the corruption edge; nothing restates them.
   */
  static edges(): readonly number[] {
    const edges = new Set([FULL, EMPTY + 1]);
    for (const from of [...BANDS.map((band) => band.from), CORRUPTS_BELOW]) {
      if (from <= EMPTY) continue;
      edges.add(from);
      edges.add(from - 1);
    }
    return [...edges].sort((a, b) => b - a);
  }

  constructor(value: number = FULL) {
    if (!Number.isInteger(value) || value < EMPTY || value > FULL) {
      throw new RangeError(
        `coherence is a whole number from ${String(EMPTY)} to ${String(FULL)}, got ${String(value)}`,
      );
    }
    this.#value = value;
  }

  value(): number {
    return this.#value;
  }

  drained(amount: number): Coherence {
    return new Coherence(Math.max(EMPTY, this.#value - amount));
  }

  restored(amount: number): Coherence {
    return new Coherence(Math.min(FULL, this.#value + amount));
  }

  /** Nothing left: the link fails and the world reboots (Guide:144, TurnProcessor.groovy:55). */
  exhausted(): boolean {
    return this.#value === EMPTY;
  }

  /** Which band of the bar this value is in: `stable`, `degraded` or `critical`. */
  band(): string {
    return BANDS.find((band) => this.#value >= band.from)?.key ?? 'critical';
  }

  /** Whether the description of the place is read through static at this value. */
  corrupting(): boolean {
    return this.#value < CORRUPTS_BELOW;
  }

  equals(other: Coherence): boolean {
    return this.#value === other.#value;
  }
}
