import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';

/** The directories of the place-name lists: one per kind of place named from them, the universe's children first. */
export const NAME_KINDS: readonly string[] = [
  'names/filament',
  'names/sector',
  'names/solar-system',
  'names/planet',
  'names/country',
  'names/city',
  'names/street',
];

/** The keys of each axis a name part can be keyed by, read from the axis's one owner. */
export function axisKeys(library: ContentLibrary): ReadonlyMap<string, readonly string[]> {
  return new Map([
    ['culture', library.pairs('themes/planet-frames').map(([culture]) => culture)],
    ['era', library.index('themes/timelines')],
    ['trait', library.list('themes/traits')],
  ]);
}
