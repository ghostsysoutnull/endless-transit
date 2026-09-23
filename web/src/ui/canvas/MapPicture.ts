import type { LegendTone, MapPictureVM } from './MapPictureVM.ts';
import type { Painter } from './Painter.ts';
import type { Palette } from './Palette.ts';
import type { Picture, PictureSize } from './Picture.ts';

const MONO = '"IBM Plex Mono", ui-monospace, Menlo, Consolas, monospace';
/** No glyph or word on the canvas is smaller than this (touch-first: it must read on a phone). */
const MIN_TEXT = 12;
/** The legend strip under the grid. */
const LEGEND_HEIGHT = 24;
const LEGEND_GAP = 14;
/** The pulse around the origin: a ring that grows from the diamond and fades. */
const PULSE_BASE = 7;
const PULSE_REACH = 9;
const DIAMOND = 5;
/** What each tone is inked with — a token of the stylesheet, never a hue. */
const INK: Readonly<Record<LegendTone, string>> = {
  visited: 'frame',
  unvisited: 'dim',
  noise: 'rd',
  you: 'yl',
  mark: 'mg',
};
const ALPHA: Readonly<Record<LegendTone, number>> = {
  visited: 1,
  unvisited: 0.75,
  noise: 1,
  you: 1,
  mark: 1,
};

/**
 * Draws the lattice map (LatticeMapComponent.groovy:31-66; the mock's world canvas): the grid as faint
 * dots, every node's glyph on its cell (bright when visited, dim when not, the void's static in red),
 * the magenta glitch marks over them, the origin as a yellow diamond with a pulsing ring at the centre,
 * and the legend drawn with the same glyphs (HK-023: the old legend described glyphs never drawn).
 */
export class MapPicture implements Picture<MapPictureVM> {
  height(vm: MapPictureVM, width: number): number {
    return Math.round((width * vm.height) / vm.width) + LEGEND_HEIGHT;
  }

  paint(painter: Painter, vm: MapPictureVM, size: PictureSize, palette: Palette, phase: number): void {
    const cell = size.width / vm.width;
    const gridHeight = size.height - LEGEND_HEIGHT;
    const rowHeight = gridHeight / vm.height;
    const glyphSize = Math.max(MIN_TEXT, Math.round(Math.min(cell, rowHeight) * 0.9));
    const centre = (x: number, y: number): readonly [number, number] => [
      (x + 0.5) * cell,
      (y + 0.5) * rowHeight,
    ];

    painter.globalAlpha = 1;
    painter.shadowBlur = 0;
    painter.fillStyle = palette('ground');
    painter.fillRect(0, 0, size.width, size.height);

    // The grid: one faint dot per cell.
    painter.fillStyle = palette('rule');
    for (let y = 0; y < vm.height; y++) {
      for (let x = 0; x < vm.width; x++) {
        const [cx, cy] = centre(x, y);
        painter.fillRect(cx - 0.5, cy - 0.5, 1, 1);
      }
    }
    painter.strokeStyle = palette('rule-hi');
    painter.lineWidth = 1;
    painter.strokeRect(0.5, 0.5, size.width - 1, gridHeight - 1);

    painter.textAlign = 'center';
    painter.textBaseline = 'middle';
    painter.font = `400 ${String(glyphSize)}px ${MONO}`;
    for (const node of vm.nodes) {
      const [cx, cy] = centre(node.x, node.y);
      this.#glyph(painter, palette, node.glyph, cx, cy, node.tone);
    }
    painter.font = `700 ${String(glyphSize)}px ${MONO}`;
    for (const mark of vm.marks) {
      const [cx, cy] = centre(mark.x, mark.y);
      this.#glyph(painter, palette, vm.markGlyph, cx, cy, 'mark');
    }

    // The origin: where the traveller stands, at the centre of the map it is drawn from.
    const ox = size.width / 2;
    const oy = gridHeight / 2;
    this.#pulse(painter, palette('yl'), ox, oy, phase);
    painter.globalAlpha = 1;
    painter.fillStyle = palette('yl');
    painter.beginPath();
    painter.moveTo(ox, oy - DIAMOND);
    painter.lineTo(ox + DIAMOND, oy);
    painter.lineTo(ox, oy + DIAMOND);
    painter.lineTo(ox - DIAMOND, oy);
    painter.closePath();
    painter.fill();
    painter.font = `700 ${String(MIN_TEXT)}px ${MONO}`;
    painter.textAlign = 'left';
    this.#glyph(painter, palette, vm.origin.glyph, ox + DIAMOND + 4, oy, 'you');

    this.#legend(painter, vm, size, palette, gridHeight);
  }

  #glyph(painter: Painter, palette: Palette, glyph: string, x: number, y: number, tone: LegendTone): void {
    painter.fillStyle = palette(INK[tone]);
    painter.globalAlpha = ALPHA[tone];
    painter.fillText(glyph, x, y);
  }

  /** Three rings, a third of a cycle apart, each growing from the diamond and fading as it goes. */
  #pulse(painter: Painter, colour: string, x: number, y: number, phase: number): void {
    painter.strokeStyle = colour;
    painter.lineWidth = 1.2;
    for (let i = 0; i < 3; i++) {
      const p = (phase + i / 3) % 1;
      painter.globalAlpha = (1 - p) * 0.7;
      painter.beginPath();
      painter.arc(x, y, PULSE_BASE + PULSE_REACH * p, 0, Math.PI * 2);
      painter.stroke();
    }
  }

  /** The legend under the grid: glyph and word per entry, in the entry's own ink, left to right. */
  #legend(painter: Painter, vm: MapPictureVM, size: PictureSize, palette: Palette, top: number): void {
    const y = top + LEGEND_HEIGHT / 2;
    painter.font = `400 ${String(MIN_TEXT)}px ${MONO}`;
    painter.textAlign = 'left';
    painter.textBaseline = 'middle';
    let x = 6;
    for (const entry of vm.legend) {
      if (x + painter.measureText(`${entry.glyph} ${entry.label}`).width > size.width) break;
      this.#glyph(painter, palette, entry.glyph, x, y, entry.tone);
      x += painter.measureText(entry.glyph).width + 5;
      painter.globalAlpha = 1;
      painter.fillStyle = palette('dim');
      painter.fillText(entry.label, x, y);
      x += painter.measureText(entry.label).width + LEGEND_GAP;
    }
  }
}
