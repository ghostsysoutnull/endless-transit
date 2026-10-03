import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { PixelCanvas } from '#ui/canvas/PixelCanvas.ts';
import type { PointerHold } from './PointerHold.ts';
import type { Tear } from './Tear.ts';
import type { TearFrame } from './TearFrame.ts';
import type { Zoom } from './Zoom.ts';
import type { PageScroll } from '#ui/canvas/PageScroll.ts';

/**
 * A scene's canvas in its host (U03, out of `SceneView` so both scene hosts share it): sized to its host, named for a
 * reader, dragged or scrolled by a finger, listened to until it is taken out, and painted under a zoom with the
 * coherence tear over the finished frame.
 */
export class SceneCanvas implements PointerHold {
  readonly #canvas: PixelCanvas;
  readonly #listeners: AbortController;
  readonly #tear: Tear;

  constructor(parts: {
    readonly canvas: PixelCanvas;
    readonly listeners: AbortController;
    readonly tear: Tear;
  }) {
    this.#canvas = parts.canvas;
    this.#listeners = parts.listeners;
    this.#tear = parts.tear;
  }

  /** The host's size in CSS pixels. */
  hostSize(): PictureSize {
    return this.#canvas.hostSize();
  }

  /** Drawn at this CSS size, on the pixel budget. */
  fit(size: PictureSize): void {
    this.#canvas.fit(size);
  }

  /** The image a reader hears named. */
  name(label: string): void {
    this.#canvas.name(label);
  }

  /** What a finger on it leaves the page: the picture takes the rest. */
  touch(page: PageScroll): void {
    this.#canvas.touch(page);
  }

  /** A new frame of the game: its colours are read afresh. */
  frameChanged(): void {
    this.#canvas.frameChanged();
  }

  /** Where an event happened on it, in CSS pixels from its top left. */
  pointAt(event: MouseEvent): { readonly x: number; readonly y: number } {
    return this.#canvas.pointAt(event);
  }

  /** Where a point on it stands on the page, in CSS pixels from the viewport's top left. */
  onPage(point: { readonly x: number; readonly y: number }): { readonly x: number; readonly y: number } {
    return this.#canvas.onPage(point);
  }

  capture(pointer: number): void {
    this.#canvas.capture(pointer);
  }

  /** One frame: the picture drawn under the zoom, faded to the ground as far as the zoom has gone, then torn. */
  paint(
    frame: Omit<TearFrame, 'palette'> & { readonly zoom: Zoom },
    draw: (context: CanvasRenderingContext2D, palette: Palette) => void,
  ): void {
    const canvas = this.#canvas;
    const palette = canvas.palette();
    canvas.paint((context) => {
      context.globalAlpha = 1;
      context.save();
      frame.zoom.apply(context, frame.size);
      draw(context, palette);
      context.restore();
      frame.zoom.fade(context, frame.size, palette('ground'));
      this.#tear.draw(context, canvas, { ...frame, palette });
    });
  }

  /** Stops listening and takes the canvas out of its host. */
  remove(): void {
    this.#listeners.abort();
    this.#canvas.remove();
  }
}
