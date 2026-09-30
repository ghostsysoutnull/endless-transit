import type { Drawing } from './Drawing.ts';
import type { PoleVM } from './PoleVM.ts';

/** One level's band in the trace column (U04): its picture and its words. */
export interface BandVM {
  /** The level's address: a stable key for the band. */
  readonly key: string;
  /** `Depth 04 · Planet`. */
  readonly eyebrow: string;
  readonly name: string;
  /** What a reader hears for the band's button: `Depth 04, Planet: Auraea, you are here`. */
  readonly label: string;
  /** Where the traveller stands: the last band. */
  readonly here: boolean;
  readonly hereText: string;
  readonly tags: readonly { readonly key: string; readonly label: string; readonly value: string }[];
  readonly words: string;
  readonly facts: readonly string[];
  readonly scale: string;
  /** Below the bedrock: drawn in the void's colour. */
  readonly abyssal: boolean;
  /** The level's picture, its places marked; the one you went down into is `into`, or none on the last band. */
  readonly drawing: Drawing;
  readonly into: string;
}

/** The trace column (U04): a band a level from the universe down to you, over everything; or the pole (U05). */
export interface TraceColumnVM {
  readonly label: string;
  readonly title: string;
  /** The close button's name and its mark. */
  readonly close: string;
  readonly closeMark: string;
  readonly dive: string;
  readonly skip: string;
  readonly bands: readonly BandVM[];
  /** The same levels as the pole (U05). */
  readonly pole: PoleVM;
}
