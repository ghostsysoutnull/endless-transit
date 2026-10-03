import type { Fact } from '#engine/model/Fact.ts';
import type { Seed } from '#engine/rng/Seed.ts';
import { Phrase } from '#engine/model/Phrase.ts';
import { Coherence } from '#engine/rules/Coherence.ts';
import { SPECTROGRAM_DECADES, SPECTROGRAM_TALLEST } from '#engine/rules/Telemetry.ts';
import { BUFFER } from '#engine/rules/BufferPrompt.ts';
import {
  BACK_MOVE_ID,
  CORRIDOR_MOVE_ID,
  ELEVATOR_MOVE_ID,
  FORWARD_MOVE_ID,
  type GameOption,
  LATTICE_ID,
  SCAN_ID,
  TO_TITLE_ID,
  TRACE_ID,
  VISITED_KEY,
} from '#engine/rules/GameOption.ts';
import { HELP } from '#engine/rules/HelpPrompt.ts';
import { RECAP } from '#engine/rules/RecapPrompt.ts';
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
import type { KeyVM } from './KeyVM.ts';
import { BACK_KEY_WORD } from './BackKeyWord.ts';
import { BUFFER_LANDING } from './CardSlots.ts';
import type { HudVM } from './HudVM.ts';
import type { KeyStripVM } from './KeyStripVM.ts';
import type { MapPanelVM } from './MapPanelVM.ts';
import type { MovesLayout } from './MovesLayout.ts';
import type { Panel } from './Panel.ts';
import type { TravelRowVM } from './TravelRowVM.ts';
import { DepthNumber } from './DepthNumber.ts';
import type { Drawings } from './Drawings.ts';
import type { PoleWords } from './PoleWords.ts';
import type { RoomCardVM } from './RoomCardVM.ts';

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
    sync: 'NOMINAL',
  },
  void: {
    meter: 'Integrity',
    path: 'Void trace from the universe',
    sync: 'PRESSURE HIGH',
  },
} as const;
/** The elevator column's current-floor mark (Building.groovy:198-201), and what a reader hears instead. */
const CURRENT_MARK = { text: '[>X<]', label: 'Elevator here' } as const;
/** The visited mark of the old lists, drawn from the engine's letter (its one owner), and what a reader hears instead. */
const SEEN_MARK = { text: `[${VISITED_KEY.toUpperCase()}]`, label: 'Visited' } as const;
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
/** The room card's words (U03e): its corner on each face, its regions and the heading of its back's ways. */
const CARD = {
  corner: {
    toWords: { text: 'WORDS', label: 'Turn the card: the room in words' },
    toRoom: { text: 'ROOM', label: 'Turn the card: the picture' },
  },
  regions: { front: 'The room', back: 'The room in words', ways: 'WAYS' },
} as const;
/** The strip of keys' words (U03e): its regions, MORE, and the short word and drawn icon of each key every strip holds. */
const STRIP = {
  regions: { keys: 'Keys', game: 'GAME' },
  keys: {
    buffer: { text: 'BUFFER', icon: 'buffer' },
    trace: { text: 'TRACE', icon: 'trace' },
    out: { text: 'LEAVE', icon: 'out' },
  },
  more: { text: 'MORE', label: 'More: the game itself' },
} as const;
/** A move as a key of the strip: its short word and drawn icon, by its option id. */
const MOVE_KEYS: ReadonlyMap<string, { readonly text: string; readonly icon: string }> = new Map([
  [BACK_MOVE_ID, { text: BACK_KEY_WORD, icon: 'back' }],
  [FORWARD_MOVE_ID, { text: 'FORWARD', icon: 'forward' }],
  [ELEVATOR_MOVE_ID, { text: 'ELEVATOR', icon: 'elevator' }],
  [CORRIDOR_MOVE_ID, { text: 'CORRIDOR', icon: 'corridor' }],
]);
/** The MORE sheet's keys (U03e): the short word and the drawn icon of each of the game's own options, by its id. */
const GAME_KEYS: ReadonlyMap<string, { readonly text: string; readonly icon: string }> = new Map([
  [SCAN_ID, { text: 'SCAN', icon: 'scan' }],
  [LATTICE_ID, { text: 'LATTICE', icon: 'lattice' }],
  [HELP, { text: 'HELP', icon: 'help' }],
  [TO_TITLE_ID, { text: 'TITLE', icon: 'title' }],
  [RECAP, { text: 'END', icon: 'end' }],
]);

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
  readonly #pole: PoleWords;

  constructor(masthead: Masthead, frame: FrameOf, drawings: Drawings, pole: PoleWords) {
    this.#masthead = masthead;
    this.#frame = frame;
    this.#drawings = drawings;
    this.#pole = pole;
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
    // Where the moves sit is the drawing's to say (U03c, U03e): under the picture, on the room's card, or among the
    // keys at the screen's foot. The dock's order is this presenter's: the way out, then the game's own behind MORE; a
    // card has no dock, nor has a place whose moves are keys.
    const leave = leaveOptions.map((option) => this.#docked(option));
    const system = snapshot.options.filter((option) => option.role === 'system');
    // The list beside the picture is the drawing's to say too: the tower's picture is its whole list.
    const listed = drawing.beside(rows);
    const { strip, ways, keys: keyed } = drawing.arrange(moveOptions.map((option) => this.#docked(option)));
    // A move under the picture carries the icon it would have as a key.
    const moves = strip.map((move) => ({ ...move, icon: MOVE_KEYS.get(move.id)?.icon ?? '' }));
    const buffer = String(snapshot.buffer?.size ?? 0);
    const card: HudVM['card'] = ways.shown
      ? {
          shown: true,
          ...this.#card({
            arrival: place.description[0] ?? '',
            buffer,
            leave: leaveOptions,
            moves: moveOptions,
            system,
          }),
        }
      : { shown: false };
    const keys = this.#keys(keyed, { buffer, moves: moveOptions, leave: leaveOptions, system });
    // The strip that stands, the card's or the screen's own.
    const standing: Panel<KeyStripVM> = card.shown ? card : keys;
    const dock = standing.shown ? [] : [...leave, ...system.map((option) => this.#docked(option))];
    const carded = standing.shown
      ? [
          ...this.#keyed(standing.keys.lead),
          ...this.#keyed(standing.keys.trail),
          ...(card.shown ? card.ways : []),
          ...this.#keyed(standing.game),
        ]
      : [];
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
        { key: 'buffer', label: 'Buffer', value: buffer },
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
      aside: this.#aside(place, takes, snapshot.buffer?.resonant ?? 0, {
        text: labels.sync,
        band: player.band,
      }),
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
      card,
      keys,
      heading: place.childrenHeading.toUpperCase(),
      rows: listed,
      moves,
      sealedNote: listed.some((row) => row.sealed)
        ? { shown: true, text: 'STRUCTURES SEALED · the lattice opens their doors in a later build' }
        : { shown: false },
      sealedTag: 'SEALED',
      dock,
      // On a phone the way out stays out of the fold (I09): one row under the thumb.
      fold: {
        after: standing.shown ? 0 : leave.length,
        out: standing.shown ? 0 : leave.length,
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
        ...carded,
        // The bar's moves are buttons; the moves with no button stay on offer for a keyboard.
        ...(keyed.shown ? [...keyed.bar, ...keyed.unseen] : []),
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
        const depth = new DepthNumber(step.depth).text();
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
      pole: this.#pole.of(trace),
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

  /**
   * The room's card (U03e): its keys — the way back, which is the way out where it is offered and else the engine's
   * move back, and the way forward, each found by its id and shown only where the room offers it; every other move
   * goes on its back.
   */
  #card(parts: {
    readonly arrival: string;
    readonly buffer: string;
    readonly leave: readonly GameOption[];
    readonly moves: readonly GameOption[];
    readonly system: readonly GameOption[];
  }): RoomCardVM {
    const out = this.#outKeys(parts.leave);
    const back = out.length > 0 ? undefined : parts.moves.find((move) => move.id === BACK_MOVE_ID);
    const forward = parts.moves.find((move) => move.id === FORWARD_MOVE_ID);
    const strip = this.#strip({
      buffer: parts.buffer,
      system: parts.system,
      ways: [
        ...out,
        ...(back === undefined ? [] : [this.#moveKey(back)]),
        ...(forward === undefined ? [] : [this.#moveKey(forward)]),
      ],
    });
    const held = new Set([...strip.keys.lead, ...strip.keys.trail].map((each) => each.id));
    return {
      ...strip,
      corner: CARD.corner,
      arrival: parts.arrival,
      ways: [...parts.leave, ...parts.moves]
        .filter((option) => !held.has(option.id))
        .map((option) => this.#docked(option)),
      regions: { ...strip.regions, ...CARD.regions },
    };
  }

  /**
   * The keys of a place that is no card: each move the layout puts among them, then the way out, and the layout's bar;
   * not shown where the layout puts no move among the keys.
   */
  #keys(
    layout: MovesLayout['keys'],
    parts: {
      readonly buffer: string;
      readonly moves: readonly GameOption[];
      readonly leave: readonly GameOption[];
      readonly system: readonly GameOption[];
    },
  ): HudVM['keys'] {
    if (!layout.shown) return { shown: false };
    return {
      shown: true,
      ...this.#strip({
        buffer: parts.buffer,
        system: parts.system,
        ways: [
          ...parts.moves
            .filter((move) => layout.moves.some((each) => each.id === move.id))
            .map((move) => this.#moveKey(move)),
          ...this.#outKeys(parts.leave),
        ],
      }),
      bar: layout.bar,
    };
  }

  /**
   * The strip of keys (U03e): Buffer with its count, then Trace, then the place's `ways` in the order given; every
   * other option of the game on the MORE sheet. No option stands twice.
   */
  #strip(parts: {
    readonly buffer: string;
    readonly system: readonly GameOption[];
    readonly ways: readonly KeyVM[];
  }): KeyStripVM {
    const keys = {
      lead: parts.system
        .filter((option) => option.id === BUFFER)
        // The Buffer key counts the buffer, and a taken relic flies to it.
        .map((option) => ({
          ...this.#key(option, STRIP.keys.buffer),
          badge: parts.buffer,
          anchor: BUFFER_LANDING,
        })),
      trail: [
        ...parts.system
          .filter((option) => option.id === TRACE_ID)
          .map((option) => this.#key(option, STRIP.keys.trace)),
        ...parts.ways,
      ],
    };
    const held = new Set([...keys.lead, ...keys.trail].map((each) => each.id));
    return {
      keys,
      more: STRIP.more,
      game: parts.system
        .filter((option) => !held.has(option.id))
        .map((option) =>
          this.#key(option, GAME_KEYS.get(option.id) ?? { text: option.label.toUpperCase(), icon: 'game' }),
        ),
      regions: STRIP.regions,
    };
  }

  /** An option as a key of the strip: the short word shown, its drawn icon, the option's own words for a reader. */
  #key(option: GameOption, words: { readonly text: string; readonly icon: string }): KeyVM {
    return {
      id: option.id,
      key: option.key.toUpperCase(),
      anchor: '',
      text: words.text,
      label: option.label,
      icon: words.icon,
      badge: '',
    };
  }

  /** A move as a key: its short word and icon by its id, the move's own words where the table names none. */
  #moveKey(move: GameOption): KeyVM {
    return this.#key(move, MOVE_KEYS.get(move.id) ?? { text: move.label.toUpperCase(), icon: 'move' });
  }

  /** The way out as a key; none where the place offers no way out. */
  #outKeys(leave: readonly GameOption[]): readonly KeyVM[] {
    return leave.slice(0, 1).map((out) => this.#key(out, STRIP.keys.out));
  }

  /** A strip's keys as the router's options. */
  #keyed(keys: readonly KeyVM[]): readonly OptionVM[] {
    return keys.map((each) => ({ id: each.id, key: each.key, label: each.label, opposite: '' }));
  }

  /**
   * The objects as tiles when the place is one that holds things — each with the take the engine offers
   * for its number — the telemetry block when it is indoors, and the map when it is not (Guide:339) and the place
   * has one.
   */
  #aside(
    place: PlaceSummary,
    takes: readonly GameOption[],
    resonant: number,
    sync: NonNullable<AsideVM['telemetry']>['sync'],
  ): AsideVM {
    const contents = place.contents;
    return {
      objects:
        contents === null
          ? null
          : {
              label: 'In this room',
              heading: 'IN THIS ROOM',
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
              heading: 'TELEMETRY',
              sync,
              spectrogram: {
                label: 'Quantum spectrogram',
                picture: {
                  anchors: place.telemetry.spectrogram,
                  tallest: SPECTROGRAM_TALLEST,
                  decades: SPECTROGRAM_DECADES,
                  noise: place.noise,
                  peaks: place.telemetry.peaks,
                  glitched: place.telemetry.glitched,
                },
              },
              lines: [`Resonant traces ${String(resonant)}`],
              voice: place.telemetry.voice ?? '',
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
