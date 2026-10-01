import type { CardFaces, CardTurn } from './CardTurn.ts';
import { TURN } from './FlipTurn.ts';

/**
 * The card peels from its folded corner (U03e): the face on top is cut back along a slanting edge that sweeps from
 * the corner to the far one, baring the other face under it. The corner is bottom right on the picture, bottom left
 * on the back.
 */
export class PeelTurn implements CardTurn {
  key(): string {
    return 'peel';
  }

  async play(faces: CardFaces, toBack: boolean): Promise<void> {
    // A triangle twice the face's size covers it whole; shrunk into its far corner it covers nothing.
    const [whole, gone] = toBack
      ? ['polygon(0 0, 200% 0, 0 200%)', 'polygon(0 0, 0 0, 0 0)']
      : ['polygon(100% 0, -100% 0, 100% 200%)', 'polygon(100% 0, 100% 0, 100% 0)'];
    faces.out.style.zIndex = '2';
    await faces.out.animate([{ clipPath: whole }, { clipPath: gone }], {
      duration: TURN,
      easing: 'ease-in-out',
    }).finished;
    faces.out.style.zIndex = '';
  }
}
