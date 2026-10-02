import type { OptionVM } from '#ui/OptionVM.ts';
import type { CardKeyVM } from './CardKeyVM.ts';

/**
 * The room's card (U03e) as readonly data: the picture on its front, its words, relics and ways on its back, turned by
 * its corner; under it a strip of keys that stay in reach on both faces — the MAP key, the picture's own, sits between
 * `lead` and `trail`.
 */
export interface RoomCardVM {
  /** The corner on each face: the word shown and what a reader hears. */
  readonly corner: {
    readonly toWords: { readonly text: string; readonly label: string };
    readonly toRoom: { readonly text: string; readonly label: string };
  };
  /** The room's first paragraph, shown over the picture on arrival. */
  readonly arrival: string;
  readonly keys: { readonly lead: readonly CardKeyVM[]; readonly trail: readonly CardKeyVM[] };
  /** The last key: it opens the sheet of the game's own options over the picture. */
  readonly more: { readonly text: string; readonly label: string };
  /** The moves that are not a key, on the back. */
  readonly ways: readonly OptionVM[];
  /** The game's own options that are not a key, on the MORE sheet. */
  readonly game: readonly OptionVM[];
  /** Names of the card's regions, read by screen readers only, the heading of its back's ways and of the MORE sheet. */
  readonly regions: {
    readonly front: string;
    readonly back: string;
    readonly keys: string;
    readonly ways: string;
    readonly game: string;
  };
}
