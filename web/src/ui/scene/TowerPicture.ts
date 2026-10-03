import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { LevelKind } from '#engine/model/LevelKind.ts';
import { LevelLook } from './LevelLook.ts';
import type { SceneCamera } from './SceneCamera.ts';
import type { SceneHit } from './SceneHit.ts';
import type { ScenePicture } from './ScenePicture.ts';
import type { TowerVM } from './TowerVM.ts';
import { StillCamera } from './StillCamera.ts';
import type { TowerParts } from './TowerParts.ts';
import { TravelCamera } from './TravelCamera.ts';
import type { ChildMark } from './ChildMark.ts';
import { NoTrack } from './NoTrack.ts';
import { SliderTrack } from './SliderTrack.ts';

/** A floor's row is at least this tall where it fits (a thumb), and the window shows 4 to 11 of them. */
const ROW = 50;
const FEWEST = 4;
const MOST = 11;
/** The window runs the picture's whole height but for this edge. */
const EDGE = 6;
/**
 * What stands past the tower's ends, in rows: the window scrolls this far above the top floor, where the roof is, and
 * below the lowest level, where the bedrock is.
 */
const ROOF = 0.8;
const FOOT = 0.45;
/**
 * The strip left of the tower the floor numbers are written in: as wide as the tower's longest label — a character
 * taken at most this wide, a little over its advance in the pictures' font at its 12 px floor — and the room around
 * it. Then the room the gauge takes on the right.
 */
const DIGIT = 7.5;
const NUMBERS_ROOM = 14;
const GAUGE = 58;
const GAUGE_ROOM = 66;
const MARGIN = 20;
/** A slider must be a thumb's width (Decision 3): the gauge's box is this wide. */
const SLIDER = 58;
/** The gauge's ticks are labelled only where their numbers stand this far apart. */
const LABEL_GAP = 16;
/** The mock's elevator: a trip of d floors takes 320 + 230·√d ms, at most 2.4 s; a drag settles in 380 + 40·√d. */
const PACE = { base: 320, per: 230, most: 2400 };
const SETTLE = { base: 380, per: 40 };
const COAST = 0.22;

/** A level's row on the tower. */
type Row = TowerVM['tower']['rows'][number];

/** Where the window stands at a view: its box, its rows, and which levels it shows. */
interface Frame {
  readonly tower: TowerVM['tower'];
  /** Each level's row by its number. */
  readonly rows: ReadonlyMap<number, Row>;
  readonly top: number;
  readonly bottom: number;
  /** The tower's own ends inside the window: its roof line and its bedrock line, the window's edge when out of view. */
  readonly head: number;
  readonly foot: number;
  readonly visible: number;
  readonly row: number;
  readonly left: number;
  readonly width: number;
  readonly shaft: number;
  readonly inner: number;
  readonly middle: number;
  readonly min: number;
  readonly max: number;
  /** The level at the window's foot (fractional while the car moves). */
  readonly base: number;
  readonly gauge: boolean;
}

/**
 * Draws a building as the mock rides it (U02; the mock's `building`, `transit-reframed.html:766-826`): a window
 * of thumb-sized floors that follows the car, the shaft and the car on its cable, each floor's number, windows
 * and its corridor in its shape with a tick per door in its state's ink; the window takes the picture's whole
 * height and scrolls a little past the tower's ends, onto the roof above the top floor and the bedrock — sealed, or
 * broken open onto the Layers — under the lowest; and
 * the gauge on the right: the whole height, its ticks, the floors visited, the window and the car — the one
 * thing a finger moves the window by: a drag on the floors is the page's. The view is
 * the car's floor, owned by the scene host. A pure function of its view-model, size, time, lit child and view.
 */
export class TowerPicture implements ScenePicture<TowerVM> {
  readonly #parts: TowerParts;
  /** Each kind of level's look: a floor in the rule's ink, a Layer faint in the void's red. */
  readonly #levelLooks: Readonly<Record<LevelKind, LevelLook>> = {
    floor: new LevelLook({ even: 0.5, odd: 0.35, ground: 'rule', number: 'text', tick: 'dim' }),
    layer: new LevelLook({ even: 0.1, odd: 0.1, ground: 'rd', number: 'rd', tick: 'rd' }),
  };

  constructor(parts: TowerParts) {
    this.#parts = parts;
  }

  camera(vm: TowerVM, size: PictureSize): SceneCamera {
    const frame = this.#frame(vm, size, vm.tower.car);
    if (frame === undefined) return new StillCamera();
    const stops = vm.children.map((child) => ({ id: child.id, at: child.level.number() }));
    return new TravelCamera({
      rest: frame.tower.car,
      min: frame.min,
      max: frame.max,
      // A finger on the floors scrolls the page and taps a floor; only the gauge moves the window.
      drag: 0,
      axis: 'y',
      coast: COAST,
      snap: true,
      settle: SETTLE,
      pace: PACE,
      zoom: false,
      stops,
      track: frame.gauge
        ? new SliderTrack({
            x: size.width - SLIDER - 4,
            y: frame.top,
            width: SLIDER,
            height: frame.bottom - frame.top,
            axis: 'y',
            from: frame.max,
            to: frame.min,
          })
        : new NoTrack(),
    });
  }

  layout(vm: TowerVM, size: PictureSize, view: number): readonly SceneHit[] {
    const frame = this.#frame(vm, size, view);
    if (frame === undefined) return [];
    const hits: SceneHit[] = [];
    for (const level of this.#levels(frame)) {
      const child = this.#childAt(vm, level);
      if (child === undefined) continue;
      const y = this.#y(frame, level);
      const top = Math.max(frame.top, y);
      const height = Math.min(frame.bottom, y + frame.row) - top;
      if (height <= 4) continue;
      hits.push({
        id: child.id,
        x: 0,
        y: top,
        width: frame.left + frame.width,
        height,
        anchor: { x: frame.middle, y: top + height / 2 },
      });
    }
    return hits;
  }

  paint(
    painter: Painter,
    vm: TowerVM,
    size: PictureSize,
    palette: Palette,
    time: number,
    lit: ChildMark,
    view: number,
  ): void {
    painter.globalAlpha = 1;
    painter.shadowBlur = 0;
    painter.setLineDash([]);
    painter.fillStyle = palette('ground');
    painter.fillRect(0, 0, size.width, size.height);
    const frame = this.#frame(vm, size, view);
    if (frame === undefined) return;
    const seconds = time / 1000;
    painter.save();
    painter.beginPath();
    painter.rect(0, frame.top, size.width, frame.bottom - frame.top);
    painter.clip();
    for (const level of this.#levels(frame)) this.#floor(painter, vm, frame, level, palette, seconds, lit);
    if (vm.tower.breached) this.#bedrockLine(painter, frame, palette, seconds);
    this.#car(painter, frame, palette, view);
    this.#roof(painter, frame, palette);
    this.#bedrock(painter, frame, palette);
    painter.restore();
    painter.globalAlpha = 0.8;
    painter.strokeStyle = palette('cy');
    painter.lineWidth = 1.2;
    painter.strokeRect(frame.left + 0.5, frame.head + 0.5, frame.width, frame.foot - frame.head);
    painter.beginPath();
    painter.moveTo(frame.inner + 0.5, frame.head);
    painter.lineTo(frame.inner + 0.5, frame.foot);
    painter.stroke();
    if (frame.gauge) this.#gauge(painter, vm, frame, size, palette, view);
    painter.globalAlpha = 1;
  }

  #frame(vm: TowerVM, size: PictureSize, view: number): Frame | undefined {
    const tower = vm.tower;
    if (tower.rows.length === 0) return undefined;
    const rows = new Map(tower.rows.map((row) => [row.level.number(), row]));
    const min = Math.min(...rows.keys());
    const max = Math.max(...rows.keys());
    const levels = max - min + 1;
    const top = EDGE;
    const bottom = size.height - EDGE;
    // The window counts the roof and the bedrock among what it scrolls over: a short tower shows them both at once.
    const visible = Math.min(
      levels + ROOF + FOOT,
      Math.min(MOST, Math.max(FEWEST, Math.floor((bottom - top) / ROW))),
    );
    const row = (bottom - top) / visible;
    const gauge = vm.children.length > 0;
    const numbers = Math.max(...tower.rows.map((each) => each.level.label().length)) * DIGIT + NUMBERS_ROOM;
    const width = size.width - numbers - (gauge ? GAUGE_ROOM : MARGIN);
    const shaft = Math.min(GAUGE, width * 0.13);
    const inner = numbers + shaft;
    const clamped = Math.min(Math.max(view, min), max);
    const base = Math.min(Math.max(clamped - (visible - 1) / 2, min - FOOT), max - visible + 1 + ROOF);
    return {
      tower,
      rows,
      top,
      bottom,
      head: Math.max(top, bottom - (max - base + 1) * row),
      foot: Math.min(bottom, bottom - (min - base) * row),
      visible,
      row,
      left: numbers,
      width,
      shaft,
      inner,
      middle: inner + (width - shaft) / 2,
      min,
      max,
      base,
      gauge,
    };
  }

  /** The levels at least partly in the window, from the foot up. */
  #levels(frame: Frame): number[] {
    const from = Math.max(frame.min, Math.floor(frame.base));
    const to = Math.min(frame.max, Math.ceil(frame.base + frame.visible - 1));
    return Array.from({ length: Math.max(0, to - from + 1) }, (_, k) => from + k);
  }

  /** The top of a level's row. */
  #y(frame: Frame, level: number): number {
    return frame.bottom - (level - frame.base + 1) * frame.row;
  }

  #childAt(vm: TowerVM, level: number): TowerVM['children'][number] | undefined {
    return vm.children.find((child) => child.level.number() === level);
  }

  /** How the level is drawn, by what stands there; a level with no row (none today: every level has one) as a floor. */
  #lookAt(frame: Frame, level: number): LevelLook {
    return this.#levelLooks[frame.rows.get(level)?.level.kind() ?? 'floor'];
  }

  /** The level's label as its row carries it; nothing written where it has none. */
  #labelAt(frame: Frame, level: number): string {
    return frame.rows.get(level)?.level.label() ?? '';
  }

  /** The roof over the top floor, where the window has scrolled onto it. */
  #roof(painter: Painter, frame: Frame, palette: Palette): void {
    const rise = Math.min(frame.width * 0.2, ROOF * frame.row - 8);
    if (frame.head <= frame.top || rise <= 4) return;
    const { middle, width } = frame;
    painter.globalAlpha = 0.6;
    painter.strokeStyle = palette('cy');
    painter.lineWidth = 1.2;
    painter.beginPath();
    this.#parts.roofDrawers[this.#parts.roofs.of(frame.tower.address, frame.tower.landmark)].trace(painter, {
      base: frame.head,
      rise,
      origin: middle,
      span: width,
      middle,
      left: frame.inner,
      right: frame.left + width,
    });
    painter.stroke();
    painter.globalAlpha = 1;
  }

  /** The bedrock under the lowest level — the substrate's end once breached — where the window has scrolled onto it. */
  #bedrock(painter: Painter, frame: Frame, palette: Palette): void {
    const { left, width, foot, bottom } = frame;
    if (foot >= bottom) return;
    painter.globalAlpha = 0.06;
    painter.fillStyle = palette('rd');
    painter.fillRect(left, foot, width, bottom - foot);
    painter.globalAlpha = 0.3;
    painter.strokeStyle = palette('rd');
    painter.lineWidth = 1;
    painter.beginPath();
    for (let x = left; x < left + width; x += 10) {
      painter.moveTo(x, foot + 2);
      painter.lineTo(Math.min(x + 8, left + width), bottom);
    }
    painter.stroke();
    painter.globalAlpha = 1;
  }

  /** One floor's row: its ground, its windows, its corridor in its shape with a tick per door, its number. */
  #floor(
    painter: Painter,
    vm: TowerVM,
    frame: Frame,
    level: number,
    palette: Palette,
    seconds: number,
    lit: ChildMark,
  ): void {
    const { left, width, inner, shaft, row } = frame;
    const y = this.#y(frame, level);
    const child = this.#childAt(vm, level);
    const isLit = child !== undefined && lit.marks(child.id);
    const look = this.#lookAt(frame, level);
    painter.globalAlpha = isLit ? 1 : look.alpha(level);
    painter.fillStyle = palette(isLit ? 'rule-hi' : look.ground());
    painter.fillRect(inner, y, width - shaft, row);
    painter.globalAlpha = 0.35;
    painter.strokeStyle = palette('cy');
    painter.lineWidth = 1;
    painter.beginPath();
    painter.moveTo(left, y + row + 0.5);
    painter.lineTo(left + width, y + row + 0.5);
    painter.stroke();
    this.#windows(painter, frame, level, y, palette, seconds);
    this.#corridor(painter, frame, level, y, palette);
    if (isLit) {
      painter.globalAlpha = 1;
      painter.strokeStyle = palette('yl');
      painter.lineWidth = 1.5;
      painter.strokeRect(inner + 0.5, y + 0.5, width - shaft - 1, row);
    }
    painter.globalAlpha = 1;
    painter.font = this.#parts.font.of(isLit ? 'bold' : 'regular');
    painter.textAlign = 'right';
    painter.textBaseline = 'middle';
    painter.fillStyle = palette(isLit || child?.visited === true ? 'yl' : look.number());
    painter.fillText(this.#labelAt(frame, level), left - 8, y + row / 2);
  }

  /** A row of windows, some lit, each breathing at its own pace. */
  #windows(
    painter: Painter,
    frame: Frame,
    level: number,
    y: number,
    palette: Palette,
    seconds: number,
  ): void {
    const span = frame.width - frame.shaft;
    const cells = Math.min(10, Math.max(4, Math.round(span / 66)));
    const cell = span / cells;
    const top = y + frame.row * 0.14;
    const tall = frame.row * 0.4;
    const key = `${frame.tower.address}/${String(level)}`;
    for (let k = 0; k < cells; k++) {
      const on = this.#parts.noise.fraction(key, k);
      const x = frame.inner + cell * k;
      painter.globalAlpha = 0.13;
      painter.strokeStyle = palette('cy');
      painter.strokeRect(x + 4.5, top + 0.5, cell - 9, tall);
      if (on <= 0.45) continue;
      const warm = on > 0.9;
      painter.globalAlpha = (0.1 + 0.08 * Math.sin(seconds * 1.3 + on * 40)) * (warm ? 2.6 : 1);
      painter.fillStyle = palette(warm ? 'yl' : 'cy');
      painter.fillRect(x + 6, top + 2, cell - 12, tall - 3);
    }
  }

  /**
   * The floor's corridor as a line in its shape — bowed when curved, stopped by a wall when a service corridor,
   * breaking into static when it dissolves — with a tick per door in its state's ink, the doors in pairs.
   */
  #corridor(painter: Painter, frame: Frame, level: number, y: number, palette: Palette): void {
    const passage = frame.rows.get(level);
    const shape = this.#parts.rows[passage?.shape ?? 'none'];
    const looks = passage?.looks ?? [];
    const line = y + frame.row * 0.76;
    const bow = shape.bow(frame.row);
    const from = frame.inner + 10;
    const full = frame.left + frame.width - 12;
    const to = shape.reach(from, full);
    const along = (p: number): { x: number; y: number } => ({
      x: from + (to - from) * p,
      y: line - bow * 4 * p * (1 - p),
    });
    painter.globalAlpha = 0.45;
    painter.strokeStyle = palette('cy');
    painter.lineWidth = 1;
    painter.beginPath();
    for (let step = 0; step <= 16; step++) {
      const point = along(step / 16);
      if (step === 0) painter.moveTo(point.x, point.y);
      else painter.lineTo(point.x, point.y);
    }
    shape.wall(painter, to, line);
    painter.stroke();
    shape.tail(painter, palette, to, line);
    const pairs = Math.ceil(looks.length / 2);
    for (const [index, look] of looks.entries()) {
      const point = along((Math.floor(index / 2) + 0.5) / pairs);
      painter.globalAlpha = 0.8;
      painter.fillStyle = palette(this.#parts.inks.ink(look.stateLook()));
      painter.fillRect(point.x - 1, index % 2 === 1 ? point.y + 1 : point.y - 5, 2, 4);
    }
  }

  /** Once breached (the figure says so), a broken red line between the lowest floor and the first Layer, throbbing: the bedrock, open. */
  #bedrockLine(painter: Painter, frame: Frame, palette: Palette, seconds: number): void {
    const above = [...frame.rows.values()].filter((row) => !row.level.belowBedrock());
    const y = this.#y(frame, Math.min(...above.map((row) => row.level.number()))) + frame.row;
    if (y < frame.top || y > frame.bottom) return;
    painter.globalAlpha = 0.25 * (0.6 + 0.4 * Math.sin(seconds * 3));
    painter.fillStyle = palette('rd');
    painter.fillRect(frame.left, y - 4, frame.width, 8);
    painter.globalAlpha = 0.7;
    painter.strokeStyle = palette('rd');
    painter.lineWidth = 1.5;
    painter.setLineDash([6, 5]);
    painter.beginPath();
    painter.moveTo(frame.left, y);
    painter.lineTo(frame.left + frame.width, y);
    painter.stroke();
    painter.setLineDash([]);
  }

  /** The shaft and the car at the view, on its cable from the top. */
  #car(painter: Painter, frame: Frame, palette: Palette, view: number): void {
    const { left, shaft, head, foot, row } = frame;
    painter.globalAlpha = 1;
    painter.fillStyle = palette('ground');
    painter.fillRect(left, head, shaft, foot - head);
    painter.globalAlpha = 0.18;
    painter.strokeStyle = palette('cy');
    painter.beginPath();
    for (const level of this.#levels(frame)) {
      const y = this.#y(frame, level) + row + 0.5;
      painter.moveTo(left, y);
      painter.lineTo(left + shaft, y);
    }
    painter.stroke();
    const car = this.#y(frame, Math.min(Math.max(view, frame.min), frame.max));
    painter.globalAlpha = 0.7;
    painter.strokeStyle = palette('yl');
    painter.lineWidth = 1.5;
    painter.beginPath();
    painter.moveTo(left + shaft / 2, head);
    painter.lineTo(left + shaft / 2, car + 3);
    painter.stroke();
    painter.globalAlpha = 0.88;
    painter.fillStyle = palette('yl');
    painter.fillRect(left + 4, car + 3, shaft - 8, row - 6);
    painter.globalAlpha = 1;
    painter.fillStyle = palette('ground');
    painter.fillRect(left + shaft / 2 - 0.75, car + 6, 1.5, row - 12);
  }

  /** The gauge: the whole height on a track, its ticks, the floors visited, the window's span and the car. */
  #gauge(
    painter: Painter,
    vm: TowerVM,
    frame: Frame,
    size: PictureSize,
    palette: Palette,
    view: number,
  ): void {
    const { top, bottom, min, max } = frame;
    const x = size.width - SLIDER - 4 + SLIDER - 18;
    const span = max - min;
    const at = (level: number): number => (span === 0 ? top : top + ((max - level) / span) * (bottom - top));
    painter.globalAlpha = 0.35;
    painter.fillStyle = palette('cy');
    painter.fillRect(x, top, 2, bottom - top);
    const levels = span + 1;
    const step = levels > 40 ? 10 : levels > 14 ? 5 : 2;
    const labelled = span === 0 || ((bottom - top) * step) / span >= LABEL_GAP;
    const ticks = new Set<number>([max]);
    for (let level = min === 0 ? 0 : Math.ceil(min / step) * step; level <= max; level += step)
      ticks.add(level);
    painter.font = this.#parts.font.of('regular');
    painter.textAlign = 'right';
    painter.textBaseline = 'middle';
    for (const level of ticks) {
      painter.globalAlpha = 1;
      painter.fillStyle = palette('rule-hi');
      painter.fillRect(x - 4, at(level), 10, 1);
      if (!labelled) continue;
      painter.fillStyle = palette(this.#lookAt(frame, level).tick());
      painter.fillText(this.#labelAt(frame, level), x - 8, at(level));
    }
    painter.fillStyle = palette('yl');
    painter.globalAlpha = 0.85;
    for (const child of vm.children) {
      if (child.visited) painter.fillRect(x - 6, at(child.level.number()) - 1, 14, 2);
    }
    const high = at(Math.min(max, frame.base + frame.visible - 1));
    const low = at(Math.max(min, frame.base));
    painter.globalAlpha = 0.14;
    painter.fillStyle = palette('cy');
    painter.fillRect(x - 10, high, 22, Math.max(22, low - high));
    painter.globalAlpha = 1;
    painter.strokeStyle = palette('cy');
    painter.lineWidth = 1;
    painter.strokeRect(x - 10, high, 22, Math.max(22, low - high));
    const car = at(Math.min(Math.max(view, min), max));
    painter.fillStyle = palette('yl');
    painter.beginPath();
    painter.moveTo(x - 20, car - 5);
    painter.lineTo(x - 12, car);
    painter.lineTo(x - 20, car + 5);
    painter.closePath();
    painter.fill();
  }
}
