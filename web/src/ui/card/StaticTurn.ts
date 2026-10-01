import type { CardFaces, CardTurn } from './CardTurn.ts';
import { TURN } from './FlipTurn.ts';

/** The class of the sheet of static laid over the card while it turns (`app.css`). */
const SHEET = 'card-static';

/**
 * A broken turn (U03e): static swallows the card, the faces change under it, and it clears — the card shaking as it
 * goes. The static is a sheet the stylesheet draws; it is only for the eye.
 */
export class StaticTurn implements CardTurn {
  key(): string {
    return 'static';
  }

  async play(faces: CardFaces): Promise<void> {
    const card = faces.out.parentElement;
    if (card === null) return;
    const sheet = card.ownerDocument.createElement('div');
    sheet.className = SHEET;
    sheet.setAttribute('aria-hidden', 'true');
    card.append(sheet);
    faces.out.style.zIndex = '2';
    const shake = card.animate(
      [0, 3, -3, 2, -2, 3, -1, 0].map((x) => ({ transform: `translateX(${String(x)}px)` })),
      { duration: TURN, easing: 'steps(8, end)' },
    );
    await sheet.animate([{ opacity: 0 }, { opacity: 1 }], { duration: TURN / 2, fill: 'forwards' }).finished;
    faces.out.style.visibility = 'hidden';
    await sheet.animate([{ opacity: 1 }, { opacity: 0 }], { duration: TURN / 2, fill: 'forwards' }).finished;
    shake.cancel();
    sheet.remove();
    faces.out.style.zIndex = '';
  }
}
