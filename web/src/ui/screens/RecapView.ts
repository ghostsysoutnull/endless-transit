import { html, nothing, render, type TemplateResult } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat.js';
import type { EmblemStage } from '#ui/scene/EmblemStage.ts';
import type { EndingEmblem } from '#ui/scene/endings/EndingEmblem.ts';
import type { ScenePick } from '#ui/scene/ScenePick.ts';
import type { View } from '#ui/View.ts';
import type { Passage } from './Passage.ts';
import type { PictureBook } from './PictureBook.ts';
import type { RecapVM } from './RecapVM.ts';

/** What the recap's view is built from: the pictures of the levels, the endings' emblems and their stage, the passage out of the game, and how a picture asks for an option. */
interface RecapParts {
  readonly book: PictureBook;
  readonly emblems: Readonly<Record<string, EndingEmblem>>;
  readonly scene: EmblemStage;
  readonly passage: Passage;
  readonly picks: ScenePick;
}

/**
 * Draws the session recap with lit-html: the ending's heading over its emblem, live (`EmblemStage`); under it where
 * the traveller stands, the run's figures, the void's lines, the closing line and two buttons. Ending the session plays the passage back up, out to the universe (`Passage`), before the option runs. Every word comes from the view-model (`RecapPresenter` owns them); this file owns markup only.
 */
export class RecapView implements View<RecapVM> {
  readonly #parts: RecapParts;
  #container: HTMLElement | undefined;
  #vm: RecapVM | undefined;
  /** The screen's own listener: made at each mount, taken away with it. */
  #listeners = new AbortController();

  constructor(parts: RecapParts) {
    this.#parts = parts;
  }

  mount(container: HTMLElement): void {
    this.#container = container;
    this.#listeners = new AbortController();
    container.addEventListener(
      'click',
      (event) => {
        this.#through(event);
      },
      // Heard on the way down, before the shell's router hears it on the way up the same element.
      { signal: this.#listeners.signal, capture: true },
    );
  }

  render(vm: RecapVM): void {
    this.#paint(vm);
  }

  dispose(): void {
    const container = this.#container;
    this.#container = undefined;
    this.#listeners.abort();
    this.#parts.passage.stop();
    this.#parts.scene.clear();
    if (container !== undefined) render(nothing, container);
    this.#vm = undefined;
  }

  /** The tap that ends the session goes through the passage first; any other is the router's. */
  #through(event: Event): void {
    const vm = this.#vm;
    const container = this.#container;
    if (vm === undefined || container === undefined) return;
    const { levels, ends } = vm;
    this.#parts.passage.through(event, ends, () => {
      this.#parts.scene.clear();
      this.#parts.passage.up(
        {
          container,
          repaint: () => {
            if (this.#vm !== undefined) this.#paint(this.#vm);
          },
        },
        levels,
        () => {
          // The screen may be gone by now: then nothing is asked of it.
          if (this.#container !== undefined) this.#parts.picks.pick(this.#container, ends);
        },
      );
    });
  }

  #paint(vm: RecapVM): void {
    if (this.#container === undefined) throw new Error('RecapView.render before mount');
    this.#vm = vm;
    render(this.#template(vm), this.#container);
    if (this.#parts.passage.playing()) return;
    const emblem = this.#parts.emblems[vm.outcome];
    if (emblem === undefined) throw new Error(`no emblem for the ending '${vm.outcome}'`);
    const host = this.#container.querySelector('[data-sky]');
    if (host instanceof HTMLElement) this.#parts.scene.show(host, emblem);
  }

  #template(vm: RecapVM): TemplateResult {
    return html`
      <div class="app fall ending" data-frame=${vm.frame}>
        <header class="ending-head">
          <h1 data-testid="recap-heading">${vm.heading}</h1>
        </header>
        <div class="fall-sky" data-sky></div>
        <section class="ending-words" tabindex="-1" data-rest>
          <p class="ending-place">
            <span>${vm.place.label}</span>
            <b>${vm.place.name}</b>
            <i>${vm.place.kind}</i>
          </p>
          ${
            vm.figures.length === 0
              ? nothing
              : html`<dl class="ending-figures" data-testid="figures">
                  ${vm.figures.map(
                    (figure) => html`
                      <div>
                        <dd>${figure.value}</dd>
                        <dt>${figure.label}</dt>
                      </div>
                    `,
                  )}
                </dl>`
          }
          ${
            vm.lines.length === 0
              ? nothing
              : html`<div class="ending-lines" data-testid="void-lines">
                  ${vm.lines.map((line) => html`<p>${line}</p>`)}
                </div>`
          }
          <p class="ending-closing" data-testid="closing">${vm.closing}</p>
          <p class="fall-status" data-testid="status">${vm.note}</p>
        </section>
        <nav class="fall-keys">
          ${repeat(
            vm.options,
            (option) => option.id,
            (option) => html`
              <button type="button" class="fall-key" ?data-lead=${option.lead} data-option=${option.id}>
                ${option.label}
              </button>
            `,
          )}
        </nav>
        <footer class="build" data-testid="build">${vm.build}</footer>
        ${this.#parts.passage.template()}
      </div>
    `;
  }
}
