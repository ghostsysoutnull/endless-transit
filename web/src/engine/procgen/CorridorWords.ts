import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { type CorridorShape, corridorShape } from '#engine/model/CorridorShape.ts';
import type { Seed } from '#engine/rng/Seed.ts';
import { Sentences } from './Sentences.ts';

/**
 * Owns one fact: a corridor's sentence and the shape it carries, dealt together (U02) — the corridor list read whole
 * and typed when it is made, so one unknown shape refuses the list; the deal is `Sentences`'. Shared by the corridor
 * as it is made and the floor's peek at it.
 */
export class CorridorWords {
  readonly #sentences: Sentences;
  readonly #lines: readonly (readonly [string, CorridorShape])[];

  constructor(library: ContentLibrary) {
    this.#sentences = new Sentences(library, 'corridor');
    this.#lines = this.#sentences.lines(corridorShape);
  }

  /** The sentence and the shape of the corridor born from this seed. */
  dealt(seed: Seed): readonly [string, CorridorShape] {
    return this.#sentences.dealtFrom(seed, this.#lines);
  }
}
