import { Echo } from './Echo.ts';
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
 * likely to be a landmark. It holds one Spectral Echo and the hunt for it (`Echo`: the signal, the
 * capture, once ever), which is the state it remembers (Guide:369-370 said the old save did not).
 */
export class NullReach extends Location {
  readonly #name: string;
  readonly #echo: Echo;

  constructor(origin: Origin, facts: { name: string }) {
    super(origin);
    this.#name = facts.name;
    this.#echo = new Echo(this);
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

  override echo(): Echo {
    return this.#echo;
  }

  /** The void's words, and what the hunt has come to (NullSector.groovy:38-49). */
  description(): readonly string[] {
    if (this.#echo.found()) return ['A silent void. The spectral resonance has been harvested.'];
    return ['A pocket of absolute silence. Only the echoes of distant, dead civilizations remain.'];
  }

  override facts(): readonly Fact[] {
    const signal = this.#echo.signal();
    const status =
      signal === 0
        ? 'Searching for signals...'
        : `SIGNAL_STRENGTH: ${String(signal)}% | FREQ_DRIFT: ${String(this.#echo.fragment().frequency().hertz())}Hz`;
    return [{ key: 'signal', label: 'VOID_STATUS', value: status }];
  }

  status(): string {
    if (this.#echo.found()) return 'SIGNAL: [HARVESTED]';
    const signal = this.#echo.signal();
    return signal === 0 ? 'SIGNAL: [SCAN_REQUIRED]' : `SIGNAL: ${String(signal)}%`;
  }

  override remember(): string | undefined {
    return this.#echo.remember();
  }

  override recall(memento: string): boolean {
    return this.#echo.recall(memento);
  }

  childrenHeading(): string {
    return 'Faint gravitational anomalies detected:';
  }

  approachVerb(): string {
    return 'Detect faint signal:';
  }

  override landmarkFactor(): number {
    return super.landmarkFactor() * LANDMARK_FACTOR;
  }
}
