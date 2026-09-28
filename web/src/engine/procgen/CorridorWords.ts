import { type CorridorShape, corridorShape } from '#engine/model/CorridorShape.ts';
import type { Seed } from '#engine/rng/Seed.ts';
import type { CorridorDeal } from './CorridorDeal.ts';
import type { LineDecks } from './LineDecks.ts';
import type { Lines } from './Lines.ts';

/**
 * Owns one fact: a corridor's sentence and the shape it carries, dealt together (U02) — the corridor list read whole
 * and typed when it is made, so one unknown shape refuses the list; the deal is `Sentences`'. Shared by the corridor
 * as it is made and the floor's peek at it.
 */
export class CorridorWords implements CorridorDeal {
  readonly #sentences: Lines;
  readonly #lines: readonly (readonly [string, CorridorShape])[];

  constructor(decks: LineDecks) {
    this.#sentences = decks.of('corridor');
    this.#lines = this.#sentences.lines(corridorShape);
  }

  /** The sentence and the shape of the corridor born from this seed. */
  dealt(seed: Seed): readonly [string, CorridorShape] {
    return this.#sentences.dealtFrom(seed, this.#lines);
  }
}
