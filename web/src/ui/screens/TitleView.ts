import { html, nothing, render, type TemplateResult } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat.js';
import type { OptionVM } from '#ui/OptionVM.ts';
import type { View } from '#ui/View.ts';
import type { TitleVM } from './TitleVM.ts';

/**
 * Draws the title screen with lit-html. Buttons carry `data-option` and no handlers of their own — the
 * input router listens once for the whole screen. The live region is always in the tree; only its text moves.
 * Every word comes from the view-model (`TitlePresenter` owns them); this file owns markup only.
 */
export class TitleView implements View<TitleVM> {
  #container: HTMLElement | undefined;

  mount(container: HTMLElement): void {
    this.#container = container;
  }

  render(vm: TitleVM): void {
    if (this.#container === undefined) throw new Error('TitleView.render before mount');
    render(this.#template(vm), this.#container);
  }

  dispose(): void {
    if (this.#container !== undefined) render(nothing, this.#container);
    this.#container = undefined;
  }

  #template(vm: TitleVM): TemplateResult {
    return html`
      <div class="app">
        <header class="bar">
          <h1>${vm.title}</h1>
          <p class="sub">${vm.tagline}</p>
        </header>
        <section class="stage" aria-label=${vm.regions.stage}>
          <div class="sigil" aria-hidden="true">◈</div>
          <p class="stage-line">${vm.stageLine}</p>
        </section>
        <section class="cap" aria-label=${vm.regions.world}>
          ${
            vm.world === null
              ? html`<p class="prompt" data-testid="prompt">${vm.prompt}</p>`
              : html`
                  <p class="eyebrow">${vm.world.nameLabel}</p>
                  <h2 data-testid="world-name">${vm.world.name}</h2>
                  <p class="eyebrow">${vm.world.seedLabel}</p>
                  <p class="seed" data-testid="world-seed">${vm.world.seed}</p>
                `
          }
          <p
            class=${vm.status === '' ? 'status quiet' : 'status'}
            role="status"
            aria-live="polite"
            data-testid="status"
          >
            ${vm.status}
          </p>
        </section>
        <nav class="pad" aria-label=${vm.regions.actions}>
          ${repeat(
            vm.options,
            (option) => option.id,
            (option) => this.#button(option),
          )}
        </nav>
        <footer class="build" data-testid="build">${vm.build}</footer>
      </div>
    `;
  }

  #button(option: OptionVM): TemplateResult {
    return html`
      <button type="button" class="pb" data-option=${option.id}>
        <kbd aria-hidden="true">${option.key}</kbd><span>${option.label}</span>
      </button>
    `;
  }
}
