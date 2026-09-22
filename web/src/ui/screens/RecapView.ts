import { html, nothing, render, type TemplateResult } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat.js';
import type { OptionVM } from '#ui/OptionVM.ts';
import type { View } from '#ui/View.ts';
import type { RecapVM } from './RecapVM.ts';

/**
 * Draws the session recap with lit-html: the ending's heading, its figures or its shutdown steps, the closing
 * line, two buttons. Every word comes from the view-model (`RecapPresenter` owns them); this file owns
 * markup only. The note line here is for the eye; the shell's own live region speaks the status.
 */
export class RecapView implements View<RecapVM> {
  #container: HTMLElement | undefined;

  mount(container: HTMLElement): void {
    this.#container = container;
  }

  render(vm: RecapVM): void {
    if (this.#container === undefined) throw new Error('RecapView.render before mount');
    render(this.#template(vm), this.#container);
  }

  dispose(): void {
    if (this.#container !== undefined) render(nothing, this.#container);
    this.#container = undefined;
  }

  #template(vm: RecapVM): TemplateResult {
    return html`
      <div class="app" data-frame=${vm.frame}>
        <header class="bar"><h1>${vm.title}</h1></header>
        <section class="cap recap" aria-label=${vm.regions.recap} tabindex="-1" data-rest>
          <h2 class="rh" data-testid="recap-heading">${vm.heading}</h2>
          ${
            vm.figures.length === 0
              ? nothing
              : html`<dl class="figures" data-testid="figures">
                  ${vm.figures.map(
                    (figure) => html`
                      <div class="figure">
                        <dt>${figure.label}</dt>
                        <dd>${figure.value}</dd>
                      </div>
                    `,
                  )}
                </dl>`
          }
          ${
            vm.steps.length === 0
              ? nothing
              : html`<ol class="shutdown" data-testid="shutdown">
                  ${vm.steps.map(
                    (step) => html`
                      <li>
                        <span class="k">${step.label}</span> ${step.process}
                        <span class="done">${step.done}</span>
                      </li>
                    `,
                  )}
                </ol>`
          }
          <p class="closing" data-testid="closing">${vm.closing}</p>
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
