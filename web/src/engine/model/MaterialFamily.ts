/** The families a door's material is drawn by (a panel pattern each); any other material is plain. */
const FAMILIES = ['glass', 'metal', 'stone', 'timber', 'bone', 'plain'] as const;

/** Which family a door's material belongs to: its list's key column (the door material lists). */
export type MaterialFamily = (typeof FAMILIES)[number];

/**
 * The key column read at the content edge: a family the pictures do not know is a content error. A module
 * function: the one reader of the list above, and its factory.
 */
export function materialFamily(key: string): MaterialFamily {
  const family = FAMILIES.find((known) => known === key);
  if (family === undefined) throw new Error(`'${key}' is not a material family (${FAMILIES.join(', ')})`);
  return family;
}
