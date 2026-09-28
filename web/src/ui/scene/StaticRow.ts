import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { RowShape } from './RowShape.ts';

/** A corridor that dissolves into static, on the tower: the line stops short and breaks into three magenta dots. */
export class StaticRow implements RowShape {
  bow(): number {
    return 0;
  }

  reach(from: number, full: number): number {
    return full - (full - from) * 0.08;
  }

  wall(): void {
    // No wall: it dissolves instead (the tail).
  }

  tail(painter: Painter, palette: Palette, to: number, line: number): void {
    painter.fillStyle = palette('mg');
    painter.globalAlpha = 0.6;
    for (let dot = 1; dot <= 3; dot++) painter.fillRect(to + dot * 3, line - 0.5, 1.5, 1.5);
  }
}
