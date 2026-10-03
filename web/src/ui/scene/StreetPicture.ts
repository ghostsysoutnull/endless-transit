import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { SceneCamera } from './SceneCamera.ts';
import type { SceneHit } from './SceneHit.ts';
import type { ScenePicture } from './ScenePicture.ts';
import type { StreetVM } from './StreetVM.ts';
import { NoTrack } from './NoTrack.ts';
import { StillCamera } from './StillCamera.ts';
import { TravelCamera } from './TravelCamera.ts';
import type { StreetParts } from './StreetParts.ts';
import type { ChildMark } from './ChildMark.ts';

/** The strip under the ground line the numbers are written in. */
const LABEL = 16;
/** The mock's street: the ground at four fifths of the height, the sky's first tenth left over the tallest roof. */
const GROUND = 0.8;
const SKY = 0.1;
/** The dashed line of the way, near the bottom. */
const LINE = 0.95;
/** The stars fill the upper part of the sky only. */
const STARRY = 0.55;
const STARS = 50;
/** Floors past this add no height: a hundred-floor tower already touches the top. */
const TALLEST = 100;
/** A building's width in its slot. */
const WIDTH = 0.62;
/**
 * A building's slot is at least this wide: a row longer than the picture runs on past its edge, and the view slides
 * along it. The room before the first building and after the last, in slots.
 */
const SLOT = 72;
const LEAD = 0.8;
const ENDS = 0.6;
/** The slide: a release coasts for 0.3 s and settles in 380 ms; a ride of d slots takes 260 + 160·√d ms, at most 1.2 s. */
const COAST = 0.3;
const SETTLE = { base: 380, per: 0 };
const PACE = { base: 260, per: 160, most: 1200 };
/** Windows: at most this many rows and columns, however many floors and doors. */
const WINDOW_ROWS = 14;
const WINDOW_COLUMNS = 4;
const RAIN = 40;

/** One building as the picture stands it: its slot, its body and the child it draws. */
interface Standing {
  readonly child: StreetVM['children'][number];
  readonly slot: number;
  /** The x of its middle, the y of its feet, its body's width and height, the room its roof takes. */
  readonly middle: number;
  readonly base: number;
  readonly width: number;
  readonly height: number;
  readonly roof: number;
}

/**
 * Draws a street as the mock does (U01b; the mock's `street`, `transit-reframed.html:740-766`): one row of
 * buildings standing on the ground line, each in a slot wide enough to keep its shape — a long row runs past the
 * picture's edge and a finger slides the view along it, the page still scrolling up and down — each as tall as its
 * floors say, windows by its doors and floors that
 * flicker, a landmark ringed, a visited one with a yellow dot, the lit one outlined in yellow, its number under its
 * feet; stars twinkle over them, rain falls and the dashed line of the way runs below. The view is how many slots
 * the row has slid by, owned by the scene host. A pure function of its view-model, size, time, lit child and view: every ink is a token of the stylesheet, every variation a hash of the
 * building's address — never the clock's randomness.
 */
export class StreetPicture implements ScenePicture<StreetVM> {
  readonly #parts: StreetParts;

  constructor(parts: StreetParts) {
    this.#parts = parts;
  }

  /** A row that fits the picture stands still; a longer one slides sideways under a finger, no slider; going in zooms (U01b). */
  camera(vm: StreetVM, size: PictureSize): SceneCamera {
    const row = this.#row(vm, size);
    if (row.reach <= 0) return new StillCamera();
    const seen = size.width / row.slot;
    return new TravelCamera({
      rest: 0,
      min: 0,
      max: row.reach,
      drag: -1 / row.slot,
      axis: 'x',
      coast: COAST,
      snap: false,
      settle: SETTLE,
      pace: PACE,
      zoom: true,
      // Before a building is entered the view rides to where it stands in the middle, as far as the row's ends allow.
      stops: vm.children.map((child, index) => ({
        id: child.id,
        at: Math.min(row.reach, Math.max(0, index + LEAD - seen / 2)),
      })),
      track: new NoTrack(),
    });
  }

  /** Where each building can be tapped at a view; a row that has not slid stands at 0. */
  layout(vm: StreetVM, size: PictureSize, view = 0): readonly SceneHit[] {
    return this.#stand(vm, size, view).map((building) => {
      const top = building.base - building.height;
      const y = Math.max(0, top - building.roof - 2);
      return {
        id: building.child.id,
        x: building.middle - building.slot / 2 + 1,
        y,
        width: building.slot - 2,
        height: building.base + LABEL - y,
        anchor: { x: building.middle, y: top + building.height / 2 },
      };
    });
  }

  paint(
    painter: Painter,
    vm: StreetVM,
    size: PictureSize,
    palette: Palette,
    time: number,
    lit: ChildMark,
    view = 0,
  ): void {
    const seconds = time / 1000;
    const { width, height } = size;
    painter.globalAlpha = 1;
    painter.shadowBlur = 0;
    painter.setLineDash([]);
    painter.fillStyle = palette('ground');
    painter.fillRect(0, 0, width, height);
    this.#stars(painter, size, palette, seconds);
    this.#rain(painter, size, palette, seconds);
    for (const building of this.#stand(vm, size, view))
      this.#building(painter, building, palette, seconds, lit);
    this.#way(painter, size, palette, seconds);
    painter.globalAlpha = 1;
  }

  /** The row: how wide a slot is — the picture's width shared out, or the least a building keeps its shape in — and how many slots the view can slide by. */
  #row(vm: StreetVM, size: PictureSize): { readonly slot: number; readonly reach: number } {
    const slots = vm.children.length + ENDS;
    const slot = Math.max(SLOT, size.width / slots);
    return { slot, reach: Math.max(0, slots - size.width / slot) };
  }

  /** Where each building stands at a view: one row along the ground line, slid left by the view. */
  #stand(vm: StreetVM, size: PictureSize, view: number): Standing[] {
    const { slot } = this.#row(vm, size);
    const base = size.height * GROUND;
    const reach = base - size.height * SKY;
    return vm.children.map((child, index) => {
      const width = slot * WIDTH;
      const roof = Math.min(width * 0.45, 12);
      const floors = Math.min(Math.max(child.floors, 0), TALLEST);
      return {
        child,
        slot,
        middle: slot * (LEAD + index - view),
        base,
        width,
        height: (reach - roof) * (0.3 + 0.68 * Math.sqrt(floors / TALLEST)),
        roof,
      };
    });
  }

  #building(painter: Painter, building: Standing, palette: Palette, seconds: number, lit: ChildMark): void {
    const { child, middle, base, width, height, roof } = building;
    const left = middle - width / 2;
    const top = base - height;
    const isLit = lit.marks(child.id);
    const fade = child.sealed ? 0.45 : 1;
    painter.fillStyle = palette(isLit ? 'rule-hi' : 'rule');
    painter.globalAlpha = isLit ? 1 : 0.85 * fade;
    painter.fillRect(left, top, width, height);
    this.#windows(painter, building, palette, seconds, fade);

    // The walls and the roof, in the frame's ink — yellow when lit.
    painter.strokeStyle = palette(isLit ? 'yl' : child.sealed ? 'dim' : 'frame');
    painter.globalAlpha = isLit ? 1 : 0.6 * fade;
    painter.lineWidth = isLit ? 1.8 : 1;
    painter.beginPath();
    painter.moveTo(left, base);
    painter.lineTo(left, top);
    painter.lineTo(left + width, top);
    painter.lineTo(left + width, base);
    this.#parts.roofDrawers[this.#parts.roofs.of(child.address, child.landmark)].trace(painter, {
      base: top,
      rise: roof,
      origin: left,
      span: width,
      middle,
      left,
      right: left + width,
    });
    painter.stroke();

    if (child.landmark) {
      painter.strokeStyle = palette('yl');
      painter.globalAlpha = 0.75 * fade;
      painter.lineWidth = 1;
      painter.beginPath();
      painter.arc(middle, top - roof * 0.3, width * 0.62, 0, Math.PI * 2);
      painter.stroke();
    }
    if (child.visited) {
      painter.fillStyle = palette('yl');
      painter.globalAlpha = 1;
      painter.beginPath();
      painter.arc(left + width - 4, top + 4, 2.5, 0, Math.PI * 2);
      painter.fill();
    }
    painter.font = this.#parts.font.of(isLit ? 'bold' : 'regular');
    painter.textAlign = 'center';
    painter.textBaseline = 'top';
    painter.fillStyle = palette(isLit ? 'yl' : child.sealed ? 'dim' : 'text');
    painter.globalAlpha = 1;
    painter.fillText(child.ordinal, middle, base + 2);
  }

  /** The windows: a grid by its doors and floors, some dark, some lit, each flickering at its own pace. */
  #windows(painter: Painter, building: Standing, palette: Palette, seconds: number, fade: number): void {
    const { child, middle, base, width, height } = building;
    const columns = child.doors === 0 ? 3 : Math.min(Math.max(child.doors, 2), WINDOW_COLUMNS);
    const rows = Math.min(Math.max(child.floors, 3), WINDOW_ROWS);
    const cell = width / (columns * 2 + 1);
    const tall = height / (rows * 2 + 1);
    const left = middle - width / 2;
    const top = base - height;
    const text = palette('text');
    const bright = palette('yl');
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        const index = row * columns + column + 1;
        const on = this.#parts.noise.fraction(child.address, index);
        if (on < 0.35) continue;
        const pace = this.#parts.noise.fraction(child.address, -index);
        const flicker = 0.55 + 0.45 * Math.sin(seconds * pace * 3 + pace * 20);
        const warm = on > 0.85;
        painter.fillStyle = warm ? bright : text;
        painter.globalAlpha = (warm ? 0.6 : 0.22) * flicker * fade;
        painter.fillRect(left + cell * (1 + column * 2), top + tall * (1 + row * 2), cell, tall);
      }
    }
  }

  /** The ground line under the row, and the dashed line of the way running below it. */
  #way(painter: Painter, size: PictureSize, palette: Palette, seconds: number): void {
    const ground = size.height * GROUND;
    painter.strokeStyle = palette('frame');
    painter.globalAlpha = 0.5;
    painter.lineWidth = 1;
    painter.beginPath();
    painter.moveTo(0, ground + 0.5);
    painter.lineTo(size.width, ground + 0.5);
    painter.stroke();
    const line = size.height * LINE;
    const offset = (seconds * 20) % 26;
    painter.strokeStyle = palette('yl');
    painter.globalAlpha = 0.35;
    painter.beginPath();
    for (let x = offset - 26; x < size.width; x += 26) {
      painter.moveTo(x, line);
      painter.lineTo(x + 14, line);
    }
    painter.stroke();
  }

  /** The stars over the street: small points, a few warm, each twinkling at its own pace. */
  #stars(painter: Painter, size: PictureSize, palette: Palette, seconds: number): void {
    const text = palette('text');
    const warm = palette('yl');
    for (let star = 0; star < STARS; star++) {
      const x = this.#parts.noise.fraction('star-x', star) * size.width;
      const y = this.#parts.noise.fraction('star-y', star) * size.height * STARRY;
      const big = this.#parts.noise.fraction('star-big', star) < 0.07;
      const pace = 0.5 + this.#parts.noise.fraction('star-pace', star) * 1.8;
      const phase = this.#parts.noise.fraction('star-phase', star) * 6;
      const glow = this.#parts.noise.fraction('star-glow', star);
      painter.fillStyle = this.#parts.noise.fraction('star-warm', star) < 0.14 ? warm : text;
      painter.globalAlpha = 0.45 * (0.2 + 0.7 * glow * (0.55 + 0.45 * Math.sin(seconds * pace + phase)));
      painter.fillRect(x, y, big ? 1.8 : 1, big ? 1.8 : 1);
    }
  }

  /** The rain: short slanted strokes falling at three paces. */
  #rain(painter: Painter, size: PictureSize, palette: Palette, seconds: number): void {
    painter.strokeStyle = palette('dim');
    painter.globalAlpha = 0.3;
    painter.lineWidth = 1;
    painter.beginPath();
    for (let drop = 0; drop < RAIN; drop++) {
      const x =
        (this.#parts.noise.fraction('rain', drop) * size.width + seconds * 30 * (1 + (drop % 3))) %
        size.width;
      const y = ((drop * 53 + seconds * 260) % (size.height * 1.1)) - size.height * 0.1;
      painter.moveTo(x, y);
      painter.lineTo(x - 2, y + 9);
    }
    painter.stroke();
  }
}
