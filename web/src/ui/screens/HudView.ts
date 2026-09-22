import { html, nothing, render, type TemplateResult } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat.js';
import type { OptionVM } from '#ui/OptionVM.ts';
import type { View } from '#ui/View.ts';
import type { HudVM } from './HudVM.ts';
import type { TravelRowVM } from './TravelRowVM.ts';

/**
 * Draws the world screen with lit-html: the HUD (path and stats), the narrative panel, the list of places
 * to enter, and a dock that stays within reach of a thumb. Every word comes from the view-model
 * (`HudPresenter` owns them); this file owns markup only. An open row is a real button carrying
 * `data-option`; a sealed row is a closed line — never a button that does nothing; a row's readings ride
 * beside its name. The moves a place offers are a strip of buttons under the panel. The panel is the
 * screen's resting place for the focus (`data-rest`, focusable by script only): where the shell puts it
 * when a ride ends. The status line here is for the eye; the shell's own live region speaks it. Rows are keyed by
 * scene, so a new place gets new nodes and the shell's focus rule applies. Dock buttons are keyed by their
 * option alone: LEAVE is the same button one level up, so it keeps the focus and Enter climbs again.
 */
export class HudView implements View<HudVM> {
  #container: HTMLElement | undefined;

  mount(container: HTMLElement): void {
    this.#container = container;
  }

  render(vm: HudVM): void {
    if (this.#container === undefined) throw new Error('HudView.render before mount');
    render(this.#template(vm), this.#container);
  }

  dispose(): void {
    if (this.#container !== undefined) render(nothing, this.#container);
    this.#container = undefined;
  }

  #template(vm: HudVM): TemplateResult {
    return html`
      <div class="app world" data-frame=${vm.frame}>
        <header class="bar"><h1>${vm.title}</h1></header>
        <section class="hud" aria-label=${vm.regions.hud}>
          <nav aria-label=${vm.regions.path}>
            <ol class="spark" data-testid="path">
              ${vm.crumbs.map(
                (crumb) => html`
                  <li class=${crumb.current ? 'crumb you' : 'crumb'}>
                    <span class="vh">${crumb.kind}</span
                    ><span class="ic" aria-hidden="true">${crumb.icon}</span
                    ><span class="cn" aria-current=${crumb.current ? 'location' : nothing}
                      >${crumb.name}</span
                    >
                  </li>
                `,
              )}
            </ol>
          </nav>
          <dl class="stats">
            ${vm.stats.map(
              (stat) => html`
                <div class="stat">
                  <dt>${stat.label}</dt>
                  <dd>${stat.value}</dd>
                </div>
              `,
            )}
          </dl>
        </section>
        <section class="cap" aria-label=${vm.regions.place} tabindex="-1" data-rest>
          <p class="eyebrow" data-testid="place-kind">${vm.place.eyebrow}</p>
          <h2>
            <span class="ic" aria-hidden="true">${vm.place.icon}</span
            ><span data-testid="place-name">${vm.place.name}</span>
          </h2>
          <ul class="tags">
            ${vm.place.tags.map(
              (tag) => html`
                <li class="tag" data-fact=${tag.key}><span class="k">${tag.label}</span> ${tag.value}</li>
              `,
            )}
          </ul>
          <div class="desc">${vm.place.description.map((paragraph) => html`<p>${paragraph}</p>`)}</div>
          ${
            vm.place.rows.length === 0
              ? nothing
              : html`<dl class="prows">
                  ${vm.place.rows.map(
                    (row) => html`
                      <div class="prow">
                        <dt>${row.label}</dt>
                        <dd>${row.value}</dd>
                      </div>
                    `,
                  )}
                </dl>`
          }
          <p class="diag">${vm.place.diagnostic}</p>
          <p class=${vm.status === '' ? 'status quiet' : 'status'} data-testid="status">${vm.status}</p>
        </section>
        ${
          vm.moves.length === 0
            ? nothing
            : html`
                <nav class="moves" aria-label=${vm.regions.moves}>
                  ${repeat(
                    vm.moves,
                    (option) => option.id,
                    (option) => this.#docked(option),
                  )}
                </nav>
              `
        }
        <div class="side">
          <section class="travel" aria-label=${vm.regions.travel}>
            <h3 class="heading">${vm.heading}</h3>
            ${vm.sealedNote === null ? nothing : html`<p class="sealed-note" data-testid="sealed-note">${vm.sealedNote}</p>`}
            <ol class="rows">
              ${repeat(
                vm.rows,
                (row) => `${vm.scene}/${row.id}`,
                (row) => this.#row(row, vm.sealedTag),
              )}
            </ol>
          </section>
          ${this.#aside(vm)}
        </div>
        <nav class="dock" aria-label=${vm.regions.dock}>
          ${repeat(
            vm.dock,
            (option) => option.id,
            (option) => this.#docked(option),
          )}
        </nav>
        <footer class="build" data-testid="build">${vm.build}</footer>
      </div>
    `;
  }

  /** The objects of a room as tiles (a list, not buttons: nothing is taken yet) and the telemetry block. */
  #aside(vm: HudVM): TemplateResult | typeof nothing {
    const { objects, telemetry } = vm.aside;
    if (objects === null && telemetry === null) return nothing;
    return html`
      <aside class="aside" aria-label=${vm.regions.aside}>
        ${
          objects === null
            ? nothing
            : html`
                <section class="objects" data-testid="objects">
                  <h3 class="heading">${objects.heading}</h3>
                  ${objects.empty === '' ? nothing : html`<p class="empty">${objects.empty}</p>`}
                  ${
                    objects.tiles.length === 0
                      ? nothing
                      : html`<ul class="tiles">
                          ${objects.tiles.map(
                            (tile) => html`<li class="tile" data-relic=${tile.key}>${tile.name}</li>`,
                          )}
                        </ul>`
                  }
                </section>
              `
        }
        ${
          telemetry === null
            ? nothing
            : html`
                <section class="tele" data-testid="telemetry">
                  <p class="th">${telemetry.heading}</p>
                  <p class="tl">${telemetry.sync}</p>
                  <p class="th">${telemetry.spectrogram.heading}</p>
                  <p class="bars" aria-hidden="true">
                    ${telemetry.spectrogram.bars.map((bar) => html`<span>${bar}</span>`)}
                  </p>
                  <p class="th">${telemetry.logs.heading}</p>
                  ${telemetry.logs.lines.map((line) => html`<p class="tl">${line}</p>`)}
                </section>
              `
        }
      </aside>
    `;
  }

  #row(row: TravelRowVM, sealedTag: string): TemplateResult {
    const name = row.landmark ? 'lb landmark' : 'lb';
    if (row.sealed) {
      return html`
        <li class="row sealed" data-sealed>
          <span class="ord">${row.ordinal}</span><span class=${name}>${row.label}</span
          ><span class="seal">${sealedTag}</span>
        </li>
      `;
    }
    return html`
      <li>
        <button type="button" class=${row.mark === null ? 'row' : 'row you'} data-option=${row.id}>
          <span class="ord">${row.ordinal}</span
          ><span class="mid"
            ><span class="ln"
              ><span class=${name}>${row.label}</span>${
                row.mark === null
                  ? nothing
                  : html`<span class="mark" aria-hidden="true">${row.mark.text}</span
                      ><span class="vh">${row.mark.label}</span>`
              }</span
            >${
              row.readings.length === 0
                ? nothing
                : html`<span class="rds"
                    >${row.readings.map(
                      (reading) => html`
                        <span class="rd" data-fact=${reading.key}
                          ><span class="vh">${reading.label}</span>${reading.value}</span
                        >
                      `,
                    )}</span
                  >`
            }</span
          >${row.key === '' ? nothing : html`<kbd aria-hidden="true">${row.key}</kbd>`}
        </button>
      </li>
    `;
  }

  #docked(option: OptionVM): TemplateResult {
    return html`
      <button type="button" class="pb" data-option=${option.id}>
        ${option.key === '' ? nothing : html`<kbd aria-hidden="true">${option.key}</kbd>`}<span
          >${option.label}</span
        >
      </button>
    `;
  }
}
