import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';

/** The directories of the place-name lists: one per kind of place named from them, the universe's children first. */
export const NAME_KINDS: readonly string[] = [
  'names/filament',
  'names/sector',
  'names/null-reach',
  'names/solar-system',
  'names/planet',
  'names/country',
  'names/city',
  'names/street',
];

/** The keys of each axis of the vibe a name part can be keyed by, read from the axis's one owner. */
export function axisKeys(library: ContentLibrary): ReadonlyMap<string, readonly string[]> {
  return new Map([
    ['culture', library.pairs('themes/planet-frames').map(([culture]) => culture)],
    ['era', library.index('themes/timelines')],
    ['trait', library.list('themes/traits')],
  ]);
}

/** The axis word of a part whose lists are its own index's: one of them is picked for all the children of a parent. */
export const FAMILY = 'family';

/** The lists of one name part, by path: its one list, one per key of its axis, or one per line of its own index. */
export function listsOfPart(
  library: ContentLibrary,
  kind: string,
  part: string,
  axis: string,
): ReadonlyMap<string, readonly string[]> {
  const keys = axis === FAMILY ? library.index(`${kind}/${part}`) : axisKeys(library).get(axis);
  const paths = keys?.map((key) => `${kind}/${part}/${key}`) ?? [`${kind}/${part}`];
  return new Map(paths.map((path) => [path, library.list(path)]));
}
