import type { Fact } from './Fact.ts';
import { Location } from './Location.ts';
import { LocationKind } from './LocationKind.ts';
import type { Origin } from './Origin.ts';

export const STREET_KIND = new LocationKind({ key: 'street', title: 'Street', icon: '═', indexLabel: 'WAY' });

/** A street: its header tells the era and the culture of this part of the world. */
export class Street extends Location {
  readonly #name: string;

  constructor(origin: Origin, facts: { name: string }) {
    super(origin);
    this.#name = facts.name;
  }

  kind(): LocationKind {
    return STREET_KIND;
  }

  name(): string {
    return this.#name;
  }

  description(): readonly string[] {
    return ['Buildings stand in pairs along both sides of the way.'];
  }

  override facts(): readonly Fact[] {
    const vibe = this.vibe();
    if (vibe === undefined) return [];
    return [
      { key: 'era', label: 'TECH_ERA', value: vibe.era().key() },
      { key: 'culture', label: 'RESONANCE', value: vibe.culture().key() },
    ];
  }

  status(): string {
    return 'SYNC: [STABLE]';
  }

  childrenHeading(): string {
    return 'Buildings on this street:';
  }

  approachVerb(): string {
    return 'Enter Building:';
  }

  /** A new journey starts on a street (Guide:41). */
  override startOfJourney(): Location {
    return this;
  }
}
