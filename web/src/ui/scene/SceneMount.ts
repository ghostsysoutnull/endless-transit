import type { PixelCanvas } from '#ui/canvas/PixelCanvas.ts';

/**
 * What a mounted scene holds (U02): its host, the canvas and the slider put into it, and the listeners — made
 * together at mount, torn down together.
 */
export class SceneMount {
  readonly #host: HTMLElement;
  readonly #canvas: PixelCanvas;
  readonly #slider: HTMLElement;
  readonly #listeners: AbortController;

  constructor(parts: {
    host: HTMLElement;
    canvas: PixelCanvas;
    slider: HTMLElement;
    listeners: AbortController;
  }) {
    this.#host = parts.host;
    this.#canvas = parts.canvas;
    this.#slider = parts.slider;
    this.#listeners = parts.listeners;
  }

  host(): HTMLElement {
    return this.#host;
  }

  canvas(): PixelCanvas {
    return this.#canvas;
  }

  slider(): HTMLElement {
    return this.#slider;
  }

  /** Stops listening, and takes the canvas and the slider out of the host. */
  unmount(): void {
    this.#listeners.abort();
    this.#canvas.remove();
    this.#slider.remove();
  }
}
