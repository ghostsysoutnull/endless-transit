import type { CameraStop } from './CameraStop.ts';
import type { CameraTrack } from './CameraTrack.ts';
import type { SceneCamera } from './SceneCamera.ts';

/**
 * A camera that travels (U02: the tower's car, later the corridor's walk): owns the rules of how its view moves —
 * the range, the trip's pace (`min(most, base + per·√distance)`: it speeds up, cruises and brakes), the settle
 * time, where a released view comes to rest (it coasts on its speed, then settles on a whole number when it
 * snaps), the stops (kept in their order along the view) and the slider. The numbers are the picture's; the rules
 * are this. Value object: its range runs up.
 */
export class TravelCamera implements SceneCamera {
  readonly #rest: number;
  readonly #min: number;
  readonly #max: number;
  readonly #drag: number;
  readonly #axis: 'x' | 'y';
  readonly #coast: number;
  readonly #snap: boolean;
  readonly #settle: { readonly base: number; readonly per: number };
  readonly #pace: { readonly base: number; readonly per: number; readonly most: number };
  readonly #zoom: boolean;
  readonly #stops: readonly CameraStop[];
  readonly #track: CameraTrack | null;

  constructor(facts: {
    /** Where the view stands when the place is first shown. */
    rest: number;
    min: number;
    max: number;
    /** View units a finger moves it by for one CSS pixel along `axis`; 0: it does not drag. */
    drag: number;
    axis: 'x' | 'y';
    /** Seconds of a release's speed the view coasts on. */
    coast: number;
    /** A view that comes to rest settles on a whole number (the tower's floors). */
    snap: boolean;
    settle: { base: number; per: number };
    pace: { base: number; per: number; most: number };
    /** Whether going into a child zooms into it (the corridor), or only rides there (the tower). */
    zoom: boolean;
    /** Where the view goes before each child is entered, in the slider's order. */
    stops: readonly CameraStop[];
    track: CameraTrack | null;
  }) {
    if (!(facts.min <= facts.max))
      throw new RangeError(`a camera's range runs up: ${String(facts.min)} to ${String(facts.max)}`);
    this.#rest = facts.rest;
    this.#min = facts.min;
    this.#max = facts.max;
    this.#drag = facts.drag;
    this.#axis = facts.axis;
    this.#coast = facts.coast;
    this.#snap = facts.snap;
    this.#settle = facts.settle;
    this.#pace = facts.pace;
    this.#zoom = facts.zoom;
    // The slider's order is the stops' order along the view.
    this.#stops = [...facts.stops].sort((one, other) => one.at - other.at || one.id.localeCompare(other.id));
    this.#track = facts.track;
  }

  rest(): number {
    return this.#rest;
  }

  clamp(value: number): number {
    return Math.min(this.#max, Math.max(this.#min, value));
  }

  pace(distance: number): number {
    return Math.min(this.#pace.most, this.#pace.base + this.#pace.per * Math.sqrt(distance));
  }

  settle(distance: number): number {
    return this.#settle.base + this.#settle.per * Math.sqrt(distance);
  }

  landing(view: number, speed: number): number {
    const thrown = view + speed * this.#coast;
    return this.clamp(this.#snap ? Math.round(thrown) : thrown);
  }

  drags(): boolean {
    return this.#drag !== 0;
  }

  dragRate(): number {
    return this.#drag;
  }

  along(point: { readonly x: number; readonly y: number }): number {
    return this.#axis === 'y' ? point.y : point.x;
  }

  zooms(): boolean {
    return this.#zoom;
  }

  stopOf(id: string): number | undefined {
    return this.#stops.find((stop) => stop.id === id)?.at;
  }

  stopCount(): number {
    return this.#stops.length;
  }

  nearest(view: number): { readonly id: string; readonly index: number } | undefined {
    let best: { id: string; index: number; distance: number } | undefined;
    for (const [index, stop] of this.#stops.entries()) {
      const distance = Math.abs(stop.at - view);
      if (best === undefined || distance < best.distance) best = { id: stop.id, index, distance };
    }
    return best === undefined ? undefined : { id: best.id, index: best.index };
  }

  stepFrom(view: number, step: number): CameraStop | undefined {
    const nearest = this.nearest(view);
    if (nearest === undefined) return undefined;
    return this.#stops[Math.min(this.#stops.length - 1, Math.max(0, nearest.index + step))];
  }

  track(): CameraTrack | null {
    return this.#track;
  }

  alongTrack(
    point: { readonly x: number; readonly y: number },
    box: { readonly left: number; readonly top: number; readonly width: number; readonly height: number },
  ): number {
    const track = this.#track;
    if (track === null) return this.#rest;
    const fraction =
      track.axis === 'y'
        ? (point.y - box.top) / Math.max(1, box.height)
        : (point.x - box.left) / Math.max(1, box.width);
    return track.from + (track.to - track.from) * Math.min(1, Math.max(0, fraction));
  }

  equals(other: SceneCamera): boolean {
    return other instanceof TravelCamera && this.#facts() === other.#facts();
  }

  /** Every fact it moves by, as one text: two cameras with the same facts are the same camera. */
  #facts(): string {
    return JSON.stringify([
      this.#rest,
      this.#min,
      this.#max,
      this.#drag,
      this.#axis,
      this.#coast,
      this.#snap,
      this.#settle.base,
      this.#settle.per,
      this.#pace.base,
      this.#pace.per,
      this.#pace.most,
      this.#zoom,
      this.#stops.map((stop) => {
        // Typed, so a field added to a stop must be added here too.
        const facts: Required<CameraStop> = { id: stop.id, at: stop.at };
        return [facts.id, facts.at];
      }),
      this.#track === null ? null : Object.values(this.#trackFacts(this.#track)),
    ]);
  }

  /** The track's facts in a fixed order; typed, so a field added to the track must be added here too. */
  #trackFacts(track: CameraTrack): Required<CameraTrack> {
    return {
      x: track.x,
      y: track.y,
      width: track.width,
      height: track.height,
      axis: track.axis,
      from: track.from,
      to: track.to,
    };
  }
}
