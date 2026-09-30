import { html, nothing, render, type TemplateResult } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat.js';
import { CanvasSlots } from '#ui/canvas/CanvasSlots.ts';
import type { Dive } from '#ui/scene/Dive.ts';
import type { TraceBands } from '#ui/scene/TraceBands.ts';
import type { OptionVM } from '#ui/OptionVM.ts';
import type { ChildMark } from '#ui/scene/ChildMark.ts';
import { MarkedChild } from '#ui/scene/MarkedChild.ts';
import { NoChild } from '#ui/scene/NoChild.ts';
import type { Sketch } from '#ui/scene/Sketch.ts';
import type { View } from '#ui/View.ts';
import type { CanvasViews } from './CanvasViews.ts';
import type { DrawnStage } from './DrawnStage.ts';
import type { HudVM } from './HudVM.ts';
import type { MapPanelVM } from './MapPanelVM.ts';
import type { TravelRowVM } from './TravelRowVM.ts';
import type { PictureBook } from './PictureBook.ts';
import { Retrace } from './Retrace.ts';
import { statTestId } from './StatKey.ts';

/** The three canvases the screen may carry, each in a host `<div data-canvas>` the template keeps or drops. */
type Slot = 'pane' | 'map';

/**
 * Draws the world screen with lit-html: the HUD (the meter and the readouts), the depth rail, the narrative
 * panel, the list of places to enter, and a dock that stays within reach of a thumb. Every word comes from the view-model
 * (`HudPresenter` owns them); this file owns markup only. An open row is a real button carrying
 * `data-option`; a sealed row is a closed line — never a button that does nothing; a row's readings ride
 * beside its name; a place that lists nothing has no list (the pane beside it takes the column). The moves a place offers are a strip of buttons under the panel, or sit in the dock (a room, U03c). The coherence meter is a
 * `role="meter"` whose fill is a width the stylesheet animates (nodes survive a render). The panel is the
 * screen's resting place for the focus (`data-rest`, focusable by script only): where the shell puts it
 * when a ride ends. The status line here is for the eye; the shell's own live region speaks it. Rows are keyed by
 * scene, so a new place gets new nodes and the shell's focus rule applies. Dock buttons are keyed by their
 * option alone: LEAVE is the same button one level up, so it keeps the focus and Enter climbs again. The
 * dock folds after `fold.after` buttons (the way out, marked, and a room's moves) behind one MORE button — a disclosure of this view, not of the game,
 * folded again by the next step (I09); every button is always in the markup, so a key always works. The depth rail (U01a) is a list: a glyph per
 * level, its kind and name read out (the glyphs are shown), under one button that runs TRACE (U04), out of the tab order. The moves a place
 * offers sit under its title, so the first screen of a phone shows one (I09), or in the dock's row (U03c). The debug strip (Decision 8)
 * sits last, folded behind one DEBUG button, every one of its buttons out of the tab order. The drawn maps (the pane's and MAP's)
 * are canvases mounted into host elements the template keeps alive (`CanvasSlots`); their words sit beside
 * them for a reader. A place whose drawing key has a registered picture is drawn (U01b): the scene host sits
 * with the card (`data-drawn` lets the stylesheet put the picture and the list under the name on a phone),
 * the list is its twin — a row pointed at or focused lights its building, a building pointed at lights its
 * row (`data-lit`) — and coming back out of a child the picture zooms out of it: the view keeps the path to the
 * last place it showed for its lifetime (`Retrace`). A key with no picture leaves the screen as it was.
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
  }>;
  readonly #book: PictureBook;
  /** The screen's own listeners: made at each mount (the shell mounts the screen again after a prompt), taken away with it. */
  #listeners = new AbortController();
  /** Which scene shows the place's picture now (U03: `SceneStage`). */
  readonly #stage: DrawnStage;
  /** The child lit in the picture and the list, or none. */
  #lit: ChildMark = new NoChild();
  /** The path to the last place shown: the child on it is the one the picture zooms out of. */
  #came = new Retrace([]);
  /** The pad's group shown (U02): the view-model's until a tab is tapped or the car is dragged to another; reset by a new place. */
  #group: number | undefined;
  /** The trace column's pictures and its dive (U04). */
  readonly #column: { readonly bands: TraceBands; readonly dive: Dive };
  /** Whether the column the last TRACE opened is on screen: shown by the step, closed by ✕, Esc or a swipe. */
  #columnOpen = false;
  /** The column's bands opened larger, by key. */
  #openBands = new Set<string>();
  /** Whether the dive plays over the column. */
  #diving = false;
  /** The level nearest the finger on the rail when it was tapped: the column opens there. */
  #railAt: number | undefined;
  /** Where a swipe down the column's header started. */
  #pull: number | undefined;

  /** The registry binds a drawing to its picture (U01b); the stage shows its scene (U03); the makers make each canvas the screen carries (U02). */
  constructor(
    book: PictureBook,
    stage: DrawnStage,
    canvases: CanvasViews,
    column: { readonly bands: TraceBands; readonly dive: Dive },
  ) {
    this.#book = book;
    this.#stage = stage;
    this.#column = column;
    this.#canvases = new CanvasSlots({
      pane: () => canvases.pane(),
      map: () => canvases.map(),
    });
  }

  /**
   * Every button of the screen that is also drawn in the picture — a row, a pad key, a move, the way out, a relic's
   * tile — goes through the picture when tapped (U02, U03: it rides, walks or glides there first) and lights its twin
   * while pointed at or focused: one listener each on the screen, before the shell's own router hears the click.
   */
  mount(container: HTMLElement): void {
    this.#container = container;
    this.#listeners = new AbortController();
    const signal = this.#listeners.signal;
    container.addEventListener(
      'click',
      (event) => {
        const id = this.#drawnOption(event.target);
        if (id !== undefined) this.#through(event, id);
      },
      // Heard on the way down, before the shell's router hears it on the way up the same element.
      { signal, capture: true },
    );
    container.ownerDocument.addEventListener(
      'keydown',
      (event) => {
        if (event.key === 'Escape') this.#close();
      },
      { signal },
    );
    for (const type of ['pointerover', 'focusin'] as const) {
      container.addEventListener(
        type,
        (event) => {
          const id = this.#drawnOption(event.target);
          if (id !== undefined) this.#light(new MarkedChild(id));
        },
        { signal },
      );
    }
    for (const type of ['pointerout', 'focusout'] as const) {
      container.addEventListener(
        type,
        (event) => {
          const id = this.#drawnOption(event.target);
          if (id !== undefined && this.#drawnOption(event.relatedTarget) !== id) this.#light(new NoChild());
        },
        { signal },
      );
    }
  }

  /** The option id of the button an event reached, when the place's picture draws that option too; none otherwise. */
  #drawnOption(target: EventTarget | null): string | undefined {
    if (!(target instanceof Element)) return undefined;
    const id = target.closest<HTMLElement>('button[data-option]')?.dataset.option;
    return this.#vm?.drawing.frame().children.some((child) => child.id === id) === true ? id : undefined;
  }

  /** A step's render: the dock folds again; the view's other toggles keep their state. */
  render(vm: HudVM): void {
    this.#more = false;
    // A step closes the column the last TRACE opened; the step that is a TRACE opens a new one.
    this.#closeColumn();
    this.#columnOpen = vm.trace.shown;
    this.#openBands = new Set();
    if (vm.scene !== this.#vm?.scene) {
      this.#lit = new NoChild();
      this.#group = undefined;
    }
    this.#paint(vm);
    // A scene kept from the last render is shown the new frame; one made just now already shows it.
    this.#stage.redraw();
    const drawing = vm.drawing.frame();
    const from = this.#came.from(drawing.address, drawing.children);
    if (from !== undefined) this.#stage.arrive(from.id);
    this.#came = new Retrace(vm.rail.map((step) => step.address));
    if (this.#columnOpen) this.#showColumn(vm);
    this.#railAt = undefined;
  }

  /** The column's pictures shown in its bands, centred on the level the rail was tapped at, or on you. */
  #showColumn(vm: HudVM): void {
    const trace = vm.trace;
    const container = this.#container;
    if (!trace.shown || container === undefined) return;
    const scroller = this.#element('.col-scroll');
    const thread = this.#element('[data-thread]');
    if (scroller === undefined || thread === undefined) return;
    const hosts = this.#elements('[data-level]');
    this.#column.bands.show({
      scroller,
      thread,
      decay: vm.drawing.frame().decay,
      bands: trace.bands.flatMap((band, index) => {
        const host = hosts[index];
        return host === undefined
          ? []
          : [{ host, sketch: band.drawing.sketchedBy(this.#book), into: band.into }];
      }),
    });
    const at = hosts[this.#railAt ?? hosts.length - 1];
    at?.closest('li')?.scrollIntoView({ block: 'center' });
    this.#element('.col-close')?.focus({ preventScroll: true });
  }

  #closeColumn(): void {
    this.#column.dive.skip();
    this.#column.bands.clear();
    this.#diving = false;
  }

  /** ✕, Esc or a swipe down the header: the column goes, the screen under it as it was. */
  #close(): void {
    if (!this.#columnOpen) return;
    this.#closeColumn();
    this.#columnOpen = false;
    if (this.#vm !== undefined) this.#paint(this.#vm);
  }

  #toggleBand(key: string): void {
    if (this.#openBands.has(key)) this.#openBands.delete(key);
    else this.#openBands.add(key);
    if (this.#vm !== undefined) this.#paint(this.#vm);
  }

  #dive(): void {
    const vm = this.#vm;
    if (!vm?.trace.shown) return;
    this.#diving = true;
    this.#paint(vm);
    const host = this.#element('[data-dive]');
    if (host === undefined) return;
    this.#column.dive.play(
      host,
      vm.trace.bands.map((band) => ({ sketch: band.drawing.sketchedBy(this.#book), into: band.into })),
      () => {
        this.#diving = false;
        if (this.#vm !== undefined && this.#columnOpen) this.#paint(this.#vm);
        const bands = this.#container?.querySelectorAll('.bands > li');
        bands?.[bands.length - 1]?.scrollIntoView({ block: 'center' });
      },
    );
  }

  /** The screen's first element a selector finds, when it is an HTML element. */
  #element(selector: string): HTMLElement | undefined {
    const found = this.#container?.querySelector(selector);
    return found instanceof HTMLElement ? found : undefined;
  }

  /** Every HTML element of the screen a selector finds, in the page's order. */
  #elements(selector: string): HTMLElement[] {
    return [...(this.#container?.querySelectorAll(selector) ?? [])].filter(
      (found): found is HTMLElement => found instanceof HTMLElement,
    );
  }

  /** Which rail level lies nearest the finger: the column opens there. */
  #railFrom(event: PointerEvent): void {
    const crumbs = this.#elements('.rail .crumb');
    let best: number | undefined;
    let distance = Infinity;
    crumbs.forEach((crumb, index) => {
      const box = crumb.getBoundingClientRect();
      const away = Math.hypot(
        box.left + box.width / 2 - event.clientX,
        box.top + box.height / 2 - event.clientY,
      );
      if (away < distance) {
        distance = away;
        best = index;
      }
    });
    this.#railAt = best;
  }

  #paint(vm: HudVM): void {
    if (this.#container === undefined) throw new Error('HudView.render before mount');
    this.#vm = vm;
    render(this.#template(vm), this.#container);
    this.#canvases.bind('pane', this.#host('pane'), vm.aside.map?.picture ?? null);
    this.#canvases.bind('map', this.#host('map'), vm.map.shown ? vm.map.picture : null);
    this.#bindScene(vm.drawing.sketchedBy(this.#book));
  }

  /** The scene shown in its host: kept while the host and the picture stay, else made anew; gone with its host. */
  #bindScene(sketch: Sketch): void {
    this.#stage.show(this.#host('scene'), sketch, (mark) => {
      this.#light(mark);
    });
    this.#stage.light(this.#lit);
  }

  /** A child pointed at in the picture or the list: both light it; nothing re-renders when nothing changed. */
  #light(mark: ChildMark): void {
    if (mark.equals(this.#lit) || !this.#stage.showing()) return;
    this.#lit = mark;
    // The pad follows what is lit: dragging the car past a ten shows that ten's floors (the mock's `S.group`).
    const group =
      this.#vm?.pad.shown === true
        ? this.#vm.pad.groups.findIndex((each) => each.keys.some((key) => mark.marks(key.id)))
        : -1;
    if (group >= 0) this.#group = group;
    this.#stage.light(mark);
    if (this.#vm !== undefined && this.#container !== undefined)
      render(this.#template(this.#vm), this.#container);
  }

  dispose(): void {
    this.#stage.clear();
    this.#listeners.abort();
    this.#lit = new NoChild();
    this.#canvases.dispose();
    if (this.#container !== undefined) render(nothing, this.#container);
    this.#container = undefined;
    this.#vm = undefined;
    this.#more = false;
    this.#debugOpen = false;
  }

  #host(slot: Slot | 'scene'): HTMLElement | null {
    const host = this.#container?.querySelector(`[data-canvas="${slot}"]`);
    return host instanceof HTMLElement ? host : null;
  }

  #toggleMore(): void {
    this.#more = !this.#more;
    if (this.#vm !== undefined) this.#paint(this.#vm);
  }

  #showGroup(index: number): void {
    this.#group = index;
    if (this.#vm !== undefined) this.#paint(this.#vm);
  }

  /** A row or key tapped on a drawn place whose picture travels: the picture rides there first, and picks it (U02). */
  #through(event: Event, id: string): void {
    if (!this.#stage.leads(id)) return;
    event.stopPropagation();
    this.#stage.enter(id);
  }

  #toggleDebug(): void {
    this.#debugOpen = !this.#debugOpen;
    if (this.#vm !== undefined) this.#paint(this.#vm);
  }

  #template(vm: HudVM): TemplateResult {
    const drawn = vm.drawing.sketchedBy(this.#book).drawn();
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
                  <dd data-testid=${statTestId(stat.key)}>${stat.value}</dd>
                </div>
              `,
            )}
          </dl>
        </section>
        <nav class="rail" aria-label=${vm.regions.path}>
          ${
            vm.railTrace === null
              ? nothing
              : html`<button
                  type="button"
                  class="rail-hit"
                  tabindex="-1"
                  data-option=${vm.railTrace.id}
                  aria-label=${vm.railTrace.label}
                  @pointerdown=${(event: PointerEvent) => {
                    this.#railFrom(event);
                  }}
                ></button>`
          }
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
          <div class="body">
            <ul class="tags">
              ${
                vm.place.position.shown
                  ? html`<li class="chip pos">
                      <span class="k">${vm.place.position.label}</span> ${vm.place.position.value}
                    </li>`
                  : nothing
              }
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
                data-lit=${this.#lit.written()}
              ></div>`
            : nothing
        }
        ${
          drawn && vm.aside.objects !== null
            ? html`<button
                type="button"
                class="peek"
                data-testid="peek"
                @click=${(event: Event) => {
                  this.#toWords(event);
                }}
              >
                ${vm.aside.objects.peek} <span aria-hidden="true">↓</span>
              </button>`
            : nothing
        }
        ${this.#scan(vm)} ${vm.map.shown ? this.#map(vm.map, 'map', 'map', vm.regions.map) : nothing}
        ${this.#trace(vm)}
        <div class="side">
          ${
            vm.rows.length === 0
              ? nothing
              : html`
                  <section class="travel" aria-label=${vm.regions.travel}>
                    <h3 class="heading">${vm.heading}</h3>
                    ${vm.sealedNote.shown ? html`<p class="sealed-note" data-testid="sealed-note">${vm.sealedNote.text}</p>` : nothing}
                    ${
                      vm.pad.shown
                        ? this.#pad(vm, vm.pad, drawn)
                        : html`<ol class="rows">
                            ${repeat(
                              vm.rows,
                              (row) => `${vm.scene}/${row.id}`,
                              (row) => this.#row(row, vm.sealedTag, drawn),
                            )}
                          </ol>`
                    }
                  </section>
                `
          }
          ${this.#aside(vm)}
        </div>
        <nav class="dock" aria-label=${vm.regions.dock} data-open=${this.#more ? 'true' : 'false'}>
          ${repeat(
            vm.dock.slice(0, vm.fold.out),
            (option) => option.id,
            (option) => this.#docked(option, undefined, true),
          )}
          ${repeat(
            vm.dock.slice(vm.fold.out, vm.fold.after),
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

  /**
   * The trace column (U04): over everything, a band a level from the universe down to you, each a button that opens
   * it larger; the thread over them; the dive over it all while it plays. Its words are the presenter's.
   */
  #trace(vm: HudVM): TemplateResult | typeof nothing {
    const trace = vm.trace;
    if (!trace.shown || !this.#columnOpen) return nothing;
    return html`
      <section class="column" data-testid="trace" role="dialog" aria-modal="true" aria-label=${trace.label}>
        <header
          class="col-head"
          @pointerdown=${(event: PointerEvent) => {
            if (event.target instanceof Element && event.target.closest('button') !== null) return;
            this.#pull = event.clientY;
            // The header keeps the finger until it lifts, wherever it goes.
            if (event.currentTarget instanceof Element)
              event.currentTarget.setPointerCapture(event.pointerId);
          }}
          @pointerup=${(event: PointerEvent) => {
            if (this.#pull !== undefined && event.clientY - this.#pull > 60) this.#close();
            this.#pull = undefined;
          }}
        >
          <h2>${trace.title}</h2>
          <button
            type="button"
            class="col-dive"
            @click=${() => {
              this.#dive();
            }}
          >
            ${trace.dive}
          </button>
          <button
            type="button"
            class="col-close"
            aria-label=${trace.close}
            @click=${() => {
              this.#close();
            }}
          >
            ${trace.closeMark}
          </button>
        </header>
        <div class="col-body">
          <div class="col-scroll">
            <ol class="bands">
              ${repeat(
                trace.bands,
                (band) => band.key,
                (band) => html`
                  <li
                    class=${`${band.here ? 'band-li here' : 'band-li'}${band.abyssal ? ' abyssal' : ''}${this.#openBands.has(band.key) ? ' open' : ''}`}
                  >
                    <button
                      type="button"
                      class="band"
                      aria-expanded=${this.#openBands.has(band.key) ? 'true' : 'false'}
                      aria-label=${band.label}
                      @click=${() => {
                        this.#toggleBand(band.key);
                      }}
                    >
                      <span class="b-pic"
                        ><span class="b-cv" data-level=${band.key}></span
                        ><span class="b-scale">${band.scale}</span></span
                      >
                      <span class="b-info">
                        <span class="eyebrow"
                          >${band.eyebrow}${band.here ? html` · <b>${band.hereText}</b>` : nothing}</span
                        >
                        <span class="b-name">${band.name}</span>
                        <span class="b-tags">
                          ${band.tags.map((tag) => html`<span class="chip" data-fact=${tag.key}>${tag.label}${tag.value === '' ? nothing : html` <b>${tag.value}</b>`}</span>`)}
                        </span>
                        <span class="b-words">${band.words}</span>
                        ${band.facts.map((fact) => html`<span class="b-fact">${fact}</span>`)}
                      </span>
                    </button>
                  </li>
                `,
              )}
            </ol>
          </div>
          <div class="col-thread" data-thread></div>
        </div>
        ${
          this.#diving
            ? html`<div class="col-reel">
                <div class="reel" data-dive></div>
                <button
                  type="button"
                  class="col-skip"
                  @click=${() => {
                    this.#column.dive.skip();
                  }}
                >
                  ${trace.skip}
                </button>
              </div>`
            : nothing
        }
      </section>
    `;
  }

  /** Down to the room's words, under the picture (U03d). */
  #toWords(event: Event): void {
    const button = event.currentTarget;
    if (!(button instanceof HTMLElement)) return;
    button.closest('.world')?.querySelector('.desc')?.scrollIntoView({ block: 'start' });
  }

  /** The objects of a room as tiles — a button each while the engine offers its take, a plain tile otherwise — the telemetry block, or the map. */
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
                                      ?data-lit=${this.#lit.marks(tile.action.id)}
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

  /**
   * The pad (U02): the shown group's keys — a real button each, its number shown and its row's words for a
   * reader, lighting its floor like a row — then, past twenty, a tab per ten; a tab only shows its group.
   */
  #pad(vm: HudVM, pad: Extract<HudVM['pad'], { readonly shown: true }>, drawn: boolean): TemplateResult {
    const shown = Math.min(this.#group ?? pad.open, pad.groups.length - 1);
    const group = pad.groups[shown];
    return html`
      <ol class="pad">
        ${repeat(
          group?.keys ?? [],
          (key) => `${vm.scene}/${key.id}`,
          (key) => html`
            <li>
              <button
                type="button"
                class=${['key', key.current ? 'you' : '', key.visited ? 'seen' : ''].join(' ').trim()}
                data-option=${key.id}
                ?data-lit=${drawn && this.#lit.marks(key.id)}
              >
                <span class="num" aria-hidden="true">${key.number}</span><span class="vh">${key.spoken}</span>
              </button>
            </li>
          `,
        )}
      </ol>
      ${
        pad.groups.length < 2
          ? nothing
          : html`<div class="tens" role="group" aria-label=${pad.label}>
              ${pad.groups.map(
                (each, index) => html`
                  <button
                    type="button"
                    class="ten"
                    aria-pressed=${index === shown ? 'true' : 'false'}
                    @click=${() => {
                      this.#showGroup(index);
                    }}
                  >
                    ${each.label}
                  </button>
                `,
              )}
            </div>`
      }
    `;
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
          ?data-lit=${drawn && this.#lit.marks(row.id)}
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

  /** A dock-style button; a `tabIndex` of −1 keeps it out of the tab order (the debug tools, I09); the way out is marked (U03c). */
  #docked(option: OptionVM, tabIndex?: number, out = false): TemplateResult {
    return html`
      <button
        type="button"
        class="pb"
        data-option=${option.id}
        data-role=${out ? 'out' : nothing}
        ?data-lit=${this.#lit.marks(option.id)}
        tabindex=${tabIndex ?? nothing}
      >
        ${option.key === '' ? nothing : html`<kbd aria-hidden="true">${option.key}</kbd>`}<span
          >${option.label}</span
        >
      </button>
    `;
  }
}
