import type { Fact } from './Fact.ts';
import type { Floor } from './Floor.ts';
import { Location } from './Location.ts';
import { LocationKind } from './LocationKind.ts';
import type { Origin } from './Origin.ts';

export const CORRIDOR_KIND = new LocationKind({
  key: 'corridor',
  title: 'Corridor',
  icon: '▅',
  indexLabel: 'CONDUIT',
});

/**
 * A floor's corridor: its children are the apartments, one behind each door. Nobody stands in a corridor —
 * standing in it is standing on its floor in the corridor mode, so arriving here lands on the floor (the
 * plain second corridor screen of the old game, HK-021, does not exist).
 */
export class Corridor extends Location {
  readonly #floor: Floor;
  readonly #sentence: string;

  constructor(origin: Origin<Floor>, facts: { sentence: string }) {
    super(origin);
    this.#floor = origin.parent;
    this.#sentence = facts.sentence;
  }

  kind(): LocationKind {
    return CORRIDOR_KIND;
  }

  name(): string {
    return 'Corridor';
  }

  floor(): Floor {
    return this.#floor;
  }

  override arrival(): Location {
    return this.#floor;
  }

  description(): readonly string[] {
    return [`${this.#sentence}.`];
  }

  override facts(): readonly Fact[] {
    const culture = this.vibe()?.culture();
    return culture === undefined ? [] : [{ key: 'culture', label: 'THEME', value: culture.key() }];
  }

  status(): string {
    const culture = this.vibe()?.culture().key().toUpperCase() ?? 'UNKNOWN';
    return `TRAFFIC: [STABLE] | THEME: [${culture}]`;
  }

  childrenHeading(): string {
    return 'Local access list:';
  }

  approachVerb(): string {
    return 'Access:';
  }
}
