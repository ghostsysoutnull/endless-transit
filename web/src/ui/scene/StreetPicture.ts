import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { SceneHit } from './SceneHit.ts';
import type { ScenePicture } from './ScenePicture.ts';
import type { SceneVM } from './SceneVM.ts';

const MONO = '"IBM Plex Mono", ui-monospace, Menlo, Consolas, monospace';
/** No number on the picture is smaller than this (touch first: it must read on a phone). */
const TEXT = 12;
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
/** Windows: at most this many rows and columns, however many floors and doors. */
const WINDOW_ROWS = 14;
const WINDOW_COLUMNS = 4;
const RAIN = 40;

/** One building as the picture stands it: its slot, its body and the child it draws. */
interface Standing {
  readonly child: SceneVM['children'][number];
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
 * buildings standing on the ground line, each as tall as its floors say, windows by its doors and floors that
 * flicker, a landmark ringed, a visited one with a yellow dot, the lit one outlined in yellow, its number under its
 * feet; stars twinkle over them, rain falls and the dashed line of the way runs below. A pure function of its
 * view-model, size, time and lit child: every ink is a token of the stylesheet, every variation a hash of the
 * building's address — never the clock's randomness.
 */
export class StreetPicture implements ScenePicture<SceneVM> {
  layout(vm: SceneVM, size: PictureSize): readonly SceneHit[] {
    return this.#stand(vm, size).map((building) => {
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

  paint(painter: Painter, vm: SceneVM, size: PictureSize, palette: Palette, time: number, lit: string): void {
    const seconds = time / 1000;
    const { width, height } = size;
    painter.globalAlpha = 1;
    painter.shadowBlur = 0;
    painter.setLineDash([]);
    painter.fillStyle = palette('ground');
    painter.fillRect(0, 0, width, height);
    this.#stars(painter, size, palette, seconds);
    this.#rain(painter, size, palette, seconds);
    for (const building of this.#stand(vm, size)) this.#building(painter, building, palette, seconds, lit);
    this.#way(painter, size, palette, seconds);
    painter.globalAlpha = 1;
  }

  /** Where each building stands: one row along the ground line, slots the mock's width apart. */
  #stand(vm: SceneVM, size: PictureSize): Standing[] {
    const slot = size.width / (vm.children.length + 0.6);
    const base = size.height * GROUND;
    const reach = base - size.height * SKY;
    return vm.children.map((child, index) => {
      const width = slot * WIDTH;
      const roof = Math.min(width * 0.45, 12);
      const floors = Math.min(Math.max(child.floors, 0), TALLEST);
      return {
        child,
        slot,
        middle: slot * (0.8 + index),
        base,
        width,
        height: (reach - roof) * (0.3 + 0.68 * Math.sqrt(floors / TALLEST)),
        roof,
      };
    });
  }

  #building(painter: Painter, building: Standing, palette: Palette, seconds: number, lit: string): void {
    const { child, middle, base, width, height, roof } = building;
    const left = middle - width / 2;
    const top = base - height;
    const isLit = child.id === lit;
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
    const shape = this.#hash(child.address, 0);
    if (child.landmark) {
      painter.moveTo(left + width * 0.2, top);
      painter.lineTo(middle, top - roof);
      painter.lineTo(left + width * 0.8, top);
    } else if (shape < 0.4) {
      painter.moveTo(left + width * 0.7, top);
      painter.lineTo(left + width * 0.7, top - roof * 0.7);
    } else if (shape < 0.7) {
      painter.moveTo(left + width * 0.25, top);
      painter.lineTo(left + width * 0.25, top - roof * 0.4);
      painter.lineTo(left + width * 0.75, top - roof * 0.4);
      painter.lineTo(left + width * 0.75, top);
    }
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
    painter.font = `${isLit ? '700' : '400'} ${String(TEXT)}px ${MONO}`;
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
        const on = this.#hash(child.address, index);
        if (on < 0.35) continue;
        const pace = this.#hash(child.address, -index);
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
      const x = this.#hash('star-x', star) * size.width;
      const y = this.#hash('star-y', star) * size.height * STARRY;
      const big = this.#hash('star-big', star) < 0.07;
      const pace = 0.5 + this.#hash('star-pace', star) * 1.8;
      const phase = this.#hash('star-phase', star) * 6;
      const glow = this.#hash('star-glow', star);
      painter.fillStyle = this.#hash('star-warm', star) < 0.14 ? warm : text;
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
      const x = (this.#hash('rain', drop) * size.width + seconds * 30 * (1 + (drop % 3))) % size.width;
      const y = ((drop * 53 + seconds * 260) % (size.height * 1.1)) - size.height * 0.1;
      painter.moveTo(x, y);
      painter.lineTo(x - 2, y + 9);
    }
    painter.stroke();
  }

  /** A fraction in [0, 1) that belongs to a text and an index (FNV-1a): the same pair, the same fraction. */
  #hash(text: string, index: number): number {
    let hash = 0x811c9dc5;
    const key = `${text}/${String(index)}`;
    for (let at = 0; at < key.length; at++) {
      hash ^= key.charCodeAt(at);
      hash = Math.imul(hash, 0x01000193);
    }
    hash ^= hash >>> 15;
    hash = Math.imul(hash, 0x2c1b3c6d);
    hash ^= hash >>> 12;
    return (hash >>> 0) / 0x100000000;
  }
}
