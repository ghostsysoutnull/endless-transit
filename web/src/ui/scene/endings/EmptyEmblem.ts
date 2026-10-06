import type { EmblemMoment } from './EmblemMoment.ts';
import type { EndingEmblem } from './EndingEmblem.ts';

/** Empty-handed: the buffer's tiles, every one empty. */
export class EmptyEmblem implements EndingEmblem {
  paint({ painter, size, palette, seconds }: EmblemMoment): void {
    const columns = 4;
    const rows = 3;
    const tile = Math.min(size.width / 5.5, size.height / 4.5);
    const pitch = tile * 1.15;
    const left = (size.width - columns * pitch) / 2 + tile * 0.08;
    const top = (size.height - rows * pitch) / 2 + tile * 0.08;
    painter.setLineDash([3, 4]);
    painter.strokeStyle = palette('dim');
    painter.lineWidth = 1;
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        const lit = Math.sin(seconds * 1.5 + row * 2 + column) > 0.85;
        painter.globalAlpha = lit ? 0.9 : 0.4;
        painter.strokeRect(left + column * pitch, top + row * pitch, tile, tile);
      }
    }
    painter.setLineDash([]);
    painter.globalAlpha = 1;
  }
}
