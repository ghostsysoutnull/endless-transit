import { Location } from './Location.ts';
import { LocationKind } from './LocationKind.ts';
import type { Origin } from './Origin.ts';

export const SECTOR_KIND = new LocationKind({
  key: 'sector',
  title: 'Galactic sector',
  icon: '○',
  indexLabel: 'SECTOR',
});

export class GalacticSector extends Location {
  readonly #name: string;

  constructor(origin: Origin, facts: { name: string }) {
    super(origin);
    this.#name = facts.name;
  }

  kind(): LocationKind {
    return SECTOR_KIND;
  }

  name(): string {
    return this.#name;
  }

  override callSign(): string {
    return `MATTER_CLUSTER: ${this.#name}`;
  }

  description(): readonly string[] {
    return ['A dense cluster of celestial bodies within the neural web.'];
  }

  status(): string {
    return 'GRID: [LATTICE_SYNC_OK]';
  }

  childrenHeading(): string {
    return 'Solar systems within proximity:';
  }

  approachVerb(): string {
    return 'Transition to System:';
  }
}
