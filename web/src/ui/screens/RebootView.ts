import { html, nothing, render, type TemplateResult } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat.js';
import type { OptionVM } from '#ui/OptionVM.ts';
import type { View } from '#ui/View.ts';
import type { RebootVM } from './RebootVM.ts';

/**
 * Draws the link-failure screen with lit-html in the mock's dead frame: the stage gone red, the old game's
 * line, and one button. Every word comes from the view-model (`RebootPresenter` owns them); this file owns
 * markup only. The note line here is for the eye; the shell's own live region speaks the status.
 */
export class RebootView implements View<RebootVM> {
  #container: HTMLElement | undefined;

  mount(container: HTMLElement): void {
    this.#container = container;
  }

  render(vm: RebootVM): void {
    if (this.#container === undefined) throw new Error('RebootView.render before mount');
    render(this.#template(vm), this.#container);
  }

  dispose(): void {
    if (this.#container !== undefined) render(nothing, this.#container);
    this.#container = undefined;
  }

  #template(vm: RebootVM): TemplateResult {
    return html`
      <div class="app" data-frame=${vm.frame}>
        <header class="bar"><h1>${vm.title}</h1></header>
        <section class="stage" aria-label=${vm.regions.stage}>
          <div class="sigil" aria-hidden="true">◈</div>
          <p class="stage-line">${vm.stageLine}</p>
        </section>
        <section class="cap" aria-label=${vm.regions.notice} tabindex="-1" data-rest>
          <p class="eyebrow">${vm.eyebrow}</p>
          <h2 data-testid="failure">${vm.headline}</h2>
          <p class="line" data-testid="rebooting">${vm.line}</p>
          <p class="why">${vm.explanation}</p>
          <p class=${vm.note === '' ? 'status quiet' : 'status'} data-testid="status">${vm.note}</p>
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
        ${option.key === '' ? nothing : html`<kbd aria-hidden="true">${option.key}</kbd>`}<span
          >${option.label}</span
        >
      </button>
    `;
  }
}
