import type { Point } from './Point.ts';
import type { SceneHit } from './SceneHit.ts';

/** Where a picture's tappable parts stand at one moment (U03: shared by both scene hosts), and which one a point falls on. Immutable. */
export class SceneHits {
  readonly #hits: readonly SceneHit[];

  constructor(hits: readonly SceneHit[]) {
    this.#hits = [...hits];
  }

  /** The part under a point on the picture, the first laid out winning; none between parts. */
  at(point: Point): SceneHit | undefined {
    return this.#hits.find(
      (hit) =>
        point.x >= hit.x && point.x <= hit.x + hit.width && point.y >= hit.y && point.y <= hit.y + hit.height,
    );
  }

  /** The part with this option id, if the picture lays it out. */
  of(id: string): SceneHit | undefined {
    return this.#hits.find((hit) => hit.id === id);
  }
}
