import type { Canvases } from '#ui/canvas/Canvases.ts';
import type { PixelCanvas } from '#ui/canvas/PixelCanvas.ts';
import type { ReducedMotion } from '#ui/ReducedMotion.ts';
import type { Clock } from './Clock.ts';
import type { EndingEmblem } from './endings/EndingEmblem.ts';

/**
 * An ending's emblem, live in a host of its own: painted each frame of the clock over the ground; once, still,
 * under reduced motion. Built in `main.ts`; an entity — which emblem shows, and where.
 */
export class EmblemStage {
  readonly #canvases: Canvases;
  readonly #clock: Clock;
  readonly #motion: ReducedMotion;
  #host: HTMLElement | undefined;
  #canvas: PixelCanvas | undefined;
  #stop: (() => void) | undefined;
  #emblem: EndingEmblem | undefined;

  constructor(parts: { readonly canvases: Canvases; readonly clock: Clock; readonly motion: ReducedMotion }) {
    this.#canvases = parts.canvases;
    this.#clock = parts.clock;
    this.#motion = parts.motion;
  }

  /** This emblem in this host, from now on; whatever showed there before goes. */
  show(host: HTMLElement, emblem: EndingEmblem): void {
    if (host !== this.#host || this.#canvas === undefined) {
      this.clear();
      this.#host = host;
      this.#canvas = this.#canvases.mount(host, () => {
        this.#frame(this.#motion.reduced() ? 0 : this.#clock.now());
      });
      this.#canvas.decorative();
    }
    this.#emblem = emblem;
    if (this.#motion.reduced()) {
      this.#frame(0);
      return;
    }
    this.#stop ??= this.#clock.subscribe((time) => {
      this.#frame(time);
    });
  }

  clear(): void {
    this.#stop?.();
    this.#stop = undefined;
    this.#canvas?.remove();
    this.#canvas = undefined;
    this.#host = undefined;
    this.#emblem = undefined;
  }

  #frame(time: number): void {
    const canvas = this.#canvas;
    const emblem = this.#emblem;
    if (canvas === undefined || emblem === undefined) return;
    const size = canvas.hostSize();
    if (size.width === 0 || size.height === 0) return;
    canvas.fit(size);
    const palette = canvas.palette();
    canvas.paint((painter) => {
      painter.globalAlpha = 1;
      painter.setLineDash([]);
      painter.fillStyle = palette('ground');
      painter.fillRect(0, 0, size.width, size.height);
      emblem.paint({ painter, size, palette, seconds: time / 1000 });
    });
  }
}
