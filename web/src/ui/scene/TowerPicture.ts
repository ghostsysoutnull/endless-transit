import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { PictureSize } from '#ui/canvas/Picture.ts';
import { DoorLooks } from './DoorLooks.ts';
import { Roof } from './Roof.ts';
import type { SceneCamera } from './SceneCamera.ts';
import { SceneHash } from './SceneHash.ts';
import type { SceneHit } from './SceneHit.ts';
import type { ScenePicture } from './ScenePicture.ts';
import type { SceneVM } from './SceneVM.ts';

const MONO = '"IBM Plex Mono", ui-monospace, Menlo, Consolas, monospace';
/** No number on the picture is smaller than this (touch first: it must read on a phone). */
const TEXT = 12;
/** A floor's row is at least this tall where it fits (a thumb), and the window shows 4 to 11 of them. */
const ROW = 50;
const FEWEST = 4;
const MOST = 11;
/** The strip left of the tower the floor numbers are written in, and the room the gauge takes on the right. */
const NUMBERS = 46;
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

/** Where the window stands at a view: its box, its rows, and which levels it shows. */
interface Frame {
  readonly tower: NonNullable<SceneVM['tower']>;
  readonly top: number;
  readonly bottom: number;
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
 * and its corridor in its shape with a tick per door in its state's ink, the roof when the top is in view and
 * the bedrock — sealed, or broken open onto the Layers — when the foot is; counts of the floors out of view; and
 * the gauge on the right: the whole height, its ticks, the floors visited, the window and the car. The view is
 * the car's floor, owned by the scene host. A pure function of its view-model, size, time, lit child and view.
 */
export class TowerPicture implements ScenePicture<SceneVM> {
  readonly #noise = new SceneHash();
  readonly #roofs = new Roof();
  readonly #looks = new DoorLooks();

  camera(vm: SceneVM, size: PictureSize): SceneCamera | null {
    const frame = this.#frame(vm, size, vm.tower?.car ?? 0);
    if (frame === undefined) return null;
    const stops = vm.children
      .map((child) => ({ id: child.id, at: Number(child.ordinal) }))
      .sort((one, other) => one.at - other.at);
    return {
      rest: frame.tower.car,
      min: frame.min,
      max: frame.max,
      drag: stops.length === 0 ? 0 : 1 / frame.row,
      axis: 'y',
      coast: COAST,
      snap: true,
      settle: SETTLE,
      pace: PACE,
      zoom: false,
      stops,
      track: frame.gauge
        ? {
            x: size.width - SLIDER - 4,
            y: frame.top,
            width: SLIDER,
            height: frame.bottom - frame.top,
            axis: 'y',
            from: frame.max,
            to: frame.min,
          }
        : null,
    };
  }

  layout(vm: SceneVM, size: PictureSize, view: number): readonly SceneHit[] {
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
        x: frame.left - 36,
        y: top,
        width: frame.width + 36,
        height,
        anchor: { x: frame.middle, y: top + height / 2 },
      });
    }
    return hits;
  }

  paint(
    painter: Painter,
    vm: SceneVM,
    size: PictureSize,
    palette: Palette,
    time: number,
    lit: string,
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
    this.#top(painter, frame, palette);
    this.#foot(painter, frame, size, palette);
    painter.save();
    painter.beginPath();
    painter.rect(0, frame.top, size.width, frame.bottom - frame.top);
    painter.clip();
    for (const level of this.#levels(frame)) this.#floor(painter, vm, frame, level, palette, seconds, lit);
    this.#bedrockLine(painter, frame, palette);
    this.#car(painter, frame, palette, view);
    painter.restore();
    painter.globalAlpha = 0.8;
    painter.strokeStyle = palette('cy');
    painter.lineWidth = 1.2;
    painter.strokeRect(frame.left + 0.5, frame.top + 0.5, frame.width, frame.bottom - frame.top);
    painter.beginPath();
    painter.moveTo(frame.inner + 0.5, frame.top);
    painter.lineTo(frame.inner + 0.5, frame.bottom);
    painter.stroke();
    if (frame.gauge) this.#gauge(painter, vm, frame, size, palette, view);
    painter.globalAlpha = 1;
  }

  #frame(vm: SceneVM, size: PictureSize, view: number): Frame | undefined {
    const tower = vm.tower;
    if (tower === null) return undefined;
    // Never −0: the lowest level is the lobby until the bedrock is open.
    const min = tower.below === 0 ? 0 : -tower.below;
    const max = Math.max(tower.floors - 1, 0);
    const levels = max - min + 1;
    const top = Math.max(size.height * 0.1, 52);
    const bottom = size.height - Math.max(size.height * 0.09, 38);
    const visible = Math.min(levels, Math.min(MOST, Math.max(FEWEST, Math.floor((bottom - top) / ROW))));
    const row = (bottom - top) / visible;
    const gauge = vm.children.length > 0;
    const width = size.width - NUMBERS - (gauge ? GAUGE_ROOM : MARGIN);
    const shaft = Math.min(GAUGE, width * 0.13);
    const inner = NUMBERS + shaft;
    const clamped = Math.min(Math.max(view, min), max);
    const base = Math.min(Math.max(clamped - (visible - 1) / 2, min), max - visible + 1);
    return {
      tower,
      top,
      bottom,
      visible,
      row,
      left: NUMBERS,
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

  #childAt(vm: SceneVM, level: number): SceneVM['children'][number] | undefined {
    return vm.children.find((child) => Number(child.ordinal) === level);
  }

  /** The roof when the top floor is in view, else how many floors are above the window. */
  #top(painter: Painter, frame: Frame, palette: Palette): void {
    if (frame.base < frame.max - frame.visible + 1 - 0.01) {
      this.#count(
        painter,
        `▲ ${String(Math.ceil(frame.max - (frame.base + frame.visible - 1)))}`,
        frame.middle,
        frame.top - 16,
        palette,
      );
      return;
    }
    const roof = this.#y(frame, frame.max);
    const rise = Math.min(frame.width * 0.2, (roof - 6) * 0.8);
    if (rise <= 4) return;
    const { middle, width } = frame;
    painter.globalAlpha = 0.6;
    painter.strokeStyle = palette('cy');
    painter.lineWidth = 1.2;
    painter.beginPath();
    const kind = this.#roofs.of(frame.tower.address, frame.tower.landmark);
    if (kind === 'peak') {
      painter.moveTo(middle - width * 0.18, roof);
      painter.lineTo(middle, Math.max(4, roof - rise * 1.6));
      painter.lineTo(middle + width * 0.18, roof);
    } else if (kind === 'mast') {
      painter.moveTo(middle + width * 0.2, roof);
      painter.lineTo(middle + width * 0.2, roof - rise);
    } else if (kind === 'box') {
      painter.moveTo(middle - width * 0.15, roof);
      painter.lineTo(middle - width * 0.15, roof - rise * 0.5);
      painter.lineTo(middle + width * 0.15, roof - rise * 0.5);
      painter.lineTo(middle + width * 0.15, roof);
    } else {
      painter.moveTo(frame.inner, roof - 3);
      painter.lineTo(frame.left + width, roof - 3);
    }
    painter.stroke();
    painter.globalAlpha = 1;
  }

  /** The bedrock when the foot is in view — the substrate's end once breached — else how many levels are below. */
  #foot(painter: Painter, frame: Frame, size: PictureSize, palette: Palette): void {
    if (frame.base > frame.min + 0.01) {
      this.#count(
        painter,
        `▼ ${String(Math.ceil(frame.base - frame.min))}`,
        frame.middle,
        frame.bottom + 16,
        palette,
      );
      return;
    }
    const { left, width, bottom } = frame;
    painter.globalAlpha = 0.06;
    painter.fillStyle = palette('rd');
    painter.fillRect(left, bottom, width, size.height - bottom);
    painter.globalAlpha = 0.3;
    painter.strokeStyle = palette('rd');
    painter.lineWidth = 1;
    painter.beginPath();
    for (let x = left; x < left + width; x += 10) {
      painter.moveTo(x, bottom + 2);
      painter.lineTo(Math.min(x + 8, left + width), size.height);
    }
    painter.stroke();
    painter.globalAlpha = 1;
  }

  #count(painter: Painter, text: string, x: number, y: number, palette: Palette): void {
    painter.globalAlpha = 1;
    painter.font = `400 ${String(TEXT)}px ${MONO}`;
    painter.textAlign = 'center';
    painter.textBaseline = 'middle';
    painter.fillStyle = palette('dim');
    painter.fillText(text, x, y);
  }

  /** One floor's row: its ground, its windows, its corridor in its shape with a tick per door, its number. */
  #floor(
    painter: Painter,
    vm: SceneVM,
    frame: Frame,
    level: number,
    palette: Palette,
    seconds: number,
    lit: string,
  ): void {
    const { left, width, inner, shaft, row } = frame;
    const y = this.#y(frame, level);
    const child = this.#childAt(vm, level);
    const isLit = child?.id === lit;
    const abyss = level < 0;
    painter.globalAlpha = isLit ? 1 : abyss ? 0.1 : level % 2 === 0 ? 0.5 : 0.35;
    painter.fillStyle = palette(isLit ? 'rule-hi' : abyss ? 'rd' : 'rule');
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
    painter.font = `${isLit ? '700' : '400'} ${String(TEXT)}px ${MONO}`;
    painter.textAlign = 'right';
    painter.textBaseline = 'middle';
    painter.fillStyle = palette(isLit || child?.visited === true ? 'yl' : abyss ? 'rd' : 'text');
    painter.fillText(String(level), left - 8, y + row / 2);
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
      const on = this.#noise.fraction(key, k);
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
    const passage = level >= 0 ? frame.tower.rows[level] : undefined;
    const shape = passage?.shape ?? '';
    const looks = passage?.looks ?? [];
    const line = y + frame.row * 0.76;
    const bow = shape === 'curved' ? frame.row * 0.16 : 0;
    const from = frame.inner + 10;
    const full = frame.left + frame.width - 12;
    const to = shape === 'service' || shape === 'static' ? full - (full - from) * 0.08 : full;
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
    if (shape === 'service') {
      painter.moveTo(to, line - 5);
      painter.lineTo(to, line + 5);
    }
    painter.stroke();
    if (shape === 'static') {
      painter.fillStyle = palette('mg');
      painter.globalAlpha = 0.6;
      for (let dot = 1; dot <= 3; dot++) painter.fillRect(to + dot * 3, line - 0.5, 1.5, 1.5);
    }
    const pairs = Math.ceil(looks.length / 2);
    for (const [index, look] of looks.entries()) {
      const point = along((Math.floor(index / 2) + 0.5) / pairs);
      painter.globalAlpha = 0.8;
      painter.fillStyle = palette(this.#looks.ink(look.state));
      painter.fillRect(point.x - 1, index % 2 === 1 ? point.y + 1 : point.y - 5, 2, 4);
    }
  }

  /** Once breached, a broken red line between the lobby and the first Layer: the bedrock, open. */
  #bedrockLine(painter: Painter, frame: Frame, palette: Palette): void {
    if (frame.min === 0) return;
    const y = this.#y(frame, 0) + frame.row;
    if (y < frame.top || y > frame.bottom) return;
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
    const { left, shaft, top, bottom, row } = frame;
    painter.globalAlpha = 1;
    painter.fillStyle = palette('ground');
    painter.fillRect(left, top, shaft, bottom - top);
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
    painter.moveTo(left + shaft / 2, top);
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
    vm: SceneVM,
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
    painter.font = `400 ${String(TEXT)}px ${MONO}`;
    painter.textAlign = 'right';
    painter.textBaseline = 'middle';
    for (const level of ticks) {
      painter.globalAlpha = 1;
      painter.fillStyle = palette('rule-hi');
      painter.fillRect(x - 4, at(level), 10, 1);
      if (!labelled) continue;
      painter.fillStyle = palette(level < 0 ? 'rd' : 'dim');
      painter.fillText(String(level), x - 8, at(level));
    }
    painter.fillStyle = palette('yl');
    painter.globalAlpha = 0.85;
    for (const child of vm.children) {
      if (child.visited) painter.fillRect(x - 6, at(Number(child.ordinal)) - 1, 14, 2);
    }
    const high = at(Math.min(max, frame.base + frame.visible - 1));
    const low = at(frame.base);
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
