import { Coherence } from '#engine/rules/Coherence.ts';
import type { GameOption } from '#engine/rules/GameOption.ts';
import type { GameSnapshot } from '#engine/rules/GameSnapshot.ts';
import type { PlaceSummary } from '#engine/rules/PlaceSummary.ts';
import type { Masthead } from '#ui/Masthead.ts';
import type { OptionVM } from '#ui/OptionVM.ts';
import type { Presenter } from '#ui/Presenter.ts';
import type { AsideVM } from './AsideVM.ts';
import type { HudVM } from './HudVM.ts';
import type { TravelRowVM } from './TravelRowVM.ts';

const DEFAULT_FRAME = 'default';
const RETURN_MARK = '▲ ';
/** The elevator column's current-floor mark (Building.groovy:198-201), and what a reader hears instead. */
const CURRENT_MARK = { text: '[>X<]', label: 'Elevator here' } as const;
/** The visited mark of the old lists (Corridor.groovy:72, Building.groovy:222), and what a reader hears instead. */
const SEEN_MARK = { text: '[V]', label: 'Visited' } as const;
/** One cell of a spectrogram bar (TelemetryComponent.groovy:136). */
const BAR = '█';

/**
 * Owns the words, the casing and the layout roles of the world screen: engine snapshot in, view-model
 * out. No DOM. It never asks what kind of place this is — the snapshot already says what it is called and
 * what it shows; options are sorted by their `role`, which is data the engine put there for that purpose.
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
    const debug = snapshot.options
      .filter((option) => option.role === 'debug')
      .map((option) => this.#docked(option));
    const pad = (value: number): string => String(value).padStart(2, '0');
    return {
      scene: `${snapshot.world?.seed ?? ''}/${place.address}`,
      title: this.#masthead.name(),
      frame: place.frame ?? DEFAULT_FRAME,
      crumbs: place.trail.map((step, index) => ({ ...step, current: index === place.trail.length - 1 })),
      meter: {
        label: 'COHERENCE',
        ...Coherence.range(),
        value: player.coherence,
        text: `${String(player.coherence)}%`,
        band: player.band,
        bandLabel: player.band,
        valueText: `${String(player.coherence)} percent, ${player.band}`,
      },
      stats: [
        { label: 'PULSE_TRAVERSAL', value: String(player.steps) },
        { label: 'HOP_DENSITY', value: pad(place.depth) },
        ...(place.position === null
          ? []
          : [
              {
                label: place.position.label,
                value: `${pad(place.position.index)}/${pad(place.position.total)}`,
              },
            ]),
        { label: 'LOCUS', value: place.address },
        { label: 'LOCUS_HASH', value: place.hash },
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
      aside: this.#aside(place),
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
        path: 'Path from the universe',
        place: 'Where you are',
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

  /** The objects as tiles when the place is one that holds things; the telemetry block when it is indoors. */
  #aside(place: PlaceSummary): AsideVM {
    const contents = place.contents;
    return {
      objects:
        contents === null
          ? null
          : {
              label: 'In this room',
              heading: 'IN THIS ROOM',
              empty: contents.objects.length === 0 ? 'No objects detected.' : '',
              tiles: contents.objects.map((relic) => ({ key: relic.key, name: relic.name })),
            },
      telemetry:
        place.telemetry === null
          ? null
          : {
              label: 'System telemetry',
              heading: '[SYSTEM_TELEMETRY]',
              sync: 'LATTICE_SYNC: [NOMINAL]',
              spectrogram: {
                heading: '[QUANTUM_SPECTROGRAM]',
                bars: place.telemetry.spectrogram.map((height) => BAR.repeat(height)),
              },
              logs: { heading: '[DECODE_LOGS]', lines: [`> Trace: ${place.address}`] },
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
