import type { CardFaces, CardTurn } from './CardTurn.ts';
import { TURN } from './FlipTurn.ts';

/** The bands the face tears into, by where each ends down the face in percent, and the step each comes through at. */
const BANDS: readonly { readonly end: number; readonly step: number }[] = [
  { end: 9, step: 3 },
  { end: 22, step: 1 },
  { end: 31, step: 4 },
  { end: 47, step: 2 },
  { end: 58, step: 5 },
  { end: 70, step: 1 },
  { end: 84, step: 3 },
  { end: 100, step: 2 },
];
const STEPS = 5;
/** How far the faces jerk sideways at each step, in CSS pixels. */
const JERK = [9, -7, 8, -6, 5, 0];

/**
 * A broken turn (U03e): the other face comes through in torn bands, a few at each step, both faces jerking sideways
 * until the last band lands. It runs a little longer than the others.
 */
export class TornTurn implements CardTurn {
  key(): string {
    return 'torn';
  }

  async play(faces: CardFaces): Promise<void> {
    const timing = { duration: TURN * 1.1, easing: 'steps(1, end)' };
    const jerk = (way: number): Keyframe[] =>
      JERK.map((x, step) => ({ transform: `translateX(${String(x * way)}px)`, offset: step / STEPS }));
    faces.into.style.zIndex = '2';
    const out = faces.out.animate(jerk(-1), timing);
    faces.into.animate(jerk(1), timing);
    await faces.into.animate(
      Array.from({ length: STEPS + 1 }, (_, step) => ({ clipPath: this.#bands(step), offset: step / STEPS })),
      timing,
    ).finished;
    out.cancel();
    faces.into.style.zIndex = '';
  }

  /** The bands that have come through by this step, as one shape: each a strip across, joined down the left edge. */
  #bands(step: number): string {
    const points: string[] = [];
    let top = 0;
    for (const band of BANDS) {
      const bottom = band.step <= step ? band.end : top;
      points.push(
        `0 ${String(top)}%`,
        `100% ${String(top)}%`,
        `100% ${String(bottom)}%`,
        `0 ${String(bottom)}%`,
      );
      top = band.end;
    }
    return `polygon(${points.join(', ')})`;
  }
}
