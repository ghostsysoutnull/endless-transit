import { Location } from './Location.ts';
import { LocationKind } from './LocationKind.ts';
import type { Origin } from './Origin.ts';
import type { Portrait } from './Portrait.ts';
import type { AreaPart } from './AreaPart.ts';

export const SECTOR_KIND = new LocationKind({
  key: 'sector',
  title: 'Galactic sector',
  scale: '10²¹ m', icon: '○',
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

  description(): readonly string[] {
    return ['A dense cluster of celestial bodies within the neural web.'];
  }

  /** No diagnostic line: the level is drawn (U04, Decision 1 — the terminal's jargon goes). */
  status(): string {
    return '';
  }

  childrenHeading(): string {
    return 'Solar systems within proximity';
  }

  approachVerb(): string {
    return 'Transition to System:';
  }

  /** Drawn as an area of its children (U04). */
  override portrait(): Portrait {
    return this.area('sector');
  }

  /** Marked in its parent's area (U04). */
  override onArea(): readonly AreaPart[] {
    return [{ address: this.address().toString(), mark: 'sector' }];
  }
}
