import type { Vibe } from '#engine/model/Vibe.ts';
import { KeyedPart } from './KeyedPart.ts';
import type { NamePart } from './NamePart.ts';
import { PlainPart } from './PlainPart.ts';

/** The axis word of a part that has one list for every place. */
const SHARED = 'shared';
/** The key each axis reads from the vibe in force; none where the vibe does not hold one yet. */
const KEYS: ReadonlyMap<string, (vibe: Vibe) => string | undefined> = new Map([
  ['culture', (vibe: Vibe): string | undefined => vibe.culture().key()],
  ['era', (vibe: Vibe): string | undefined => vibe.era().key()],
  ['trait', (vibe: Vibe): string | undefined => vibe.mutation()?.key()],
]);

/**
 * Owns one fact: the axes a name part can be read along — `shared` (one list) or a key of the vibe in
 * force (its culture, its era, its country's trait) — so a new axis is one more entry. A factory: it makes
 * the part an index line `part|axis` describes. Refuses an axis it does not know when the part is made;
 * the part it makes refuses a place with no vibe, and a vibe with no key for its axis (a trait above the
 * country).
 */
export class NameAxes {
  part(directory: string, name: string, axis: string): NamePart {
    if (axis === SHARED) return new PlainPart(directory, name);
    const keyOf = KEYS.get(axis);
    if (keyOf === undefined) {
      throw new Error(`${directory}/index: '${name}|${axis}' names an axis nobody knows`);
    }
    return new KeyedPart(directory, name, (vibe) => {
      if (vibe === undefined) throw new Error(`${directory}/${name} is keyed by ${axis}: it needs a vibe`);
      const key = keyOf(vibe);
      if (key === undefined) throw new Error(`${directory}/${name}: the vibe here holds no ${axis} yet`);
      return key;
    });
  }
}
