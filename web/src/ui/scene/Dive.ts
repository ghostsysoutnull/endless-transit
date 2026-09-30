import type { Canvases } from '#ui/canvas/Canvases.ts';
import type { PixelCanvas } from '#ui/canvas/PixelCanvas.ts';
import type { ReducedMotion } from '#ui/ReducedMotion.ts';
import { BandStage } from './BandStage.ts';
import type { Clock } from './Clock.ts';
import type { Point } from './Point.ts';
import type { Sketch } from './Sketch.ts';

/** How long each level holds in the dive, in milliseconds, and how far it zooms into where you went down. */
const LEVEL = 750;
const ZOOM = 2.6;

/**
 * The dive (U04, Decision 12; the mock's cinema, `transit-reframed.html:1103-1104`): full screen, level by level
 * from the universe, each zooming into the place you went down into and fading into the next, landing on you. None
 * under reduced motion: it is done at once. Built in `main.ts`; an entity — where the dive stands and when it lands.
 */
export class Dive {
  readonly #canvases: Canvases;
  readonly #clock: Clock;
  readonly #motion: ReducedMotion;
  #canvas: PixelCanvas | undefined;
  #stop: (() => void) | undefined;
  #done: (() => void) | undefined;

  constructor(parts: { readonly canvases: Canvases; readonly clock: Clock; readonly motion: ReducedMotion }) {
    this.#canvases = parts.canvases;
    this.#clock = parts.clock;
    this.#motion = parts.motion;
  }

  play(
    host: HTMLElement,
    levels: readonly { readonly sketch: Sketch; readonly into: string }[],
    done: () => void,
  ): void {
    this.skip();
    if (this.#motion.reduced() || levels.length === 0) {
      done();
      return;
    }
    this.#done = done;
    const canvas = this.#canvases.mount(host, () => undefined);
    canvas.decorative();
    this.#canvas = canvas;
    const start = this.#clock.now();
    let spot: Point | undefined;
    let shown = -1;
    this.#stop = this.#clock.subscribe((time) => {
      // A frame's time can be a moment before the tap that started the dive: never before its start.
      const elapsed = Math.max(0, time - start);
      const index = Math.floor(elapsed / LEVEL);
      const level = levels[index];
      if (level === undefined) {
        this.skip();
        return;
      }
      if (index !== shown) {
        shown = index;
        spot = undefined;
      }
      const t = (elapsed % LEVEL) / LEVEL;
      const last = index === levels.length - 1;
      const size = canvas.hostSize();
      if (size.width === 0 || size.height === 0) return;
      canvas.fit(size);
      const palette = canvas.palette();
      canvas.paint((context) => {
        context.fillStyle = palette('ground');
        context.globalAlpha = 1;
        context.fillRect(0, 0, size.width, size.height);
        const at = spot ?? { x: size.width / 2, y: size.height / 2 };
        const scale = last ? 1 : 1 + (ZOOM - 1) * t * t;
        context.save();
        context.translate(at.x, at.y);
        context.scale(scale, scale);
        context.translate(-at.x, -at.y);
        const stage = new BandStage({ context, size, palette, time, into: level.into });
        level.sketch.stageOn(stage);
        context.restore();
        spot = stage.spot();
        const fade = t < 0.15 ? 1 - t / 0.15 : !last && t > 0.75 ? (t - 0.75) / 0.25 : 0;
        if (fade > 0) {
          context.globalAlpha = fade;
          context.fillStyle = palette('ground');
          context.fillRect(0, 0, size.width, size.height);
          context.globalAlpha = 1;
        }
      });
    });
  }

  /** Ends the dive now, landing on you. */
  skip(): void {
    this.#stop?.();
    this.#stop = undefined;
    this.#canvas?.remove();
    this.#canvas = undefined;
    const done = this.#done;
    this.#done = undefined;
    done?.();
  }
}
