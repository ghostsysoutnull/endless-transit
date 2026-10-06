import { Echo } from './Echo.ts';
import type { Fact } from './Fact.ts';
import { Location } from './Location.ts';
import { LocationKind } from './LocationKind.ts';
import type { Origin } from './Origin.ts';
import type { Portrait } from './Portrait.ts';
import type { AreaPart } from './AreaPart.ts';

export const NULL_REACH_KIND = new LocationKind({
  key: 'null-reach',
  glyph: 'null-reach',
  title: 'Null reach',
  scale: '10²¹ m',
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

  override echo(): Echo {
    return this.#echo;
  }

  /** The void's words, and what the hunt has come to (NullSector.groovy:38-49). */
  description(): readonly string[] {
    if (this.#echo.found()) return ['A silent void. The spectral resonance has been harvested.'];
    return ['A pocket of absolute silence. Only the echoes of distant, dead civilizations remain.'];
  }

  /** What the hunt has come to, a chip (U04): the signal's strength, a scan still to make, or the echo taken. */
  override facts(): readonly Fact[] {
    if (this.#echo.found()) return [{ key: 'signal', label: 'Echo taken', value: '' }];
    const signal = this.#echo.signal();
    return [
      { key: 'signal', label: 'Signal', value: signal === 0 ? 'scan to search' : `${String(signal)}%` },
    ];
  }

  /** No diagnostic line: the level is drawn (U04, Decision 1 — the terminal's jargon goes). */
  status(): string {
    return '';
  }

  override remember(): string | undefined {
    return this.#echo.remember();
  }

  override recall(memento: string): boolean {
    return this.#echo.recall(memento);
  }

  childrenHeading(): string {
    return 'Faint gravitational anomalies detected';
  }

  override landmarkFactor(): number {
    return super.landmarkFactor() * LANDMARK_FACTOR;
  }

  /** Drawn as an area of its children (U04). */
  override portrait(): Portrait {
    return this.area('null-reach', this.#echo.found() ? 0 : this.#echo.signal());
  }

  /** Marked in its parent's area (U04). */
  override onArea(): readonly AreaPart[] {
    return [{ address: this.address().toString(), mark: 'null-reach' }];
  }
}
