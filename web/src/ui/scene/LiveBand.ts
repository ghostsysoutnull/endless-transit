import type { Canvases } from '#ui/canvas/Canvases.ts';
import type { PixelCanvas } from '#ui/canvas/PixelCanvas.ts';
import type { ReducedMotion } from '#ui/ReducedMotion.ts';
import { BandStage } from './BandStage.ts';
import type { Clock } from './Clock.ts';
import type { Sketch } from './Sketch.ts';
import type { Tear } from './Tear.ts';

/**
 * One level's picture, live in a host of its own: painted each frame as its band in the trace is, and torn as far
 * as its own decay says. Still under reduced motion. Built in `main.ts`; an entity — which band shows, and where.
 */
export class LiveBand {
  readonly #canvases: Canvases;
  readonly #clock: Clock;
  readonly #motion: ReducedMotion;
  readonly #tear: Tear;
  #host: HTMLElement | undefined;
  #canvas: PixelCanvas | undefined;
  #stop: (() => void) | undefined;
  #band: { readonly sketch: Sketch; readonly into: string } | undefined;

  constructor(parts: {
    readonly canvases: Canvases;
    readonly clock: Clock;
    readonly motion: ReducedMotion;
    readonly tear: Tear;
  }) {
    this.#canvases = parts.canvases;
    this.#clock = parts.clock;
    this.#motion = parts.motion;
    this.#tear = parts.tear;
  }

  /** This band in this host, from now on; whatever band showed there before goes. */
  show(host: HTMLElement, band: { readonly sketch: Sketch; readonly into: string }): void {
    this.#band = band;
    if (host !== this.#host || this.#canvas === undefined) {
      this.clear();
      this.#band = band;
      this.#host = host;
      this.#canvas = this.#canvases.mount(host, () => {
        this.#frame(this.#motion.reduced() ? 0 : this.#clock.now());
      });
      this.#canvas.decorative();
    }
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
    this.#band = undefined;
  }

  #frame(time: number): void {
    const canvas = this.#canvas;
    const band = this.#band;
    if (canvas === undefined || band === undefined) return;
    const size = canvas.hostSize();
    if (size.width === 0 || size.height === 0) return;
    canvas.fit(size);
    const palette = canvas.palette();
    const frame = band.sketch.frame();
    canvas.paint((context) => {
      band.sketch.stageOn(new BandStage({ context, size, palette, time, into: band.into }));
      context.globalAlpha = 1;
      this.#tear.draw(context, canvas, { size, palette, noise: frame.noise, decay: frame.decay, time });
    });
  }
}
