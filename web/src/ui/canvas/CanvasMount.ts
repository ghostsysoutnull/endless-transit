import type { StylePalette } from './StylePalette.ts';

/** What a mounted canvas view holds: the canvas, the observer of its container's size and its colours — torn down together. */
export class CanvasMount {
  readonly #canvas: HTMLCanvasElement;
  readonly #observer: ResizeObserver;
  readonly #colours: StylePalette;

  constructor(parts: { canvas: HTMLCanvasElement; observer: ResizeObserver; colours: StylePalette }) {
    this.#canvas = parts.canvas;
    this.#observer = parts.observer;
    this.#colours = parts.colours;
  }

  canvas(): HTMLCanvasElement {
    return this.#canvas;
  }

  colours(): StylePalette {
    return this.#colours;
  }

  /** Stops watching the container and takes the canvas out of it. */
  unmount(): void {
    this.#observer.disconnect();
    this.#canvas.remove();
  }
}
