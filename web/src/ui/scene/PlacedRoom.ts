import type { PlanRoom } from '#engine/model/PlanRoom.ts';
import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { Diamond } from './Diamond.ts';
import type { PictureFont } from './PictureFont.ts';
import type { Point } from './Point.ts';
import type { SightLook } from './SightLook.ts';

/** A room's name shows once its box is this wide and tall; its number once this big. */
const NAMED = { width: 90, height: 44 };
const NUMBERED = { width: 22, height: 18 };
/** At most this many relic marks in a room's corner, and a room this wide at least to carry them. */
const MARKS = { most: 5, room: 30 };
/** The fog's hatching, this far apart. */
const HATCH = 9;
/** Two lines of a name, this far apart. */
const LEADING = 15;

/**
 * One room of the plan as the picture places it at a framing (U03): its box on the picture inside its walls, what
 * the engine says of it, how its sight looks, its number, and whether you stand in it. It paints its own floor and
 * its own words and marks. Immutable, made per frame.
 */
export class PlacedRoom {
  readonly #room: PlanRoom;
  readonly #box: { readonly x: number; readonly y: number; readonly width: number; readonly height: number };
  readonly #look: SightLook;
  readonly #number: string;
  readonly #here: boolean;

  constructor(facts: {
    room: PlanRoom;
    box: { readonly x: number; readonly y: number; readonly width: number; readonly height: number };
    look: SightLook;
    number: string;
    here: boolean;
  }) {
    this.#room = facts.room;
    this.#box = facts.box;
    this.#look = facts.look;
    this.#number = facts.number;
    this.#here = facts.here;
  }

  /** Where you stand in it, when you do: low in the room, a little above its wall. */
  you(): Point | undefined {
    if (!this.#here) return undefined;
    const box = this.#box;
    return { x: box.x + box.width / 2, y: box.y + box.height - Math.min(18, box.height / 4) };
  }

  /** Its floor by how far it is seen, the fog's hatching over it, outlined in yellow when you stand in it. */
  paintFloor(painter: Painter, palette: Palette): void {
    const box = this.#box;
    painter.fillStyle = palette('ground');
    painter.globalAlpha = 1;
    painter.fillRect(box.x, box.y, box.width, box.height);
    painter.fillStyle = palette('panel');
    painter.globalAlpha = this.#look.floor;
    painter.fillRect(box.x, box.y, box.width, box.height);
    if (this.#look.hatch > 0) {
      painter.save();
      painter.beginPath();
      painter.rect(box.x, box.y, box.width, box.height);
      painter.clip();
      painter.strokeStyle = palette('cy');
      painter.globalAlpha = this.#look.hatch;
      painter.lineWidth = 1;
      painter.beginPath();
      for (let d = -box.height; d < box.width; d += HATCH) {
        painter.moveTo(box.x + d, box.y + box.height);
        painter.lineTo(box.x + d + box.height, box.y);
      }
      painter.stroke();
      painter.restore();
    }
    if (this.#here) {
      painter.strokeStyle = palette('yl');
      painter.globalAlpha = 1;
      painter.lineWidth = 1.6;
      painter.strokeRect(box.x + 1, box.y + 1, box.width - 2, box.height - 2);
    }
  }

  /** Its name and number where they fit, its relic marks and the visited dot — as far as its sight shows them. */
  paintMarks(
    painter: Painter,
    palette: Palette,
    parts: { readonly font: PictureFont; readonly diamond: Diamond },
  ): void {
    if (!this.#look.labelled) return;
    const box = this.#box;
    const ink = this.#here ? 'yl' : this.#look.ink;
    const centre = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
    painter.globalAlpha = 1;
    painter.textBaseline = 'middle';
    painter.font = parts.font.of(this.#here ? 'bold' : 'regular');
    const named = box.width >= NAMED.width && box.height >= NAMED.height;
    const lines = named ? this.#lines(painter, box.width - 12) : [];
    if (lines.length > 0) {
      painter.textAlign = 'center';
      painter.fillStyle = palette(ink);
      lines.forEach((line, index) => {
        painter.fillText(line, centre.x, centre.y + (index - (lines.length - 1) / 2) * LEADING);
      });
      painter.textAlign = 'left';
      painter.fillStyle = palette('dim');
      painter.font = parts.font.of('regular');
      painter.fillText(this.#number, box.x + 6, box.y + 12);
    } else if (box.width >= NUMBERED.width && box.height >= NUMBERED.height) {
      painter.textAlign = 'center';
      painter.fillStyle = palette(ink);
      painter.fillText(this.#number, centre.x, centre.y);
    }
    if (!this.#here && this.#room.relics > 0 && box.width > MARKS.room) {
      painter.fillStyle = palette('yl');
      for (let mark = 0; mark < Math.min(this.#room.relics, MARKS.most); mark++) {
        parts.diamond.trace(painter, box.x + box.width - 9 - mark * 9, box.y + 9, 4);
        painter.fill();
      }
    }
    if (!this.#here && this.#look.dot && box.width > 14) {
      painter.fillStyle = palette('yl');
      painter.beginPath();
      painter.arc(box.x + box.width - 7, box.y + box.height - 7, 2.3, 0, Math.PI * 2);
      painter.fill();
    }
  }

  /** Its name in at most two lines that fit this width; none when it will not fit. */
  #lines(painter: Painter, width: number): readonly string[] {
    const name = this.#room.name;
    if (painter.measureText(name).width <= width) return [name];
    const words = name.split(' ');
    for (let cut = Math.ceil(words.length / 2); cut > 0 && cut < words.length; cut++) {
      const lines = [words.slice(0, cut).join(' '), words.slice(cut).join(' ')];
      if (lines.every((line) => painter.measureText(line).width <= width)) return lines;
    }
    return [];
  }
}
