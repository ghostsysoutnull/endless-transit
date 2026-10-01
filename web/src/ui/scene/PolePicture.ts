import type { GlyphLook } from '#engine/model/GlyphLook.ts';
import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { PoleLane, PoleVM, TagLook } from '#ui/screens/PoleVM.ts';
import type { AreaInk } from './AreaInk.ts';
import type { PictureFont } from './PictureFont.ts';
import type { PoleGlyph } from './PoleGlyph.ts';
import type { PoleLayout, PoleWindow } from './PoleLayout.ts';
import type { MarkLook, PoleMark } from './PoleMarks.ts';

/** Each value's inks: the line a label is framed in (a surface ink), and its text (a text ink). */
const LANE_INKS: Readonly<Record<PoleLane, { readonly line: string; readonly text: string }>> = {
  era: { line: 'yl', text: 'yl' },
  culture: { line: 'mg', text: 'mg' },
  trait: { line: 'bl', text: 'text' },
};
/** Each tag's ink: the mock's (`transit-reframed.html:1204`), in the text inks. */
const TAG_INKS: Readonly<Record<TagLook, string>> = {
  rebel: 'rd',
  drift: 'mg',
  curved: 'wh',
  door: 'ab',
  anomaly: 'yl',
};
/** A tag's box around its word, and the gap between tags. */
const TAG = { pad: 5, height: 18, gap: 5 } as const;
/** The ground cleared either side of words on the pole. */
const CLEAR = 6;
/** The name under a node, bigger than the kind above it. */
const NAME_PX = 16;
/** A label's lines: the word on top, bigger, its head under it; the current's pair a line each, over its head. */
const LABEL = { px: 16, word: 10, head: 29, pairPx: 14, pair: 8, line: 17, under: 20 } as const;
/** The backdrop: how faint each look's word is, the biggest it grows, and how far it slides as it changes (shares of its row). */
const GHOST: Readonly<Record<MarkLook, number>> = { set: 0.2, rebel: 0.26, drift: 0.16, none: 0.12 };
const GHOST_PX = { measured: 100, largest: 96 } as const;
const SLIDE = { out: -0.4, in: 0.3 } as const;

/** What the pole draws with, built by `ScenePictures` and handed in whole (U05). */
export interface PoleParts {
  readonly font: PictureFont;
  readonly ink: AreaInk;
  readonly glyphs: Readonly<Record<GlyphLook, PoleGlyph>>;
}

/**
 * The moment the pole is painted at: the clock in seconds, whether it holds still, how far it has unrolled (0 → 1),
 * the part of it on screen, and the level in focus with the one before it and how far the backdrop has moved from
 * one to the other (0 → 1).
 */
export interface PoleMoment {
  readonly seconds: number;
  readonly still: boolean;
  readonly reveal: number;
  readonly window: PoleWindow;
  readonly focus: { readonly level: number; readonly from: number; readonly progress: number };
}

/**
 * Paints the pole (U05, reworked): behind it, pinned in the window, the vibe in force at the level in focus written
 * huge and faint — a word sliding out and the next in as the focus changes, a rebel's red and jolting, a drift's
 * wavering over a dashed line; the spine with its pulse; a big node a level with its live glyph, a halo breathing and
 * yours rippling; its kind, name and tags left of it; the values it sets written right of it, and the drift current's
 * words under them; the ships' empty berths. A pure function of its view-model, layout and moment; where things
 * stand is the layout's to say, each glyph draws itself.
 */
export class PolePicture {
  readonly #parts: PoleParts;

  constructor(parts: PoleParts) {
    this.#parts = parts;
  }

  paint(painter: Painter, vm: PoleVM, layout: PoleLayout, palette: Palette, moment: PoleMoment): void {
    const size = layout.size();
    painter.globalAlpha = 1;
    painter.setLineDash([]);
    painter.fillStyle = palette('ground');
    painter.fillRect(0, 0, size.width, size.height);
    painter.save();
    painter.beginPath();
    painter.rect(0, 0, size.width, size.height * moment.reveal);
    painter.clip();
    this.#backdrop(painter, vm, layout, palette, moment);
    this.#spine(painter, layout, palette, moment);
    this.#labels(painter, vm, layout, palette);
    this.#currents(painter, vm, layout, palette);
    this.#berths(painter, layout, palette);
    this.#levels(painter, vm, layout, palette, moment);
    painter.restore();
  }

  /** The vibe in force at the level in focus, a row a value, each head over its huge faint word. */
  #backdrop(painter: Painter, vm: PoleVM, layout: PoleLayout, palette: Palette, moment: PoleMoment): void {
    const now = layout.inForce(moment.focus.level);
    const was = layout.inForce(moment.focus.from);
    const eased = 1 - (1 - Math.min(1, Math.max(0, moment.focus.progress))) ** 3;
    painter.textAlign = 'left';
    painter.textBaseline = 'middle';
    for (const row of layout.backdrop(moment.window)) {
      const mark = now[row.lane];
      const old = was[row.lane];
      const head = vm.heads[row.lane].toLocaleUpperCase();
      painter.font = this.#parts.font.of('bold');
      painter.fillStyle = palette(LANE_INKS[row.lane].text);
      painter.fillText(head, row.head.x, row.head.y);
      if (mark.look === 'rebel' || mark.look === 'drift') {
        painter.fillStyle = palette(TAG_INKS[mark.look]);
        painter.fillText(
          vm.looks[mark.look].toLocaleUpperCase(),
          row.head.x + painter.measureText(head).width + 10,
          row.head.y,
        );
      }
      if (eased >= 1 || (old.word === mark.word && old.look === mark.look)) {
        this.#ghost(painter, row, mark, { shift: 0, share: 1 }, palette, moment);
      } else {
        this.#ghost(
          painter,
          row,
          old,
          { shift: SLIDE.out * row.width * eased, share: 1 - eased },
          palette,
          moment,
        );
        this.#ghost(
          painter,
          row,
          mark,
          { shift: SLIDE.in * row.width * (1 - eased), share: eased },
          palette,
          moment,
        );
      }
    }
  }

  /** One backdrop word, as big as its row allows, moved along and faded by its share of a change. */
  #ghost(
    painter: Painter,
    row: {
      readonly lane: PoleLane;
      readonly word: { readonly x: number; readonly y: number };
      readonly width: number;
    },
    mark: PoleMark,
    slide: { readonly shift: number; readonly share: number },
    palette: Palette,
    moment: PoleMoment,
  ): void {
    if (slide.share <= 0) return;
    const word = mark.look === 'none' ? '—' : mark.word.toLocaleUpperCase();
    painter.font = this.#parts.font.of('bold', GHOST_PX.measured);
    const measured = Math.max(1, painter.measureText(word).width);
    const px = this.#parts.font.atLeast(
      Math.min(GHOST_PX.largest, Math.floor((GHOST_PX.measured * row.width) / measured)),
    );
    painter.font = this.#parts.font.of('bold', px);
    const moving = !moment.still;
    const x = row.word.x + slide.shift + (mark.look === 'rebel' && moving ? this.#jolt(moment.seconds) : 0);
    const y = row.word.y + (mark.look === 'drift' && moving ? Math.sin(moment.seconds * 1.3) * 3 : 0);
    painter.globalAlpha = GHOST[mark.look] * slide.share;
    painter.fillStyle = palette(
      mark.look === 'rebel' ? TAG_INKS.rebel : mark.look === 'none' ? 'dim' : LANE_INKS[row.lane].text,
    );
    painter.fillText(word, x, y);
    if (mark.look === 'drift') {
      const under = y + px * 0.45;
      painter.strokeStyle = palette(LANE_INKS[row.lane].line);
      painter.globalAlpha = 0.5 * slide.share;
      painter.lineWidth = 2;
      painter.setLineDash([6, 5]);
      painter.beginPath();
      painter.moveTo(x, under);
      painter.lineTo(x + painter.measureText(word).width, under);
      painter.stroke();
      painter.setLineDash([]);
    }
    painter.globalAlpha = 1;
  }

  /** A rebel's word jolts aside twice every few seconds. */
  #jolt(seconds: number): number {
    const at = seconds % 2.6;
    if (at > 2.34 && at < 2.44) return 3;
    if (at >= 2.44 && at < 2.54) return -4;
    return 0;
  }

  #spine(painter: Painter, layout: PoleLayout, palette: Palette, moment: PoleMoment): void {
    const spine = layout.spine();
    painter.strokeStyle = palette('cy');
    painter.globalAlpha = 0.14;
    painter.lineWidth = 10;
    painter.beginPath();
    painter.moveTo(spine.x, spine.top);
    painter.lineTo(spine.x, spine.bottom);
    painter.stroke();
    painter.globalAlpha = 0.85;
    painter.lineWidth = 2;
    painter.stroke();
    painter.globalAlpha = 1;
    if (moment.still) return;
    for (let pulse = 0; pulse < 4; pulse++) {
      const along = (moment.seconds * 0.12 + pulse / 4) % 1;
      this.#parts.ink.dot(
        painter,
        { x: spine.x, y: spine.top + (spine.bottom - spine.top) * along },
        3,
        palette('wh'),
        0.8 * Math.sin(along * Math.PI),
      );
    }
  }

  /** Each value written right of the node that sets it: its word on top, in its ink; its head under it. */
  #labels(painter: Painter, vm: PoleVM, layout: PoleLayout, palette: Palette): void {
    painter.textAlign = 'left';
    painter.textBaseline = 'middle';
    for (const label of layout.labels()) {
      const inks = LANE_INKS[label.lane];
      const y = label.y + LABEL.word;
      painter.font = this.#parts.font.of('bold', LABEL.px);
      painter.fillStyle = palette(label.look === 'rebel' ? TAG_INKS.rebel : inks.text);
      const word = this.#fit(painter, label.word, label.width);
      painter.fillText(word, label.x, y);
      if (label.look === 'drift') {
        painter.strokeStyle = palette(inks.line);
        painter.lineWidth = 1.5;
        painter.setLineDash([4, 3]);
        painter.beginPath();
        painter.moveTo(label.x, label.y + LABEL.under);
        painter.lineTo(label.x + painter.measureText(word).width, label.y + LABEL.under);
        painter.stroke();
        painter.setLineDash([]);
      }
      painter.font = this.#parts.font.of('regular');
      painter.fillStyle = palette('dim');
      painter.fillText(this.#fit(painter, vm.heads[label.lane], label.width), label.x, label.y + LABEL.head);
    }
  }

  /** The drift current's pair, a line each, over its head. */
  #currents(painter: Painter, vm: PoleVM, layout: PoleLayout, palette: Palette): void {
    painter.textAlign = 'left';
    painter.textBaseline = 'middle';
    for (const current of layout.currents()) {
      painter.font = this.#parts.font.of('bold', LABEL.pairPx);
      painter.fillStyle = palette('mg');
      current.words.forEach((word, index) => {
        painter.fillText(
          this.#fit(painter, word, current.width),
          current.x,
          current.y + LABEL.pair + index * LABEL.line,
        );
      });
      painter.font = this.#parts.font.of('regular');
      painter.fillStyle = palette('dim');
      painter.fillText(
        this.#fit(painter, vm.currentHead, current.width),
        current.x,
        current.y + LABEL.pair + current.words.length * LABEL.line,
      );
    }
  }

  /** Where a ship would moor: an empty frame, dashed (Decision 15). */
  #berths(painter: Painter, layout: PoleLayout, palette: Palette): void {
    painter.strokeStyle = palette('ab');
    painter.globalAlpha = 0.6;
    painter.lineWidth = 1;
    painter.setLineDash([2, 3]);
    for (const berth of layout.berths()) painter.strokeRect(berth.x - 11, berth.y - 7, 22, 14);
    painter.setLineDash([]);
    painter.globalAlpha = 1;
  }

  #levels(painter: Painter, vm: PoleVM, layout: PoleLayout, palette: Palette, moment: PoleMoment): void {
    const rows = layout.rows();
    vm.levels.forEach((level, index) => {
      const row = rows[index];
      if (row === undefined) return;
      const ink = palette(level.abyssal ? 'rd' : level.here ? 'yl' : 'cy');
      const plate = row.plate;
      // The halo, breathing.
      painter.fillStyle = ink;
      painter.globalAlpha = moment.still ? 0.2 : 0.18 + 0.1 * Math.sin(moment.seconds * 2 + index * 0.6);
      painter.beginPath();
      painter.arc(plate.x, plate.y, row.radius + 6, 0, Math.PI * 2);
      painter.fill();
      // The node.
      painter.globalAlpha = 1;
      painter.fillStyle = palette('ground');
      painter.beginPath();
      painter.arc(plate.x, plate.y, row.radius, 0, Math.PI * 2);
      painter.fill();
      painter.strokeStyle = ink;
      painter.globalAlpha = level.here ? 1 : 0.85;
      painter.lineWidth = level.here ? 2.5 : 1.6;
      painter.stroke();
      painter.globalAlpha = 1;
      if (level.here && !moment.still) {
        const spread = (moment.seconds * 0.6) % 1;
        painter.strokeStyle = palette('yl');
        painter.globalAlpha = 0.7 * (1 - spread);
        painter.lineWidth = 2;
        painter.beginPath();
        painter.arc(plate.x, plate.y, row.radius * (1 + spread * 0.45), 0, Math.PI * 2);
        painter.stroke();
        painter.globalAlpha = 1;
      }
      // The glyph, living in it.
      painter.lineWidth = 2.4;
      this.#parts.glyphs[level.glyph].paint({
        painter,
        at: plate,
        radius: row.radius * 0.6,
        seconds: moment.still ? 0 : moment.seconds,
        ink,
        accent: palette('yl'),
      });
      // The kind above the node; the name and the tags under it.
      const words = row.words;
      painter.textAlign = 'center';
      painter.textBaseline = 'middle';
      painter.font = this.#parts.font.of('regular');
      const kind = this.#fit(painter, level.kind, words.width);
      this.#clear(painter, palette, words.kind, painter.measureText(kind).width, 12);
      painter.fillStyle = palette(level.here ? 'yl' : 'dim');
      painter.fillText(kind, words.kind.x, words.kind.y);
      painter.font = this.#parts.font.of('bold', NAME_PX);
      const name = this.#fit(painter, level.name, words.width);
      this.#clear(painter, palette, words.name, painter.measureText(name).width, NAME_PX);
      painter.fillStyle = palette(level.here ? 'yl' : 'text');
      painter.fillText(name, words.name.x, words.name.y);
      this.#tags(painter, level.tags, words, palette);
    });
  }

  /** A level's tags in a line under its name, centred on the pole; those that do not fit are left out. */
  #tags(
    painter: Painter,
    tags: readonly { readonly word: string; readonly look: TagLook }[],
    words: { readonly tags: { readonly x: number; readonly y: number }; readonly width: number },
    palette: Palette,
  ): void {
    painter.font = this.#parts.font.of('regular');
    const fitting: { readonly word: string; readonly look: TagLook; readonly width: number }[] = [];
    let total = 0;
    for (const tag of tags) {
      const width = painter.measureText(tag.word).width + TAG.pad * 2;
      const next = total + (fitting.length > 0 ? TAG.gap : 0) + width;
      if (next > words.width) break;
      fitting.push({ ...tag, width });
      total = next;
    }
    painter.textAlign = 'left';
    if (fitting.length > 0) this.#clear(painter, palette, words.tags, total, TAG.height);
    let x = words.tags.x - total / 2;
    const middle = words.tags.y;
    for (const tag of fitting) {
      painter.strokeStyle = palette(TAG_INKS[tag.look]);
      painter.lineWidth = 1;
      painter.strokeRect(x + 0.5, middle - TAG.height / 2, tag.width, TAG.height);
      painter.fillStyle = palette(TAG_INKS[tag.look]);
      painter.fillText(tag.word, x + TAG.pad, middle);
      x += tag.width + TAG.gap;
    }
  }

  /** The ground cleared behind words centred on the pole, so the spine stops short of them. */
  #clear(
    painter: Painter,
    palette: Palette,
    at: { readonly x: number; readonly y: number },
    width: number,
    height: number,
  ): void {
    if (width <= 0) return;
    painter.fillStyle = palette('ground');
    painter.fillRect(at.x - width / 2 - CLEAR, at.y - height / 2 - 3, width + CLEAR * 2, height + 6);
  }

  /** The text as it fits the width in the painter's font, cut with `…` when it does not; nothing when not even a letter fits. */
  #fit(painter: Painter, text: string, width: number): string {
    if (painter.measureText(text).width <= width) return text;
    for (let cut = text.length - 1; cut > 0; cut--) {
      const shorter = `${text.slice(0, cut).trimEnd()}…`;
      if (painter.measureText(shorter).width <= width) return shorter;
    }
    return '';
  }
}
