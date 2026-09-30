import type { CorridorShape } from './CorridorShape.ts';
import type { Fact } from './Fact.ts';
import type { Floor } from './Floor.ts';
import { Location } from './Location.ts';
import { LocationKind } from './LocationKind.ts';
import type { Origin } from './Origin.ts';
import type { ScanReport } from './ScanReport.ts';
import type { Portrait } from './Portrait.ts';

export const CORRIDOR_KIND = new LocationKind({
  key: 'corridor',
  title: 'Corridor',
  scale: '40 m',
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
  readonly #shape: CorridorShape;

  /** `shape` is the key its sentence carries (`long`, `service`, `curved`, `static`). */
  constructor(origin: Origin<Floor>, facts: { sentence: string; shape: CorridorShape }) {
    super(origin);
    this.#floor = origin.parent;
    this.#sentence = facts.sentence;
    this.#shape = facts.shape;
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

  /** How it runs: the key its sentence carries. */
  shape(): CorridorShape {
    return this.#shape;
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

  /** Its culture and how many doors it has (plain words, U02). */
  override facts(): readonly Fact[] {
    const culture = this.vibe()?.culture();
    return [
      ...(culture === undefined ? [] : [{ key: 'culture', label: 'Culture', value: culture.key() } as const]),
      { key: 'reading', label: 'Doors', value: String(this.#floor.building().doorsPerFloor()) },
    ];
  }

  /** No diagnostic line: the corridor is drawn (U02). */
  status(): string {
    return '';
  }

  childrenHeading(): string {
    return 'Doors';
  }

  approachVerb(): string {
    return 'Open';
  }

  /** In the trace a corridor is drawn as its floor's corridor, walked (U04). */
  override bandPortrait(): Portrait {
    return this.#floor.walked();
  }
}
