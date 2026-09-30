import type { AreaLook } from '#engine/model/AreaLook.ts';
import type { MarkLook } from '#engine/model/MarkLook.ts';
import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { AreaInk } from './AreaInk.ts';
import type { AreaMark } from './AreaMark.ts';
import type { AreaMoment, AreaScene } from './AreaScene.ts';
import type { AreaVM } from './AreaVM.ts';
import type { ChildMark } from './ChildMark.ts';
import type { PictureFont } from './PictureFont.ts';
import type { Point } from './Point.ts';
import type { SceneCamera } from './SceneCamera.ts';
import type { SceneHit } from './SceneHit.ts';
import type { ScenePicture } from './ScenePicture.ts';
import { StillCamera } from './StillCamera.ts';

/** A child's tap box: a thumb wide, reaching down over its name. */
const TAP = 46;
const BELOW = 16;
/** The name's line under a mark. */
const NAME_DROP = 17;

/** What the area picture draws with, built by `ScenePictures` and handed in whole (U04). */
export interface AreaParts {
  readonly font: PictureFont;
  readonly ink: AreaInk;
  readonly scenes: Readonly<Record<AreaLook, AreaScene>>;
  readonly marks: Readonly<Record<MarkLook, AreaMark>>;
}

/**
 * Draws a level above the street (U04): the level's own backdrop, each child as its kind is marked where the level
 * stands it, a landmark ringed, a visited one with a yellow dot, the one you came back out of ringed in dashes, and
 * its name under it at 12 px — or its number where names would collide. A pure function of its view-model, size,
 * time and marks; the level and the child kinds each answer for their own drawing.
 */
export class AreaPicture implements ScenePicture<AreaVM> {
  readonly #parts: AreaParts;

  constructor(parts: AreaParts) {
    this.#parts = parts;
  }

  /** A level stands still; going in zooms. */
  camera(): SceneCamera {
    return new StillCamera();
  }

  layout(vm: AreaVM, size: PictureSize): readonly SceneHit[] {
    return this.#spots(vm, size).map((spot, index) => ({
      id: vm.children[index]?.id ?? '',
      x: spot.x - TAP / 2,
      y: spot.y - TAP / 2 + BELOW / 3,
      width: TAP,
      height: TAP,
      anchor: spot,
    }));
  }

  paint(
    painter: Painter,
    vm: AreaVM,
    size: PictureSize,
    palette: Palette,
    time: number,
    lit: ChildMark,
    _view: number,
    here: ChildMark,
  ): void {
    const spots = this.#spots(vm, size);
    const moment: AreaMoment = {
      painter,
      size,
      palette,
      seconds: time / 1000,
      address: vm.address,
      spots,
      signal: vm.signal,
    };
    this.#parts.ink.ground(painter, size, palette);
    this.#parts.scenes[vm.look].backdrop(moment);
    const room = this.#room(spots, size);
    vm.children.forEach((child, index) => {
      const at = spots[index];
      if (at === undefined) return;
      const isLit = lit.marks(child.id);
      this.#parts.marks[child.mark].paint(moment, at, {
        lit: isLit,
        sealed: child.sealed,
        address: child.address,
      });
      this.#rings(painter, palette, at, child, isLit, here.marks(child.id));
      this.#name(painter, palette, size, at, room, child, isLit);
    });
    painter.globalAlpha = 1;
    painter.setLineDash([]);
  }

  #spots(vm: AreaVM, size: PictureSize): readonly Point[] {
    return this.#parts.scenes[vm.look].spots(vm.children.length, size, vm.address);
  }

  /** How wide a name may be: the gap to the nearest other child, or the picture's width alone. */
  #room(spots: readonly Point[], size: PictureSize): number {
    let room = size.width * 0.5;
    spots.forEach((a, i) => {
      spots.forEach((b, j) => {
        if (j > i && Math.abs(a.y - b.y) < NAME_DROP + 12) room = Math.min(room, Math.abs(a.x - b.x) - 6);
      });
    });
    return room;
  }

  #rings(
    painter: Painter,
    palette: Palette,
    at: Point,
    child: AreaVM['children'][number],
    isLit: boolean,
    isHere: boolean,
  ): void {
    painter.lineWidth = isLit ? 1.8 : 1.2;
    if (child.landmark) {
      painter.strokeStyle = palette('yl');
      painter.globalAlpha = 0.8;
      painter.beginPath();
      painter.arc(at.x, at.y, 16, 0, Math.PI * 2);
      painter.stroke();
    }
    if (isHere) {
      painter.strokeStyle = palette('cy');
      painter.globalAlpha = 0.9;
      painter.setLineDash([3, 3]);
      painter.beginPath();
      painter.arc(at.x, at.y, 20, 0, Math.PI * 2);
      painter.stroke();
      painter.setLineDash([]);
    }
    if (isLit) {
      painter.strokeStyle = palette('yl');
      painter.globalAlpha = 1;
      painter.beginPath();
      painter.arc(at.x, at.y, 13, 0, Math.PI * 2);
      painter.stroke();
    }
    if (child.visited) {
      painter.fillStyle = palette('yl');
      painter.globalAlpha = 1;
      painter.beginPath();
      painter.arc(at.x + 11, at.y - 11, 2.5, 0, Math.PI * 2);
      painter.fill();
    }
  }

  /** Its name under it when it fits the room beside its neighbours, else its number; kept inside the picture. */
  #name(
    painter: Painter,
    palette: Palette,
    size: PictureSize,
    at: Point,
    room: number,
    child: AreaVM['children'][number],
    isLit: boolean,
  ): void {
    painter.font = this.#parts.font.of(isLit ? 'bold' : 'regular');
    painter.textAlign = 'center';
    painter.textBaseline = 'top';
    painter.fillStyle = palette(isLit ? 'yl' : child.sealed ? 'dim' : 'text');
    painter.globalAlpha = 1;
    const text = painter.measureText(child.name).width <= room ? child.name : child.ordinal;
    const half = painter.measureText(text).width / 2;
    const x = Math.min(Math.max(at.x, half + 2), size.width - half - 2);
    const y = Math.min(at.y + NAME_DROP - 6, size.height - 14);
    painter.fillText(text, x, y);
  }
}
