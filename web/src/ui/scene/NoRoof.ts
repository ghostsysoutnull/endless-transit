import type { RoofDrawer } from './RoofDrawer.ts';

/** A flat roof where the picture draws nothing over the walls (the street's). */
export class NoRoof implements RoofDrawer {
  trace(): void {
    // The street draws a flat roof as the walls' top alone.
  }
}
