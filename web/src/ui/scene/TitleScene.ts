import { Seed } from '#engine/rng/Seed.ts';
import type { Canvases } from '#ui/canvas/Canvases.ts';
import type { PixelCanvas } from '#ui/canvas/PixelCanvas.ts';
import type { ReducedMotion } from '#ui/ReducedMotion.ts';
import { BandStage } from './BandStage.ts';
import type { Clock } from './Clock.ts';
import type { Tear } from './Tear.ts';
import type { TitleWorld } from './TitleWorld.ts';

/** How long a world takes to resolve out of the static, in milliseconds, and in how many steps its tear falls. */
const RESOLVE = 1200;
const STEPS = 8;
/** The static's seed while there is no world, whose seed it would be: always the same static. */
const NO_WORLD = new Seed(0, 0);

/**
 * The title's picture: static on the dark while there is no world; a world's universe, live, resolving out of that
 * static — torn and dim at first, whole in a moment — each time another world is drawn. Still under reduced motion.
 * Built in `main.ts`; an entity — which world shows, and since when.
 */
export class TitleScene {
  readonly #canvases: Canvases;
  readonly #clock: Clock;
  readonly #motion: ReducedMotion;
  readonly #tear: Tear;
  #host: HTMLElement | undefined;
  #canvas: PixelCanvas | undefined;
  #stop: (() => void) | undefined;
  #world: TitleWorld | undefined;
  #since = 0;

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

  /** No world yet: the static alone. */
  wait(host: HTMLElement): void {
    this.#world = undefined;
    this.#on(host);
  }

  /** This world's universe: resolving when it is another world than the one shown, as it stands when it is the same. */
  resolve(host: HTMLElement, world: TitleWorld): void {
    if (world.key !== this.#world?.key) this.#since = this.#clock.now();
    this.#world = world;
    this.#on(host);
  }

  clear(): void {
    this.#stop?.();
    this.#stop = undefined;
    this.#canvas?.remove();
    this.#canvas = undefined;
    this.#host = undefined;
    this.#world = undefined;
  }

  /** The canvas in this host, painted each frame of the clock — once, and at each new size, under reduced motion. */
  #on(host: HTMLElement): void {
    if (host !== this.#host || this.#canvas === undefined) {
      this.#stop?.();
      this.#stop = undefined;
      this.#canvas?.remove();
      this.#host = host;
      this.#canvas = this.#canvases.mount(host, () => {
        this.#frame(this.#clock.now());
      });
      this.#canvas.decorative();
    }
    if (this.#motion.reduced()) {
      this.#since = -RESOLVE;
      this.#frame(0);
      return;
    }
    this.#stop ??= this.#clock.subscribe((time) => {
      this.#frame(time);
    });
  }

  #frame(time: number): void {
    const canvas = this.#canvas;
    if (canvas === undefined) return;
    const size = canvas.hostSize();
    if (size.width === 0 || size.height === 0) return;
    canvas.fit(size);
    const palette = canvas.palette();
    const world = this.#world;
    canvas.paint((context) => {
      context.globalAlpha = 1;
      if (world === undefined) {
        context.fillStyle = palette('ground');
        context.fillRect(0, 0, size.width, size.height);
        this.#tear.draw(context, canvas, { size, palette, noise: NO_WORLD, decay: 1, time });
        return;
      }
      world.sketch.stageOn(new BandStage({ context, size, palette, time, into: world.into }));
      // How much of the static is left: all of it at first, falling fast, then lingering.
      const left = Math.pow(1 - Math.min(1, Math.max(0, time - this.#since) / RESOLVE), 2);
      if (left <= 0) return;
      context.globalAlpha = left;
      context.fillStyle = palette('ground');
      context.fillRect(0, 0, size.width, size.height);
      context.globalAlpha = 1;
      const decay = Math.ceil(left * STEPS) / STEPS;
      this.#tear.draw(context, canvas, { size, palette, noise: world.noise, decay, time });
    });
  }
}
