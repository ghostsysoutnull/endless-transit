import type { Flight } from '#ui/scene/Flight.ts';
import type { Point } from '#ui/scene/Point.ts';

/** The flight's length in milliseconds, and the count's bump after it. */
const FLIGHT = 650;
const BUMP = 260;
/** Where it lands: the HUD's Buffer count (on a phone the dock's Buffer button is folded behind MORE). */
const LANDING = '[data-testid="stat-buffer"]';

/**
 * Owns one fact: how a taken relic reaches the buffer on screen (U03b, departure 4) — a small diamond flies from where
 * the relic lay to the HUD's Buffer count, then the count bumps. It is only for the eye (`aria-hidden`); nothing waits
 * on it. Built in `main.ts`; the plan's host does not ask for it under reduced motion.
 */
export class RelicFlight implements Flight {
  readonly #document: Document;

  constructor(document: Document) {
    this.#document = document;
  }

  fly(from: Point): void {
    const landing = this.#document.querySelector(LANDING);
    if (landing === null) return;
    const box = landing.getBoundingClientRect();
    const to = { x: box.left + box.width / 2, y: box.top + box.height / 2 };
    const mark = this.#document.createElement('span');
    mark.className = 'relic-flight';
    mark.setAttribute('aria-hidden', 'true');
    mark.dataset.testid = 'relic-flight';
    mark.style.left = `${String(from.x)}px`;
    mark.style.top = `${String(from.y)}px`;
    this.#document.body.append(mark);
    const flight = mark.animate(
      [
        { transform: 'translate(-50%, -50%) rotate(45deg) scale(1)', opacity: 1 },
        {
          transform: `translate(calc(-50% + ${String(to.x - from.x)}px), calc(-50% + ${String(to.y - from.y)}px)) rotate(45deg) scale(0.5)`,
          opacity: 0.6,
        },
      ],
      { duration: FLIGHT, easing: 'cubic-bezier(0.5, 0, 0.75, 0)' },
    );
    flight.onfinish = () => {
      mark.remove();
      // The screen was drawn afresh by the take: the count is asked for again.
      this.#document
        .querySelector(LANDING)
        ?.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.3)' }, { transform: 'scale(1)' }], BUMP);
    };
  }
}
