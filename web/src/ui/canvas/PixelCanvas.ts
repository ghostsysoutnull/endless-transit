import type { Palette } from './Palette.ts';
import type { PictureSize } from './Picture.ts';
import type { RatioLimit } from './RatioLimit.ts';
import type { StylePalette } from './StylePalette.ts';

/**
 * One canvas in its host (U02): drawn at as many device pixels as its budget allows for its size, inked in the
 * stylesheet's colours where it sits, watching its host's size, and taken out with its watcher. What a view asks of
 * its canvas goes through here, by what it means: named or decorative, dragged or scrolled, a point on it, a band of
 * its frame copied sideways.
 */
export class PixelCanvas {
  readonly #host: HTMLElement;
  readonly #canvas: HTMLCanvasElement;
  readonly #observer: ResizeObserver;
  readonly #budget: RatioLimit;
  readonly #colours: StylePalette;
  #ratio = 1;

  constructor(parts: {
    host: HTMLElement;
    canvas: HTMLCanvasElement;
    observer: ResizeObserver;
    budget: RatioLimit;
    colours: StylePalette;
  }) {
    this.#host = parts.host;
    this.#canvas = parts.canvas;
    this.#observer = parts.observer;
    this.#budget = parts.budget;
    this.#colours = parts.colours;
  }

  /** The host's size in CSS pixels. */
  hostSize(): PictureSize {
    return { width: this.#host.clientWidth, height: this.#host.clientHeight };
  }

  /** Drawn at this CSS size: as many device pixels as the budget allows, the canvas resized only when that changes. */
  fit(size: PictureSize): void {
    const device = this.#canvas.ownerDocument.defaultView?.devicePixelRatio ?? 1;
    this.#ratio = this.#budget.ratio(device, size.width, size.height);
    const width = Math.round(size.width * this.#ratio);
    const height = Math.round(size.height * this.#ratio);
    if (this.#canvas.width !== width || this.#canvas.height !== height) {
      this.#canvas.width = width;
      this.#canvas.height = height;
    }
  }

  /** Shown at this CSS size, for a canvas whose picture sets its own height. */
  hold(size: PictureSize): void {
    const width = `${String(size.width)}px`;
    const height = `${String(size.height)}px`;
    if (this.#canvas.style.width !== width) this.#canvas.style.width = width;
    if (this.#canvas.style.height !== height) this.#canvas.style.height = height;
  }

  /** Draws on it in CSS pixels, from a clean line: its device pixels are its own business. */
  paint(draw: (context: CanvasRenderingContext2D) => void): void {
    const context = this.#canvas.getContext('2d');
    if (context === null) return;
    context.setTransform(this.#ratio, 0, 0, this.#ratio, 0, 0);
    context.setLineDash([]);
    draw(context);
  }

  palette(): Palette {
    return this.#colours.palette;
  }

  /** A new frame of the game: its colours are read afresh. */
  frameChanged(): void {
    this.#colours.frameChanged();
  }

  /** The image a reader hears named. */
  name(label: string): void {
    this.#canvas.setAttribute('role', 'img');
    this.#canvas.setAttribute('aria-label', label);
  }

  /** Decoration for the eye: its words live beside it. */
  decorative(): void {
    this.#canvas.setAttribute('aria-hidden', 'true');
  }

  /** Whether a finger on it drags the picture, or scrolls the page and taps. */
  touch(drags: boolean): void {
    this.#canvas.style.touchAction = drags ? 'none' : 'manipulation';
  }

  listen<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (event: HTMLElementEventMap[K]) => void,
    signal: AbortSignal,
  ): void {
    this.#canvas.addEventListener(type, listener, { signal });
  }

  /** Where an event happened on it, in CSS pixels from its top left. */
  pointAt(event: MouseEvent): { readonly x: number; readonly y: number } {
    const box = this.#canvas.getBoundingClientRect();
    return { x: event.clientX - box.left, y: event.clientY - box.top };
  }

  /** Keeps this finger even when it leaves the canvas. */
  capture(pointer: number): void {
    this.#canvas.setPointerCapture(pointer);
  }

  /** A band of the finished frame, `y` and `height` in CSS pixels, copied `by` pixels sideways over itself. */
  shift(
    context: CanvasRenderingContext2D,
    band: { y: number; height: number; by: number },
    width: number,
  ): void {
    context.drawImage(
      this.#canvas,
      0,
      band.y * this.#ratio,
      this.#canvas.width,
      band.height * this.#ratio,
      band.by,
      band.y,
      width,
      band.height,
    );
  }

  /** Stops watching its host and takes the canvas out of it. */
  remove(): void {
    this.#observer.disconnect();
    this.#canvas.remove();
  }
}
