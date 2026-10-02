import { html, nothing, render, type TemplateResult } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat.js';
import type { OptionVM } from '#ui/OptionVM.ts';
import type { View } from '#ui/View.ts';
import type { BufferVM } from './BufferVM.ts';

/**
 * Draws the buffer screen with lit-html: the heading with its chips, a tile per fragment — the tile is its pick, the
 * drop a small key in its corner — and a dock with the way back. Every word comes from the view-model
 * (`BufferPresenter` owns them); this file owns markup only. Tiles are keyed by their fragment and position, so a
 * merge removes two nodes and adds one, which arrives marked fresh for the stylesheet to greet and as the spot the
 * shell scrolls to and focuses, so the hybrid is seen where it lands. The block is the resting place for the focus (`data-rest`). The note line here is for the eye; the
 * shell's own live region speaks the status.
 */
export class BufferView implements View<BufferVM> {
  #container: HTMLElement | undefined;
  /** The fragments shown last: a tile not among them is fresh — a hybrid just merged, nothing on the first render. */
  #shown = new Set<string>();

  mount(container: HTMLElement): void {
    this.#container = container;
  }

  render(vm: BufferVM): void {
    if (this.#container === undefined) throw new Error('BufferView.render before mount');
    const fresh = new Set(
      this.#shown.size === 0 ? [] : vm.rows.filter((row) => !this.#shown.has(row.key)).map((row) => row.key),
    );
    this.#shown = new Set(vm.rows.map((row) => row.key));
    render(this.#template(vm, fresh), this.#container);
  }

  dispose(): void {
    if (this.#container !== undefined) render(nothing, this.#container);
    this.#container = undefined;
    this.#shown = new Set();
  }

  #template(vm: BufferVM, fresh: ReadonlySet<string>): TemplateResult {
    return html`
      <div class="app buffer" data-frame=${vm.frame}>
        <header class="bar"><h1>${vm.title}</h1></header>
        <section class="cap trace" aria-label=${vm.regions.buffer} tabindex="-1" data-rest>
          <h2 class="rh" data-testid="buffer-heading">${vm.heading}</h2>
          <p class="chips">
            <span class="chip"
              ><span class="k">${vm.count.label}</span>
              <b data-testid="buffer-count">${vm.count.value}</b></span
            >
            <span class="chip"
              ><span class="k">${vm.tally.label}</span>
              <b data-testid="resonant-traces">${vm.tally.value}</b></span
            >
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
                      <li
                        class="frag"
                        data-fragment=${row.key}
                        data-phase=${row.phaseKey}
                        ?data-selected=${row.selected}
                        ?data-resonant=${row.resonant}
                        ?data-fresh=${fresh.has(row.key)}
                      >
                        <button
                          type="button"
                          class="pick"
                          data-option=${row.pick.id}
                          aria-pressed=${row.selected ? 'true' : 'false'}
                          aria-label=${row.pick.label}
                          ?data-spot=${fresh.has(row.key)}
                        >
                          <span class="ftop" aria-hidden="true">
                            <i class="gem"></i>
                            <span class="ord">${row.ordinal}</span>
                          </span>
                          <span class="fname" aria-hidden="true">${row.name}</span>
                          <span class="meter" aria-hidden="true">
                            ${Array.from({ length: row.signal.cells }, (_, cell) =>
                              row.signal.lit > cell ? html`<i data-lit></i>` : html`<i></i>`,
                            )}
                          </span>
                          <span class="fmeta" aria-hidden="true">
                            <span class="hz">${row.hertz}</span>
                            <i class="dot"></i>
                            <span class="ph">${row.phase}</span>
                          </span>
                          ${row.resonantLabel === '' ? nothing : html`<span class="vh">${row.resonantLabel}</span>`}
                          ${row.selectedLabel === '' ? nothing : html`<span class="vh">${row.selectedLabel}</span>`}
                        </button>
                        ${
                          row.drop === null
                            ? nothing
                            : html`<button
                                type="button"
                                class="drop"
                                data-option=${row.drop.id}
                                aria-label=${row.drop.label}
                              ></button>`
                        }
                      </li>
                    `,
                  )}
                </ol>`
          }
          <p class="hint">${vm.hint}</p>
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
