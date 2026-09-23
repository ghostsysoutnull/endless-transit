import type { Painter } from './Painter.ts';
import type { Palette } from './Palette.ts';
import type { Picture, PictureSize } from './Picture.ts';
import type { TracePictureVM } from './TracePictureVM.ts';

const MONO = '"IBM Plex Mono", ui-monospace, Menlo, Consolas, monospace';
const MIN_TEXT = 12;
/** One level takes this much height: the kind on one line, the name on the next. */
const ROW = 34;
const TOP = 12;
const BOTTOM = 12;
/** Where the thread runs, and where the words start. */
const THREAD_X = 22;
const PLATE = 9;
const TEXT_X = 44;
const RIGHT_PAD = 8;
const ELLIPSIS = '…';

/**
 * Draws the lattice trace (LatticeTraceComponent.groovy:50-89; the mock's `latStack`): a thread from the
 * universe down to here, a plate per level carrying its glyph, the depth and the kind above the name; the
 * current level in yellow with a pulsing ring, a level below the bedrock in the void's ink.
 */
export class TracePicture implements Picture<TracePictureVM> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- a row is as tall whatever the width
  height(vm: TracePictureVM, _width: number): number {
    return TOP + vm.rows.length * ROW + BOTTOM;
  }

  paint(painter: Painter, vm: TracePictureVM, size: PictureSize, palette: Palette, phase: number): void {
    painter.globalAlpha = 1;
    painter.shadowBlur = 0;
    painter.fillStyle = palette('ground');
    painter.fillRect(0, 0, size.width, size.height);
    const rows = vm.rows;
    const yOf = (index: number): number => TOP + index * ROW + ROW / 2;

    if (rows.length > 1) {
      painter.strokeStyle = palette('frame');
      painter.lineWidth = 1.5;
      painter.globalAlpha = 0.8;
      painter.beginPath();
      painter.moveTo(THREAD_X, yOf(0));
      painter.lineTo(THREAD_X, yOf(rows.length - 1));
      painter.stroke();
    }

    painter.textBaseline = 'middle';
    for (const [index, row] of rows.entries()) {
      const y = yOf(index);
      // The void's ink wins over the current line's (LatticeTraceComponent.groovy:84).
      const ink = row.abyssal ? 'ab' : row.current ? 'yl' : 'text';
      if (row.current) this.#pulse(painter, palette(ink), THREAD_X, y, phase);
      painter.globalAlpha = 1;
      painter.fillStyle = palette('ground');
      painter.beginPath();
      painter.arc(THREAD_X, y, PLATE, 0, Math.PI * 2);
      painter.fill();
      painter.strokeStyle = palette(row.abyssal ? 'ab' : row.current ? 'yl' : 'frame');
      painter.lineWidth = row.current ? 2 : 1;
      painter.beginPath();
      painter.arc(THREAD_X, y, PLATE, 0, Math.PI * 2);
      painter.stroke();
      painter.textAlign = 'center';
      painter.font = `400 ${String(MIN_TEXT)}px ${MONO}`;
      painter.fillStyle = palette(ink);
      painter.fillText(row.glyph, THREAD_X, y);

      painter.textAlign = 'left';
      painter.fillStyle = palette('dim');
      painter.fillText(row.depth, TEXT_X, y - 8);
      const depthWidth = painter.measureText(row.depth).width + 6;
      painter.fillStyle = palette(row.abyssal ? 'ab' : 'dim');
      painter.fillText(row.kind, TEXT_X + depthWidth, y - 8);
      painter.font = `${row.current ? '700' : '400'} ${String(MIN_TEXT)}px ${MONO}`;
      painter.fillStyle = palette(ink);
      painter.fillText(this.#fit(painter, row.name, size.width - TEXT_X - RIGHT_PAD), TEXT_X, y + 8);
    }
  }

  /** The text as much of it as fits the width, an ellipsis on the end when it was cut. */
  #fit(painter: Painter, text: string, width: number): string {
    if (painter.measureText(text).width <= width) return text;
    let kept = text;
    while (kept.length > 1 && painter.measureText(kept + ELLIPSIS).width > width) kept = kept.slice(0, -1);
    return kept + ELLIPSIS;
  }

  #pulse(painter: Painter, colour: string, x: number, y: number, phase: number): void {
    painter.strokeStyle = colour;
    painter.lineWidth = 1;
    painter.globalAlpha = (1 - phase) * 0.6;
    painter.beginPath();
    painter.arc(x, y, PLATE + 3 + 8 * phase, 0, Math.PI * 2);
    painter.stroke();
  }
}
