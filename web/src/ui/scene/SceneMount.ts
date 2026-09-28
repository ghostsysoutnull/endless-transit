import type { StylePalette } from '#ui/canvas/StylePalette.ts';

/**
 * What a mounted scene holds (U02): its host, the canvas and the slider put into it, the observer of the host's
 * size, the listeners, and the canvas's colours — made together at mount, torn down together.
 */
export class SceneMount {
  readonly #host: HTMLElement;
  readonly #canvas: HTMLCanvasElement;
  readonly #slider: HTMLElement;
  readonly #observer: ResizeObserver;
  readonly #listeners: AbortController;
  readonly #colours: StylePalette;

  constructor(parts: {
    host: HTMLElement;
    canvas: HTMLCanvasElement;
    slider: HTMLElement;
    observer: ResizeObserver;
    listeners: AbortController;
    colours: StylePalette;
  }) {
    this.#host = parts.host;
    this.#canvas = parts.canvas;
    this.#slider = parts.slider;
    this.#observer = parts.observer;
    this.#listeners = parts.listeners;
    this.#colours = parts.colours;
  }

  host(): HTMLElement {
    return this.#host;
  }

  canvas(): HTMLCanvasElement {
    return this.#canvas;
  }

  slider(): HTMLElement {
    return this.#slider;
  }

  colours(): StylePalette {
    return this.#colours;
  }

  /** Stops watching and listening, and takes the canvas and the slider out of the host. */
  unmount(): void {
    this.#observer.disconnect();
    this.#listeners.abort();
    this.#canvas.remove();
    this.#slider.remove();
  }
}
