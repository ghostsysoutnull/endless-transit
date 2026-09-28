/** The looks a door's state can be drawn with (the mock's frost, cold glow and scan lines); every other state is plain. */
const LOOKS = ['frost', 'cold', 'static', 'plain'] as const;

/** How a door's state is drawn: its list's key column (`themes/doors/states.txt`), identity by stable key. */
export type DoorStateLook = (typeof LOOKS)[number];

/**
 * The key column read at the content edge: a key the pictures do not know is a content error, never drawn plain by
 * guess. A module function: the one reader of the list above, and its factory.
 */
export function doorStateLook(key: string): DoorStateLook {
  const look = LOOKS.find((known) => known === key);
  if (look === undefined)
    throw new Error(`themes/doors/states.txt: '${key}' is not a door state look (${LOOKS.join(', ')})`);
  return look;
}
