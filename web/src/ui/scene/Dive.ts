import type { Canvases } from '#ui/canvas/Canvases.ts';
import type { PixelCanvas } from '#ui/canvas/PixelCanvas.ts';
import type { ReducedMotion } from '#ui/ReducedMotion.ts';
import { BandStage } from './BandStage.ts';
import type { Clock } from './Clock.ts';
import type { Point } from './Point.ts';
import type { Sketch } from './Sketch.ts';
import type { Tear } from './Tear.ts';

/** How far each level zooms into where you went down. */
const ZOOM = 2.6;

/** A level of the dive: its picture, and the place in it you went down into. */
interface Level {
  readonly sketch: Sketch;
  readonly into: string;
}

/** Nobody is told which level shows. */
const UNWATCHED = (): void => undefined;

/**
 * The dive (U04, Decision 12; the mock's cinema, `transit-reframed.html:1103-1104`): full screen, level by level
 * from the universe, each zooming into the place you went down into and fading into the next, landing on you — or
 * rewound: the same reel backwards, from you out to the universe and into the dark. Each level is torn as far as
 * its own picture's decay says, by the tear its maker hands it. None under reduced motion: it is done at once. How
 * long each level holds, in milliseconds, is its maker's to say. Built in `main.ts`; an entity — where the dive stands and when it ends.
 */
export class Dive {
  readonly #canvases: Canvases;
  readonly #clock: Clock;
  readonly #motion: ReducedMotion;
  readonly #tear: Tear;
  readonly #hold: number;
  #canvas: PixelCanvas | undefined;
  #stop: (() => void) | undefined;
  #done: (() => void) | undefined;

  constructor(parts: {
    readonly canvases: Canvases;
    readonly clock: Clock;
    readonly motion: ReducedMotion;
    readonly tear: Tear;
    readonly hold: number;
  }) {
    this.#canvases = parts.canvases;
    this.#clock = parts.clock;
    this.#motion = parts.motion;
    this.#tear = parts.tear;
    this.#hold = parts.hold;
  }

  /** Down: from the universe to you. `shown` is told each level as it comes on, by its place among the levels. */
  play(
    host: HTMLElement,
    levels: readonly Level[],
    done: () => void,
    shown: (index: number) => void = UNWATCHED,
  ): void {
    this.#run(host, levels, { done, shown }, (elapsed) => elapsed);
  }

  /** Back up: from you out to the universe, ending in the dark. */
  rewind(
    host: HTMLElement,
    levels: readonly Level[],
    done: () => void,
    shown: (index: number) => void = UNWATCHED,
  ): void {
    const whole = levels.length * this.#hold;
    this.#run(host, levels, { done, shown }, (elapsed) => whole - elapsed);
  }

  /** The reel shown until its time is up: `moment` says where on the way down each moment of the clock stands. */
  #run(
    host: HTMLElement,
    levels: readonly Level[],
    told: { readonly done: () => void; readonly shown: (index: number) => void },
    moment: (elapsed: number) => number,
  ): void {
    this.skip();
    if (this.#motion.reduced() || levels.length === 0) {
      told.done();
      return;
    }
    this.#done = told.done;
    const canvas = this.#canvases.mount(host, () => undefined);
    canvas.decorative();
    this.#canvas = canvas;
    const start = this.#clock.now();
    const whole = levels.length * this.#hold;
    let spot: Point | undefined;
    let shown = -1;
    this.#stop = this.#clock.subscribe((time) => {
      // A frame's time can be a moment before the tap that started the dive: never before its start.
      const elapsed = Math.max(0, time - start);
      if (elapsed >= whole) {
        this.skip();
        return;
      }
      const at = Math.min(whole, Math.max(0, moment(elapsed)));
      const index = Math.min(levels.length - 1, Math.floor(at / this.#hold));
      const level = levels[index];
      if (level === undefined) {
        this.skip();
        return;
      }
      if (index !== shown) {
        shown = index;
        spot = undefined;
        told.shown(index);
      }
      const t = at / this.#hold - index;
      const last = index === levels.length - 1;
      const size = canvas.hostSize();
      if (size.width === 0 || size.height === 0) return;
      canvas.fit(size);
      const palette = canvas.palette();
      canvas.paint((context) => {
        const scale = last ? 1 : 1 + (ZOOM - 1) * t * t;
        if (spot === undefined && scale !== 1) {
          // A level met already zoomed (the reel rewound): painted once unzoomed, to learn where its spot stands.
          const probe = new BandStage({ context, size, palette, time, into: level.into });
          level.sketch.stageOn(probe);
          spot = probe.spot();
        }
        context.fillStyle = palette('ground');
        context.globalAlpha = 1;
        context.fillRect(0, 0, size.width, size.height);
        const centre = spot ?? { x: size.width / 2, y: size.height / 2 };
        context.save();
        context.translate(centre.x, centre.y);
        context.scale(scale, scale);
        context.translate(-centre.x, -centre.y);
        const stage = new BandStage({ context, size, palette, time, into: level.into });
        level.sketch.stageOn(stage);
        context.restore();
        spot = stage.spot();
        const fade = t < 0.15 ? 1 - t / 0.15 : !last && t > 0.75 ? (t - 0.75) / 0.25 : 0;
        if (fade > 0) {
          context.globalAlpha = fade;
          context.fillStyle = palette('ground');
          context.fillRect(0, 0, size.width, size.height);
        }
        context.globalAlpha = 1;
        const frame = level.sketch.frame();
        this.#tear.draw(context, canvas, { size, palette, noise: frame.noise, decay: frame.decay, time });
      });
    });
  }

  /** Ends the dive now, where it was going. */
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
