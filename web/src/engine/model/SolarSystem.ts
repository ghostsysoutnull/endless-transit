import { Location } from './Location.ts';
import { LocationKind } from './LocationKind.ts';
import type { Origin } from './Origin.ts';
import type { Portrait } from './Portrait.ts';
import type { AreaPart } from './AreaPart.ts';

export const SOLAR_SYSTEM_KIND = new LocationKind({
  key: 'solar-system',
  title: 'Solar system',
  scale: '10¹³ m', icon: '☼',
  indexLabel: 'RADII',
});

export class SolarSystem extends Location {
  readonly #name: string;

  constructor(origin: Origin, facts: { name: string }) {
    super(origin);
    this.#name = facts.name;
  }

  kind(): LocationKind {
    return SOLAR_SYSTEM_KIND;
  }

  name(): string {
    return this.#name;
  }

  description(): readonly string[] {
    return ['A star holding its resonant nodes in orbit.'];
  }

  /** No diagnostic line: the level is drawn (U04, Decision 1 — the terminal's jargon goes). */
  status(): string {
    return '';
  }

  childrenHeading(): string {
    return 'Orbital bodies within range';
  }

  approachVerb(): string {
    return 'Land on';
  }

  /** Drawn as an area of its children (U04). */
  override portrait(): Portrait {
    return this.area('solar-system');
  }

  /** Marked in its parent's area (U04). */
  override onArea(): readonly AreaPart[] {
    return [{ address: this.address().toString(), mark: 'solar-system' }];
  }
}
