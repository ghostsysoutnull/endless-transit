import type { Fact } from './Fact.ts';
import { Location } from './Location.ts';
import { LocationKind } from './LocationKind.ts';
import type { Origin } from './Origin.ts';
import type { Trait } from './Trait.ts';
import type { Vibe } from './Vibe.ts';

export const COUNTRY_KIND = new LocationKind({
  key: 'country',
  title: 'Country',
  icon: '⬚',
  indexLabel: 'REGION',
});

/** A region governed by one functional trait; it hands the planet's vibe down mutated by that trait. */
export class Country extends Location {
  readonly #name: string;
  readonly #trait: Trait;
  readonly #vibe: Vibe | undefined;

  constructor(origin: Origin, facts: { name: string; trait: Trait; vibe: Vibe | undefined }) {
    super(origin);
    this.#name = facts.name;
    this.#trait = facts.trait;
    this.#vibe = facts.vibe;
  }

  kind(): LocationKind {
    return COUNTRY_KIND;
  }

  name(): string {
    return this.#name;
  }

  override vibe(): Vibe | undefined {
    return this.#vibe ?? super.vibe();
  }

  description(): readonly string[] {
    return [`A vast administrative region governed by the ${this.#trait.key()} directive.`];
  }

  override facts(): readonly Fact[] {
    return [{ key: 'trait', label: 'Sector Mutation', value: this.#trait.key() }];
  }

  status(): string {
    return `TRAIT: [${this.#trait.key().toUpperCase()}]`;
  }

  /** The trace's note (Country.groovy:30-32). */
  override meta(): string {
    return ` [TRAIT: ${this.#trait.key().toUpperCase()}]`;
  }

  childrenHeading(): string {
    return 'Regional cities identified:';
  }

  approachVerb(): string {
    return 'Travel to';
  }
}
