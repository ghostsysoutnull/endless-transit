import type { Painter } from '#ui/canvas/Painter.ts';
import type { DoorQuad } from './DoorQuad.ts';

/**
 * How one family of door materials is patterned in the corridor (designed for U02; the mock draws none): lines
 * traced across the door in its perspective, added to the current path — the picture strokes them faintly in the
 * door's ink. One class a family, found by the family's key.
 */
export interface DoorPanel {
  trace(painter: Painter, door: DoorQuad): void;
}
