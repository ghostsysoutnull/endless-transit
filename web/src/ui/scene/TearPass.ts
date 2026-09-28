import type { Palette } from '#ui/canvas/Palette.ts';
import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { BandCopy } from './BandCopy.ts';
import type { FxPlan } from './FxPlan.ts';
import type { FxPlans } from './FxPlans.ts';
import type { Tear, TearFrame } from './Tear.ts';

/** The tear steps this many frames a second (the mock's `postFx`); a still, painted at time 0, holds its first frame. */
const FX_RATE = 12;

/**
 * Owns one fact: how the coherence tear is drawn over a finished frame (Decision 5) — its frame of the cycle from the
 * clock, the plan for that frame, and the bands, grain, cast and flash drawn from it.
 */
export class TearPass implements Tear {
  readonly #plans: FxPlans;

  constructor(plans: FxPlans) {
    this.#plans = plans;
  }

  draw(context: CanvasRenderingContext2D, canvas: BandCopy, frame: TearFrame): void {
    const k = Math.floor((frame.time / 1000) * FX_RATE);
    this.#draw(context, canvas, frame.size, this.#plans.plan(frame.noise, frame.decay, k), frame.palette);
  }

  /** The tear over the finished frame: bands of the canvas copied sideways, grain, the red cast, a dark flash. */
  #draw(
    context: CanvasRenderingContext2D,
    canvas: BandCopy,
    size: PictureSize,
    plan: FxPlan,
    palette: Palette,
  ): void {
    const { width, height } = size;
    for (const tear of plan.tears) {
      canvas.shift(context, { y: tear.y * height, height: tear.height, by: tear.shift }, width);
    }
    if (plan.grain.length > 0) {
      context.globalAlpha = plan.tint * 5;
      const text = palette('text');
      const red = palette('rd');
      for (const speck of plan.grain) {
        context.fillStyle = speck.red ? red : text;
        context.fillRect(speck.x * width, speck.y * height, 1, 1);
      }
    }
    if (plan.tint > 0) {
      context.globalAlpha = plan.tint;
      context.fillStyle = palette('rd');
      context.fillRect(0, 0, width, height);
    }
    if (plan.dark) {
      context.globalAlpha = 0.5;
      context.fillStyle = palette('ground');
      context.fillRect(0, 0, width, height);
    }
    context.globalAlpha = 1;
  }
}
