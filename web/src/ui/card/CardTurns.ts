import type { Seed } from '#engine/rng/Seed.ts';
import type { CardTurn } from './CardTurn.ts';

/** With coherence gone, this share of the turns is broken; at full coherence none is. */
const BROKEN_AT_WORST = 0.9;

/**
 * Owns one fact: which way the room's card turns next (U03e) — one of the clean turns, or, more often as coherence
 * falls, one of the broken ones; drawn from the frame's seed and the turn's count since the step, never the clock or
 * `Math.random`, and never the turn just played. A new turn is a new entry in a list handed in by `main.ts`.
 */
export class CardTurns {
  readonly #clean: readonly CardTurn[];
  readonly #broken: readonly CardTurn[];
  readonly #still: CardTurn;

  constructor(turns: { clean: readonly CardTurn[]; broken: readonly CardTurn[]; still: CardTurn }) {
    if (turns.clean.length === 0) throw new RangeError('the card needs a clean turn');
    this.#clean = turns.clean;
    this.#broken = turns.broken;
    this.#still = turns.still;
  }

  /** The turn for this frame's seed, this decay (0 to 1) and this count, after the turn keyed `last`. */
  pick(noise: Seed, decay: number, count: number, last: string): CardTurn {
    const draw = noise.branch('turn').branch(count);
    const broken = this.#broken.length > 0 && draw.branch('broken').probability(decay * BROKEN_AT_WORST);
    const pool = broken ? this.#broken : this.#clean;
    const at = draw.branch('which').range(0, pool.length - 1);
    const picked = pool[at] ?? this.#still;
    return picked.key() === last ? (pool[(at + 1) % pool.length] ?? picked) : picked;
  }

  /** The turn that does not move: for reduced motion. */
  still(): CardTurn {
    return this.#still;
  }
}
