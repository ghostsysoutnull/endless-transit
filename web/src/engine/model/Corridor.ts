import type { Fact } from './Fact.ts';
import type { Figure } from './Figure.ts';
import type { Floor } from './Floor.ts';
import { Location } from './Location.ts';
import { LocationKind } from './LocationKind.ts';
import type { Origin } from './Origin.ts';
import type { ScanReport } from './ScanReport.ts';

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
  readonly #shape: string;

  /** `shape` is the key its sentence carries (`long`, `service`, `curved`, `static`); none when made without one. */
  constructor(origin: Origin<Floor>, facts: { sentence: string; shape?: string }) {
    super(origin);
    this.#floor = origin.parent;
    this.#sentence = facts.sentence;
    this.#shape = facts.shape ?? '';
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

  /** How it runs and how many doors it has — the doors counted by the building, never by making them. */
  override figure(): Figure {
    return { floors: 0, doors: this.#floor.building().doorsPerFloor(), shape: this.#shape };
  }

  /**
   * The door table a scan reads (Guide:227-231; ScanCommand.groovy:60-134): per door its trace, its words,
   * its material and state, and the kind of the first room behind it, with the sensory line under each.
   */
  override scan(seen: (place: Location) => boolean): ScanReport {
    return {
      title: '[DATA_SUMMARY]',
      notes: [],
      rows: this.children().map((apartment, index) => ({
        cells: [
          { key: 'reading', label: 'ID', value: String(index + 1).padStart(2, '0') },
          ...apartment.scanned(seen),
        ],
        place: undefined,
        current: false,
        note: apartment.sensed(),
      })),
    };
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
