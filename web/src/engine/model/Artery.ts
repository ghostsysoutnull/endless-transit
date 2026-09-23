import { Corridor } from './Corridor.ts';
import type { Floor } from './Floor.ts';
import { LocationKind } from './LocationKind.ts';
import type { Origin } from './Origin.ts';
import type { Vibe } from './Vibe.ts';

export const ARTERY_KIND = new LocationKind({
  key: 'artery',
  title: 'Artery',
  icon: '▅',
  indexLabel: 'CONDUIT',
});

/**
 * A Layer's corridor (Guide:279; Corridor.groovy:27-48, 111-122): a pulsing artery of data whose vibe is the
 * bedrock's own — one culture, the abyssal, in the atomic era, under the country's trait — so everything
 * behind its doors is dealt from the abyssal list, takes the culture bonus, and is never entropic for the
 * drain (Guide:138-139). It is walked like a corridor: standing in it is standing on its Layer.
 */
export class Artery extends Corridor {
  readonly #vibe: Vibe;

  constructor(origin: Origin<Floor>, facts: { sentence: string; vibe: Vibe }) {
    super(origin, { sentence: facts.sentence });
    this.#vibe = facts.vibe;
  }

  override kind(): LocationKind {
    return ARTERY_KIND;
  }

  override name(): string {
    return 'Artery';
  }

  /** The bedrock's vibe: what its Crypts and Shards draw from, and what the drain reads below it. */
  override vibe(): Vibe {
    return this.#vibe;
  }

  override status(): string {
    return `TRAFFIC: [PRESSURE_HIGH] | THEME: [${this.#vibe.culture().key().toUpperCase()}]`;
  }
}
