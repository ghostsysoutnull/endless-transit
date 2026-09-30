import type { Fact } from './Fact.ts';
import { Location } from './Location.ts';
import { LocationKind } from './LocationKind.ts';
import type { Origin } from './Origin.ts';
import type { Trait } from './Trait.ts';
import type { Vibe } from './Vibe.ts';
import type { Portrait } from './Portrait.ts';
import type { AreaPart } from './AreaPart.ts';

export const COUNTRY_KIND = new LocationKind({
  key: 'country',
  glyph: 'country',
  title: 'Country',
  scale: '10⁶ m',
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
    const vibe = this.vibe();
    return [
      { key: 'trait', label: 'Trait', value: this.#trait.key() },
      ...(vibe === undefined
        ? []
        : [{ key: 'reading', label: 'Stability', value: vibe.stabilityText() } as const]),
    ];
  }

  /** No diagnostic line: the level is drawn (U04, Decision 1 — the terminal's jargon goes). */
  status(): string {
    return '';
  }

  childrenHeading(): string {
    return 'Regional cities identified';
  }

  approachVerb(): string {
    return 'Travel to';
  }

  /** Drawn as an area of its children (U04). */
  override portrait(): Portrait {
    return this.area('country');
  }

  /** Marked in its parent's area (U04). */
  override onArea(): readonly AreaPart[] {
    return [{ address: this.address().toString(), mark: 'country' }];
  }
}
