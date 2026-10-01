import type { CardFaces, CardTurn } from './CardTurn.ts';
import { TURN } from './FlipTurn.ts';

/** How many slats the face is cut into. */
const SLATS = 9;

/** The card turns like a blind (U03e): the face on top is cut into slats that close one and all, baring the other. */
export class BlindsTurn implements CardTurn {
  key(): string {
    return 'blinds';
  }

  async play(faces: CardFaces): Promise<void> {
    faces.out.style.zIndex = '2';
    await faces.out.animate([{ clipPath: this.#slats(1) }, { clipPath: this.#slats(0) }], {
      duration: TURN,
      easing: 'ease-in-out',
    }).finished;
    faces.out.style.zIndex = '';
  }

  /** Every slat open this much, 0 to 1, as one shape: the slats joined down the left edge by a line of no width. */
  #slats(open: number): string {
    const step = 100 / SLATS;
    const points: string[] = [];
    for (let slat = 0; slat < SLATS; slat++) {
      const top = slat * step;
      const bottom = top + step * open;
      points.push(
        `0 ${String(top)}%`,
        `100% ${String(top)}%`,
        `100% ${String(bottom)}%`,
        `0 ${String(bottom)}%`,
      );
    }
    return `polygon(${points.join(', ')})`;
  }
}
