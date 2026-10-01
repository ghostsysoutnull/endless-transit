import type { KeySlot } from '#ui/scene/KeySlot.ts';
import { MAP_KEY_SLOT } from './CardSlots.ts';

/** The slot in the room card's strip of keys (U03e): the picture's MAP key sits there, between the screen's own keys. */
export class StripSlot implements KeySlot {
  hold(key: HTMLElement, host: HTMLElement): void {
    host.ownerDocument.getElementById(MAP_KEY_SLOT)?.replaceChildren(key);
  }
}
