import type { GlyphLook } from '#engine/model/GlyphLook.ts';
import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { PoleLane, PoleVM, TagLook } from '#ui/screens/PoleVM.ts';
import type { AreaInk } from './AreaInk.ts';
import type { PictureFont } from './PictureFont.ts';
import type { PoleGlyph } from './PoleGlyph.ts';
import type { PoleLayout } from './PoleLayout.ts';

/** Each ribbon's ink, and the ink its head is written in (a text ink). */
const LANE_INKS: Readonly<Record<PoleLane, { readonly ribbon: string; readonly head: string }>> = {
  era: { ribbon: 'yl', head: 'yl' },
  culture: { ribbon: 'mg', head: 'mg' },
  trait: { ribbon: 'bl', head: 'text' },
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
const TAG = { pad: 4, height: 16, gap: 5 } as const;
/** The words beside a plate: the kind above the name, the tags under it. */
const LINES = { kind: -19, name: 0, tags: 20 } as const;

/** What the pole draws with, built by `ScenePictures` and handed in whole (U05). */
export interface PoleParts {
  readonly font: PictureFont;
  readonly ink: AreaInk;
  readonly glyphs: Readonly<Record<GlyphLook, PoleGlyph>>;
}

/** The moment the pole is painted at: the clock in seconds, whether it holds still, how far it has unrolled (0 → 1). */
export interface PoleMoment {
  readonly seconds: number;
  readonly still: boolean;
  readonly reveal: number;
}

/**
 * Paints the pole (U05, Decision 13; the mock's `drawPole`, `transit-reframed.html:1152-1213`): the ribbons with
 * their values written along each run, a rebel district's break in red, the drift current dashed beside them with
 * its words and hooks, the spine with its pulse, a plate and a live glyph a level, the ruler of scales, the kind,
 * the name and the tags, and the ships' empty berths. A pure function of its view-model, layout and moment; where
 * things stand is the layout's to say, each glyph draws itself.
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
    const rows = layout.rows();
    const last = rows.at(-1)?.y ?? 0;
    painter.save();
    painter.beginPath();
    painter.rect(0, 0, size.width, (last + 60) * moment.reveal);
    painter.clip();
    this.#lanes(painter, vm, layout, palette);
    this.#runs(painter, layout, palette);
    this.#currents(painter, layout, palette);
    this.#spine(painter, layout, palette, moment);
    this.#berths(painter, layout, palette);
    this.#levels(painter, vm, layout, palette, moment);
    painter.restore();
  }

  #lanes(painter: Painter, vm: PoleVM, layout: PoleLayout, palette: Palette): void {
    const bottom = (layout.rows().at(-1)?.y ?? 0) + 32;
    painter.font = this.#parts.font.of('bold');
    painter.textAlign = 'left';
    painter.textBaseline = 'middle';
    for (const lane of layout.lanes()) {
      const inks = LANE_INKS[lane.lane];
      this.#upright(painter, vm.heads[lane.lane], lane.head.x, lane.head.y, palette(inks.head));
      painter.strokeStyle = palette(inks.ribbon);
      painter.globalAlpha = 0.12;
      painter.lineWidth = 1;
      painter.beginPath();
      painter.moveTo(lane.head.x, lane.head.y + 8);
      painter.lineTo(lane.head.x, bottom);
      painter.stroke();
      painter.globalAlpha = 1;
    }
  }

  #runs(painter: Painter, layout: PoleLayout, palette: Palette): void {
    for (const run of layout.runs()) {
      const ink = palette(LANE_INKS[run.lane].ribbon);
      painter.fillStyle = ink;
      painter.globalAlpha = 0.16;
      painter.fillRect(run.x, run.top, run.width, run.bottom - run.top);
      painter.strokeStyle = ink;
      painter.globalAlpha = 0.6;
      painter.lineWidth = 1;
      painter.strokeRect(run.x, run.top, run.width, run.bottom - run.top);
      painter.globalAlpha = 1;
      painter.fillStyle = run.rebel ? palette('rd') : ink;
      painter.fillRect(
        run.x - (run.rebel ? 3 : 2),
        run.notch - 2,
        run.width + (run.rebel ? 6 : 4),
        run.rebel ? 4 : 3,
      );
      painter.font = this.#parts.font.of('bold');
      painter.textAlign = 'center';
      painter.textBaseline = 'middle';
      const word = this.#fit(painter, run.word, run.bottom - run.top - 10);
      if (word !== '')
        this.#upright(painter, word, run.x + run.width / 2, (run.top + run.bottom) / 2, palette('wh'));
    }
  }

  #currents(painter: Painter, layout: PoleLayout, palette: Palette): void {
    painter.lineWidth = 1;
    for (const current of layout.currents()) {
      painter.strokeStyle = palette(LANE_INKS[current.lane].ribbon);
      painter.globalAlpha = 0.45;
      painter.setLineDash([2, 4]);
      painter.beginPath();
      painter.moveTo(current.x, current.top);
      painter.lineTo(current.x, current.bottom);
      painter.stroke();
      painter.setLineDash([]);
      painter.globalAlpha = 1;
    }
    painter.font = this.#parts.font.of('regular');
    painter.textAlign = 'left';
    painter.textBaseline = 'middle';
    for (const words of layout.currentWords()) {
      painter.save();
      painter.translate(words.at.x, words.at.y);
      painter.rotate(Math.PI / 2);
      painter.fillStyle = palette(LANE_INKS[words.lane].head);
      painter.fillText(words.word, 0, 0);
      painter.restore();
    }
    for (const hook of layout.hooks()) {
      const ink = palette(LANE_INKS[hook.lane].ribbon);
      painter.strokeStyle = ink;
      painter.lineWidth = 1.6;
      const bend = { x: hook.from.x, y: hook.to.y };
      this.#parts.ink.line(
        painter,
        this.#parts.ink.curve(hook.from, bend, bend, { x: hook.to.x - 5, y: hook.to.y }, 12),
      );
      painter.stroke();
      painter.fillStyle = ink;
      painter.beginPath();
      painter.moveTo(hook.to.x + 1, hook.to.y);
      painter.lineTo(hook.to.x - 5, hook.to.y - 3.5);
      painter.lineTo(hook.to.x - 5, hook.to.y + 3.5);
      painter.fill();
    }
  }

  #spine(painter: Painter, layout: PoleLayout, palette: Palette, moment: PoleMoment): void {
    const spine = layout.spine();
    painter.strokeStyle = palette('cy');
    painter.globalAlpha = 0.14;
    painter.lineWidth = 9;
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
      const along = (moment.seconds * 0.22 + pulse / 4) % 1;
      this.#parts.ink.dot(
        painter,
        { x: spine.x, y: spine.top + (spine.bottom - spine.top) * along },
        2.4,
        palette('wh'),
        0.8 * Math.sin(along * Math.PI),
      );
    }
  }

  /** Where a ship would moor: an empty frame, dashed (Decision 15). */
  #berths(painter: Painter, layout: PoleLayout, palette: Palette): void {
    painter.strokeStyle = palette('ab');
    painter.globalAlpha = 0.55;
    painter.lineWidth = 1;
    painter.setLineDash([2, 3]);
    for (const berth of layout.berths()) painter.strokeRect(berth.x - 9, berth.y - 7, 18, 14);
    painter.setLineDash([]);
    painter.globalAlpha = 1;
  }

  #levels(painter: Painter, vm: PoleVM, layout: PoleLayout, palette: Palette, moment: PoleMoment): void {
    const rows = layout.rows();
    vm.levels.forEach((level, index) => {
      const row = rows[index];
      if (row === undefined) return;
      const ink = palette(level.abyssal ? 'rd' : level.here ? 'yl' : 'cy');
      // The ruler: the scale above its tick.
      painter.font = this.#parts.font.of('regular');
      painter.textAlign = 'left';
      painter.textBaseline = 'middle';
      painter.fillStyle = palette('dim');
      painter.fillText(level.scale, row.ruler.from, row.y - 10);
      painter.strokeStyle = palette('rule-hi');
      painter.lineWidth = 1;
      painter.beginPath();
      painter.moveTo(row.ruler.from, row.y);
      painter.lineTo(row.ruler.to, row.y);
      painter.stroke();
      // The plate and its glyph.
      painter.fillStyle = palette('ground');
      this.#parts.ink.line(
        painter,
        this.#parts.ink.ellipse(
          { x: row.plate.x, y: row.y + row.radius * 0.45 },
          row.radius,
          row.radius * 0.38,
        ),
      );
      painter.fill();
      painter.strokeStyle = ink;
      painter.globalAlpha = level.here ? 1 : 0.7;
      painter.lineWidth = level.here ? 2 : 1.2;
      painter.stroke();
      painter.globalAlpha = 1;
      painter.lineWidth = 1.6;
      this.#parts.glyphs[level.glyph].paint({
        painter,
        at: { x: row.plate.x, y: row.y - row.radius * 0.3 },
        radius: row.radius * 0.78,
        seconds: moment.still ? 0 : moment.seconds,
        ink,
        accent: palette('yl'),
      });
      if (level.here && !moment.still) {
        const spread = (moment.seconds * 0.8) % 1;
        painter.strokeStyle = palette('yl');
        painter.globalAlpha = 0.6 * (1 - spread);
        painter.lineWidth = 1.2;
        this.#parts.ink.line(
          painter,
          this.#parts.ink.ellipse(
            { x: row.plate.x, y: row.y + row.radius * 0.45 },
            row.radius * (1 + spread * 0.8),
            row.radius * 0.38 * (1 + spread * 0.8),
          ),
        );
        painter.stroke();
        painter.globalAlpha = 1;
      }
      // The kind, the name, the tags.
      painter.fillStyle = palette(level.here ? 'yl' : 'dim');
      painter.fillText(this.#fit(painter, level.kind, row.words.width), row.words.x, row.y + LINES.kind);
      painter.font = this.#parts.font.of('bold');
      painter.fillStyle = palette(level.here ? 'yl' : 'text');
      painter.fillText(this.#fit(painter, level.name, row.words.width), row.words.x, row.y + LINES.name);
      painter.font = this.#parts.font.of('regular');
      let x = row.words.x;
      for (const tag of level.tags) {
        const width = painter.measureText(tag.word).width + TAG.pad * 2;
        if (x + width > row.words.x + row.words.width) break;
        painter.strokeStyle = palette(TAG_INKS[tag.look]);
        painter.lineWidth = 1;
        painter.strokeRect(x + 0.5, row.y + LINES.tags - TAG.height / 2, width, TAG.height);
        painter.fillStyle = palette(TAG_INKS[tag.look]);
        painter.fillText(tag.word, x + TAG.pad, row.y + LINES.tags);
        x += width + TAG.gap;
      }
    });
  }

  /** Text written upright, reading up, centred on its point. */
  #upright(painter: Painter, text: string, x: number, y: number, ink: string): void {
    painter.save();
    painter.translate(x, y);
    painter.rotate(-Math.PI / 2);
    painter.fillStyle = ink;
    painter.fillText(text, 0, 0);
    painter.restore();
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
