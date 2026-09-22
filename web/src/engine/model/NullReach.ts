import type { Fact } from './Fact.ts';
import { Location } from './Location.ts';
import { LocationKind } from './LocationKind.ts';
import type { Origin } from './Origin.ts';

export const NULL_REACH_KIND = new LocationKind({
  key: 'null-reach',
  title: 'Null reach',
  icon: '○',
  indexLabel: 'VOID',
});

const LANDMARK_FACTOR = 2;

/**
 * A thin, silent node of a filament (the Groovy `NullSector`). Everything built below it is twice as
 * likely to be a landmark. Its spectral echo — the scan and the capture — arrives with items.
 */
export class NullReach extends Location {
  readonly #name: string;

  constructor(origin: Origin, facts: { name: string }) {
    super(origin);
    this.#name = facts.name;
  }

  kind(): LocationKind {
    return NULL_REACH_KIND;
  }

  name(): string {
    return this.#name;
  }

  override callSign(): string {
    return `VOID_REACH: ${this.#name}`;
  }

  description(): readonly string[] {
    return ['A pocket of absolute silence. Only the echoes of distant, dead civilizations remain.'];
  }

  override facts(): readonly Fact[] {
    return [{ key: 'signal', label: 'VOID_STATUS', value: 'Searching for signals...' }];
  }

  status(): string {
    return 'SIGNAL: [SCAN_REQUIRED]';
  }

  childrenHeading(): string {
    return 'Faint gravitational anomalies detected:';
  }

  approachVerb(): string {
    return 'Detect faint signal:';
  }

  /** A void has no coordinates. */
  override hash(): string {
    return '0x0000 / UNKNOWN';
  }

  override landmarkFactor(): number {
    return super.landmarkFactor() * LANDMARK_FACTOR;
  }
}
