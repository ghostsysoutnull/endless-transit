import type { CardFaces, CardTurn } from './CardTurn.ts';
import { TURN } from './FlipTurn.ts';

/** How far a leaf swings, in degrees: just short of edge-on. */
const SWING = 86;

/** The card opens like a door (U03e): one face swings away on its edge, the other swings shut from the far edge. */
export class DoorTurn implements CardTurn {
  key(): string {
    return 'door';
  }

  async play(faces: CardFaces, toBack: boolean): Promise<void> {
    const way = toBack ? 1 : -1;
    faces.out.style.transformOrigin = toBack ? 'left center' : 'right center';
    faces.into.style.transformOrigin = toBack ? 'right center' : 'left center';
    faces.into.style.visibility = 'hidden';
    const out = faces.out.animate(
      [{ transform: 'rotateY(0deg)' }, { transform: `rotateY(${String(SWING * way)}deg)` }],
      { duration: TURN / 2, easing: 'ease-in', fill: 'forwards' },
    );
    await out.finished;
    faces.out.style.visibility = 'hidden';
    faces.into.style.visibility = 'visible';
    await faces.into.animate(
      [{ transform: `rotateY(${String(-SWING * way)}deg)` }, { transform: 'rotateY(0deg)' }],
      { duration: TURN / 2, easing: 'ease-out' },
    ).finished;
    out.cancel();
    faces.out.style.transformOrigin = '';
    faces.into.style.transformOrigin = '';
  }
}
