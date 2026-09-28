import type { HallEnd } from '#ui/scene/HallEnd.ts';

/** A hall's end that only counts how many times it was asked to draw. */
export class RecordingHallEnd implements HallEnd {
  drawn = 0;

  draw(): void {
    this.drawn++;
  }
}
