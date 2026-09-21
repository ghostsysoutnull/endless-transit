import { html, nothing, render, type TemplateResult } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat.js';
import type { OptionVM } from '#ui/OptionVM.ts';
import type { View } from '#ui/View.ts';
import type { TitleVM } from './TitleVM.ts';

/**
 * Draws the title screen with lit-html. Buttons carry `data-option` and no handlers of their own — the
 * input router listens once for the whole screen. The live region is always in the tree; only its text moves.
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
        <section class="stage" aria-label="Uplink">
          <div class="sigil" aria-hidden="true">◈</div>
          <p class="stage-line">${vm.world === null ? 'AWAITING SEED' : 'WORLD LOCKED'}</p>
        </section>
        <section class="cap" aria-label="World">
          ${
            vm.world === null
              ? html`<p class="prompt" data-testid="prompt">${vm.prompt}</p>`
              : html`
                  <p class="eyebrow">UNIVERSE</p>
                  <h2 data-testid="world-name">${vm.world.name}</h2>
                  <p class="eyebrow">SEED</p>
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
        <nav class="pad" aria-label="Actions">
          ${repeat(
            vm.options,
            (option) => option.id,
            (option) => this.#button(option),
          )}
        </nav>
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
