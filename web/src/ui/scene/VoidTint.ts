import type { Palette } from '#ui/canvas/Palette.ts';

/** The inks the void swaps in (U04): the cyan light turns red, the panels dark red-brown. */
const SWAPS: Readonly<Record<string, string>> = { cy: 'rd', bc: 'ab', frame: 'rd' };

/** Owns one fact: how a picture below the bedrock is tinted — its cyan inks swapped for the void's red. */
export class VoidTint {
  readonly #palette: Palette;

  constructor(palette: Palette) {
    this.#palette = palette;
  }

  palette(): Palette {
    return (token) => this.#palette(SWAPS[token] ?? token);
  }
}
