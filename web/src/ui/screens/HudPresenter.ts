import type { Fact } from '#engine/model/Fact.ts';
import type { Seed } from '#engine/rng/Seed.ts';
import { Phrase } from '#engine/model/Phrase.ts';
import { Coherence } from '#engine/rules/Coherence.ts';
import { type GameOption, TRACE_ID, VISITED_KEY } from '#engine/rules/GameOption.ts';
import type { GameSnapshot } from '#engine/rules/GameSnapshot.ts';
import type { MapSummary } from '#engine/rules/MapSummary.ts';
import type { PlaceSummary } from '#engine/rules/PlaceSummary.ts';
import type { TraceSummary } from '#engine/rules/TraceSummary.ts';
import type { LegendTone, NodeTone } from '#ui/canvas/MapPictureVM.ts';
import type { FrameOf } from '#ui/FrameOf.ts';
import type { Masthead } from '#ui/Masthead.ts';
import type { OptionVM } from '#ui/OptionVM.ts';
import type { Presenter } from '#ui/Presenter.ts';
import type { AsideVM } from './AsideVM.ts';
import type { HudVM } from './HudVM.ts';
import type { MapPanelVM } from './MapPanelVM.ts';
import type { TravelRowVM } from './TravelRowVM.ts';
import type { Drawings } from './Drawings.ts';
import type { Pads } from './Pads.ts';

const RETURN_MARK = '▲ ';
/** The scan's mark on the row about where the traveller stands (ScanCommand.groovy:148), and what a reader hears. */
const SCAN_MARK = { text: '>>', label: 'You are here' } as const;
/**
 * The HUD's labels above and below the bedrock (HUDHeaderComponent.groovy:34, 79; Guide:280): Coherence is
 * relabelled Integrity down there, the path becomes a void trace. Plain words since U01a (Decision 1).
 */
const LABELS = {
  lattice: {
    meter: 'Coherence',
    path: 'Path from the universe',
    sync: 'LATTICE_SYNC: [NOMINAL]',
  },
  void: {
    meter: 'Integrity',
    path: 'Void trace from the universe',
    sync: 'VOID_SYNC: [PRESSURE_HIGH]',
  },
} as const;
/** The void's line in the decode log (HUDHeaderComponent.groovy:87). */
const VOID_PREFIX = '[VOID] ';
/** The elevator column's current-floor mark (Building.groovy:198-201), and what a reader hears instead. */
const CURRENT_MARK = { text: '[>X<]', label: 'Elevator here' } as const;
/** The visited mark of the old lists, drawn from the engine's letter (its one owner), and what a reader hears instead. */
const SEEN_MARK = { text: `[${VISITED_KEY.toUpperCase()}]`, label: 'Visited' } as const;
/** One cell of a spectrogram bar (TelemetryComponent.groovy:136). */
const BAR = '█';
/** The map's words (LatticeMapComponent.groovy:52-66, TelemetryComponent.groovy:80-82): the glitch mark's glyph and the legend. */
const MARK_GLYPH = 'X';
const LEGEND: Readonly<Record<LegendTone, string>> = {
  you: 'YOU',
  visited: 'VISITED',
  unvisited: 'UNVISITED',
  noise: 'STATIC',
  mark: 'GLITCH',
};
const MAP_HEADING = '[NEURAL_LATTICE_PROJECTION]';

/**
 * Owns the words, the casing and the layout roles of the world screen: engine snapshot in, view-model
 * out. No DOM. It never asks what kind of place this is — the snapshot already says what it is called and
 * what it shows; options are sorted by their `role`, which is data the engine put there for that purpose.
 * Below the bedrock (`place.abyssal`) the labels change and the frame is the void's; a scan on the
 * snapshot becomes a panel of rows.
 */
export class HudPresenter implements Presenter<HudVM> {
  readonly #frame: FrameOf;
  readonly #masthead: Masthead;
  readonly #drawings: Drawings;
  readonly #pads: Pads;

  constructor(masthead: Masthead, frame: FrameOf, drawings: Drawings, pads: Pads) {
    this.#masthead = masthead;
    this.#frame = frame;
    this.#drawings = drawings;
    this.#pads = pads;
  }

  /** The world screen: a place, and no prompt in the way. */
  accepts(snapshot: GameSnapshot): boolean {
    return snapshot.place !== null && snapshot.prompt === null;
  }

  toViewModel(snapshot: GameSnapshot): HudVM {
    const place = snapshot.place;
    const player = snapshot.player;
    if (place === null || player === null) throw new Error('HudPresenter needs a snapshot with a place');
    const travel = snapshot.options.filter((option) => option.role === 'travel');
    const rows = travel.map((option) => this.#row(option));
    const moveOptions = snapshot.options.filter((option) => option.role === 'move');
    const leaveOptions = snapshot.options.filter((option) => option.role === 'return');
    const takes = snapshot.options.filter((option) => option.role === 'take');
    const debug = snapshot.options
      .filter((option) => option.role === 'debug')
      .map((option) => this.#docked(option));
    const labels = place.abyssal ? LABELS.void : LABELS.lattice;
    const drawing = this.#drawings.of(
      place,
      {
        travel,
        moves: moveOptions,
        leave: leaveOptions,
        takes,
      },
      player.decay,
    );
    // Where the moves sit is the drawing's to say (U03c): under the picture, or in the dock's row. The dock's order is
    // this presenter's: the way out, the moves it holds, then the game's own behind MORE.
    const leave = leaveOptions.map((option) => this.#docked(option));
    const { strip: moves, row } = drawing.arrange(moveOptions.map((option) => this.#docked(option)));
    const dock = [
      ...leave,
      ...row,
      ...snapshot.options.filter((option) => option.role === 'system').map((option) => this.#docked(option)),
    ];
    return {
      scene: `${snapshot.world?.seed ?? ''}/${place.address}`,
      title: this.#masthead.name(),
      frame: this.#frame.of(place),
      rail: place.trail.map((step, index) => ({ ...step, current: index === place.trail.length - 1 })),
      meter: {
        label: labels.meter,
        ...Coherence.range(),
        value: player.coherence,
        text: `${String(player.coherence)}%`,
        band: player.band,
        bandLabel: player.band,
        valueText: `${String(player.coherence)} percent, ${player.band}`,
      },
      stats: [
        { key: 'steps', label: 'Steps', value: String(player.steps) },
        {
          key: 'buffer',
          label: 'Buffer',
          value: String(snapshot.buffer?.size ?? 0),
        },
      ],
      place: {
        eyebrow: place.kind.toUpperCase(),
        icon: place.icon,
        name: place.name,
        position: !place.position.counted
          ? { shown: false }
          : {
              shown: true,
              label: new Phrase(place.position.label).plain(),
              value: `${String(place.position.index)} of ${String(place.position.total)}`,
            },
        tags: this.#tags(place.facts),
        description: place.description,
        rows: this.#rows(place),
        diagnostic: place.status,
      },
      aside: this.#aside(place, takes, snapshot.buffer?.resonant ?? 0, labels.sync),
      scan:
        snapshot.scan === null
          ? null
          : {
              label: 'Scan',
              heading: snapshot.scan.title,
              notes: snapshot.scan.notes,
              rows: snapshot.scan.rows.map((row) => ({
                // A reading with nothing to say (a door without words) shows no bare label.
                cells: row.cells
                  .filter((cell) => cell.value !== '')
                  .map((cell) => ({ key: cell.key, label: cell.label, value: cell.value })),
                mark: row.current ? SCAN_MARK : null,
                note: row.note,
              })),
            },
      map:
        snapshot.map === null
          ? { shown: false }
          : { shown: true, ...this.#mapPanel(snapshot.map, MAP_HEADING) },
      trace:
        snapshot.trace === null ? { shown: false } : this.#column(snapshot.trace, place.noise, player.decay),
      railTrace: snapshot.options.some((option) => option.id === TRACE_ID)
        ? { id: TRACE_ID, label: 'Trace: every level from the universe down to here' }
        : null,
      drawing,
      pad: this.#pads.of(place.portrait, travel, rows),
      heading: place.childrenHeading.toUpperCase(),
      rows,
      moves,
      sealedNote: rows.some((row) => row.sealed)
        ? { shown: true, text: 'STRUCTURES SEALED · the lattice opens their doors in a later build' }
        : { shown: false },
      sealedTag: 'SEALED',
      dock,
      // On a phone the way out stays out of the fold (I09), and the moves when the dock holds them (U03c): one row under the thumb.
      fold: {
        after: leave.length + row.length,
        out: leave.length,
        more: 'MORE',
        less: 'LESS',
        label: 'More of the dock',
      },
      debug,
      debugToggle: 'DEBUG',
      options: [
        ...takes.filter((take) => !take.sealed).map((take) => this.#take(take)),
        ...rows
          .filter((row) => !row.sealed)
          .map((row) => ({ id: row.id, key: row.key, label: row.label, opposite: '' })),
        ...moves,
        ...dock,
        ...debug,
      ],
      status: snapshot.message,
      build: this.#masthead.buildLine(),
      regions: {
        hud: 'Position',
        path: labels.path,
        place: 'Where you are',
        scan: 'Scan',
        map: 'Map',
        trace: 'Trace',
        travel: 'Places to enter',
        moves: 'Moves',
        aside: 'Readouts',
        dock: 'Actions',
        debug: 'Debug tools',
      },
    };
  }

  /**
   * A place that holds things lists its furniture and counts its objects — no count line when there are none
   * (Room.groovy:281-295 draws OBJECTS_DETECTED only for a non-empty list; the mock's OBJECTS row).
   */
  #rows(place: PlaceSummary): HudVM['place']['rows'] {
    const contents = place.contents;
    if (contents === null) return [];
    return [
      { label: 'Furniture', value: contents.furniture.join(', ') },
      ...(contents.objects.length === 0 ? [] : [{ label: 'Relics', value: String(contents.objects.length) }]),
    ];
  }

  /**
   * A map as a panel: the picture for the canvas — every node with its tone, the marks, the legend built
   * from the very glyphs the grid uses (HK-023) — and the words a reader gets instead.
   */
  #mapPanel(map: MapSummary, heading: string): MapPanelVM {
    const tone = (node: MapSummary['nodes'][number]): NodeTone =>
      node.noise ? 'noise' : node.visited ? 'visited' : 'unvisited';
    const nodeGlyph = map.nodes.find((node) => !node.noise)?.glyph ?? map.origin.glyph;
    const visited = map.nodes.filter((node) => node.visited).length;
    const legend: MapPanelVM['picture']['legend'] = [
      { glyph: map.origin.glyph, label: LEGEND.you, tone: 'you' },
      { glyph: nodeGlyph, label: LEGEND.visited, tone: 'visited' },
      { glyph: nodeGlyph, label: LEGEND.unvisited, tone: 'unvisited' },
      ...(map.marks.length === 0 ? [] : [{ glyph: MARK_GLYPH, label: LEGEND.mark, tone: 'mark' as const }]),
    ];
    const marks =
      map.marks.length === 0
        ? ''
        : `, ${String(map.marks.length)} glitch mark${map.marks.length === 1 ? '' : 's'}`;
    return {
      label: 'Lattice map',
      heading,
      origin: `SCAN_ORIGIN: ${map.origin.name}`,
      picture: {
        width: map.width,
        height: map.height,
        origin: { glyph: map.origin.glyph, label: LEGEND.you },
        nodes: map.nodes.map((node) => ({ x: node.x, y: node.y, glyph: node.glyph, tone: tone(node) })),
        marks: map.marks,
        markGlyph: MARK_GLYPH,
        legend,
      },
      nodes: map.nodes.map((node) => ({
        glyph: node.glyph,
        name: node.name,
        note: `${node.visited ? 'visited' : 'unvisited'}${node.noise ? ', static' : ''}`,
      })),
      summary: `Lattice map of ${map.origin.name}: ${String(map.nodes.length)} nodes, ${String(visited)} visited${marks}.`,
    };
  }

  /** The trace as a column (U04): a band a level, its picture the level's own, its words and counts plain. */
  #column(trace: TraceSummary, noise: Seed, decay: number): HudVM['trace'] {
    const steps = trace.steps;
    return {
      shown: true,
      label: 'Trace from the universe',
      title: 'Trace',
      close: 'Close',
      closeMark: '✕',
      dive: 'Dive',
      skip: 'Skip',
      bands: steps.map((step, index) => {
        const next = steps[index + 1];
        const depth = String(step.depth).padStart(2, '0');
        const visited = step.children.filter((child) => child.visited).length;
        const facts = [
          ...(step.children.length === 0
            ? []
            : [`${String(step.children.length)} inside · ${String(visited)} visited`]),
          ...(next === undefined ? [] : [`You went down into ${next.name}`]),
        ];
        return {
          key: step.address,
          eyebrow: `Depth ${depth} · ${step.kind}`,
          name: step.name,
          label: `Depth ${depth}, ${step.kind}: ${step.name}${step.current ? ', you are here' : ''}`,
          here: step.current,
          hereText: 'You are here',
          tags: this.#tags(step.facts),
          words: step.words,
          facts,
          scale: step.scale,
          abyssal: step.abyssal,
          drawing: this.#drawings.band(step, noise, decay),
          into: next?.address ?? '',
        };
      }),
    };
  }

  /** A place's facts as its chips: the value written as a phrase. */
  #tags(facts: readonly Fact[]): HudVM['place']['tags'] {
    return facts.map((fact) => ({
      key: fact.key,
      label: fact.label,
      value: new Phrase(fact.value).capitalised(),
    }));
  }

  /** The way down to the room's words and relics, with how many relics lie there. */
  #peek(relics: number): string {
    if (relics === 0) return 'About this room';
    return `About this room · ${String(relics)} ${relics === 1 ? 'relic' : 'relics'}`;
  }

  /**
   * The objects as tiles when the place is one that holds things — each with the take the engine offers
   * for its number — the telemetry block when it is indoors, and the map when it is not (Guide:339) and the place
   * has one.
   */
  #aside(place: PlaceSummary, takes: readonly GameOption[], resonant: number, sync: string): AsideVM {
    const contents = place.contents;
    return {
      objects:
        contents === null
          ? null
          : {
              label: 'In this room',
              heading: 'IN THIS ROOM',
              peek: this.#peek(contents.objects.length),
              empty: contents.objects.length === 0 ? 'No objects detected.' : '',
              tiles: contents.objects.map((relic, index) => {
                const ordinal = String(index + 1);
                const take = takes.find((each) => each.ordinal === ordinal && !each.sealed);
                return {
                  key: relic.key,
                  name: relic.name,
                  ordinal,
                  action: take === undefined ? null : this.#take(take),
                };
              }),
            },
      telemetry:
        place.telemetry === null
          ? null
          : {
              label: 'System telemetry',
              heading: '[SYSTEM_TELEMETRY]',
              sync,
              spectrogram: {
                heading: '[QUANTUM_SPECTROGRAM]',
                bars: place.telemetry.spectrogram.map((height) => BAR.repeat(height)),
              },
              logs: {
                heading: '[DECODE_LOGS]',
                lines: [
                  `> Trace: ${place.address}`,
                  `> Resonant traces: ${String(resonant)}`,
                  ...(place.telemetry.voice === null ? [] : [`${VOID_PREFIX}${place.telemetry.voice}`]),
                ],
              },
            },
      map:
        place.telemetry !== null || place.lattice === null
          ? null
          : this.#mapPanel(place.lattice, `[NEURAL_MAP: ${place.kind.toUpperCase()}]`),
    };
  }

  /** An open row says how to get in; a sealed one only says what stands there. The number is the option's own. */
  #row(option: GameOption): TravelRowVM {
    return {
      id: option.id,
      key: option.key.toUpperCase(),
      ordinal: option.ordinal.padStart(2, '0'),
      label: option.sealed ? option.place : option.label,
      sealed: option.sealed,
      landmark: option.landmark,
      readings: option.readings.map((fact) => ({ key: fact.key, label: fact.label, value: fact.value })),
      mark: option.current ? CURRENT_MARK : null,
      seen: option.visited ? SEEN_MARK : null,
    };
  }

  /** A take keeps the engine's words: the tile shows the object's name, the button is the take. */
  #take(option: GameOption): OptionVM {
    return { id: option.id, key: option.key.toUpperCase(), label: option.label, opposite: '' };
  }

  #docked(option: GameOption): OptionVM {
    const mark = option.role === 'return' ? RETURN_MARK : '';
    return {
      id: option.id,
      key: option.key.toUpperCase(),
      label: `${mark}${option.label.toUpperCase()}`,
      opposite: option.opposite,
    };
  }
}
