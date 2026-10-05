import { html, nothing, render, type TemplateResult } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat.js';
import type { ScenePick } from '#ui/scene/ScenePick.ts';
import type { TitleScene } from '#ui/scene/TitleScene.ts';
import type { View } from '#ui/View.ts';
import type { Passage } from './Passage.ts';
import type { PictureBook } from './PictureBook.ts';
import type { TitleVM } from './TitleVM.ts';

/** What the title's view is built from: the pictures of the levels, its own live picture, the passage into the game, and how a picture asks for an option. */
interface TitleParts {
  readonly book: PictureBook;
  readonly scene: TitleScene;
  readonly passage: Passage;
  readonly picks: ScenePick;
}

/**
 * Draws the title screen with lit-html: the game's name over the picture, the world's seed and the buttons at the
 * screen's foot. The picture is the world's universe, live (`TitleScene`); entering the world plays the passage down to
 * where the traveller lands (`Passage`) before the option runs. Buttons carry `data-option`
 * and no handlers of their own — the input router listens once for the whole screen.
 * Every word comes from the view-model (`TitlePresenter` owns them); this file owns markup only.
 */
export class TitleView implements View<TitleVM> {
  readonly #parts: TitleParts;
  #container: HTMLElement | undefined;
  #vm: TitleVM | undefined;
  /** The screen's own listener: made at each mount, taken away with it. */
  #listeners = new AbortController();

  constructor(parts: TitleParts) {
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

  render(vm: TitleVM): void {
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

  /** The tap that enters the world goes through the passage first; any other is the router's. */
  #through(event: Event): void {
    const vm = this.#vm;
    if (vm === undefined || vm.world === null || vm.enters === '' || this.#parts.passage.playing()) return;
    if (!(event.target instanceof Element)) return;
    if (event.target.closest<HTMLElement>('button[data-option]')?.dataset.option !== vm.enters) return;
    event.stopPropagation();
    const container = this.#container;
    if (container === undefined) return;
    const enters = vm.enters;
    this.#parts.scene.clear();
    this.#parts.passage.down(
      {
        container,
        repaint: () => {
          if (this.#vm !== undefined) this.#paint(this.#vm);
        },
      },
      vm.world.levels,
      () => {
        // The screen may be gone by now: then nothing is asked of it.
        if (this.#container !== undefined) this.#parts.picks.pick(this.#container, enters);
      },
    );
  }

  #paint(vm: TitleVM): void {
    if (this.#container === undefined) throw new Error('TitleView.render before mount');
    this.#vm = vm;
    render(this.#template(vm), this.#container);
    if (this.#parts.passage.playing()) return;
    const host = this.#element('[data-sky]');
    if (host === undefined) return;
    const first = vm.world?.levels[0];
    if (vm.world === null || first === undefined) {
      this.#parts.scene.wait(host);
      return;
    }
    this.#parts.scene.resolve(host, {
      key: vm.world.seed,
      sketch: first.drawing.sketchedBy(this.#parts.book),
      into: first.into,
      noise: vm.world.noise,
    });
  }

  /** The screen's first element a selector finds, when it is an HTML element. */
  #element(selector: string): HTMLElement | undefined {
    const found = this.#container?.querySelector(selector);
    return found instanceof HTMLElement ? found : undefined;
  }

  #template(vm: TitleVM): TemplateResult {
    return html`
      <div class="app fall title">
        <header class="title-head">
          <h1>${vm.title}</h1>
          <p class="title-tag">${vm.tagline}</p>
        </header>
        <div class="fall-sky" data-sky></div>
        <section class="title-world">
          ${
            vm.world === null
              ? html`<p class="title-prompt" data-testid="prompt">${vm.prompt}</p>`
              : html`
                  <p class="title-name" data-testid="world-name">${vm.world.name}</p>
                  <p class="title-seed">
                    <span>${vm.world.seedLabel}</span>
                    <b data-testid="world-seed">${vm.world.seed}</b>
                  </p>
                `
          }
          <p class="fall-status" data-testid="status">${vm.status}</p>
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
