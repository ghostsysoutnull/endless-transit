import { Coherence } from '#engine/rules/Coherence.ts';
import { type GameOption, VISITED_KEY } from '#engine/rules/GameOption.ts';
import type { GameSnapshot } from '#engine/rules/GameSnapshot.ts';
import type { PlaceSummary } from '#engine/rules/PlaceSummary.ts';
import { frameOf } from '#ui/Frame.ts';
import type { Masthead } from '#ui/Masthead.ts';
import type { OptionVM } from '#ui/OptionVM.ts';
import type { Presenter } from '#ui/Presenter.ts';
import type { AsideVM } from './AsideVM.ts';
import type { HudVM } from './HudVM.ts';
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
      crumbs: place.trail.map((step, index) => ({ ...step, current: index === place.trail.length - 1 })),
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
      ],
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
                cells: row.cells.map((cell) => ({ key: cell.key, label: cell.label, value: cell.value })),
                mark: row.current ? SCAN_MARK : null,
                note: row.note,
              })),
            },
      heading: place.childrenHeading.replace(/:$/, '').toUpperCase(),
      rows,
      moves,
      sealedNote: rows.some((row) => row.sealed)
        ? 'STRUCTURES SEALED · the lattice opens their doors in a later build'
        : null,
      sealedTag: 'SEALED',
      dock,
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
   * The objects as tiles when the place is one that holds things — each with the take the engine offers
   * for its number, none while the buffer is full (the takes come sealed) — and the telemetry block when it
   * is indoors.
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
