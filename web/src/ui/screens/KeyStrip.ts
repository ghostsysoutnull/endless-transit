import type { nothing, TemplateResult } from 'lit-html';
import type { KeyStripParts } from './KeyStripParts.ts';
import type { KeyStripVM } from './KeyStripVM.ts';

/** What a screen asks of the strip of keys at its foot (U03e): closed at each step, and drawn in two parts the screen places. */
export interface KeyStrip {
  /** A step of the game, or the screen gone: the MORE sheet closes. */
  close(): void;
  /** The keys: MORE, the lead keys, the screen's slot, the trail keys. */
  strip(vm: KeyStripVM, parts: KeyStripParts): TemplateResult;
  /** The MORE sheet and the veil that closes it, over what the screen puts them in; nothing while it is closed. */
  sheet(vm: KeyStripVM, parts: KeyStripParts): TemplateResult | typeof nothing;
}
