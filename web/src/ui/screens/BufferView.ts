import { html, nothing, render, type TemplateResult } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat.js';
import type { OptionVM } from '#ui/OptionVM.ts';
import type { View } from '#ui/View.ts';
import type { BufferVM } from './BufferVM.ts';

/**
 * Draws the buffer screen with lit-html: the old overlay's block — heading, count, one line per fragment
 * with its buttons — and a dock with the way back. Every word comes from the view-model (`BufferPresenter`
 * owns them); this file owns markup only. Rows are keyed by their fragment and position, so a merge
 * removes two nodes and adds one and the shell's focus rule applies. The block is the resting place for
 * the focus (`data-rest`). The note line here is for the eye; the shell's own live region speaks the status.
 */
export class BufferView implements View<BufferVM> {
  #container: HTMLElement | undefined;

  mount(container: HTMLElement): void {
    this.#container = container;
  }

  render(vm: BufferVM): void {
    if (this.#container === undefined) throw new Error('BufferView.render before mount');
    render(this.#template(vm), this.#container);
  }

  dispose(): void {
    if (this.#container !== undefined) render(nothing, this.#container);
    this.#container = undefined;
  }

  #template(vm: BufferVM): TemplateResult {
    return html`
      <div class="app buffer" data-frame=${vm.frame}>
        <header class="bar"><h1>${vm.title}</h1></header>
        <section class="cap trace" aria-label=${vm.regions.buffer} tabindex="-1" data-rest>
          <h2 class="rh" data-testid="buffer-heading">${vm.heading}</h2>
          <p class="bcount">
            <span class="k">${vm.count.label}</span> <b data-testid="buffer-count">${vm.count.value}</b>
            <span class="k">${vm.tally.label}</span> <b data-testid="resonant-traces">${vm.tally.value}</b>
          </p>
          ${vm.empty === '' ? nothing : html`<p class="empty" data-testid="buffer-empty">${vm.empty}</p>`}
          ${
            vm.rows.length === 0
              ? nothing
              : html`<ol class="frags" data-testid="fragments">
                  ${repeat(
                    vm.rows,
                    (row) => `${row.ordinal}/${row.key}`,
                    (row) => html`
                      <li class=${row.selected ? 'frag selected' : 'frag'} data-fragment=${row.key}>
                        <p class="fline">
                          <span class="ord">${row.ordinal}</span>
                          <span class="hz">${row.hertz}</span>
                          <span class="sig" data-phase=${row.phaseKey} aria-hidden="true">${row.bar}</span>
                          <span class="ph" data-phase=${row.phaseKey}>[${row.phase}]</span>
                        </p>
                        <p class="fname">
                          <b>${row.name}</b>
                          ${
                            row.badge === null
                              ? nothing
                              : html`<span class="badge" aria-hidden="true">${row.badge.text}</span
                                  ><span class="vh">${row.badge.label}</span>`
                          }
                          ${row.selectedLabel === '' ? nothing : html`<span class="vh">${row.selectedLabel}</span>`}
                        </p>
                        <p class="facts">
                          ${repeat(
                            row.actions,
                            (option) => option.id,
                            (option) => this.#button(option, 'pb fb'),
                          )}
                        </p>
                      </li>
                    `,
                  )}
                </ol>`
          }
          <p class="hint">${vm.hint}</p>
          <p class="tl">${vm.sync}</p>
          <p class=${vm.note === '' ? 'status quiet' : 'status'} data-testid="status">${vm.note}</p>
        </section>
        <nav class="dock" aria-label=${vm.regions.actions}>
          ${repeat(
            vm.dock,
            (option) => option.id,
            (option) => this.#button(option, 'pb'),
          )}
        </nav>
        <footer class="build" data-testid="build">${vm.build}</footer>
      </div>
    `;
  }

  #button(option: OptionVM, className: string): TemplateResult {
    return html`
      <button type="button" class=${className} data-option=${option.id}>
        ${option.key === '' ? nothing : html`<kbd aria-hidden="true">${option.key}</kbd>`}<span
          >${option.label}</span
        >
      </button>
    `;
  }
}
