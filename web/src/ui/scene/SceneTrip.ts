import { Tween } from './Tween.ts';

/**
 * One going-in (U02), measured by elapsed time: the view rides from where it stands to the child's stop, then —
 * when the picture zooms — the picture grows around the child, then the child is entered (`pick`). A new frame
 * of the game drops a trip in flight (ids are positional). Immutable.
 */
export class SceneTrip {
  readonly #ride: Tween;
  readonly #zoom: Tween | undefined;
  readonly #pick: string;

  constructor(facts: {
    from: number;
    to: number;
    start: number;
    /** How long the ride takes, in milliseconds. */
    ride: number;
    /** How far the picture grows and for how long, once the ride is over; nothing when it does not zoom. */
    zoom: { scale: number; time: number } | null;
    pick: string;
  }) {
    this.#ride = new Tween(facts.from, facts.to, facts.start, facts.ride);
    this.#zoom =
      facts.zoom === null
        ? undefined
        : new Tween(1, facts.zoom.scale, facts.start + facts.ride, facts.zoom.time);
    this.#pick = facts.pick;
  }

  view(time: number): number {
    return this.#ride.at(time);
  }

  scale(time: number): number {
    return this.#zoom === undefined || !this.#ride.done(time) ? 1 : this.#zoom.at(time);
  }

  over(time: number): boolean {
    return this.#ride.done(time) && (this.#zoom?.done(time) ?? true);
  }

  pick(): string {
    return this.#pick;
  }
}
