import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import type { Vibe } from '#engine/model/Vibe.ts';
import { FamilyPart } from './FamilyPart.ts';
import { KeyedPart } from './KeyedPart.ts';
import type { NamePart } from './NamePart.ts';
import { PlainPart } from './PlainPart.ts';

/** The axis word of a part that has one list for every place. */
const SHARED = 'shared';
/** The axis word of a part whose list is picked once for all the children of a parent, among its own index. */
const FAMILY = 'family';
/** The key each axis reads from the vibe in force; none where the vibe does not hold one yet. */
const KEYS: ReadonlyMap<string, (vibe: Vibe) => string | undefined> = new Map([
  ['culture', (vibe: Vibe): string | undefined => vibe.culture().key()],
  ['era', (vibe: Vibe): string | undefined => vibe.era().key()],
  ['trait', (vibe: Vibe): string | undefined => vibe.mutation()?.key()],
]);

/**
 * Owns one fact: the axes a name part can be read along — `shared` (one list), `family` (one list of the
 * part's own index for all the children of a parent) or a key of the vibe in force (its culture, its era,
 * its country's trait) — so a new axis is one more entry. A factory: it makes the part an index line
 * `part|axis` describes. Refuses an axis it does not know when the part is made; a keyed part it makes
 * refuses a place with no vibe, and a vibe with no key for its axis (a trait above the country).
 */
export class NameAxes {
  readonly #makers: ReadonlyMap<string, (directory: string, name: string) => NamePart>;

  constructor(library: ContentLibrary) {
    this.#makers = new Map<string, (directory: string, name: string) => NamePart>([
      [SHARED, (directory, name) => new PlainPart(directory, name)],
      [FAMILY, (directory, name) => new FamilyPart(directory, name, library.index(`${directory}/${name}`))],
      ...[...KEYS].map(
        ([axis, keyOf]) =>
          [axis, (directory: string, name: string) => keyed(directory, name, axis, keyOf)] as const,
      ),
    ]);
  }

  part(directory: string, name: string, axis: string): NamePart {
    const make = this.#makers.get(axis);
    if (make === undefined) {
      throw new Error(`${directory}/index: '${name}|${axis}' names an axis nobody knows`);
    }
    return make(directory, name);
  }
}

function keyed(
  directory: string,
  name: string,
  axis: string,
  keyOf: (vibe: Vibe) => string | undefined,
): NamePart {
  return new KeyedPart(directory, name, (vibe) => {
    if (vibe === undefined) throw new Error(`${directory}/${name} is keyed by ${axis}: it needs a vibe`);
    const key = keyOf(vibe);
    if (key === undefined) throw new Error(`${directory}/${name}: the vibe here holds no ${axis} yet`);
    return key;
  });
}
