/** How a corridor can run: the four its sentences carry, and none (a corridor made without one: the Artery's). */
const SHAPES = ['long', 'service', 'curved', 'static', 'none'] as const;

/** How a corridor runs: the key its sentence carries (`themes/descriptions/corridor.txt`), identity by stable key. */
export type CorridorShape = (typeof SHAPES)[number];

/**
 * The key read at the content edge: a shape the pictures do not know is a content error, never drawn as a long
 * corridor by guess. A module function: the one reader of the list above, and its factory.
 */
export function corridorShape(key: string): CorridorShape {
  const shape = SHAPES.find((known) => known === key);
  if (shape === undefined)
    throw new Error(
      `themes/descriptions/corridor.txt: '${key}' is not a corridor shape (${SHAPES.join(', ')})`,
    );
  return shape;
}
