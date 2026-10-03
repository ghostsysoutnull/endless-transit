import { html, nothing, type TemplateResult } from 'lit-html';
import { keyed } from 'lit-html/directives/keyed.js';
import { repeat } from 'lit-html/directives/repeat.js';
import type { Seed } from '#engine/rng/Seed.ts';
import type { CardTurn } from '#ui/card/CardTurn.ts';
import type { CardTurns } from '#ui/card/CardTurns.ts';
import type { OptionVM } from '#ui/OptionVM.ts';
import type { ReducedMotion } from '#ui/ReducedMotion.ts';
import type { Point } from '#ui/scene/Point.ts';
import type { CardParts } from './CardParts.ts';
import { MAP_KEY_SLOT } from './CardSlots.ts';
import type { HudVM } from './HudVM.ts';
import type { KeyStrip } from './KeyStrip.ts';
import type { KeyStripParts } from './KeyStripParts.ts';
import type { RoomCard } from './RoomCard.ts';
import type { RoomCardVM } from './RoomCardVM.ts';

/** A swipe turns the card once the finger has gone this far sideways, in CSS pixels, and this much more across than down. */
const SWIPE = { far: 48, steep: 1.5 };

/**
 * Draws the room's card (U03e) and owns one piece of state: which face shows. The front is the picture, with the
 * place's name and its first words over it on arrival — the screen's heading, kept for a reader, fading for the eye —
 * and the step's status; the back holds the panels a step brought, the room's words, what it holds, the ways and the
 * game's options. The face turned away is hidden from everyone (`data-off`), so no finger and no reader reaches a
 * button on it. The folded corner on each face is a real button that turns the card; a sideways swipe does the same
 * while you stand in the room or read its back — over the plan one finger pans. Both are view controls: they pick
 * nothing. Under the card the keys (`KeyStrip`, closed by the screen at each step) stay in reach on both faces; the
 * picture's MAP key is mounted in their slot, and a tap on it shows the picture. A new room starts on its picture; a step that brings a panel shows the back at once.
 * How a turn plays is a `CardTurn`'s; which one, `CardTurns`'; under reduced motion the other face is there at once.
 * Every word comes from the view-model.
 */
export class RoomCardView implements RoomCard {
  readonly #motion: ReducedMotion;
  readonly #turns: CardTurns;
  readonly #keys: KeyStrip;
  #back = false;
  /** While a turn plays, taps on the corner wait. */
  #busy = false;
  #scene = '';
  /** Whether the last step came into this room: its first words show until the next one. */
  #arrived = false;
  /** The turns drawn since the step, and the turn that took the card to its back: the way back is the same way. */
  #count = 0;
  #went: CardTurn | undefined;
  /** The steps of the game seen so far: a turn that ends after a new one leaves the face that step chose. */
  #steps = 0;
  /** Where a finger went down on the card. */
  #down: Point | undefined;
  /** What the card was last drawn with: a turn asked for from outside the template plays on it. */
  #drawn: { readonly vm: HudVM; readonly parts: CardParts } | undefined;

  constructor(parts: { motion: ReducedMotion; turns: CardTurns; keys: KeyStrip }) {
    this.#motion = parts.motion;
    this.#turns = parts.turns;
    this.#keys = parts.keys;
  }

  step(vm: HudVM, panel: boolean): void {
    this.#arrived = vm.scene !== this.#scene;
    this.#scene = vm.scene;
    if (this.#arrived) this.#back = false;
    if (panel) this.#back = true;
    this.#count = 0;
    this.#went = undefined;
    this.#steps += 1;
  }

  forget(): void {
    this.#scene = '';
    this.#back = false;
    this.#went = undefined;
    this.#busy = false;
    this.#steps += 1;
  }

  reveal(target: EventTarget | null, then: () => void): void {
    const drawn = this.#drawn;
    if (!this.#back || drawn === undefined) {
      then();
      return;
    }
    void this.#turn(target, drawn.vm, drawn.parts, false).then(then);
  }

  template(vm: HudVM, card: RoomCardVM, parts: CardParts): TemplateResult {
    this.#drawn = { vm, parts };
    const back = this.#back;
    const turn = (event: Event, toBack: boolean): void => {
      void this.#turn(event.target, vm, parts, toBack);
    };
    // The strip's middle is the MAP key's slot: a tap on the key mounted there shows the picture.
    const strip: KeyStripParts = {
      slot: html`<span
        class="slot"
        id=${MAP_KEY_SLOT}
        @click=${(event: Event) => {
          turn(event, false);
        }}
      ></span>`,
      lit: (id) => parts.lit(id),
      repaint: () => {
        parts.repaint();
      },
    };
    return html`
      <div
        class="card"
        @pointerdown=${(event: PointerEvent) => {
          this.#down = { x: event.clientX, y: event.clientY };
        }}
        @pointerup=${(event: PointerEvent) => {
          if (this.#swiped(event)) turn(event, !this.#back);
        }}
        @pointercancel=${() => {
          this.#down = undefined;
        }}
      >
        <section
          class="face front"
          aria-label=${card.regions.front}
          tabindex="-1"
          ?data-rest=${!back}
          ?data-off=${back}
        >
          ${parts.picture}
          ${keyed(
            `${vm.scene}/${vm.status}`,
            html`<div class="line">
              ${parts.head}
              ${this.#arrived && card.arrival !== '' ? html`<p class="arrival">${card.arrival}</p>` : nothing}
              ${parts.status}
            </div>`,
          )}
          <button
            type="button"
            class="ear"
            data-testid="card-to-words"
            aria-label=${card.corner.toWords.label}
            aria-pressed="false"
            @click=${(event: Event) => {
              turn(event, true);
            }}
          >
            <span aria-hidden="true">${card.corner.toWords.text}</span>
          </button>
        </section>
        <section
          class="face back"
          aria-label=${card.regions.back}
          tabindex="-1"
          ?data-rest=${back}
          ?data-off=${!back}
        >
          <div class="sheet">
            ${parts.panels}
            <p class="name" aria-hidden="true">${vm.place.name}</p>
            ${parts.words} ${parts.lists} ${this.#rows('ways', card.regions.ways, card.ways, parts)}
          </div>
          <button
            type="button"
            class="ear"
            data-testid="card-to-room"
            aria-label=${card.corner.toRoom.label}
            aria-pressed="true"
            @click=${(event: Event) => {
              turn(event, false);
            }}
          >
            <span aria-hidden="true">${card.corner.toRoom.text}</span>
          </button>
        </section>
        ${this.#keys.sheet(card, strip)}
      </div>
      ${this.#keys.strip(card, strip)}
    `;
  }

  /** A headed group of buttons on the back; nothing when it has none. */
  #rows(
    name: string,
    heading: string,
    options: readonly OptionVM[],
    parts: CardParts,
  ): TemplateResult | typeof nothing {
    if (options.length === 0) return nothing;
    return html`
      <section class=${name}>
        <h3 class="heading">${heading}</h3>
        <div class="rowset">
          ${repeat(
            options,
            (option) => option.id,
            (option) => parts.button(option),
          )}
        </div>
      </section>
    `;
  }

  /** Whether the finger just lifted made a swipe that turns the card: far enough sideways, and not over the plan. */
  #swiped(event: PointerEvent): boolean {
    const from = this.#down;
    this.#down = undefined;
    if (from === undefined || !(event.target instanceof Element)) return false;
    const across = Math.abs(event.clientX - from.x);
    const down = Math.abs(event.clientY - from.y);
    if (across < SWIPE.far || across < SWIPE.steep * down) return false;
    const overPlan =
      event.target.closest('.world')?.querySelector(`#${MAP_KEY_SLOT} [aria-pressed="true"]`) != null;
    return this.#back || !overPlan;
  }

  /** A face of the card, by its class. */
  #face(card: Element | null | undefined, name: string): HTMLElement | undefined {
    const face = card?.querySelector(`.${name}`);
    return face instanceof HTMLElement ? face : undefined;
  }

  /** The turn to the back is drawn afresh; the turn back to the picture is the one the card went by. */
  #turnFor(noise: Seed, decay: number, toBack: boolean): CardTurn {
    if (!toBack && this.#went !== undefined) return this.#went;
    return this.#turns.pick(noise, decay, this.#count, this.#went?.key() ?? '');
  }

  /** Turns the card to the face asked for: both faces show while the turn plays, then the screen is drawn again. */
  async #turn(target: EventTarget | null, vm: HudVM, parts: CardParts, toBack: boolean): Promise<void> {
    if (this.#busy || toBack === this.#back || !(target instanceof Element)) return;
    const card = target.closest('.world')?.querySelector('.card');
    const front = this.#face(card, 'front');
    const back = this.#face(card, 'back');
    if (front === undefined || back === undefined) return;
    const frame = vm.drawing.frame();
    const turn = this.#motion.reduced()
      ? this.#turns.still()
      : this.#turnFor(frame.noise, frame.decay, toBack);
    if (toBack && !this.#motion.reduced()) {
      // A turn drawn to the back is counted, and remembered for the way back.
      this.#count += 1;
      this.#went = turn;
    }
    this.#busy = true;
    const faces = toBack ? { out: front, into: back } : { out: back, into: front };
    const steps = this.#steps;
    faces.into.style.visibility = 'visible';
    await turn.play(faces, toBack);
    for (const face of [front, back]) face.style.visibility = '';
    this.#busy = false;
    // A step of the game landed while the turn played: the face it chose stands, and its focus.
    if (steps !== this.#steps) return;
    this.#back = toBack;
    parts.repaint();
    faces.into.focus({ preventScroll: true });
  }
}
