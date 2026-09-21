import { Location } from './Location.ts';
import { LocationKind } from './LocationKind.ts';
import type { Origin } from './Origin.ts';

export const FILAMENT_KIND = new LocationKind({
  key: 'filament',
  title: 'Cosmic filament',
  icon: '»',
  indexLabel: 'CONDUIT',
});

export class CosmicFilament extends Location {
  readonly #name: string;
  readonly #conduitId: string;

  constructor(origin: Origin, facts: { name: string; conduitId: string }) {
    super(origin);
    this.#name = facts.name;
    this.#conduitId = facts.conduitId;
  }

  kind(): LocationKind {
    return FILAMENT_KIND;
  }

  name(): string {
    return this.#name;
  }

  description(): readonly string[] {
    return [`A massive neural conduit pulsing with bio-digital energy. [CONDUIT_ID: ${this.#conduitId}]`];
  }

  status(): string {
    return 'SYNC: [NODE_RELIABILITY_HIGH]';
  }

  childrenHeading(): string {
    return 'Galactic sectors within this conduit:';
  }

  approachVerb(): string {
    return 'Pulse to';
  }
}
