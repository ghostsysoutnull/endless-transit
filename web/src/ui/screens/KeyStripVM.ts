import type { CardKeyVM } from './CardKeyVM.ts';

/**
 * The strip of keys at the foot of the screen (U03e) as readonly data: MORE first, then `lead` and `trail` — on a
 * room's card the picture's MAP key sits between the two — and the game's own options behind MORE.
 */
export interface KeyStripVM {
  readonly keys: { readonly lead: readonly CardKeyVM[]; readonly trail: readonly CardKeyVM[] };
  /** The first key: it opens the sheet of the game's own options over the foot of the screen. */
  readonly more: { readonly text: string; readonly label: string };
  /** The game's own options that are not a key: the MORE sheet's keys. */
  readonly game: readonly CardKeyVM[];
  /** Names of the strip and of the MORE sheet, read by screen readers only. */
  readonly regions: { readonly keys: string; readonly game: string };
}
