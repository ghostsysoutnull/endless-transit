import type { Flight } from '#ui/scene/Flight.ts';
import type { Point } from '#ui/scene/Point.ts';
import type { ReducedMotion } from '#ui/ReducedMotion.ts';
import { BUFFER_LANDING } from '#ui/screens/CardSlots.ts';

/** The ticket's rise, its hold for reading, its flight to the buffer and the count's bump after it, in milliseconds. */
const RISE = 180;
const HOLD = 900;
const FLIGHT = 650;
const BUMP = 260;
/** Under reduced motion the ticket shows this long where the relic lay, then fades. */
const SHOWN = 1400;

/**
 * Owns one fact: how a taken relic reaches the buffer on screen (U03b, departure 4; U03e) — a ticket with the relic's
 * full name rises where the relic lay, holds for reading, then shrinks and flies to the Buffer key of the room's card,
 * which bumps. Under reduced motion the ticket shows in place and fades: the name is still read, nothing flies. It
 * is only for the eye (`aria-hidden`); nothing waits on it. Built in `main.ts`.
 */
export class RelicFlight implements Flight {
  readonly #document: Document;
  readonly #motion: ReducedMotion;

  constructor(document: Document, motion: ReducedMotion) {
    this.#document = document;
    this.#motion = motion;
  }

  fly(from: Point, name: string): void {
    const ticket = this.#ticket(from, name);
    this.#document.body.append(ticket);
    if (this.#motion.reduced()) {
      ticket.animate([{ opacity: 1 }, { opacity: 1, offset: 0.7 }, { opacity: 0 }], SHOWN).onfinish = () => {
        ticket.remove();
      };
      return;
    }
    const landing = this.#document.getElementById(BUFFER_LANDING);
    const box = landing?.getBoundingClientRect();
    const to = box === undefined ? from : { x: box.left + box.width / 2, y: box.top + box.height / 2 };
    const rise = ticket.animate(
      [
        { transform: 'translate(-50%, -50%) scale(0.7)', opacity: 0 },
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
      ],
      { duration: RISE, easing: 'ease-out', fill: 'forwards' },
    );
    rise.onfinish = () => {
      const flight = ticket.animate(
        [
          { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
          { transform: 'translate(-50%, -50%) scale(1)', opacity: 1, offset: HOLD / (HOLD + FLIGHT) },
          {
            transform: `translate(calc(-50% + ${String(to.x - from.x)}px), calc(-50% + ${String(to.y - from.y)}px)) scale(0.2)`,
            opacity: 0.5,
          },
        ],
        { duration: HOLD + FLIGHT, easing: 'cubic-bezier(0.5, 0, 0.75, 0)', fill: 'forwards' },
      );
      flight.onfinish = () => {
        ticket.remove();
        // The screen was drawn afresh by the take: the count is asked for again.
        this.#document
          .getElementById(BUFFER_LANDING)
          ?.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.3)' }, { transform: 'scale(1)' }], BUMP);
      };
    };
  }

  /** The ticket: the relic's gem and its name, placed where the relic lay. */
  #ticket(from: Point, name: string): HTMLElement {
    const ticket = this.#document.createElement('span');
    ticket.className = 'relic-flight';
    ticket.setAttribute('aria-hidden', 'true');
    ticket.dataset.testid = 'relic-flight';
    ticket.style.left = `${String(from.x)}px`;
    ticket.style.top = `${String(from.y)}px`;
    const gem = this.#document.createElement('i');
    gem.className = 'gem';
    const words = this.#document.createElement('b');
    words.textContent = name;
    ticket.append(gem, words);
    return ticket;
  }
}
