import type { OptionVM } from '#ui/OptionVM.ts';
import type { KeyStripVM } from './KeyStripVM.ts';

/**
 * The room's card (U03e) as readonly data: the picture on its front, its words, relics and ways on its back, turned by
 * its corner; under it the strip of keys (`KeyStripVM`) that stay in reach on both faces.
 */
export interface RoomCardVM extends KeyStripVM {
  /** The corner on each face: the word shown and what a reader hears. */
  readonly corner: {
    readonly toWords: { readonly text: string; readonly label: string };
    readonly toRoom: { readonly text: string; readonly label: string };
  };
  /** The room's first paragraph, shown over the picture on arrival. */
  readonly arrival: string;
  /** The moves that are not a key, on the back. */
  readonly ways: readonly OptionVM[];
  /** Names of the card's regions, read by screen readers only, and the heading of its back's ways. */
  readonly regions: KeyStripVM['regions'] & {
    readonly front: string;
    readonly back: string;
    readonly ways: string;
  };
}
