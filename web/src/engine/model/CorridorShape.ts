/** How a corridor can run, as its sentences carry it (`themes/descriptions/corridor.txt`). */
const CARRIED = ['long', 'service', 'curved', 'static'] as const;

/**
 * How a corridor runs: the key its sentence carries, identity by stable key — or `none`, for a corridor made
 * without one (the Artery's) and a level with none to peek (a Layer's passage), which no sentence may carry.
 */
export type CorridorShape = (typeof CARRIED)[number] | 'none';

/**
 * The key read at the content edge: a shape the pictures do not know, `none` included, is a content error, never
 * drawn as a long corridor by guess. A module function: the one reader of the list above, and its factory.
 */
export function corridorShape(key: string): CorridorShape {
  const shape = CARRIED.find((known) => known === key);
  if (shape === undefined)
    throw new Error(
      `themes/descriptions/corridor.txt: '${key}' is not a corridor shape (${CARRIED.join(', ')})`,
    );
  return shape;
}
