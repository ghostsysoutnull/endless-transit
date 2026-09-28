import type { Easing } from './Easing.ts';

/** Fast away, slow in: how a released view coasts to rest (the mock's `easeOut`). */
export class EaseOut implements Easing {
  ease(progress: number): number {
    return 1 - (1 - progress) ** 3;
  }
}
