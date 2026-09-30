import type { Fact } from './Fact.ts';
import { Location } from './Location.ts';
import { LocationKind } from './LocationKind.ts';
import type { Origin } from './Origin.ts';
import type { Vibe } from './Vibe.ts';
import type { Portrait } from './Portrait.ts';
import type { AreaPart } from './AreaPart.ts';

export const PLANET_KIND = new LocationKind({
  key: 'planet',
  title: 'Planet',
  scale: '10⁷ m',
  icon: '⊕',
  indexLabel: 'ORBIT',
});

/** Where the vibe is decided: a planet owns the culture and era of everything below it. */
export class Planet extends Location {
  readonly #name: string;
  readonly #vibe: Vibe;

  constructor(origin: Origin, facts: { name: string; vibe: Vibe }) {
    super(origin);
    this.#name = facts.name;
    this.#vibe = facts.vibe;
  }

  kind(): LocationKind {
    return PLANET_KIND;
  }

  name(): string {
    return this.#name;
  }

  override vibe(): Vibe {
    return this.#vibe;
  }

  description(): readonly string[] {
    return ['A world on the surface layer of the lattice, tuned to one culture and one era.'];
  }

  override facts(): readonly Fact[] {
    return [
      { key: 'culture', label: 'Culture', value: this.#vibe.culture().key() },
      { key: 'era', label: 'Era', value: this.#vibe.era().key() },
    ];
  }

  /** No diagnostic line: the level is drawn (U04, Decision 1 — the terminal's jargon goes). */
  status(): string {
    return '';
  }

  childrenHeading(): string {
    return 'Planetary landmasses scanned';
  }

  approachVerb(): string {
    return 'Visit';
  }

  /** Drawn as an area of its children (U04). */
  override portrait(): Portrait {
    return this.area('planet');
  }

  /** Marked in its parent's area (U04). */
  override onArea(): readonly AreaPart[] {
    return [{ address: this.address().toString(), mark: 'planet' }];
  }
}
