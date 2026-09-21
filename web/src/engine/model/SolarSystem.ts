import { Location } from './Location.ts';
import { LocationKind } from './LocationKind.ts';
import type { Origin } from './Origin.ts';

export const SOLAR_SYSTEM_KIND = new LocationKind({
  key: 'solar-system',
  title: 'Solar system',
  icon: '☼',
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

  status(): string {
    return 'SYNC: [RESONANT_NODES_STABLE]';
  }

  childrenHeading(): string {
    return 'Orbital bodies within range:';
  }

  approachVerb(): string {
    return 'Land on';
  }
}
