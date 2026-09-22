import type { Seed } from '#engine/rng/Seed.ts';
import type { Culture } from './Culture.ts';
import type { Era } from './Era.ts';
import type { Trait } from './Trait.ts';

const PLANET_STABILITY = 0.85;
const MIN_STABILITY = 0.1;
const MAX_STABILITY = 0.9;

interface VibeFacts {
  readonly era: Era;
  readonly culture: Culture;
  readonly secondCulture: Culture;
  readonly secondEra: Era;
  readonly stability?: number;
  readonly mutation?: Trait | undefined;
  readonly frame?: string;
}

/**
 * What a planet decides for everything below it: a main culture and era, a second of each (the minority
 * that drifts in), how stable the main one is, the trait a country mutated it with, and the frame colour —
 * the main culture's at the planet, kept when a rebel district swaps the cultures. Immutable: a country
 * and a rebel city get a changed copy.
 */
export class Vibe {
  readonly #facts: Required<Omit<VibeFacts, 'mutation'>> & { readonly mutation: Trait | undefined };

  constructor(facts: VibeFacts) {
    this.#facts = {
      ...facts,
      stability: facts.stability ?? PLANET_STABILITY,
      mutation: facts.mutation,
      frame: facts.frame ?? facts.culture.frame(),
    };
  }

  culture(): Culture {
    return this.#facts.culture;
  }

  era(): Era {
    return this.#facts.era;
  }

  secondCulture(): Culture {
    return this.#facts.secondCulture;
  }

  secondEra(): Era {
    return this.#facts.secondEra;
  }

  /** The share of what lies below that follows the main culture and era. */
  stability(): number {
    return this.#facts.stability;
  }

  /** The country trait that mutated this vibe; none above country level. */
  mutation(): Trait | undefined {
    return this.#facts.mutation;
  }

  frame(): string {
    return this.#facts.frame;
  }

  /** The culture a place below draws: the main one with the stability's share, else the second (VibeCapsule.groovy:38-40). */
  pickCulture(seed: Seed): Culture {
    return seed.probability(this.#facts.stability) ? this.#facts.culture : this.#facts.secondCulture;
  }

  /** The era a place below draws, by the same rule (VibeCapsule.groovy:43-45). */
  pickEra(seed: Seed): Era {
    return seed.probability(this.#facts.stability) ? this.#facts.era : this.#facts.secondEra;
  }

  /** A country's copy: its trait recorded, stability shifted and kept inside 0.1 … 0.9. */
  mutate(trait: Trait, stabilityShift: number): Vibe {
    const stability = Math.max(
      MIN_STABILITY,
      Math.min(MAX_STABILITY, this.#facts.stability + stabilityShift),
    );
    return new Vibe({ ...this.#facts, stability, mutation: trait });
  }

  /** A rebel district's copy: both cultures and both eras swap; everything else stays. */
  rebel(): Vibe {
    return new Vibe({
      ...this.#facts,
      culture: this.#facts.secondCulture,
      secondCulture: this.#facts.culture,
      era: this.#facts.secondEra,
      secondEra: this.#facts.era,
    });
  }
}
