import type { Tear } from './Tear.ts';

/** No tear at all: for a picture that coherence leaves whole (the trace's dive). */
export class NoTear implements Tear {
  draw(): void {
    // Nothing is drawn over the frame.
  }
}
