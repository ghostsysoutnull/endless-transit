/** More than two device pixels per CSS pixel is wasted on a phone's screen. */
const MAX_RATIO = 2;
/** About this many pixels a canvas: sharp enough, cheap enough to hold the frame (the mock's budget). */
const MAX_PIXELS = 1.3e6;

/**
 * Owns one fact: how many device pixels a canvas may have per CSS pixel (Decision 4) — the device's own
 * ratio, capped at two, and lowered until the canvas holds no more than its budget of pixels.
 */
export class PixelBudget {
  readonly #maxRatio: number;
  readonly #maxPixels: number;

  constructor(maxRatio: number = MAX_RATIO, maxPixels: number = MAX_PIXELS) {
    this.#maxRatio = maxRatio;
    this.#maxPixels = maxPixels;
  }

  /** The ratio to draw a canvas of this CSS size at, on a device of this ratio. */
  ratio(deviceRatio: number, width: number, height: number): number {
    const capped = Math.min(deviceRatio, this.#maxRatio);
    const area = width * height;
    if (area <= 0) return capped;
    return Math.min(capped, Math.sqrt(this.#maxPixels / area));
  }
}
