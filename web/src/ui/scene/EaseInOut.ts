import type { Easing } from './Easing.ts';

/** Slow out, fast through the middle, slow in: how a scene rides and zooms. */
export class EaseInOut implements Easing {
  ease(progress: number): number {
    return progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
  }
}
