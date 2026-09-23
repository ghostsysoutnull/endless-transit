import { html, nothing, render, type TemplateResult } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat.js';
import type { OptionVM } from '#ui/OptionVM.ts';
import type { View } from '#ui/View.ts';
import type { HelpVM } from './HelpVM.ts';

/**
 * Draws the help screen with lit-html in the mock's look: the framed panel with a heading, one list per
 * group of buttons, the survival rules as lines, and a dock with the way back. Every word comes from the
 * view-model (`HelpPresenter` owns them); this file owns markup only. The panel is the resting place for
 * the focus (`data-rest`). The note line here is for the eye; the shell's own live region speaks the status.
 */
export class HelpView implements View<HelpVM> {
  #container: HTMLElement | undefined;

  mount(container: HTMLElement): void {
    this.#container = container;
  }

  render(vm: HelpVM): void {
    if (this.#container === undefined) throw new Error('HelpView.render before mount');
    render(this.#template(vm), this.#container);
  }

  dispose(): void {
    if (this.#container !== undefined) render(nothing, this.#container);
    this.#container = undefined;
  }

  #template(vm: HelpVM): TemplateResult {
    return html`
      <div class="app help" data-frame=${vm.frame}>
        <header class="bar"><h1>${vm.title}</h1></header>
        <section class="cap manual" aria-label=${vm.regions.help} tabindex="-1" data-rest>
          <h2 class="rh" data-testid="help-heading">${vm.heading}</h2>
          <p class="lead">${vm.lead}</p>
          ${vm.sections.map(
            (section) => html`
              <h3 class="heading">${section.heading}</h3>
              <dl class="terms" data-testid="help-section">
                ${section.entries.map(
                  (entry) => html`
                    <div class="term">
                      <dt>${entry.term}</dt>
                      <dd>${entry.what}</dd>
                    </div>
                  `,
                )}
              </dl>
            `,
          )}
          <h3 class="heading">${vm.survival.heading}</h3>
          <ul class="rules" data-testid="help-survival">
            ${vm.survival.lines.map((line) => html`<li>${line}</li>`)}
          </ul>
          <p class="hint">${vm.keys}</p>
          <p class=${vm.note === '' ? 'status quiet' : 'status'} data-testid="status">${vm.note}</p>
        </section>
        <nav class="dock" aria-label=${vm.regions.actions}>
          ${repeat(
            vm.dock,
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
