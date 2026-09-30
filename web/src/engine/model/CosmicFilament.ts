import type { Fact } from './Fact.ts';
import { Location } from './Location.ts';
import { LocationKind } from './LocationKind.ts';
import type { Origin } from './Origin.ts';
import type { Portrait } from './Portrait.ts';
import type { AreaPart } from './AreaPart.ts';

export const FILAMENT_KIND = new LocationKind({
  key: 'filament',
  title: 'Cosmic filament',
  scale: '10²⁴ m',
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
    return ['A massive neural conduit pulsing with bio-digital energy.'];
  }

  /** Its conduit's id, a chip (U04). */
  override facts(): readonly Fact[] {
    return [{ key: 'reading', label: 'Conduit', value: this.#conduitId }];
  }

  /** No diagnostic line: the level is drawn (U04, Decision 1 — the terminal's jargon goes). */
  status(): string {
    return '';
  }

  childrenHeading(): string {
    return 'Galactic sectors within this conduit';
  }

  approachVerb(): string {
    return 'Pulse to';
  }

  /** Drawn as an area of its children (U04). */
  override portrait(): Portrait {
    return this.area('filament');
  }

  /** Marked in its parent's area (U04). */
  override onArea(): readonly AreaPart[] {
    return [{ address: this.address().toString(), mark: 'filament' }];
  }
}
