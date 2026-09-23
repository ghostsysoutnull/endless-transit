import type { Fact } from './Fact.ts';
import { Location } from './Location.ts';
import { LocationKind } from './LocationKind.ts';
import type { Origin } from './Origin.ts';
import type { Vibe } from './Vibe.ts';

export const PLANET_KIND = new LocationKind({
  key: 'planet',
  title: 'Planet',
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
      { key: 'culture', label: 'RESONANCE', value: this.#vibe.culture().key() },
      { key: 'era', label: 'TIMELINE', value: this.#vibe.era().key() },
    ];
  }

  status(): string {
    return `RESONANCE: [${this.#vibe.culture().key().toUpperCase()}]`;
  }

  /** The trace's note (Planet.groovy:30-34): a planet is always the surface. */
  override meta(): string {
    return ` [SURFACE | ERA: ${this.#vibe.era().key().toUpperCase()}]`;
  }

  childrenHeading(): string {
    return 'Planetary landmasses scanned:';
  }

  approachVerb(): string {
    return 'Visit';
  }
}
