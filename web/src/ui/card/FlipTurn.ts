import type { CardFaces, CardTurn } from './CardTurn.ts';

/** The whole turn, in milliseconds: every turn of the card lasts this long. */
export const TURN = 560;

/** The plain turn (U03e): the card swings on its middle, like a sheet turned over. */
export class FlipTurn implements CardTurn {
  key(): string {
    return 'flip';
  }

  async play(faces: CardFaces, toBack: boolean): Promise<void> {
    const way = toBack ? 1 : -1;
    faces.into.style.visibility = 'hidden';
    const out = faces.out.animate(
      [{ transform: 'rotateY(0deg)' }, { transform: `rotateY(${String(-90 * way)}deg)` }],
      { duration: TURN / 2, easing: 'ease-in', fill: 'forwards' },
    );
    await out.finished;
    faces.out.style.visibility = 'hidden';
    faces.into.style.visibility = 'visible';
    await faces.into.animate(
      [{ transform: `rotateY(${String(90 * way)}deg)` }, { transform: 'rotateY(0deg)' }],
      { duration: TURN / 2, easing: 'ease-out' },
    ).finished;
    out.cancel();
  }
}
