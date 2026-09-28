/** The pictures' one family: the mono face the stylesheet loads, then the system's. */
const FAMILY = '"IBM Plex Mono", ui-monospace, Menlo, Consolas, monospace';
/** No word or number on a picture is smaller than this (touch first: it must read on a phone; the walls' test). */
const FLOOR = 12;
const WEIGHTS = { regular: '400', bold: '700' } as const;

/**
 * Owns one fact: the font every picture writes in — one family, two weights, never under the 12 px floor. Value
 * object; the four pictures ask it rather than restate the family and the floor.
 */
export class CanvasFont {
  /** The CSS font for this weight and size (the floor when none is named); a size under the floor is refused. */
  of(weight: keyof typeof WEIGHTS, px: number = FLOOR): string {
    if (px < FLOOR)
      throw new RangeError(`a picture's text is at least ${String(FLOOR)} px, got ${String(px)}`);
    return `${WEIGHTS[weight]} ${String(px)}px ${FAMILY}`;
  }

  /** A size worked out from the picture (a map's glyphs), raised to the floor. */
  atLeast(px: number): number {
    return Math.max(FLOOR, px);
  }
}
