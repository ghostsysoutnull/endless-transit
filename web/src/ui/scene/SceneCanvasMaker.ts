import type { Canvases } from '#ui/canvas/Canvases.ts';
import type { CanvasInput } from './CanvasInput.ts';
import { SceneCanvas } from './SceneCanvas.ts';
import type { SceneCanvases } from './SceneCanvases.ts';
import type { Tear } from './Tear.ts';

/** Puts a scene's canvas into its host, listened to and torn by coherence (U03). A factory, built in `main.ts`. */
export class SceneCanvasMaker implements SceneCanvases {
  readonly #canvases: Canvases;
  readonly #tear: Tear;

  constructor(parts: { readonly canvases: Canvases; readonly tear: Tear }) {
    this.#canvases = parts.canvases;
    this.#tear = parts.tear;
  }

  mount(host: HTMLElement, input: CanvasInput): SceneCanvas {
    const canvas = this.#canvases.mount(host, () => {
      input.resized();
    });
    const listeners = new AbortController();
    const signal = listeners.signal;
    canvas.listen(
      'pointerdown',
      (event) => {
        input.down(event);
      },
      signal,
    );
    canvas.listen(
      'pointermove',
      (event) => {
        input.move(event);
      },
      signal,
    );
    canvas.listen(
      'pointerup',
      (event) => {
        input.up(event);
      },
      signal,
    );
    canvas.listen(
      'pointercancel',
      (event) => {
        input.up(event);
      },
      signal,
    );
    canvas.listen(
      'pointerleave',
      () => {
        input.leave();
      },
      signal,
    );
    canvas.listen(
      'click',
      (event) => {
        input.tap(event);
      },
      signal,
    );
    return new SceneCanvas({ canvas, listeners, tear: this.#tear });
  }
}
