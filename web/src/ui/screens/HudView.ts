import { html, nothing, render, type TemplateResult } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat.js';
import { CanvasSlots } from '#ui/canvas/CanvasSlots.ts';
import { CanvasView } from '#ui/canvas/CanvasView.ts';
import { MapPicture } from '#ui/canvas/MapPicture.ts';
import { TracePicture } from '#ui/canvas/TracePicture.ts';
import type { TracePictureVM } from '#ui/canvas/TracePictureVM.ts';
import type { OptionVM } from '#ui/OptionVM.ts';
import type { MotionClock } from '#ui/scene/MotionClock.ts';
import type { ScenePicture } from '#ui/scene/ScenePicture.ts';
import type { SceneRegistry } from '#ui/scene/SceneRegistry.ts';
import { SceneView } from '#ui/scene/SceneView.ts';
import type { SceneVM } from '#ui/scene/SceneVM.ts';
import type { View } from '#ui/View.ts';
import type { HudVM } from './HudVM.ts';
import type { MapPanelVM } from './MapPanelVM.ts';
import type { TravelRowVM } from './TravelRowVM.ts';

/** The three canvases the screen may carry, each in a host `<div data-canvas>` the template keeps or drops. */
type Slot = 'pane' | 'map' | 'trace';

/**
 * Draws the world screen with lit-html: the HUD (the meter and the readouts), the depth rail, the narrative
 * panel, the list of places to enter, and a dock that stays within reach of a thumb. Every word comes from the view-model
 * (`HudPresenter` owns them); this file owns markup only. An open row is a real button carrying
 * `data-option`; a sealed row is a closed line — never a button that does nothing; a row's readings ride
 * beside its name; a place that lists nothing has no list (the pane beside it takes the column). The moves a place offers are a strip of buttons under the panel. The coherence meter is a
 * `role="meter"` whose fill is a width the stylesheet animates (nodes survive a render). The panel is the
 * screen's resting place for the focus (`data-rest`, focusable by script only): where the shell puts it
 * when a ride ends. The status line here is for the eye; the shell's own live region speaks it. Rows are keyed by
 * scene, so a new place gets new nodes and the shell's focus rule applies. Dock buttons are keyed by their
 * option alone: LEAVE is the same button one level up, so it keeps the focus and Enter climbs again. The
 * dock folds after `fold.after` buttons behind one MORE button on a phone — a disclosure of this view, not of
 * the game, folded again by the next step (I09); the stylesheet unfolds it on a desktop, so every button is
 * always in the markup and a key always works. The depth rail (U01a) is a list, not buttons: a glyph per
 * level, its kind and name read out (a phone shows the glyphs, a desktop the names too). The moves a place
 * offers sit under its title, so the first screen of a phone shows one (I09). The debug strip (Decision 8)
 * sits last, folded behind one DEBUG button, every one of its buttons out of the tab order. The drawn map and trace
 * are canvases mounted into host elements the template keeps alive (`CanvasSlots`); their words sit beside
 * them for a reader. A place whose drawing key has a registered picture is drawn (U01b): the scene host sits
 * with the card (`data-drawn` lets the stylesheet put the picture and the list under the name on a phone),
 * the list is its twin — a row pointed at or focused lights its building, a building pointed at lights its
 * row (`data-lit`) — and coming back out of a child the picture zooms out of it: the view keeps the last
 * address it showed for its lifetime. A key with no picture leaves the screen as it was.
 */
export class HudView implements View<HudVM> {
  #container: HTMLElement | undefined;
  #vm: HudVM | undefined;
  /** The dock's fold: open until the next step (I09), which folds it again. */
  #more = false;
  /** The debug strip's fold (I09): closed until the tester opens it, then open until the screen goes. */
  #debugOpen = false;
  readonly #canvases: CanvasSlots<{
    pane: MapPanelVM['picture'];
    map: MapPanelVM['picture'];
    trace: TracePictureVM;
  }>;
  readonly #clock: MotionClock;
  readonly #scenes: SceneRegistry;
  /** The scene drawn now: its host, its picture and the view drawing it. */
  #scene:
    | { readonly host: HTMLElement; readonly picture: ScenePicture<SceneVM>; readonly view: SceneView }
    | undefined;
  /** The child lit in the picture and the list, by its option id; empty when none. */
  #lit = '';
  /** The address of the last place shown: the child it lies in is the one the picture zooms out of. */
  #last: string | undefined;

  /** The page's one clock moves every canvas of the screen; the registry says which places are drawn (U01b). */
  constructor(clock: MotionClock, scenes: SceneRegistry) {
    this.#clock = clock;
    this.#scenes = scenes;
    this.#canvases = new CanvasSlots({
      pane: () => new CanvasView(new MapPicture(), clock),
      map: () => new CanvasView(new MapPicture(), clock),
      trace: () => new CanvasView(new TracePicture(), clock),
    });
  }

  mount(container: HTMLElement): void {
    this.#container = container;
  }

  /** A step's render: the dock folds again; the view's other toggles keep their state. */
  render(vm: HudVM): void {
    this.#more = false;
    if (vm.scene !== this.#vm?.scene) this.#lit = '';
    this.#paint(vm);
    const last = this.#last;
    const from =
      last === undefined || last === vm.drawing.address
        ? undefined
        : vm.drawing.children.find(
            (child) =>
              child.address !== '' && (last === child.address || last.startsWith(`${child.address}.`)),
          );
    if (from !== undefined) this.#scene?.view.arrive(from.id);
    this.#last = vm.drawing.address;
  }

  #paint(vm: HudVM): void {
    if (this.#container === undefined) throw new Error('HudView.render before mount');
    this.#vm = vm;
    render(this.#template(vm), this.#container);
    this.#canvases.bind('pane', this.#host('pane'), vm.aside.map?.picture ?? null);
    this.#canvases.bind('map', this.#host('map'), vm.map?.picture ?? null);
    this.#canvases.bind('trace', this.#host('trace'), vm.trace?.picture ?? null);
    this.#bindScene(vm.drawing);
  }

  /** The scene's view in its host: kept while the host and the picture stay, else made anew; gone with its host. */
  #bindScene(drawing: SceneVM): void {
    const host = this.#host('scene');
    const picture = this.#scenes.picture(drawing.key);
    if (host === null || picture === undefined) {
      this.#scene?.view.dispose();
      this.#scene = undefined;
      return;
    }
    if (this.#scene?.host !== host || this.#scene.picture !== picture) {
      this.#scene?.view.dispose();
      const view = new SceneView(picture, this.#clock);
      view.mount(host);
      this.#scene = { host, picture, view };
    }
    this.#scene.view.render(drawing);
    this.#scene.view.light(this.#lit);
  }

  /** A child pointed at in the picture or the list: both light it; nothing re-renders when nothing changed. */
  #light(id: string): void {
    if (id === this.#lit || this.#scene === undefined) return;
    this.#lit = id;
    this.#scene.view.light(id);
    if (this.#vm !== undefined && this.#container !== undefined)
      render(this.#template(this.#vm), this.#container);
  }

  dispose(): void {
    this.#scene?.view.dispose();
    this.#scene = undefined;
    this.#lit = '';
    this.#canvases.dispose();
    if (this.#container !== undefined) render(nothing, this.#container);
    this.#container = undefined;
    this.#vm = undefined;
    this.#more = false;
    this.#debugOpen = false;
  }

  #host(slot: Slot | 'scene'): HTMLElement | null {
    return this.#container?.querySelector(`[data-canvas="${slot}"]`) ?? null;
  }

  #toggleMore(): void {
    this.#more = !this.#more;
    if (this.#vm !== undefined) this.#paint(this.#vm);
  }

  #toggleDebug(): void {
    this.#debugOpen = !this.#debugOpen;
    if (this.#vm !== undefined) this.#paint(this.#vm);
  }

  #template(vm: HudVM): TemplateResult {
    const drawn = this.#scenes.picture(vm.drawing.key) !== undefined;
    return html`
      <div class="app world" data-frame=${vm.frame} data-band=${vm.meter.band} ?data-drawn=${drawn}>
        <section class="hud" aria-label=${vm.regions.hud}>
          <h1 class="brand">${vm.title}</h1>
          <div class="meter" data-band=${vm.meter.band} data-testid="meter">
            <span class="ml">${vm.meter.label}</span
            ><span
              class="cohbar"
              role="meter"
              aria-label=${vm.meter.label}
              aria-valuemin=${vm.meter.min}
              aria-valuemax=${vm.meter.max}
              aria-valuenow=${vm.meter.value}
              aria-valuetext=${vm.meter.valueText}
              ><i style=${`width:${String(vm.meter.value)}%`}></i
            ></span>
            <b class="mv" data-testid="coherence">${vm.meter.text}</b>
            <span class="mb" data-testid="band">${vm.meter.bandLabel}</span>
          </div>
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
        <nav class="rail" aria-label=${vm.regions.path}>
          <ol data-testid="path">
            ${vm.rail.map(
              (level) => html`
                <li class=${level.current ? 'crumb you' : 'crumb'}>
                  <span class="vh">${level.kind}</span><span class="ic" aria-hidden="true">${level.icon}</span
                  ><span class="cn" aria-current=${level.current ? 'location' : nothing}>${level.name}</span>
                </li>
              `,
            )}
          </ol>
        </nav>
        <section class="cap" aria-label=${vm.regions.place} tabindex="-1" data-rest>
          <div class="head">
            <p class="eyebrow" data-testid="place-kind">${vm.place.eyebrow}</p>
            <h2>
              <span class="ic" aria-hidden="true">${vm.place.icon}</span
              ><span data-testid="place-name">${vm.place.name}</span>
            </h2>
          </div>
          <div class="body">
            <ul class="tags">
              ${
                vm.place.position === null
                  ? nothing
                  : html`<li class="chip pos">
                      <span class="k">${vm.place.position.label}</span> ${vm.place.position.value}
                    </li>`
              }
              ${vm.place.tags.map(
                (tag) => html`
                  <li class="tag" data-fact=${tag.key}><span class="k">${tag.label}</span> ${tag.value}</li>
                `,
              )}
            </ul>
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
            ${vm.place.diagnostic === '' ? nothing : html`<p class="diag">${vm.place.diagnostic}</p>`}
            <p class=${vm.status === '' ? 'status quiet' : 'status'} data-testid="status">${vm.status}</p>
          </div>
        </section>
        ${
          drawn
            ? html`<div
                class="scene"
                data-testid="scene"
                data-canvas="scene"
                role="img"
                aria-label=${vm.drawing.label}
                data-lit=${this.#lit}
                @light=${(event: Event) => {
                  this.#light(this.#litOf(event));
                }}
              ></div>`
            : nothing
        }
        ${this.#scan(vm)} ${vm.map === null ? nothing : this.#map(vm.map, 'map', 'map', vm.regions.map)}
        ${this.#trace(vm)}
        <div class="side">
          ${
            vm.rows.length === 0
              ? nothing
              : html`
                  <section class="travel" aria-label=${vm.regions.travel}>
                    <h3 class="heading">${vm.heading}</h3>
                    ${vm.sealedNote === null ? nothing : html`<p class="sealed-note" data-testid="sealed-note">${vm.sealedNote}</p>`}
                    <ol class="rows">
                      ${repeat(
                        vm.rows,
                        (row) => `${vm.scene}/${row.id}`,
                        (row) => this.#row(row, vm.sealedTag, drawn),
                      )}
                    </ol>
                  </section>
                `
          }
          ${this.#aside(vm)}
        </div>
        <nav class="dock" aria-label=${vm.regions.dock} data-open=${this.#more ? 'true' : 'false'}>
          ${repeat(
            vm.dock.slice(0, vm.fold.after),
            (option) => option.id,
            (option) => this.#docked(option),
          )}
          ${
            vm.dock.length <= vm.fold.after
              ? nothing
              : html`
                  <button
                    type="button"
                    class="pb more"
                    data-testid="more"
                    aria-label=${vm.fold.label}
                    aria-expanded=${this.#more ? 'true' : 'false'}
                    aria-controls="dock-fold"
                    @click=${() => {
                      this.#toggleMore();
                    }}
                  >
                    <span>${this.#more ? vm.fold.less : vm.fold.more}</span>
                  </button>
                  <div class="fold" id="dock-fold">
                    ${repeat(
                      vm.dock.slice(vm.fold.after),
                      (option) => option.id,
                      (option) => this.#docked(option),
                    )}
                  </div>
                `
          }
        </nav>
        ${
          vm.debug.length === 0
            ? nothing
            : html`
                <nav
                  class="debug"
                  aria-label=${vm.regions.debug}
                  data-testid="debug"
                  data-open=${this.#debugOpen ? 'true' : 'false'}
                >
                  <button
                    type="button"
                    class="pb dbg"
                    data-testid="debug-toggle"
                    tabindex="-1"
                    aria-expanded=${this.#debugOpen ? 'true' : 'false'}
                    aria-controls="debug-fold"
                    @click=${() => {
                      this.#toggleDebug();
                    }}
                  >
                    <span>${vm.debugToggle}</span>
                  </button>
                  <div class="fold" id="debug-fold">
                    ${repeat(
                      vm.debug,
                      (option) => option.id,
                      (option) => this.#docked(option, -1),
                    )}
                  </div>
                </nav>
              `
        }
        <footer class="build" data-testid="build">${vm.build}</footer>
      </div>
    `;
  }

  /** The last scan's panel: its title, its notes, one row per reading with labelled cells and the sensory line under it. */
  #scan(vm: HudVM): TemplateResult | typeof nothing {
    const scan = vm.scan;
    if (scan === null) return nothing;
    return html`
      <section class="scan" data-testid="scan" aria-label=${scan.label} tabindex="-1" data-spot>
        <h3 class="heading">${scan.heading}</h3>
        ${scan.notes.map((note) => html`<p class="tl">${note}</p>`)}
        <ol class="srows">
          ${scan.rows.map(
            (row) => html`
              <li class=${row.mark === null ? 'srow' : 'srow you'}>
                <p class="cells">
                  ${
                    row.mark === null
                      ? nothing
                      : html`<span class="mark" aria-hidden="true">${row.mark.text}</span
                          ><span class="vh">${row.mark.label}</span>`
                  }${row.cells.map(
                    (cell) => html`
                      <span class="cell" data-fact=${cell.key}
                        ><span class="k">${cell.label}</span> ${cell.value}</span
                      >
                    `,
                  )}
                </p>
                ${row.note === '' ? nothing : html`<p class="snote">${row.note}</p>`}
              </li>
            `,
          )}
        </ol>
      </section>
    `;
  }

  /**
   * A drawn map: the canvas in its host, the origin line under it, and — for a reader only — the summary
   * as the picture's name and every node as a list item. The MAP panel is a spotlight (the shell scrolls
   * to it and focuses it); the pane's map is furniture.
   */
  #map(map: MapPanelVM, slot: Slot, testId: string, region: string): TemplateResult {
    return html`
      <section
        class=${slot === 'pane' ? 'map pane' : 'map'}
        data-testid=${testId}
        aria-label=${region}
        tabindex=${slot === 'pane' ? nothing : '-1'}
        ?data-spot=${slot !== 'pane'}
      >
        <h3 class="heading">${map.heading}</h3>
        <div class="cv" data-canvas=${slot} role="img" aria-label=${map.summary}></div>
        <p class="tl">${map.origin}</p>
        <ul class="vh">
          ${map.nodes.map((node) => html`<li>${node.glyph} ${node.name}, ${node.note}</li>`)}
        </ul>
      </section>
    `;
  }

  /** The drawn trace: the canvas in its host, and the same rows as lines for a reader only. */
  #trace(vm: HudVM): TemplateResult | typeof nothing {
    const trace = vm.trace;
    if (trace === null) return nothing;
    return html`
      <section class="tracep" data-testid="trace" aria-label=${vm.regions.trace} tabindex="-1" data-spot>
        <h3 class="heading">${trace.heading}</h3>
        <div class="cv" data-canvas="trace" role="img" aria-label=${trace.label}></div>
        <ol class="vh">
          ${trace.lines.map((line) => html`<li>${line}</li>`)}
        </ol>
      </section>
    `;
  }

  /** The objects of a room as tiles — a button each while the buffer has room, a plain tile otherwise — the telemetry block, or the map. */
  #aside(vm: HudVM): TemplateResult | typeof nothing {
    const { objects, telemetry, map } = vm.aside;
    if (objects === null && telemetry === null && map === null) return nothing;
    return html`
      <aside class="aside" aria-label=${vm.regions.aside}>
        ${
          objects === null
            ? nothing
            : html`
                <section class="objects" data-testid="objects" aria-label=${objects.label}>
                  <h3 class="heading">${objects.heading}</h3>
                  ${objects.empty === '' ? nothing : html`<p class="empty">${objects.empty}</p>`}
                  ${objects.note === '' ? nothing : html`<p class="empty" data-testid="buffer-full">${objects.note}</p>`}
                  ${
                    objects.tiles.length === 0
                      ? nothing
                      : html`<ul class="tiles">
                          ${repeat(
                            objects.tiles,
                            (tile) => `${vm.scene}/${tile.ordinal}`,
                            (tile) =>
                              tile.action === null
                                ? html`<li class="tile" data-relic=${tile.key}>
                                    <span class="ord">${tile.ordinal}</span>${tile.name}
                                  </li>`
                                : html`<li>
                                    <button
                                      type="button"
                                      class="tile take"
                                      data-option=${tile.action.id}
                                      data-relic=${tile.key}
                                      aria-label=${tile.action.label}
                                    >
                                      <span class="ord" aria-hidden="true">${tile.ordinal}</span
                                      ><span aria-hidden="true">${tile.name}</span>
                                    </button>
                                  </li>`,
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
                <section class="tele" data-testid="telemetry" aria-label=${telemetry.label}>
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
        ${map === null ? nothing : this.#map(map, 'pane', 'pane-map', map.label)}
      </aside>
    `;
  }

  /** The id a scene's `light` event carries; empty when it carries none. */
  #litOf(event: Event): string {
    const detail: unknown = event instanceof CustomEvent ? event.detail : undefined;
    const id = typeof detail === 'object' && detail !== null && 'id' in detail ? detail.id : '';
    return typeof id === 'string' ? id : '';
  }

  #row(row: TravelRowVM, sealedTag: string, drawn: boolean): TemplateResult {
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
        <button
          type="button"
          class=${['row', row.mark === null ? '' : 'you', row.seen === null ? '' : 'seen'].join(' ').trim()}
          data-option=${row.id}
          ?data-lit=${drawn && this.#lit === row.id}
          @pointerenter=${() => {
            this.#light(row.id);
          }}
          @pointerleave=${() => {
            this.#light('');
          }}
          @focus=${() => {
            this.#light(row.id);
          }}
          @blur=${() => {
            this.#light('');
          }}
        >
          <span class="ord">${row.ordinal}</span
          ><span class="mid"
            ><span class="ln"
              ><span class=${name}>${row.label}</span>${
                row.mark === null
                  ? nothing
                  : html`<span class="mark" aria-hidden="true">${row.mark.text}</span
                      ><span class="vh">${row.mark.label}</span>`
              }${
                row.seen === null
                  ? nothing
                  : html`<span class="seen-mark" aria-hidden="true">${row.seen.text}</span
                      ><span class="vh">${row.seen.label}</span>`
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

  /** A dock-style button; a `tabIndex` of −1 keeps it out of the tab order (the debug tools, I09). */
  #docked(option: OptionVM, tabIndex?: number): TemplateResult {
    return html`
      <button type="button" class="pb" data-option=${option.id} tabindex=${tabIndex ?? nothing}>
        ${option.key === '' ? nothing : html`<kbd aria-hidden="true">${option.key}</kbd>`}<span
          >${option.label}</span
        >
      </button>
    `;
  }
}
