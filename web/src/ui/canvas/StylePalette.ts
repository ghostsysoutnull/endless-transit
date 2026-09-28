import type { Palette } from './Palette.ts';
import type { StyleSource } from './StyleSource.ts';

/**
 * Owns one fact: the colour each stylesheet token stands for where a canvas sits — each read once, then kept until
 * the canvas shows a new frame of the game (its frame colour may have changed). The one way a canvas learns its
 * colours; a picture is handed `palette`, the bound `ink`.
 */
export class StylePalette {
  readonly #style: StyleSource;
  readonly #colours = new Map<string, string>();
  /** `ink`, handed to pictures as their palette. */
  readonly palette: Palette;

  constructor(style: StyleSource) {
    this.#style = style;
    this.palette = this.ink.bind(this);
  }

  ink(token: string): string {
    const known = this.#colours.get(token);
    if (known !== undefined) return known;
    const colour = this.#style.value(token).trim();
    this.#colours.set(token, colour);
    return colour;
  }

  /** A new frame of the game: every token is read afresh. */
  forget(): void {
    this.#colours.clear();
  }
}
