import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { DriftLane, PoleLane, PoleLevelVM } from '#ui/screens/PoleVM.ts';
import type { Point } from './Point.ts';

/** How far apart the levels stand (Decision 13: well apart; the pole scrolls when they do not fit). */
const GAP = 76;
/** Room above the first level for the ribbons' heads, and below the last. */
const TOP = 72;
const FOOT = 56;
const BOTTOM = 26;
/** The ribbons: their width and the gap between them, from the right edge in. */
const LANE_WIDTH = 18;
const LANE_GAP = 11;
const EDGE = 10;
/** The spine, the plates on it, and the words beside them. */
const SPINE_X = 84;
const PLATE_RADIUS = 21;
const WORDS_FROM = 14;
const WORDS_TO = 12;
/** A ribbon's run reaches this share of a gap past its first and last level. */
const REACH = 0.42;
/** A hook leaves the current this share of a gap above its level. */
const HOOK_FROM = 0.35;
/** An empty berth stands left of the plate. */
const BERTH_FROM = 28;
const LANES: readonly PoleLane[] = ['era', 'culture', 'trait'];
const DRIFT_LANES: readonly DriftLane[] = ['era', 'culture'];

/** One level's row: where it stands, its plate, where its words go, and its button's box. */
export interface PoleRow {
  readonly y: number;
  readonly plate: Point;
  readonly radius: number;
  readonly words: { readonly x: number; readonly width: number };
  readonly box: { readonly x: number; readonly y: number; readonly width: number; readonly height: number };
}

/** A ribbon's run: one value held from one level down to another; its notch where the level set it. */
export interface PoleRun {
  readonly lane: PoleLane;
  readonly x: number;
  readonly width: number;
  readonly top: number;
  readonly bottom: number;
  readonly notch: number;
  readonly word: string;
  /** Set by a rebel district: the notch burns red. */
  readonly rebel: boolean;
}

/**
 * Where the pole's parts stand at a width (U05; the mock's `drawPole`, `transit-reframed.html:1152-1213`): a row a
 * level on the spine, the three ribbons as runs that break where a level changes the value or swaps the pairs, the
 * drift current beside the era and culture ribbons with its words where the second pair changes, a hook where a level
 * starts to drift, and the ships' empty berths. Value object: the one place the pole's geometry is decided.
 */
export class PoleLayout {
  readonly #levels: readonly PoleLevelVM[];
  readonly #width: number;
  readonly #height: number;
  readonly #first: number;

  private constructor(levels: readonly PoleLevelVM[], width: number, height: number) {
    this.#levels = levels;
    this.#width = width;
    this.#height = Math.max(height, TOP + FOOT + GAP * Math.max(0, levels.length - 1));
    this.#first = TOP + Math.max(0, (this.#height - TOP - BOTTOM - GAP * (levels.length - 1)) / 2);
  }

  /** The factory: the pole for these levels in a picture at least this size. */
  static of(levels: readonly PoleLevelVM[], size: PictureSize): PoleLayout {
    return new PoleLayout(levels, size.width, size.height);
  }

  /** The picture's size: as tall as the screen, or taller when the levels need it (it scrolls). */
  size(): PictureSize {
    return { width: this.#width, height: this.#height };
  }

  rows(): readonly PoleRow[] {
    const wordsX = SPINE_X + PLATE_RADIUS + WORDS_FROM;
    return this.#levels.map((_level, index) => {
      const y = this.#y(index);
      return {
        y,
        plate: { x: SPINE_X, y },
        radius: PLATE_RADIUS,
        words: { x: wordsX, width: this.#laneX('era') - wordsX - WORDS_TO },
        box: { x: 0, y: y - GAP / 2, width: this.#width, height: GAP },
      };
    });
  }

  /** The spine from the first level down to you. */
  spine(): { readonly x: number; readonly top: number; readonly bottom: number } {
    return { x: SPINE_X, top: this.#y(0), bottom: this.#y(this.#levels.length - 1) };
  }

  /** Each ribbon's lane, where its head is written. */
  lanes(): readonly {
    readonly lane: PoleLane;
    readonly x: number;
    readonly width: number;
    readonly head: Point;
  }[] {
    return LANES.map((lane) => ({
      lane,
      x: this.#laneX(lane),
      width: LANE_WIDTH,
      head: { x: this.#laneX(lane) + LANE_WIDTH / 2, y: TOP - 14 },
    }));
  }

  /** Every ribbon's runs, lane by lane, top down. */
  runs(): readonly PoleRun[] {
    return LANES.flatMap((lane) => this.#runsOf(lane));
  }

  /** The drift current beside each of the era and culture ribbons: from the planet down to you. */
  currents(): readonly {
    readonly lane: DriftLane;
    readonly x: number;
    readonly top: number;
    readonly bottom: number;
  }[] {
    const from = this.#levels.findIndex((level) => level.current.era !== '');
    if (from < 0) return [];
    return DRIFT_LANES.map((lane) => ({
      lane,
      x: this.#currentX(lane),
      top: this.#y(from),
      bottom: this.#y(this.#levels.length - 1) + GAP * REACH,
    }));
  }

  /** The current's words, where the second pair it carries first shows or changes. */
  currentWords(): readonly { readonly lane: DriftLane; readonly at: Point; readonly word: string }[] {
    return DRIFT_LANES.flatMap((lane) =>
      this.#levels.flatMap((level, index) => {
        const word = level.current[lane];
        if (word === '' || this.#levels[index - 1]?.current[lane] === word) return [];
        return [{ lane, at: { x: this.#currentX(lane), y: this.#y(index) + 6 }, word }];
      }),
    );
  }

  /** A hook from the current into a ribbon where a level starts to drift in its value. */
  hooks(): readonly { readonly lane: DriftLane; readonly from: Point; readonly to: Point }[] {
    return DRIFT_LANES.flatMap((lane) =>
      this.#levels.flatMap((level, index) => {
        if (!level.drift[lane] || this.#levels[index - 1]?.drift[lane] === true) return [];
        const y = this.#y(index);
        return [
          {
            lane,
            from: { x: this.#currentX(lane), y: y - GAP * HOOK_FROM },
            to: { x: this.#laneX(lane), y },
          },
        ];
      }),
    );
  }

  /** The ships' empty berths, left of their levels' plates. */
  berths(): readonly Point[] {
    return this.#levels.flatMap((level, index) =>
      level.berth ? [{ x: SPINE_X - PLATE_RADIUS - BERTH_FROM, y: this.#y(index) }] : [],
    );
  }

  #runsOf(lane: PoleLane): readonly PoleRun[] {
    const runs: PoleRun[] = [];
    const breaks = (index: number) => lane !== 'trait' && this.#levels[index]?.rebel === true;
    for (let first = 0; first < this.#levels.length;) {
      const word = this.#levels[first]?.values[lane] ?? '';
      let last = first;
      while (
        last + 1 < this.#levels.length &&
        this.#levels[last + 1]?.values[lane] === word &&
        !breaks(last + 1)
      )
        last++;
      if (word !== '')
        runs.push({
          lane,
          x: this.#laneX(lane),
          width: LANE_WIDTH,
          top: this.#y(first) - GAP * REACH,
          bottom: this.#y(last) + GAP * REACH,
          notch: this.#y(first),
          word,
          rebel: breaks(first),
        });
      first = last + 1;
    }
    return runs;
  }

  #y(index: number): number {
    return this.#first + GAP * index;
  }

  #laneX(lane: PoleLane): number {
    return this.#width - EDGE - (LANES.length - LANES.indexOf(lane)) * (LANE_WIDTH + LANE_GAP) + LANE_GAP;
  }

  #currentX(lane: DriftLane): number {
    return this.#laneX(lane) - LANE_GAP / 2;
  }
}
