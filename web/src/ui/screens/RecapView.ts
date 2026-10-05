import { html, nothing, render, type TemplateResult } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat.js';
import type { LiveBand } from '#ui/scene/LiveBand.ts';
import type { ScenePick } from '#ui/scene/ScenePick.ts';
import type { View } from '#ui/View.ts';
import type { Passage } from './Passage.ts';
import type { PictureBook } from './PictureBook.ts';
import type { RecapVM } from './RecapVM.ts';

/** What the recap's view is built from: the pictures of the levels, its own live picture, the passage out of the game, and how a picture asks for an option. */
interface RecapParts {
  readonly book: PictureBook;
  readonly scene: LiveBand;
  readonly passage: Passage;
  readonly picks: ScenePick;
}

/**
 * Draws the session recap with lit-html: the ending's heading over the picture of the place the traveller stands
 * in, live (`LiveBand`); under it where that is, the run's figures or the void's lines, the closing line and two
 * buttons. Ending the session plays the passage back up, out to the universe (`Passage`), before the option runs. Every word comes from the view-model (`RecapPresenter` owns them); this file owns markup only.
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
    if (vm === undefined || vm.ends === '' || this.#parts.passage.playing()) return;
    if (!(event.target instanceof Element)) return;
    if (event.target.closest<HTMLElement>('button[data-option]')?.dataset.option !== vm.ends) return;
    event.stopPropagation();
    const container = this.#container;
    if (container === undefined) return;
    const ends = vm.ends;
    this.#parts.scene.clear();
    this.#parts.passage.up(
      {
        container,
        repaint: () => {
          if (this.#vm !== undefined) this.#paint(this.#vm);
        },
      },
      vm.levels,
      () => {
        // The screen may be gone by now: then nothing is asked of it.
        if (this.#container !== undefined) this.#parts.picks.pick(this.#container, ends);
      },
    );
  }

  #paint(vm: RecapVM): void {
    if (this.#container === undefined) throw new Error('RecapView.render before mount');
    this.#vm = vm;
    render(this.#template(vm), this.#container);
    if (this.#parts.passage.playing()) return;
    const host = this.#element('[data-sky]');
    const here = vm.levels[vm.levels.length - 1];
    if (host === undefined || here === undefined) return;
    this.#parts.scene.show(host, { sketch: here.drawing.sketchedBy(this.#parts.book), into: here.into });
  }

  /** The screen's first element a selector finds, when it is an HTML element. */
  #element(selector: string): HTMLElement | undefined {
    const found = this.#container?.querySelector(selector);
    return found instanceof HTMLElement ? found : undefined;
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
