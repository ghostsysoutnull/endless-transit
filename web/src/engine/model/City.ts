import type { Fact } from './Fact.ts';
import { Location } from './Location.ts';
import { LocationKind } from './LocationKind.ts';
import type { Origin } from './Origin.ts';
import type { Vibe } from './Vibe.ts';

export const CITY_KIND = new LocationKind({ key: 'city', title: 'City', icon: '🏙', indexLabel: 'DISTRICT' });

/** A city; one in ten is a rebel district, which carries the planet's vibe with cultures and eras swapped. */
export class City extends Location {
  readonly #name: string;
  readonly #rebelVibe: Vibe | undefined;

  /** `rebelVibe` is the swapped vibe of a rebel district; a loyal city has none and inherits. */
  constructor(origin: Origin, facts: { name: string; rebelVibe: Vibe | undefined }) {
    super(origin);
    this.#name = facts.name;
    this.#rebelVibe = facts.rebelVibe;
  }

  kind(): LocationKind {
    return CITY_KIND;
  }

  name(): string {
    return this.#name;
  }

  override vibe(): Vibe | undefined {
    return this.#rebelVibe ?? super.vibe();
  }

  description(): readonly string[] {
    return [
      this.#rebelVibe === undefined
        ? 'A stable regional node connected to the planetary lattice.'
        : 'The air is thick with illegal data-streams and shifting static.',
    ];
  }

  override facts(): readonly Fact[] {
    return this.#rebelVibe === undefined
      ? []
      : [{ key: 'alert', label: 'UNAUTHORIZED_ZONE', value: 'UNAUTHORIZED_RESONANCE_DETECTED' }];
  }

  status(): string {
    return this.#rebelVibe === undefined ? 'STABILITY: [STABLE]' : 'STABILITY: [VOLATILE]';
  }

  childrenHeading(): string {
    return 'Streets detected in this city:';
  }

  approachVerb(): string {
    return 'Go to';
  }
}
