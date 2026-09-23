import { Coherence } from '#engine/rules/Coherence.ts';
import { type GameOption, VISITED_KEY } from '#engine/rules/GameOption.ts';
import type { GameSnapshot } from '#engine/rules/GameSnapshot.ts';
import type { MapSummary } from '#engine/rules/MapSummary.ts';
import type { PlaceSummary } from '#engine/rules/PlaceSummary.ts';
import type { TraceSummary } from '#engine/rules/TraceSummary.ts';
import type { LegendTone, NodeTone } from '#ui/canvas/MapPictureVM.ts';
import { frameOf } from '#ui/Frame.ts';
import type { Masthead } from '#ui/Masthead.ts';
import type { OptionVM } from '#ui/OptionVM.ts';
import type { Presenter } from '#ui/Presenter.ts';
import type { AsideVM } from './AsideVM.ts';
import type { HudVM } from './HudVM.ts';
import type { MapPanelVM } from './MapPanelVM.ts';
import type { TravelRowVM } from './TravelRowVM.ts';

const RETURN_MARK = '▲ ';
/** The scan's mark on the row about where the traveller stands (ScanCommand.groovy:148), and what a reader hears. */
const SCAN_MARK = { text: '>>', label: 'You are here' } as const;
/**
 * The HUD's labels above and below the bedrock (HUDHeaderComponent.groovy:34, 44, 54-60, 79; Guide:280):
 * Coherence is relabelled Integrity down there, the locus becomes a void trace.
 */
const LABELS = {
  lattice: {
    meter: 'COHERENCE',
    depth: 'HOP_DENSITY',
    locus: 'LOCUS',
    hash: 'LOCUS_HASH',
    path: 'Path from the universe',
    sync: 'LATTICE_SYNC: [NOMINAL]',
  },
  void: {
    meter: 'INTEGRITY',
    depth: 'ABYSSAL_DEPTH',
    locus: 'VOID_LOCUS',
    hash: 'VOID_HASH',
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
const TRACE_HEADING = '[NEURAL_LATTICE_TRACE_INITIATED]';
/** The trace's mark on the current line (LatticeTraceComponent.groovy:85). */
const TRACE_MARK = '>> ';
/** How many crumbs a folded readout keeps on a phone (I09): where you are, and one above. */
const TAIL = 2;
/** The readouts a folded HUD keeps on a phone (I09): the steps, the buffer, the place's position among its peers. */
const ALWAYS_SHOWN = new Set(['PULSE_TRAVERSAL', 'TRACE_BUFFER']);

/**
 * Owns the words, the casing and the layout roles of the world screen: engine snapshot in, view-model
 * out. No DOM. It never asks what kind of place this is — the snapshot already says what it is called and
 * what it shows; options are sorted by their `role`, which is data the engine put there for that purpose.
 * Below the bedrock (`place.abyssal`) the labels change and the frame is the void's; a scan on the
 * snapshot becomes a panel of rows.
 */
export class HudPresenter implements Presenter<HudVM> {
  readonly #masthead: Masthead;

  constructor(masthead: Masthead) {
    this.#masthead = masthead;
  }

  /** The world screen: a place, and no prompt in the way. */
  accepts(snapshot: GameSnapshot): boolean {
    return snapshot.place !== null && snapshot.prompt === null;
  }

  toViewModel(snapshot: GameSnapshot): HudVM {
    const place = snapshot.place;
    const player = snapshot.player;
    if (place === null || player === null) throw new Error('HudPresenter needs a snapshot with a place');
    const rows = snapshot.options
      .filter((option) => option.role === 'travel')
      .map((option) => this.#row(option));
    const moves = snapshot.options
      .filter((option) => option.role === 'move')
      .map((option) => this.#docked(option));
    const dock = snapshot.options
      .filter((option) => option.role === 'return' || option.role === 'system')
      .map((option) => this.#docked(option));
    const takes = snapshot.options.filter((option) => option.role === 'take');
    const debug = snapshot.options
      .filter((option) => option.role === 'debug')
      .map((option) => this.#docked(option));
    const pad = (value: number): string => String(value).padStart(2, '0');
    const labels = place.abyssal ? LABELS.void : LABELS.lattice;
    return {
      scene: `${snapshot.world?.seed ?? ''}/${place.address}`,
      title: this.#masthead.name(),
      frame: frameOf(place),
      crumbs: place.trail.map((step, index) => ({
        ...step,
        current: index === place.trail.length - 1,
        tail: index >= place.trail.length - TAIL,
      })),
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
        { label: 'PULSE_TRAVERSAL', value: String(player.steps) },
        {
          label: 'TRACE_BUFFER',
          value: `${pad(snapshot.buffer?.size ?? 0)}/${pad(snapshot.buffer?.capacity ?? 0)}`,
        },
        { label: labels.depth, value: pad(place.depth) },
        ...(place.position === null
          ? []
          : [
              {
                label: place.position.label,
                value: `${pad(place.position.index)}/${pad(place.position.total)}`,
              },
            ]),
        { label: labels.locus, value: place.address },
        { label: labels.hash, value: place.hash },
        { label: 'SEED', value: snapshot.world?.seed ?? '' },
      ].map((stat) => ({
        ...stat,
        more: !ALWAYS_SHOWN.has(stat.label) && stat.label !== place.position?.label,
      })),
      readout: { label: 'The whole readout', more: '⋯', less: '×' },
      place: {
        eyebrow: place.kind.toUpperCase(),
        icon: place.icon,
        name: place.name.toUpperCase(),
        tags: place.facts.map((fact) => ({
          key: fact.key,
          label: fact.label,
          value: fact.value.toUpperCase(),
        })),
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
      map: snapshot.map === null ? null : this.#mapPanel(snapshot.map, MAP_HEADING),
      trace: snapshot.trace === null ? null : this.#tracePanel(snapshot.trace),
      heading: place.childrenHeading.replace(/:$/, '').toUpperCase(),
      rows,
      moves,
      sealedNote: rows.some((row) => row.sealed)
        ? 'STRUCTURES SEALED · the lattice opens their doors in a later build'
        : null,
      sealedTag: 'SEALED',
      dock,
      // On a phone only the way out stays out of the fold (I09): one row, LEAVE and MORE, under the thumb.
      fold: {
        after: snapshot.options.filter((option) => option.role === 'return').length,
        more: 'MORE',
        less: 'LESS',
        label: 'More of the dock',
      },
      debug,
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
        dock: 'Leave and game',
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
      { label: 'FURNITURE', value: contents.furniture.join(', ') },
      ...(contents.objects.length === 0
        ? []
        : [{ label: 'OBJECTS_DETECTED', value: String(contents.objects.length) }]),
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

  /** The trace as a panel: the picture's rows, and the same rows as lines of text (the old `ll` output) for a reader. */
  #tracePanel(trace: TraceSummary): HudVM['trace'] {
    const rows = trace.steps.map((step) => ({
      depth: `[${String(step.depth).padStart(2, '0')}]`,
      glyph: step.icon,
      kind: step.kind.toUpperCase(),
      name: `${step.name}${step.meta}`,
      current: step.current,
      abyssal: step.abyssal,
    }));
    return {
      label: 'Lattice trace',
      heading: TRACE_HEADING,
      picture: { rows },
      lines: rows.map(
        (row) => `${row.current ? TRACE_MARK : ''}${row.depth} ${row.glyph} ${row.kind} : ${row.name}`,
      ),
    };
  }

  /**
   * The objects as tiles when the place is one that holds things — each with the take the engine offers
   * for its number, none while the buffer is full (the takes come sealed) — the telemetry block when it
   * is indoors, and the map when it is not (Guide:339) and the place has one.
   */
  #aside(place: PlaceSummary, takes: readonly GameOption[], resonant: number, sync: string): AsideVM {
    const contents = place.contents;
    const full = takes.some((take) => take.sealed);
    return {
      objects:
        contents === null
          ? null
          : {
              label: 'In this room',
              heading: 'IN THIS ROOM',
              empty: contents.objects.length === 0 ? 'No objects detected.' : '',
              note: full ? 'BUFFER FULL — merge or drop a fragment to take more.' : '',
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
