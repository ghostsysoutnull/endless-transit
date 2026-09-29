import type { PictureSize } from '#ui/canvas/Picture.ts';

/**
 * A zoom at one moment (U01b): the picture grown `scale` times around a child's anchor, which drifts from where it
 * was drawn to the middle as the picture grows to `full`. At scale 1 it is no zoom at all. Value object, made per
 * frame.
 */
export class Zoom {
  readonly #scale: number;
  readonly #anchor: { readonly x: number; readonly y: number };
  readonly #full: number;

  constructor(facts: { scale: number; anchor: { readonly x: number; readonly y: number }; full: number }) {
    if (!(facts.full > 1)) throw new RangeError(`a zoom grows to more than 1, got ${String(facts.full)}`);
    this.#scale = facts.scale;
    this.#anchor = facts.anchor;
    this.#full = facts.full;
  }

  /** How far it has gone, 0 (the whole picture) to 1 (inside the child, faded to the ground). */
  #depth(): number {
    return (this.#scale - 1) / (this.#full - 1);
  }

  /** Where the child's anchor stands on the picture now, in CSS pixels. */
  anchorAt(size: PictureSize): { readonly x: number; readonly y: number } {
    const depth = this.#depth();
    return {
      x: this.#anchor.x + (size.width / 2 - this.#anchor.x) * depth,
      y: this.#anchor.y + (size.height / 2 - this.#anchor.y) * depth,
    };
  }

  /** Fades the picture towards the ground as far as it has gone, over the whole size, in CSS pixels. */
  fade(context: CanvasRenderingContext2D, size: PictureSize, ground: string): void {
    const depth = this.#depth();
    if (depth <= 0) return;
    context.globalAlpha = depth;
    context.fillStyle = ground;
    context.fillRect(0, 0, size.width, size.height);
    context.globalAlpha = 1;
  }

  /** Puts the zoom on a context that draws in CSS pixels: the picture grown around the anchor. */
  apply(context: CanvasRenderingContext2D, size: PictureSize): void {
    const { x, y } = this.anchorAt(size);
    context.transform(
      this.#scale,
      0,
      0,
      this.#scale,
      x - this.#anchor.x * this.#scale,
      y - this.#anchor.y * this.#scale,
    );
  }
}
